"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BookableSlotsForADay = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _native = require("@react-navigation/native");
var _BookableSlot = require("./BookableSlot");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const BookableSlotsForADay = ({
  resource,
  startTime,
  timezone,
  onPress
}) => {
  _react.default.useEffect(() => {});
  (0, _native.useFocusEffect)(_react.default.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const renderAvailableSlots = () => {
    // filter available times to current day only
    const relevantTimes = resource.availableTimes.filter(et => {
      // true if it's the same locale date as the startTime
      if (!et || !et.startTimeUtc) {
        return false;
      }
      const sTime = new Date(et.startTimeUtc);
      return sTime.getFullYear() === startTime.getUTCFullYear() && sTime.getMonth() === startTime.getMonth() && sTime.getDay() === startTime.getDay();
    });
    if (!relevantTimes.length) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: style.bookingSlotsContainer
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: style.emptySectionText
      }, "There are no availabilities for this resource"));
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.bookingSlotsContainer
    }, relevantTimes.map(function (timeSlot, idx) {
      return /*#__PURE__*/_react.default.createElement(_BookableSlot.BookableSlot, {
        key: '' + idx,
        resource: resource,
        slot: timeSlot,
        timezone: timezone.toString(),
        onPress: dialogResource => {
          if (onPress) {
            onPress(dialogResource);
          }
        }
      });
    }));
  };
  return renderAvailableSlots();
};
exports.BookableSlotsForADay = BookableSlotsForADay;
const style = _reactNative.StyleSheet.create({
  emptySectionText: {
    textAlign: 'center',
    color: '#999999'
  },
  resourceSlotButton: {
    width: '80%',
    margin: 5,
    alignSelf: 'center'
  },
  bookingSlotsContainer: {
    marginBottom: 10,
    marginTop: 10
  }
});
//# sourceMappingURL=BookableSlotsForADay.js.map