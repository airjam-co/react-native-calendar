import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { BookableEvent, CalendarEvent, HOUR_ONLY } from '@airjam/types';
import { GridSingleDayEventList } from './GridSingleDayEventList';
import { GridTimedEventList } from './GridTimedEventList';

interface Props {
  events: CalendarEvent[];
  descriptionLength?: number;
  renderEventFunc?: (
    event: CalendarEvent | BookableEvent,
    index: number
  ) => React.JSX.Element;
}

export const DayCalendarGroupedByLocation = ({
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

  const renderDayCalendarByLocation = () => {
    if (!events || !events.length) {
      return (
        <View>
          <Text style={style.emptySectionText}>No events found</Text>
        </View>
      );
    }

    let earliestStartTime: Date | undefined;
    let latestEndTime: Date | undefined;
    const eventsByLocations: Map<String, CalendarEvent[]> = new Map<
      String,
      CalendarEvent[]
    >();
    if (events && events.length) {
      for (let i = 0; i < events.length; i++) {
        const currentEvent = events[i];
        if (!currentEvent) continue;
        const evaluatingLocation = currentEvent.location
          ? currentEvent.location
          : '';
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
        let locationEvents: CalendarEvent[] = [];
        if (eventsByLocations.has(evaluatingLocation)) {
          locationEvents = eventsByLocations.get(evaluatingLocation)!;
        }
        locationEvents.push(currentEvent);
        eventsByLocations.set(evaluatingLocation, locationEvents);
      }
    }
    const uniqueLocations: String[] = [];
    for (const entry of Array.from(eventsByLocations.entries())) {
      const k = entry[0];
      uniqueLocations.push(k);
    }
    uniqueLocations.sort();
    const earliestStartHour: number = earliestStartTime
      ? earliestStartTime.getHours()
      : 0;
    const latestEndHour: number = latestEndTime ? latestEndTime.getHours() : 23;
    const someArrayWith24Elements = [
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ];
    const someArrayForMapLoop = someArrayWith24Elements.slice(
      earliestStartHour,
      latestEndHour + 1
    );
    // const numScheduleStopsInMinutes: number =
    //   (latestEndHour - earliestStartHour + 1) * 60;
    return (
      <View>
        <View>
          {someArrayForMapLoop.map(function (k, idx) {
            let timeMarkerRenderDate = new Date();
            timeMarkerRenderDate.setHours(idx + earliestStartHour);
            return (
              <Text key={'time-marker-' + idx + k}>
                {timeMarkerRenderDate.toLocaleTimeString([], HOUR_ONLY)}
              </Text>
            );
          })}
        </View>
        <View>
          {uniqueLocations.map(function (k, idx) {
            if (!eventsByLocations.has(k)) {
              return <View key={'location' + idx} />;
            }
            return (
              <View key={'location' + idx}>
                <View>
                  <Text>{k}</Text>
                  <GridSingleDayEventList
                    eventList={eventsByLocations.get(k)!}
                    key={'' + idx}
                    descriptionLength={descriptionLength}
                    renderEventFunc={renderEventFunc}
                  />
                </View>
                <GridTimedEventList
                  eventList={eventsByLocations.get(k)!}
                  key={'' + idx}
                  descriptionLength={descriptionLength}
                  renderEventFunc={renderEventFunc}
                />
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return renderDayCalendarByLocation();
};

const style = StyleSheet.create({
  emptySectionText: {
    textAlign: 'center',
    color: '#999999',
  },
});
