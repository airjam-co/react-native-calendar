import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type {
  BookableEvent,
  BookingResource,
  CalendarEvent,
} from '@airjam/types';
import { EventDetailList } from './EventDetailList';

interface Props {
  resource: BookingResource;
  startTime: Date;
  descriptionLength?: number;
  renderEventFunc?: (
    event: CalendarEvent | BookableEvent,
    index: number
  ) => React.JSX.Element;
  onPress?: (event: CalendarEvent | BookableEvent) => void;
}

export const BookableEventList = ({
  resource,
  startTime,
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

  const renderBookableEvents = () => {
    // filter available times to current day only
    const currentDayEvents: BookableEvent[] = resource.availableEvents.filter(
      (ae) => {
        // true if it's the same locale date as the startTime
        if (!ae || !ae.startTimeUtc) {
          return false;
        }
        const sTime = new Date(ae.startTimeUtc);
        return (
          sTime.getFullYear() === startTime.getFullYear() &&
          sTime.getMonth() === startTime.getMonth() &&
          sTime.getDate() === startTime.getDate()
        );
      }
    );

    if (!currentDayEvents.length) {
      return (
        <View style={style.bookingSlotsContainer}>
          <Text style={style.emptySectionText}>
            There are no availabilities for this resource
          </Text>
        </View>
      );
    }
    return (
      <View style={style.bookingSlotsContainer}>
        <EventDetailList
          eventList={currentDayEvents}
          renderEventFunc={renderEventFunc}
          descriptionLength={descriptionLength}
          onPress={(e) => {
            if (onPress) {
              onPress(e);
            }
          }}
        />
      </View>
    );
  };

  return renderBookableEvents();
};

const style = StyleSheet.create({
  emptySectionText: {
    textAlign: 'center',
    color: '#999999',
  },
  bookingSlotsContainer: {
    marginBottom: 10,
    marginTop: 10,
  },
});
