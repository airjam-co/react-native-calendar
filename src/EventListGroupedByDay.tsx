import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { BookableEvent, CalendarEvent } from '@airjam/types';
import { SingleDayEventList } from './SingleDayEventList';

interface Props {
  events: CalendarEvent[];
  descriptionLength?: number;
  onPress?: (event: CalendarEvent | BookableEvent) => void;
  renderEventFunc?: (
    event: CalendarEvent | BookableEvent,
    index: number
  ) => React.JSX.Element;
}

export const EventListGroupedByDay = ({
  onPress,
  events,
  descriptionLength,
  renderEventFunc,
}: Props) => {
  React.useEffect(() => {});

  useFocusEffect(
    React.useCallback(() => {
      return; // happens when this view is unfocused
    }, [])
  );

  const renderEventsByDay = () => {
    const eventByDays: Map<number, CalendarEvent[]> = new Map<
      number,
      CalendarEvent[]
    >();
    for (let i = 0; i < events.length; i++) {
      const currentEvent = events[i];
      if (currentEvent && currentEvent.startTimeUtc) {
        const startDateForEvent = new Date(currentEvent.startTimeUtc);
        let dayToUse = new Date(
          startDateForEvent.getFullYear(),
          startDateForEvent.getMonth(),
          startDateForEvent.getDate()
        );
        if (currentEvent.isAllDay) {
          dayToUse = new Date(
            startDateForEvent.getUTCFullYear(),
            startDateForEvent.getUTCMonth(),
            startDateForEvent.getUTCDate()
          );
        }
        const dayIdx = dayToUse.getTime() / 1000;

        let pushedDayEvents: CalendarEvent[] = [];
        if (eventByDays.has(dayIdx)) {
          pushedDayEvents = eventByDays.get(dayIdx)!;
        }
        pushedDayEvents.push(currentEvent);
        eventByDays.set(dayIdx, pushedDayEvents);
      } else {
        console.log('Ignoring erroneous event');
        console.log(currentEvent);
      }
    }
    const keys: number[] = [];
    for (const entry of Array.from(eventByDays.entries())) {
      const k = entry[0];
      keys.push(k);
    }
    keys.sort();
    return (
      <View style={style.eventsByDayContainer}>
        {keys.map(function (k) {
          if (eventByDays.has(k)) {
            return (
              <SingleDayEventList
                eventList={eventByDays.get(k)!}
                descriptionLength={descriptionLength}
                key={'' + k}
                renderEventFunc={renderEventFunc}
                onPress={(e) => {
                  if (onPress) {
                    onPress(e);
                  }
                }}
              />
            );
          }
          return '';
        })}
      </View>
    );
  };

  return renderEventsByDay();
};

const style = StyleSheet.create({
  eventsByDayContainer: {
    flex: 1,
  },
});
