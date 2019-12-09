import React, { useState, Children } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MapContext } from '../MapContext'
import { RIEToggle, RIEInput, RIETextArea, RIENumber, RIETags, RIESelect } from 'riek'
import _ from 'lodash'


const initial = (zones) => Array.from(zones).map(k => {
  const custom: Zone = {
    id: k._id,
    content: k.name,
    children: [],
    color: k.color
  };

  return custom;
});

const grid = 8;
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


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
    <Draggable draggableId={zone.id} index={index} >
      {provided => (
        <ZoneItem
            onDoubleClick={ e => {console.log('double') }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <RIEInput
          value={zone.content}
          change={e => {console.log(e)}}
          propName='name'
          validate={_.isString}
          /><div></div>
          Children: {zone.children.length} MasterZone: {(zone.parent_zone_id) ? 'false': 'true'}
        </ZoneItem>
      )}
    </Draggable>
  );
}

const ZoneList = React.memo(function ZoneList({ zones }) {
  return zones.map((zone, index: number) => (
    <Zone zone={zone} index={index} key={zone.id} />
  ));
});

export default function ZoneApp(props) {
  const [zones, setZones, cords, setCords, testZones, addZone, editZone, deleteZone, getChildrenZone, getZones] = React.useContext(MapContext)
  const [state, setState] = useState({});
  const [first, setFirst] = useState(true);
  if (first && props.zones) {
      setState({zones: initial(props.zones)})
      setFirst(false)
      console.log("first")
  }


  

  function onDragEnd(result) {

    if (result.combine) {
        // super simple: just removing the dragging item
        const items = Array.from(state.zones);
        var tmp = items.splice(result.source.index, 1);
        console.log(result)
        console.log(tmp)
        editZone({zone_id: tmp[0].id, parent_zone_id: result.combine.draggableId })
        setState({ zones: items });       
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
