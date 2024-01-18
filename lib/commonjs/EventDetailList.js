"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventDetailList = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _native = require("@react-navigation/native");
var _EventDetail = require("./EventDetail");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const EventDetailList = ({
  eventList,
  onPress,
  descriptionLength,
  renderEventFunc
}) => {
  _react.default.useEffect(() => {});
  (0, _native.useFocusEffect)(_react.default.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const pressableEvents = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.eventsContainer
    }, eventList.map(function (e, idx) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        key: 'touchable-opacity-events-' + idx,
        onPress: () => {
          if (onPress) {
            onPress(e);
          }
        }
      }, renderEventDetail(e, idx));
    }));
  };
  const renderEvents = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.eventsContainer
    }, eventList.map((e, idx) => renderEventDetail(e, idx)));
  };
  const renderEventDetail = (event, idx) => {
    if (renderEventFunc) {
      return renderEventFunc(event, idx);
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_EventDetail.EventDetail, {
      key: '' + idx,
      event: event,
      descriptionLength: descriptionLength
    }));
  };
  if (onPress) {
    return pressableEvents();
  }
  return renderEvents();
};
exports.EventDetailList = EventDetailList;
const style = _reactNative.StyleSheet.create({
  eventsContainer: {
    width: '100%',
    paddingBottom: 5
  }
});
//# sourceMappingURL=EventDetailList.js.map