import React, { useState, Children } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MapContext } from '../MapContext'
import { RIEToggle, RIEInput, RIETextArea, RIENumber, RIETags, RIESelect } from 'riek'
import _ from 'lodash'
import {editZone, getChildrenZone} from '../ZoneRoutes'
import { async } from "rxjs/internal/scheduler/async";

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
            <RIEInput
            value={zone.name}
            change={e => {
              zones[index].name = e.name
              editZone({zone_id: zone._id, name: e.name})
            }}
            propName='name'
            validate={_.isString}
            /><div></div>
            Children: {zone.children.length}   Color: {zone.color}
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
