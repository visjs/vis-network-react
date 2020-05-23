import React, { useCallback, useState } from 'react';
import './App.css';

import VisNetworkReactComponent from 'vis-network-react'

let defaultdata = {
  nodes: [
    {id: 1, label: 'Node 1'},
    {id: 2, label: 'Node 2'},
    {id: 3, label: 'Node 3'},
    {id: 4, label: 'Node 4'},
    {id: 5, label: 'Node 5'},
  ],
  edges: [
    {from: 1, to: 3},
    {from: 1, to: 2},
    {from: 2, to: 4},
    {from: 2, to: 5},
    {from: 3, to: 3}
  ],
}

let events = {
  click: function (params) {
      params.event = "[original event]";
      console.log('click event, getNodeAt returns: ' + this.getNodeAt(params.pointer.DOM));
  },
  doubleClick: function (params) {
    console.log('doubleClick Event:', params);
    params.event = "[original event]";
  },
  oncontext: function (params) {
    console.log('oncontext Event:', params);

    params.event = "[original event]";
  },
  dragStart: function (params) {
      // There's no point in displaying this event on screen, it gets immediately overwritten
      params.event = "[original event]";
      console.log('dragStart Event:', params);
      console.log('dragStart event, getNodeAt returns: ' + this.getNodeAt(params.pointer.DOM));
  },
  dragging: function (params) {
      params.event = "[original event]";
  },
  dragEnd: function (params) {
      params.event = "[original event]";
      console.log('dragEnd Event:', params);
      console.log('dragEnd event, getNodeAt returns: ' + this.getNodeAt(params.pointer.DOM));
  },
  controlNodeDragging: function (params) {
      params.event = "[original event]";
  },
  controlNodeDragEnd: function (params) {
      params.event = "[original event]";
      console.log('controlNodeDragEnd Event:', params);
  },
  zoom: function (params) {
  },
  showPopup: function (params) {
  },
  hidePopup: function () {
      console.log('hidePopup Event');
  },
  select: function (params) {
      console.log('select Event:', params);
  },
  selectNode: function (params) {
      console.log('selectNode Event:', params);
  },
  selectEdge: function (params) {
      console.log('selectEdge Event:', params);
  },
  deselectNode: function (params) {
      console.log('deselectNode Event:', params);
  },
  deselectEdge: function (params) {
      console.log('deselectEdge Event:', params);
  },
  hoverNode: function (params) {
      console.log('hoverNode Event:', params);
  },
  hoverEdge: function (params) {
      console.log('hoverEdge Event:', params);
  },
  blurNode: function (params) {
      console.log('blurNode Event:', params);
  },
  blurEdge: function (params) {
      console.log('blurEdge Event:', params);
  },
}

function App() {
  const [ data, setData ] = useState(defaultdata)

  const handleAddNode = useCallback(() => {
    const id = data.nodes.length + 1
    setData({ 
      ...data, 
      nodes: [ 
        ...data.nodes,     
        { id, label: `Node ${id}`},
      ] 
    })
  }, [ setData, data ])

  return (
    <div className="App">
      <button onClick={handleAddNode}>add random node</button>
      <VisNetworkReactComponent data={data} options={{}} events={events}/>
    </div>
  );
}

export default App;
