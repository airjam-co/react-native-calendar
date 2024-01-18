import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { HOUR_ONLY } from '@airjam/types';
import { GridSingleDayEventList } from './GridSingleDayEventList';
import { GridTimedEventList } from './GridTimedEventList';
export const DayCalendarGroupedByLocation = ({
  events,
  descriptionLength,
  renderEventFunc
}) => {
  React.useEffect(() => {});
  useFocusEffect(React.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const renderDayCalendarByLocation = () => {
    if (!events || !events.length) {
      return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, {
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
    return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(View, null, someArrayForMapLoop.map(function (k, idx) {
      let timeMarkerRenderDate = new Date();
      timeMarkerRenderDate.setHours(idx + earliestStartHour);
      return /*#__PURE__*/React.createElement(Text, {
        key: 'time-marker-' + idx + k
      }, timeMarkerRenderDate.toLocaleTimeString([], HOUR_ONLY));
    })), /*#__PURE__*/React.createElement(View, null, uniqueLocations.map(function (k, idx) {
      if (!eventsByLocations.has(k)) {
        return /*#__PURE__*/React.createElement(View, {
          key: 'location' + idx
        });
      }
      return /*#__PURE__*/React.createElement(View, {
        key: 'location' + idx
      }, /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, null, k), /*#__PURE__*/React.createElement(GridSingleDayEventList, {
        eventList: eventsByLocations.get(k),
        key: '' + idx,
        descriptionLength: descriptionLength,
        renderEventFunc: renderEventFunc
      })), /*#__PURE__*/React.createElement(GridTimedEventList, {
        eventList: eventsByLocations.get(k),
        key: '' + idx,
        descriptionLength: descriptionLength,
        renderEventFunc: renderEventFunc
      }));
    })));
  };
  return renderDayCalendarByLocation();
};
const style = StyleSheet.create({
  emptySectionText: {
    textAlign: 'center',
    color: '#999999'
  }
});
//# sourceMappingURL=DayCalendarGroupedByLocation.js.map