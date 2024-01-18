import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { BookingResource, TimeRange } from '@airjam/types';
import type { BookingRequestResource } from './BookingRequestResource';
import { BookableSlot } from './BookableSlot';

interface Props {
  resource: BookingResource;
  timezone: string;
  startTime: Date;
  onPress?: (dialogResource: BookingRequestResource) => void;
}

export const BookableSlotsForADay = ({
  resource,
  startTime,
  timezone,
  onPress,
}: Props) => {
  React.useEffect(() => {});

  useFocusEffect(
    React.useCallback(() => {
      return; // happens when this view is unfocused
    }, [])
  );

  const renderAvailableSlots = () => {
    // filter available times to current day only
    const relevantTimes: TimeRange[] = resource.availableTimes.filter((et) => {
      // true if it's the same locale date as the startTime
      if (!et || !et.startTimeUtc) {
        return false;
      }
      const sTime = new Date(et.startTimeUtc);
      return (
        sTime.getFullYear() === startTime.getUTCFullYear() &&
        sTime.getMonth() === startTime.getMonth() &&
        sTime.getDay() === startTime.getDay()
      );
    });
    if (!relevantTimes.length) {
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
        {relevantTimes.map(function (timeSlot, idx) {
          return (
            <BookableSlot
              key={'' + idx}
              resource={resource}
              slot={timeSlot}
              timezone={timezone.toString()}
              onPress={(dialogResource) => {
                if (onPress) {
                  onPress(dialogResource);
                }
              }}
            />
          );
        })}
      </View>
    );
  };

  return renderAvailableSlots();
};

const style = StyleSheet.create({
  emptySectionText: {
    textAlign: 'center',
    color: '#999999',
  },
  resourceSlotButton: {
    width: '80%',
    margin: 5,
    alignSelf: 'center',
  },
  bookingSlotsContainer: {
    marginBottom: 10,
    marginTop: 10,
  },
});
