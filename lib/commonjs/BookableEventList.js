"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BookableEventList = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _native = require("@react-navigation/native");
var _EventDetailList = require("./EventDetailList");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const BookableEventList = ({
  resource,
  startTime,
  descriptionLength,
  onPress,
  renderEventFunc
}) => {
  _react.default.useEffect(() => {});
  (0, _native.useFocusEffect)(_react.default.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const renderBookableEvents = () => {
    // filter available times to current day only
    const currentDayEvents = resource.availableEvents.filter(ae => {
      // true if it's the same locale date as the startTime
      if (!ae || !ae.startTimeUtc) {
        return false;
      }
      const sTime = new Date(ae.startTimeUtc);
      return sTime.getFullYear() === startTime.getFullYear() && sTime.getMonth() === startTime.getMonth() && sTime.getDate() === startTime.getDate();
    });
    if (!currentDayEvents.length) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: style.bookingSlotsContainer
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: style.emptySectionText
      }, "There are no availabilities for this resource"));
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.bookingSlotsContainer
    }, /*#__PURE__*/_react.default.createElement(_EventDetailList.EventDetailList, {
      eventList: currentDayEvents,
      renderEventFunc: renderEventFunc,
      descriptionLength: descriptionLength,
      onPress: e => {
        if (onPress) {
          onPress(e);
        }
      }
    }));
  };
  return renderBookableEvents();
};
exports.BookableEventList = BookableEventList;
const style = _reactNative.StyleSheet.create({
  emptySectionText: {
    textAlign: 'center',
    color: '#999999'
  },
  bookingSlotsContainer: {
    marginBottom: 10,
    marginTop: 10
  }
});
//# sourceMappingURL=BookableEventList.js.map