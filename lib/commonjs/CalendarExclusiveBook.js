"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarExclusiveBook = void 0;
var _react = _interopRequireDefault(require("react"));
var _native = require("@react-navigation/native");
var _types = require("@airjam/types");
var _CalendarView = require("./CalendarView");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CalendarExclusiveBook = ({
  availability,
  startTime,
  onPress
}) => {
  _react.default.useEffect(() => {});
  (0, _native.useFocusEffect)(_react.default.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const renderCalendarExclusiveBook = () => {
    const selectedTime = (0, _types.getDateInLocalTime)(startTime);
    // TODO ---> group all available times by day and count
    const availableCountByMonthDays = new Map();
    if (availability && availability.resources) {
      availability.resources.forEach(resource => {
        resource.availableEvents.forEach(at => {
          if (at.startTimeUtc) {
            const sTime = new Date(at.startTimeUtc);
            const idx = (0, _types.getDateInLocalTime)(sTime);
            const currentCount = availableCountByMonthDays.has(idx) ? availableCountByMonthDays.get(idx) : 0;
            availableCountByMonthDays.set(idx, currentCount + 1);
          }
        });
      });
    }
    const markings = {
      [selectedTime]: {
        marked: false,
        selected: true,
        selectedColor: 'blue'
      }
    };
    availableCountByMonthDays.forEach((count, monthDay) => {
      if (count < 0) {
        console.log('no way');
      }
      if (selectedTime !== monthDay) {
        markings[monthDay] = {
          marked: true,
          selectedColor: 'red',
          selected: false
        };
      }
    });
    return /*#__PURE__*/_react.default.createElement(_CalendarView.CalendarView, {
      markedDates: markings,
      onPress: pressedDates => {
        if (onPress) {
          onPress(pressedDates);
        }
      }
    });
  };
  return renderCalendarExclusiveBook();
};
exports.CalendarExclusiveBook = CalendarExclusiveBook;
//# sourceMappingURL=CalendarExclusiveBook.js.map