import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { DateData, Calendar } from 'react-native-calendars';
import type { MarkedDates } from 'react-native-calendars/src/types';

interface Props {
  markedDates: MarkedDates;
  onPress?: (newDate: Date) => void;
}

export const CalendarView = ({ markedDates, onPress }: Props) => {
  React.useEffect(() => {});

  useFocusEffect(
    React.useCallback(() => {
      return; // happens when this view is unfocused
    }, [])
  );

  return (
    <Calendar
      onDayPress={(pressedDate: DateData) => {
        if (onPress) {
          onPress(
            new Date(
              pressedDate.year,
              pressedDate.month - 1,
              pressedDate.day,
              0,
              0,
              0,
              0
            )
          );
        }
      }}
      markedDates={markedDates}
    />
  );
};
