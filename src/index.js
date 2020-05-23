import React, { Component } from "react";
import defaultsDeep from "lodash/fp/defaultsDeep";
import isEqual from "lodash/isEqual";
import differenceWith from "lodash/differenceWith";
import { DataSet } from "vis-data";
import { Network } from "vis-network/peer/esm/vis-network";
import { v4 as uuidv4 } from 'uuid';
import PropTypes from "prop-types";

import "vis-network/styles/vis-network.css";

class Graph extends Component {
  constructor(props) {
    super(props);
    const { identifier } = props;
    this.updateGraph = this.updateGraph.bind(this);
    this.state = {
      identifier: identifier !== undefined ? identifier : uuidv4()
    };
    this.container = React.createRef();
  }

  componentDidMount() {
    this.edges = new DataSet(this.props.data.edges);
    this.nodes = new DataSet(this.props.data.nodes);

    this.updateGraph();
  }

  shouldComponentUpdate(nextProps, nextState) {
    let nodesChange = !isEqual(this.props.data.nodes, nextProps.data.nodes);
    let edgesChange = !isEqual(this.props.data.edges, nextProps.data.edges);
    let optionsChange = !isEqual(this.props.options, nextProps.options);
    let eventsChange = !isEqual(this.props.events, nextProps.events);
    console.log('should change?')
    if (nodesChange) {
      const idIsEqual = (n1, n2) => n1.id === n2.id;
      const nodesRemoved = differenceWith(this.props.data.nodes, nextProps.data.nodes, idIsEqual);
      const nodesAdded = differenceWith(nextProps.data.nodes, this.props.data.nodes, idIsEqual);
      const nodesChanged = differenceWith(
        differenceWith(nextProps.data.nodes, this.props.data.nodes, isEqual),
        nodesAdded
      );
      this.patchNodes({ nodesRemoved, nodesAdded, nodesChanged });
    }

    if (edgesChange) {
      const edgesRemoved = differenceWith(this.props.data.edges, nextProps.data.edges, isEqual);
      const edgesAdded = differenceWith(nextProps.data.edges, this.props.data.edges, isEqual);
      const edgesChanged = differenceWith(
        differenceWith(nextProps.data.edges, this.props.data.edges, isEqual),
        edgesAdded
      );
      this.patchEdges({ edgesRemoved, edgesAdded, edgesChanged });
    }

    if (optionsChange) {
      this.Network.setOptions(nextProps.options);
    }

    if (eventsChange) {
      let events = this.props.events || {};
      for (let eventName of Object.keys(events)) this.Network.off(eventName, events[eventName]);
      events = nextProps.events || {};
      for (let eventName of Object.keys(events)) this.Network.on(eventName, events[eventName]);
    }

    return false;
  }

  componentDidUpdate() {
    this.updateGraph();
  }

  patchEdges({ edgesRemoved, edgesAdded, edgesChanged }) {
    this.edges.remove(edgesRemoved);
    this.edges.add(edgesAdded);
    this.edges.update(edgesChanged);
  }

  patchNodes({ nodesRemoved, nodesAdded, nodesChanged }) {
    this.nodes.remove(nodesRemoved);
    this.nodes.add(nodesAdded);
    this.nodes.update(nodesChanged);
  }

  updateGraph() {
    let defaultOptions = {
      physics: {
        stabilization: false
      },
      autoResize: false,
      edges: {
        smooth: false,
        color: "#000000",
        width: 0.5,
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 0.5
          }
        }
      }
    };

    // merge user provied options with our default ones
    let options = defaultsDeep(defaultOptions, this.props.options);
    this.Network = new Network(
      this.container.current,
      {
        nodes: this.nodes,
        edges: this.edges,
      },
      options
    );

    if (this.props.getNetwork) {
      this.props.getNetwork(this.Network);
    }

    if (this.props.getNodes) {
      this.props.getNodes(this.nodes);
    }

    if (this.props.getEdges) {
      this.props.getEdges(this.edges);
    }

    // Add user provied events to network
    let events = this.props.events || {};
    for (let eventName of Object.keys(events)) {
      this.Network.on(eventName, events[eventName]);
    }
  }

  render() {
    const { identifier } = this.state;
    const { style } = this.props;[]
    return <div id={identifier} style={style} ref={this.container}></div>
  }
}

Graph.defaultProps = {
  data: {},
  style: { width: "100%", height: "100%" }
};
Graph.propTypes = {
  data: PropTypes.object,
  style: PropTypes.object,
  getNetwork: PropTypes.func,
  getNodes: PropTypes.func,
  getEdges: PropTypes.func,
};

export default Graph;
