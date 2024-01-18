"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventListGroupedByDay = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _native = require("@react-navigation/native");
var _SingleDayEventList = require("./SingleDayEventList");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const EventListGroupedByDay = ({
  onPress,
  events,
  descriptionLength,
  renderEventFunc
}) => {
  _react.default.useEffect(() => {});
  (0, _native.useFocusEffect)(_react.default.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const renderEventsByDay = () => {
    const eventByDays = new Map();
    for (let i = 0; i < events.length; i++) {
      const currentEvent = events[i];
      if (currentEvent && currentEvent.startTimeUtc) {
        const startDateForEvent = new Date(currentEvent.startTimeUtc);
        let dayToUse = new Date(startDateForEvent.getFullYear(), startDateForEvent.getMonth(), startDateForEvent.getDate());
        if (currentEvent.isAllDay) {
          dayToUse = new Date(startDateForEvent.getUTCFullYear(), startDateForEvent.getUTCMonth(), startDateForEvent.getUTCDate());
        }
        const dayIdx = dayToUse.getTime() / 1000;
        let pushedDayEvents = [];
        if (eventByDays.has(dayIdx)) {
          pushedDayEvents = eventByDays.get(dayIdx);
        }
        pushedDayEvents.push(currentEvent);
        eventByDays.set(dayIdx, pushedDayEvents);
      } else {
        console.log('Ignoring erroneous event');
        console.log(currentEvent);
      }
    }
    const keys = [];
    for (const entry of Array.from(eventByDays.entries())) {
      const k = entry[0];
      keys.push(k);
    }
    keys.sort();
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.eventsByDayContainer
    }, keys.map(function (k) {
      if (eventByDays.has(k)) {
        return /*#__PURE__*/_react.default.createElement(_SingleDayEventList.SingleDayEventList, {
          eventList: eventByDays.get(k),
          descriptionLength: descriptionLength,
          key: '' + k,
          renderEventFunc: renderEventFunc,
          onPress: e => {
            if (onPress) {
              onPress(e);
            }
          }
        });
      }
      return '';
    }));
  };
  return renderEventsByDay();
};
exports.EventListGroupedByDay = EventListGroupedByDay;
const style = _reactNative.StyleSheet.create({
  eventsByDayContainer: {
    flex: 1
  }
});
//# sourceMappingURL=EventListGroupedByDay.js.map