"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventDetail = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _native = require("@react-navigation/native");
var _types = require("@airjam/types");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const EventDetail = ({
  event,
  descriptionLength
}) => {
  _react.default.useEffect(() => {});
  (0, _native.useFocusEffect)(_react.default.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const renderView = () => {
    let description = event.description ? event.description : '';
    const descLimit = descriptionLength || _types.DEFAULT_DESCRIPTION_LENGTH_CUTOFF;
    if (descLimit > 2 && description.length > descLimit) {
      description = description.substring(0, descLimit - 3) + '...';
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [style.eventContainer]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.eventContainerLhs
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.eventTime
    }, (0, _types.getEventTime)(event))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.eventContainerRhs
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.eventTitle
    }, event.title), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.eventLocation
    }, event.location), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.eventDescription
    }, description)));
  };
  return renderView();
};
exports.EventDetail = EventDetail;
const style = _reactNative.StyleSheet.create({
  eventContainer: {
    backgroundColor: '#e1e1e1',
    borderRadius: 3,
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 15,
    flexDirection: 'row'
  },
  eventContainerLhs: {
    alignSelf: 'stretch',
    width: '30%'
  },
  eventContainerRhs: {
    marginLeft: 5,
    width: '70%'
  },
  eventTitle: {
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 2
  },
  eventTime: {
    color: '#777777',
    fontWeight: '400'
  },
  eventLocation: {
    color: '#777777',
    flexWrap: 'wrap',
    flexShrink: 1
  },
  eventDescription: {
    color: '#777777',
    flexWrap: 'wrap',
    flexShrink: 1
  }
});
//# sourceMappingURL=EventDetail.js.map