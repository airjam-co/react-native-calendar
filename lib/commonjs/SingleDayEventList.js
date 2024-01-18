"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingleDayEventList = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _native = require("@react-navigation/native");
var _EventDetailList = require("./EventDetailList");
var _reactNativeElements = require("react-native-elements");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const SingleDayEventList = ({
  eventList,
  descriptionLength,
  onPress,
  renderEventFunc
}) => {
  _react.default.useEffect(() => {});
  (0, _native.useFocusEffect)(_react.default.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const renderEventGroupedByDay = () => {
    if (!eventList.length || !eventList[0] || !eventList[0].startTimeUtc) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null);
    }
    const startDay = new Date(eventList[0].startTimeUtc);
    let dayToUse = new Date(startDay.getFullYear(), startDay.getMonth(), startDay.getDate());
    if (eventList[0].isAllDay) {
      dayToUse = new Date(startDay.getUTCFullYear(), startDay.getUTCMonth(), startDay.getUTCDate());
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.dayGroupLabel
    }, dayToUse.toDateString()), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.dayGroupContainer
    }, /*#__PURE__*/_react.default.createElement(_EventDetailList.EventDetailList, {
      eventList: eventList,
      renderEventFunc: renderEventFunc,
      descriptionLength: descriptionLength,
      onPress: e => {
        if (onPress) {
          onPress(e);
        }
      }
    })), /*#__PURE__*/_react.default.createElement(_reactNativeElements.Divider, {
      width: 1
    }));
  };
  return renderEventGroupedByDay();
};
exports.SingleDayEventList = SingleDayEventList;
const style = _reactNative.StyleSheet.create({
  dayGroupLabel: {
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 14,
    color: '#777777'
  },
  dayGroupContainer: {
    flex: 1
  }
});
//# sourceMappingURL=SingleDayEventList.js.map