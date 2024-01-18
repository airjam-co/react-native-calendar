import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  DEFAULT_DESCRIPTION_LENGTH_CUTOFF,
  EventReservation,
  formatReservationTimeFrame,
} from '@airjam/types';

interface Props {
  reservation: EventReservation;
  uniqueKey?: string;
  descriptionLength?: number;
  onPress?: (event: EventReservation, key?: string) => void;
}

export const ReservationDetail = ({
  reservation,
  uniqueKey,
  descriptionLength,
  onPress,
}: Props) => {
  React.useEffect(() => {});

  useFocusEffect(
    React.useCallback(() => {
      return; // happens when this view is unfocused
    }, [])
  );

  const pressableReservation = () => {
    return (
      <TouchableOpacity
        key={uniqueKey}
        onPress={() => {
          if (onPress) {
            onPress(reservation, uniqueKey);
          }
        }}
      >
        {renderDetail()}
      </TouchableOpacity>
    );
  };

  const renderDetail = () => {
    let note = reservation.notes ? reservation.notes : '';
    const descLimit = descriptionLength || DEFAULT_DESCRIPTION_LENGTH_CUTOFF;
    if (descLimit > 2 && note.length > descLimit) {
      note = note.substring(0, descLimit - 3) + '...';
    }
    return (
      <View style={[style.eventContainer]}>
        <View style={style.eventContainerLhs}>
          <Text style={style.eventTime}>
            {formatReservationTimeFrame(reservation)}
          </Text>
        </View>
        <View style={style.eventContainerRhs}>
          <Text style={style.eventTitle}>{reservation.title}</Text>
          <Text style={style.eventLocation}>{reservation.location}</Text>
          <Text style={style.eventDescription}>{note}</Text>
        </View>
      </View>
    );
  };

  if (onPress) {
    return pressableReservation();
  }
  return renderDetail();
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
