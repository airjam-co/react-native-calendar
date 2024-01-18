import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { BookableEvent, CalendarEvent } from '@airjam/types';
import { EventDetail } from './EventDetail';

interface Props {
  eventList: CalendarEvent[] | BookableEvent[];
  descriptionLength?: number;
  onPress?: (event: CalendarEvent | BookableEvent) => void;
  renderEventFunc?: (
    event: CalendarEvent | BookableEvent,
    index: number
  ) => React.JSX.Element;
}

export const EventDetailList = ({
  eventList,
  onPress,
  descriptionLength,
  renderEventFunc,
}: Props) => {
  React.useEffect(() => {});

  useFocusEffect(
    React.useCallback(() => {
      return; // happens when this view is unfocused
    }, [])
  );

  const pressableEvents = () => {
    return (
      <View style={style.eventsContainer}>
        {eventList.map(function (e, idx) {
          return (
            <TouchableOpacity
              key={'touchable-opacity-events-' + idx}
              onPress={() => {
                if (onPress) {
                  onPress(e);
                }
              }}
            >
              {renderEventDetail(e, idx)}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderEvents = () => {
    return (
      <View style={style.eventsContainer}>
        {eventList.map((e, idx) => renderEventDetail(e, idx))}
      </View>
    );
  };

  const renderEventDetail = (
    event: CalendarEvent | BookableEvent,
    idx: number
  ) => {
    if (renderEventFunc) {
      return renderEventFunc(event, idx);
    }
    return (
      <View>
        <EventDetail
          key={'' + idx}
          event={event}
          descriptionLength={descriptionLength}
        />
      </View>
    );
  };

  if (onPress) {
    return pressableEvents();
  }
  return renderEvents();
};

const style = StyleSheet.create({
  eventsContainer: {
    width: '100%',
    paddingBottom: 5,
  },
});
