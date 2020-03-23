"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _visData = require("vis-data");

var _visNetwork = require("vis-network/peer/esm/vis-network");

var _defaultsDeep = _interopRequireDefault(require("lodash/fp/defaultsDeep"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _differenceWith = _interopRequireDefault(require("lodash/differenceWith"));

require("vis-network/styles/vis-network.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var defaultOptions = {
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
var defaultStyle = {
  width: "100%",
  height: "100%"
};

var VisNetworkReactComponent = function VisNetworkReactComponent(_ref) {
  var graph = _ref.graph,
      options = _ref.options,
      events = _ref.events,
      style = _ref.style,
      getNetwork = _ref.getNetwork,
      getNodes = _ref.getNodes,
      getEdges = _ref.getEdges;
  var networkRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(graph ? new _visData.DataSet(graph.nodes) : {}),
      _useState2 = _slicedToArray(_useState, 2),
      stateNodes = _useState2[0],
      setNodes = _useState2[1];

  var _useState3 = (0, _react.useState)(graph ? new _visData.DataSet(graph.edges) : {}),
      _useState4 = _slicedToArray(_useState3, 2),
      stateEdges = _useState4[0],
      setEdges = _useState4[1];

  var _useState5 = (0, _react.useState)(options),
      _useState6 = _slicedToArray(_useState5, 2),
      stateOptions = _useState6[0],
      setOptions = _useState6[1];

  var _useState7 = (0, _react.useState)(events),
      _useState8 = _slicedToArray(_useState7, 2),
      stateEvents = _useState8[0],
      setEvents = _useState8[1];

  var network = (0, _react.useMemo)(function () {
    return null;
  }, []);
  (0, _react.useEffect)(function () {
    network = new _visNetwork.Network(networkRef.current, graph, _objectSpread({}, defaultOptions, {}, options));
  }, []);
  (0, _react.useEffect)(function () {
    var nodesChange = !(0, _isEqual["default"])(stateNodes, graph.nodes);
    var edgesChange = !(0, _isEqual["default"])(stateEdges, graph.edges);
    var optionsChange = !(0, _isEqual["default"])(stateOptions, options);
    var eventsChange = !(0, _isEqual["default"])(stateEvents, events);

    if (nodesChange || edgesChange) {
      network.setData(graph);
      setNodes(graph.nodes);
      setEdges(graph.edges);
    } // if (nodesChange) {
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
      setOptions(options);
      network.setOptions(_objectSpread({}, defaultOptions, {}, options));
    }

    if (eventsChange) {
      for (var _i2 = 0, _Object$keys = Object.keys(stateEvents); _i2 < _Object$keys.length; _i2++) {
        var eventName = _Object$keys[_i2];
        network.off(eventName, stateEvents[eventName]);
      }

      for (var _i3 = 0, _Object$keys2 = Object.keys(events); _i3 < _Object$keys2.length; _i3++) {
        var _eventName = _Object$keys2[_i3];
        network.on(_eventName, events[_eventName]);
      }

      setEvents(events);
    }
  }, [graph, options, events]);
  return _react["default"].createElement("div", {
    ref: networkRef,
    style: _objectSpread({}, defaultStyle, {}, style)
  });
};

VisNetworkReactComponent.propTypes = {
  graph: _propTypes["default"].shape({
    nodes: _propTypes["default"].array,
    edges: _propTypes["default"].array
  }),
  style: _propTypes["default"].object,
  getNetwork: _propTypes["default"].func,
  getNodes: _propTypes["default"].func,
  getEdges: _propTypes["default"].func
};
var _default = VisNetworkReactComponent;
exports["default"] = _default;
