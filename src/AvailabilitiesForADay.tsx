import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { CalendarBookingAvailability } from '@airjam/types';
import type { BookingRequestResource } from './BookingRequestResource';
import { BookableSlotsForADay } from './BookableSlotsForADay';

interface Props {
  timezone: string;
  startTime: Date;
  availability: CalendarBookingAvailability | undefined;
  onPress?: (dialogResource: BookingRequestResource) => void;
}

export const AvailabilitiesForADay = ({
  availability,
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

  const renderAvailableTimes = () => {
    if (!availability || !availability.resources) {
      return (
        <View>
          <Text style={style.emptySectionText}>
            There are no availabilities for the given time frame
          </Text>
        </View>
      );
    }
    return (
      <View>
        {availability.resources.map(function (resource, idx) {
          return (
            <View key={'availability-resource-container-' + idx}>
              <Text style={style.resourceName}>{resource.name}</Text>
              <BookableSlotsForADay
                key={'available-slots-' + resource._id}
                resource={resource}
                timezone={timezone.toString()}
                startTime={startTime}
                onPress={(dialogResource) => {
                  if (onPress) {
                    onPress(dialogResource);
                  }
                }}
              />
            </View>
          );
        })}
      </View>
    );
  };

  return renderAvailableTimes();
};

const style = StyleSheet.create({
  resourceName: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#999999',
    marginTop: 10,
  },
  emptySectionText: {
    textAlign: 'center',
    color: '#999999',
  },
});
