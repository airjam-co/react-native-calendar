import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { CalendarBookingAvailability, getDateInLocalTime } from '@airjam/types';
import { CalendarView } from './CalendarView';

interface Props {
  startTime: Date;
  availability?: CalendarBookingAvailability;

  onPress?: (newDate: Date) => void;
}

export const CalendarBook = ({ availability, startTime, onPress }: Props) => {
  React.useEffect(() => {});

  useFocusEffect(
    React.useCallback(() => {
      return; // happens when this view is unfocused
    }, [])
  );

  const renderCalendarBook = () => {
    const selectedTime: string = getDateInLocalTime(startTime);
    // TODO ---> group all available times by day and count
    const availableCountByMonthDays: Map<string, number> = new Map<
      string,
      number
    >();
    if (availability && availability.resources) {
      availability.resources.forEach((resource) => {
        resource.availableTimes.forEach((at) => {
          if (at.startTimeUtc) {
            const sTime = new Date(at.startTimeUtc);
            const idx = getDateInLocalTime(sTime);
            const currentCount = availableCountByMonthDays.has(idx)
              ? availableCountByMonthDays.get(idx)!
              : 0;
            availableCountByMonthDays.set(idx, currentCount + 1);
          }
        });
      });
    }
    const markings = {
      [selectedTime]: { marked: false, selected: true, selectedColor: 'blue' },
    };
    availableCountByMonthDays.forEach((count, monthDay) => {
      if (count < 0) {
        console.log('no way');
      }
      if (selectedTime !== monthDay) {
        markings[monthDay] = {
          marked: true,
          selectedColor: 'red',
          selected: false,
        };
      }
    });

    return (
      <CalendarView
        markedDates={markings}
        onPress={(pressedDates) => {
          if (onPress) {
            onPress(pressedDates);
          }
        }}
      />
    );
  };

  return renderCalendarBook();
};
