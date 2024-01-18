import React from 'react';
import { Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { BookableEvent, CalendarEvent } from '@airjam/types';
import { EventDetail } from './EventDetail';

interface Props {
  eventList: CalendarEvent[] | BookableEvent[];
  descriptionLength?: number;
  renderEventFunc?: (
    event: CalendarEvent | BookableEvent,
    index: number
  ) => React.JSX.Element;
}

export const GridSingleDayEventList = ({
  eventList,
  descriptionLength,
  renderEventFunc,
}: Props) => {
  React.useEffect(() => {});

  useFocusEffect(
    React.useCallback(() => {
      return; // happens when this view is unfocused
    }, [])
  );

  const renderGridAllDayEvents = () => {
    return (
      <View>
        {eventList
          .filter((e) => e.isAllDay)
          .map(function (e, idx) {
            const renderedEvent: React.JSX.Element = renderEventFunc ? (
              renderEventFunc(e, idx)
            ) : (
              <EventDetail
                key={'' + idx}
                event={e}
                descriptionLength={descriptionLength}
              />
            );
            return <Text key={'all-day-events-' + idx}>{renderedEvent}</Text>;
          })}
      </View>
    );
  };

  return renderGridAllDayEvents();
};
