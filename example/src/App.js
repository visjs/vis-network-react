import React from 'react';
import './App.css';

import VisNetworkReactComponent from './VisNetworkReactComponent'
// import VisNetworkReactComponent from 'vis-network-react'


function App() {
  let graph = {
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
  return (
    <div className="App">
      <VisNetworkReactComponent graph={graph} options={{}}/>
    </div>
  );
}

export default App;
