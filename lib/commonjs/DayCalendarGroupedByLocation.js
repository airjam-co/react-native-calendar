"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DayCalendarGroupedByLocation = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _native = require("@react-navigation/native");
var _types = require("@airjam/types");
var _GridSingleDayEventList = require("./GridSingleDayEventList");
var _GridTimedEventList = require("./GridTimedEventList");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const DayCalendarGroupedByLocation = ({
  events,
  descriptionLength,
  renderEventFunc
}) => {
  _react.default.useEffect(() => {});
  (0, _native.useFocusEffect)(_react.default.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const renderDayCalendarByLocation = () => {
    if (!events || !events.length) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: style.emptySectionText
      }, "No events found"));
    }
    let earliestStartTime;
    let latestEndTime;
    const eventsByLocations = new Map();
    if (events && events.length) {
      for (let i = 0; i < events.length; i++) {
        const currentEvent = events[i];
        if (!currentEvent) continue;
        const evaluatingLocation = currentEvent.location ? currentEvent.location : '';
        if (currentEvent.startTimeUtc && !currentEvent.isAllDay) {
          const start = new Date(currentEvent.startTimeUtc);
          if (start > new Date(0)) {
            if (!earliestStartTime || start < earliestStartTime) {
              earliestStartTime = start;
            }
          }
        }
        if (currentEvent.endTimeUtc && !currentEvent.isAllDay) {
          const end = new Date(currentEvent.endTimeUtc);
          if (end > new Date(0)) {
            if (!latestEndTime || end > latestEndTime) {
              latestEndTime = end;
            }
          }
        }
        let locationEvents = [];
        if (eventsByLocations.has(evaluatingLocation)) {
          locationEvents = eventsByLocations.get(evaluatingLocation);
        }
        locationEvents.push(currentEvent);
        eventsByLocations.set(evaluatingLocation, locationEvents);
      }
    }
    const uniqueLocations = [];
    for (const entry of Array.from(eventsByLocations.entries())) {
      const k = entry[0];
      uniqueLocations.push(k);
    }
    uniqueLocations.sort();
    const earliestStartHour = earliestStartTime ? earliestStartTime.getHours() : 0;
    const latestEndHour = latestEndTime ? latestEndTime.getHours() : 23;
    const someArrayWith24Elements = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    const someArrayForMapLoop = someArrayWith24Elements.slice(earliestStartHour, latestEndHour + 1);
    // const numScheduleStopsInMinutes: number =
    //   (latestEndHour - earliestStartHour + 1) * 60;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, someArrayForMapLoop.map(function (k, idx) {
      let timeMarkerRenderDate = new Date();
      timeMarkerRenderDate.setHours(idx + earliestStartHour);
      return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        key: 'time-marker-' + idx + k
      }, timeMarkerRenderDate.toLocaleTimeString([], _types.HOUR_ONLY));
    })), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, uniqueLocations.map(function (k, idx) {
      if (!eventsByLocations.has(k)) {
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          key: 'location' + idx
        });
      }
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        key: 'location' + idx
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, k), /*#__PURE__*/_react.default.createElement(_GridSingleDayEventList.GridSingleDayEventList, {
        eventList: eventsByLocations.get(k),
        key: '' + idx,
        descriptionLength: descriptionLength,
        renderEventFunc: renderEventFunc
      })), /*#__PURE__*/_react.default.createElement(_GridTimedEventList.GridTimedEventList, {
        eventList: eventsByLocations.get(k),
        key: '' + idx,
        descriptionLength: descriptionLength,
        renderEventFunc: renderEventFunc
      }));
    })));
  };
  return renderDayCalendarByLocation();
};
exports.DayCalendarGroupedByLocation = DayCalendarGroupedByLocation;
const style = _reactNative.StyleSheet.create({
  emptySectionText: {
    textAlign: 'center',
    color: '#999999'
  }
});
//# sourceMappingURL=DayCalendarGroupedByLocation.js.map