import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import FileExplorerTheme from 'react-sortable-tree-theme-minimal';
import { RIEToggle, RIEInput, RIETextArea, RIENumber, RIETags, RIESelect } from 'riek'
import _ from 'lodash'



export default class Tree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [
        { title: <RIEInput></RIEInput>, children: [{ title: 'Egg' }] },
        { title: 'Fish', children: [{ title: 'fingerline'}] },
        
      ],
      zones: props.zones.map((item,index) => { 
        function handleChange(task) {
          console.log(task,index)
          item.name = task.name
         }
      return {title:
        <div style={{background: item.color, }}>
        <RIEInput 
        style={{background: "#FF0024"}}
        value={item.name}
        change={handleChange}
        propName='name'
        validate={_.isString} />
        </div>
         , children: item.children}})
    };
  }

  render() {
    return (
      
        <SortableTree
          style={{'background-color': "#FF0024", }}
          treeData={this.state.zones}
          onChange={zones => this.setState({ zones })}
        //   theme={FileExplorerTheme}
        />
      
    );
  }
}