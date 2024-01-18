import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Divider } from 'react-native-elements';
import { ReservationDetail } from './ReservationDetail';
export const SingleDayReservationList = ({
  reservations,
  onPress,
  renderReservationFunc
}) => {
  React.useEffect(() => {});
  useFocusEffect(React.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const renderReservationsByDay = () => {
    const reservationsByDays = new Map();
    for (let i = 0; i < reservations.length; i++) {
      const currentReservation = reservations[i];
      if (currentReservation && currentReservation.startTimeUtc) {
        const startDateForEvent = new Date(currentReservation.startTimeUtc);
        const dayToUse = new Date(startDateForEvent.getFullYear(), startDateForEvent.getMonth(), startDateForEvent.getDate());
        const dayIdx = dayToUse.getTime() / 1000;
        let pushedDayReservations = [];
        if (reservationsByDays.has(dayIdx)) {
          pushedDayReservations = reservationsByDays.get(dayIdx);
        }
        pushedDayReservations.push(currentReservation);
        reservationsByDays.set(dayIdx, pushedDayReservations);
      }
    }
    const keys = [];
    for (const entry of Array.from(reservationsByDays.entries())) {
      const k = entry[0];
      keys.push(k);
    }
    keys.sort();
    return /*#__PURE__*/React.createElement(View, {
      style: style.eventsByDayContainer
    }, keys.map(function (k) {
      if (reservationsByDays.has(k)) {
        return renderReservationsGroupedByDay(reservationsByDays.get(k), k);
      }
      return '';
    }));
  };
  const renderReservationsGroupedByDay = (renderingReservations, dayTimestamp) => {
    if (!renderingReservations || !renderingReservations.length || !renderingReservations[0] || !renderingReservations[0].startTimeUtc) {
      return '';
    }
    const startDay = new Date(renderingReservations[0].startTimeUtc);
    const dayToUse = new Date(startDay.getFullYear(), startDay.getMonth(), startDay.getDate());
    return /*#__PURE__*/React.createElement(View, {
      key: 'g' + dayTimestamp
    }, /*#__PURE__*/React.createElement(Text, {
      style: style.dayGroupLabel
    }, dayToUse.toDateString()), /*#__PURE__*/React.createElement(View, {
      style: style.dayGroupContainer
    }, renderReservations(renderingReservations)), /*#__PURE__*/React.createElement(Divider, {
      width: 1
    }));
  };
  const renderReservations = renderingEvents => {
    return /*#__PURE__*/React.createElement(View, {
      style: style.eventsContainer
    }, renderingEvents.map(function (e, idx) {
      if (renderReservationFunc) {
        return renderReservationFunc(e, idx);
      }
      return /*#__PURE__*/React.createElement(ReservationDetail, {
        uniqueKey: '' + idx,
        key: 'detail-' + idx,
        reservation: e,
        onPress: res => {
          if (onPress) {
            onPress(res);
          }
        }
      });
    }));
  };
  return renderReservationsByDay();
};
const style = StyleSheet.create({
  eventsByDayContainer: {
    flex: 1
  },
  eventsContainer: {
    width: '100%',
    paddingBottom: 5
  },
  dayGroupLabel: {
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 14,
    color: '#777777'
  },
  dayGroupContainer: {
    flex: 1
  }
});
//# sourceMappingURL=SingleDayReservationList.js.map