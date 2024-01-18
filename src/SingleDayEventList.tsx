import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { BookableEvent, CalendarEvent } from '@airjam/types';
import { EventDetailList } from './EventDetailList';
import { Divider } from 'react-native-elements';

interface Props {
  eventList: CalendarEvent[] | BookableEvent[];
  descriptionLength?: number;
  renderEventFunc?: (
    event: CalendarEvent | BookableEvent,
    index: number
  ) => React.JSX.Element;
  onPress?: (event: CalendarEvent | BookableEvent) => void;
}

export const SingleDayEventList = ({
  eventList,
  descriptionLength,
  onPress,
  renderEventFunc,
}: Props) => {
  React.useEffect(() => {});

  useFocusEffect(
    React.useCallback(() => {
      return; // happens when this view is unfocused
    }, [])
  );

  const renderEventGroupedByDay = (): React.JSX.Element => {
    if (!eventList.length || !eventList[0] || !eventList[0].startTimeUtc) {
      return <View />;
    }
    const startDay = new Date(eventList[0].startTimeUtc);
    let dayToUse = new Date(
      startDay.getFullYear(),
      startDay.getMonth(),
      startDay.getDate()
    );
    if (eventList[0].isAllDay) {
      dayToUse = new Date(
        startDay.getUTCFullYear(),
        startDay.getUTCMonth(),
        startDay.getUTCDate()
      );
    }
    return (
      <View>
        <Text style={style.dayGroupLabel}>{dayToUse.toDateString()}</Text>
        <View style={style.dayGroupContainer}>
          <EventDetailList
            eventList={eventList as CalendarEvent[]}
            renderEventFunc={renderEventFunc}
            descriptionLength={descriptionLength}
            onPress={(e) => {
              if (onPress) {
                onPress(e);
              }
            }}
          />
        </View>
        <Divider width={1} />
      </View>
    );
  };

  return renderEventGroupedByDay();
};

const style = StyleSheet.create({
  dayGroupLabel: {
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 14,
    color: '#777777',
  },
  dayGroupContainer: {
    flex: 1,
  },
});
