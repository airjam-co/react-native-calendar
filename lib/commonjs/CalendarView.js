"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarView = void 0;
var _react = _interopRequireDefault(require("react"));
var _native = require("@react-navigation/native");
var _reactNativeCalendars = require("react-native-calendars");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CalendarView = ({
  markedDates,
  onPress
}) => {
  _react.default.useEffect(() => {});
  (0, _native.useFocusEffect)(_react.default.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  return /*#__PURE__*/_react.default.createElement(_reactNativeCalendars.Calendar, {
    onDayPress: pressedDate => {
      if (onPress) {
        onPress(new Date(pressedDate.year, pressedDate.month - 1, pressedDate.day, 0, 0, 0, 0));
      }
    },
    markedDates: markedDates
  });
};
exports.CalendarView = CalendarView;
//# sourceMappingURL=CalendarView.js.map