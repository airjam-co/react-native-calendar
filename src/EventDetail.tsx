import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  BookableEvent,
  CalendarEvent,
  DEFAULT_DESCRIPTION_LENGTH_CUTOFF,
  getEventTime,
} from '@airjam/types';

interface Props {
  event: CalendarEvent | BookableEvent;
  descriptionLength?: number;
}

export const EventDetail = ({ event, descriptionLength }: Props) => {
  React.useEffect(() => {});

  useFocusEffect(
    React.useCallback(() => {
      return; // happens when this view is unfocused
    }, [])
  );

  const renderView = () => {
    let description = event.description ? event.description : '';
    const descLimit = descriptionLength || DEFAULT_DESCRIPTION_LENGTH_CUTOFF;
    if (descLimit > 2 && description.length > descLimit) {
      description = description.substring(0, descLimit - 3) + '...';
    }
    return (
      <View style={[style.eventContainer]}>
        <View style={style.eventContainerLhs}>
          <Text style={style.eventTime}>{getEventTime(event)}</Text>
        </View>
        <View style={style.eventContainerRhs}>
          <Text style={style.eventTitle}>{event.title}</Text>
          <Text style={style.eventLocation}>{event.location}</Text>
          <Text style={style.eventDescription}>{description}</Text>
        </View>
      </View>
    );
  };

  return renderView();
};

const style = StyleSheet.create({
  eventContainer: {
    backgroundColor: '#e1e1e1',
    borderRadius: 3,
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 15,
    flexDirection: 'row',
  },
  eventContainerLhs: {
    alignSelf: 'stretch',
    width: '30%',
  },
  eventContainerRhs: {
    marginLeft: 5,
    width: '70%',
  },
  eventTitle: {
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 2,
  },
  eventTime: {
    color: '#777777',
    fontWeight: '400',
  },
  eventLocation: {
    color: '#777777',
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  eventDescription: {
    color: '#777777',
    flexWrap: 'wrap',
    flexShrink: 1,
  },
});
