import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SingleDayEventList } from './SingleDayEventList';
export const EventListGroupedByDay = ({
  onPress,
  events,
  descriptionLength,
  renderEventFunc
}) => {
  React.useEffect(() => {});
  useFocusEffect(React.useCallback(() => {
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
    return /*#__PURE__*/React.createElement(View, {
      style: style.eventsByDayContainer
    }, keys.map(function (k) {
      if (eventByDays.has(k)) {
        return /*#__PURE__*/React.createElement(SingleDayEventList, {
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
const style = StyleSheet.create({
  eventsByDayContainer: {
    flex: 1
  }
});
//# sourceMappingURL=EventListGroupedByDay.js.map