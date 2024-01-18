import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { DEFAULT_DESCRIPTION_LENGTH_CUTOFF, formatReservationTimeFrame } from '@airjam/types';
export const ReservationDetail = ({
  reservation,
  uniqueKey,
  descriptionLength,
  onPress
}) => {
  React.useEffect(() => {});
  useFocusEffect(React.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const pressableReservation = () => {
    return /*#__PURE__*/React.createElement(TouchableOpacity, {
      key: uniqueKey,
      onPress: () => {
        if (onPress) {
          onPress(reservation, uniqueKey);
        }
      }
    }, renderDetail());
  };
  const renderDetail = () => {
    let note = reservation.notes ? reservation.notes : '';
    const descLimit = descriptionLength || DEFAULT_DESCRIPTION_LENGTH_CUTOFF;
    if (descLimit > 2 && note.length > descLimit) {
      note = note.substring(0, descLimit - 3) + '...';
    }
    return /*#__PURE__*/React.createElement(View, {
      style: [style.eventContainer]
    }, /*#__PURE__*/React.createElement(View, {
      style: style.eventContainerLhs
    }, /*#__PURE__*/React.createElement(Text, {
      style: style.eventTime
    }, formatReservationTimeFrame(reservation))), /*#__PURE__*/React.createElement(View, {
      style: style.eventContainerRhs
    }, /*#__PURE__*/React.createElement(Text, {
      style: style.eventTitle
    }, reservation.title), /*#__PURE__*/React.createElement(Text, {
      style: style.eventLocation
    }, reservation.location), /*#__PURE__*/React.createElement(Text, {
      style: style.eventDescription
    }, note)));
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
    flexDirection: 'row'
  },
  eventContainerLhs: {
    alignSelf: 'stretch',
    width: '30%'
  },
  eventContainerRhs: {
    marginLeft: 5,
    width: '70%'
  },
  eventTitle: {
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 2
  },
  eventTime: {
    color: '#777777',
    fontWeight: '400'
  },
  eventLocation: {
    color: '#777777',
    flexWrap: 'wrap',
    flexShrink: 1
  },
  eventDescription: {
    color: '#777777',
    flexWrap: 'wrap',
    flexShrink: 1
  }
});
//# sourceMappingURL=ReservationDetail.js.map