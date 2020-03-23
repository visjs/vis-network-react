import React, { useRef, useState, useMemo, useEffect } from 'react';
import PropTypes from "prop-types";

import { DataSet } from "vis-data";
import { Network } from "vis-network/peer/esm/vis-network";
import defaultsDeep from "lodash/fp/defaultsDeep";
import isEqual from "lodash/isEqual";
import differenceWith from "lodash/differenceWith";
import "vis-network/styles/vis-network.css";

const defaultOptions = {
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

const defaultStyle = { width: "100%", height: "100%" }

const VisNetworkReactComponent = ({ ref, graph, options, events, style = defaultStyle, getNetwork, getNodes, getEdges }) => {
    const networkRef = ref || useRef(null);
    const [ stateNodes, setNodes ] = useState(graph ? new DataSet(graph.nodes) : {})
    const [ stateEdges, setEdges ] = useState(graph ? new DataSet(graph.edges) : {})
    const [ stateOptions, setOptions ] = useState(options)
    const [ stateEvents, setEvents ] = useState(events)
    let network = useMemo(() => {
        return null
    }, [])

    useEffect(() => {
        network = new Network(networkRef.current, graph, { ...defaultOptions, ...options })
    }, [])

    useEffect(() => {
        let nodesChange = !isEqual(stateNodes, graph.nodes);
        let edgesChange = !isEqual(stateEdges, graph.edges);
        let optionsChange = !isEqual(stateOptions, options);
        let eventsChange = !isEqual(stateEvents, events);

        if (nodesChange || edgesChange) {
            network.setData(graph)
            setNodes(graph.nodes)
            setEdges(graph.edges)
        }
        // if (nodesChange) {
        //     const idIsEqual = (n1, n2) => n1.id === n2.id;
        //     const nodesRemoved = differenceWith(graph.nodes, stateNodes, idIsEqual);
        //     const nodesAdded = differenceWith(stateNodes, graph.nodes, idIsEqual);
        //     const nodesChanged = differenceWith(
        //       differenceWith(stateNodes, graph.nodes, isEqual),
        //       nodesAdded
        //     );
        //     setNodes(graph.nodes)
        //     this.patchNodes({ nodesRemoved, nodesAdded, nodesChanged });
        // }
      
        // if (edgesChange) {
        //     const edgesRemoved = differenceWith(graph.edges, stateEdges, isEqual);
        //     const edgesAdded = differenceWith(stateEdges, graph.edges, isEqual);
        //     const edgesChanged = differenceWith(
        //       differenceWith(stateEdges, graph.edges, isEqual),
        //       edgesAdded
        //     );
        //     setEdges(graph.edges)
        //     this.patchEdges({ edgesRemoved, edgesAdded, edgesChanged });
        // }
      
        if (optionsChange) {
            setOptions(options)
            network.setOptions({ ...defaultOptions, ...options });
        }
      
        if (eventsChange) {
            for (let eventName of Object.keys(stateEvents)) network.off(eventName, stateEvents[eventName]);
            for (let eventName of Object.keys(events)) network.on(eventName, events[eventName]);
            setEvents(events)
        }

    }, [ graph, options, events])

    return (
        <div 
            ref={networkRef} 
            style={style}
        ></div>
    )
}

VisNetworkReactComponent.propTypes = {
    graph: PropTypes.shape({
        nodes: PropTypes.array,
        edges: PropTypes.array,
    }),
    style: PropTypes.object,
    getNetwork: PropTypes.func,
    getNodes: PropTypes.func,
    getEdges: PropTypes.func,
};

export default VisNetworkReactComponent
