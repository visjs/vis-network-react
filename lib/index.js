"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _differenceWith = _interopRequireDefault(require("lodash/differenceWith"));

var _visData = require("vis-data/peer/esm/vis-data");

var _visNetwork = require("vis-network/peer/esm/vis-network");

var _propTypes = _interopRequireDefault(require("prop-types"));

require("vis-network/styles/vis-network.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable linebreak-style */

/* eslint-disable react/jsx-filename-extension */
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

var Graph = function Graph(_ref) {
  var data = _ref.data,
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? defaultOptions : _ref$options,
      _ref$events = _ref.events,
      events = _ref$events === void 0 ? {} : _ref$events,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {
    width: "100%",
    height: "100%"
  } : _ref$style,
      getNetwork = _ref.getNetwork,
      getNodes = _ref.getNodes,
      getEdges = _ref.getEdges;
  var nodes = (0, _react.useRef)(new _visData.DataSet(data.nodes));
  var edges = (0, _react.useRef)(new _visData.DataSet(data.edges));
  var network = (0, _react.useRef)(null);
  var container = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    network.current = new _visNetwork.Network(container.current, {
      nodes: nodes.current,
      edges: edges.current
    }, options);

    if (getNetwork) {
      getNetwork(network.current);
    }

    if (getNodes) {
      getNodes(nodes.current);
    }

    if (getEdges) {
      getEdges(edges.current);
    }
  }, []);
  (0, _react.useEffect)(function () {
    var nodesChange = !(0, _isEqual["default"])(nodes.current, data.nodes);
    var edgesChange = !(0, _isEqual["default"])(edges.current, data.edges);

    if (nodesChange) {
      var idIsEqual = function idIsEqual(n1, n2) {
        return n1.id === n2.id;
      };

      var nodesRemoved = (0, _differenceWith["default"])(nodes.current.get(), data.nodes, idIsEqual);
      var nodesAdded = (0, _differenceWith["default"])(data.nodes, nodes.current.get(), idIsEqual);
      var nodesChanged = (0, _differenceWith["default"])((0, _differenceWith["default"])(data.nodes, nodes.current.get(), _isEqual["default"]), nodesAdded);
      nodes.current.remove(nodesRemoved);
      nodes.current.add(nodesAdded);
      nodes.current.update(nodesChanged);
    }

    if (edgesChange) {
      var edgesRemoved = (0, _differenceWith["default"])(edges.current.get(), data.edges, _isEqual["default"]);
      var edgesAdded = (0, _differenceWith["default"])(data.edges, edges.current.get(), _isEqual["default"]);
      var edgesChanged = (0, _differenceWith["default"])((0, _differenceWith["default"])(data.edges, edges.current.get(), _isEqual["default"]), edgesAdded);
      edges.current.remove(edgesRemoved);
      edges.current.add(edgesAdded);
      edges.current.update(edgesChanged);
    }
  }, [data]);
  (0, _react.useEffect)(function () {
    network.current.setOptions(options);
  }, [options]);
  (0, _react.useEffect)(function () {
    // Add user provied events to network
    // eslint-disable-next-line no-restricted-syntax
    for (var _i = 0, _Object$keys = Object.keys(events); _i < _Object$keys.length; _i++) {
      var eventName = _Object$keys[_i];
      network.current.on(eventName, events[eventName]);
    }
  }, [events]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: container,
    style: style
  });
};

Graph.propTypes = {
  data: _propTypes["default"].object,
  options: _propTypes["default"].object,
  events: _propTypes["default"].object,
  style: _propTypes["default"].object,
  getNetwork: _propTypes["default"].func,
  getNodes: _propTypes["default"].func,
  getEdges: _propTypes["default"].func
};
var _default = Graph;
exports["default"] = _default;
