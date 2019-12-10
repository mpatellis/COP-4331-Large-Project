import React, { useState, Children } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MapContext } from '../MapContext'
import { RIEToggle, RIEInput, RIETextArea, RIENumber, RIETags, RIESelect } from 'riek'
import _ from 'lodash'
import {editZone, getChildrenZone, deleteZone} from '../ZoneRoutes'
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import SendUpIcon from '@material-ui/icons/ArrowDropUp';
import DeleteIcon from '@material-ui/icons/Delete';
import NoIcon from '@material-ui/icons/Clear';
import YesIcon from '@material-ui/icons/Check';

export default function ZoneApp(props) {
  const [zones, setZones, cords, setCords, parentZone, setParentZone] = React.useContext(MapContext)
  const [state, setState] = useState({});
  const [first, setFirst] = useState(true);
  if (first && props.zones) {
      setState({zones: zones})
      setFirst(false)
      console.log("first")
  }

  const initial = (zones) => Array.from(zones).map(k => {
    const custom: Zone = {
      id: k._id,
      content: k.name,
      children: k.children,
      color: k.color
    };

    return custom;
  });

  const grid = 8;



  function Zone({ zone, index }) {
    const [confirmDelete, setConfirmDelete] = React.useState(false)
    var color
    if (zone.color) {
        color = zone.color.replace( /\)/, ", .4)")
    } else color = 'grey'
    
    const ZoneItem = styled.div`
      width: 100%;
      border: 1px solid grey;
      margin-bottom: ${grid}px;
      background-color: ${color};
      padding: ${grid}px;
      `;

    const handleSendUp = () => {
        const items = Array.from(state.zones);
        var tmp = items.splice(index, 1);
        removeIndex(index)
        setState({ zones: items })
        editZone({zone_id: zone._id, parent_zone_id: parentZone[0].parent_zone_id })
    }

    const handleConfimDelete = () => {
      const items = Array.from(zones);
      zones.splice(index, 1);
      var tmp = items.splice(index, 1);
      while(zones.length > 0) {
        zones.pop()
      }
      for (var i in items) {
        zones.push(items[i])
      }
      deleteZone({zone_id: zone._id})
      return tmp
    }
    
    return (
      <Draggable draggableId={zone._id} index={index} >
        {provided => (
          <ZoneItem
              onDoubleClick={ e => {
                parentZone.pop()
                parentZone.push(zones[index])
               }}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Grid container  >
                  <Grid item xs={10}>
                    <RIEInput
                      value={zone.name}
                      change={e => {
                        zones[index].name = e.name
                        editZone({zone_id: zone._id, name: e.name})
                      }}
                      propName='name'
                      validate={_.isString}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    { zone.parent_zone_id != null && !confirmDelete && parentZone[0] &&
                    <IconButton 
                      size="small"
                      aria-label="back"
                      onClick={async e=>{
                      handleSendUp()
                          }
                      }
                      >
                      <SendUpIcon color="inherit" />
                    </IconButton>}
                    { confirmDelete &&
                      <IconButton 
                        size="small"
                        aria-label="back"
                        onClick={async e=>{setConfirmDelete(false)}
                        }
                        >
                      <NoIcon color="inherit" />
                    </IconButton>}
                  </Grid>
                    <Grid item xs={1}>
                      { !confirmDelete &&
                      <IconButton 
                        size="small"
                        aria-label="back"
                        onClick={async e=>{setConfirmDelete(true)}
                        }
                        >
                      <DeleteIcon color="inherit" />
                    </IconButton>}
                    { confirmDelete &&
                      <IconButton 
                        size="small"
                        aria-label="back"
                        onClick={async e=>{
                          setConfirmDelete(false)
                          handleConfimDelete()
                        }
                        }
                        >
                      <YesIcon color="inherit" />
                    </IconButton>}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={5}>
                Children: {zone.children.length}
              </Grid>
              {/* <Grid item xs={7}>
                Color: {zone.color}
              </Grid> */}
            </Grid>
          </ZoneItem>
        )}
      </Draggable>
    );
  }

  const ZoneList = React.memo(function ZoneList({ zones }) {
    return zones.map((zone, index: number) => (
      <Zone zone={zone} index={index} key={zone._id} />
    ));
  });



  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    result.splice(startIndex, 1);
    const [removed] = zones.splice(startIndex, 1);
    zones.splice(endIndex, 0, removed);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

  const removeIndex = (index) => {
    const items = Array.from(zones);
    zones.splice(index, 1);
    var tmp = items.splice(index, 1);
    while(zones.length > 0) {
      zones.pop()
    }
    for (var i in items) {
      zones.push(items[i])
    }
    return tmp
  }

  const resetChildren = async (parent) => {
    const items = Array.from(zones);
    var index = items.findIndex(e=> e._id === parent)

    if (index != -1) {
      items[index].children = await getChildrenZone({zone_id: parent})
      while(zones.length > 0) {
        zones.pop()
      }
      for (var i in items) {
        zones.push(items[i])
      }
    } 
  }

  

  async function onDragEnd(result) {
    if (cords.length > 0){
      return
    }
    if (result.combine) {
      console.log(result)
        const items = Array.from(state.zones);
        var tmp = items.splice(result.source.index, 1);
        removeIndex(result.source.index)
        console.log()
        setState({ zones: items })
        await editZone({zone_id: tmp[0]._id, parent_zone_id: result.combine.draggableId })
        .then(async res => {
          console.log(res)
          resetChildren(result.combine.draggableId)
        })
        return;
    }
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }
    console.log(result.destination)

    const zones = reorder(
      state.zones,
      result.source.index,
      result.destination.index
    );

    setState({ zones });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list" isCombineEnabled>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <ZoneList zones={state.zones} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
