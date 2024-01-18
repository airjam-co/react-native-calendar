import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { EventReservation } from '@airjam/types';
import { Divider } from 'react-native-elements';
import { ReservationDetail } from './ReservationDetail';

interface Props {
  reservations: EventReservation[];
  renderReservationFunc?: (
    event: EventReservation,
    index: number
  ) => React.JSX.Element;
  onPress?: (reservation: EventReservation) => void;
}

export const SingleDayReservationList = ({
  reservations,
  onPress,
  renderReservationFunc,
}: Props) => {
  React.useEffect(() => {});

  useFocusEffect(
    React.useCallback(() => {
      return; // happens when this view is unfocused
    }, [])
  );

  const renderReservationsByDay = () => {
    const reservationsByDays: Map<number, EventReservation[]> = new Map<
      number,
      EventReservation[]
    >();
    for (let i = 0; i < reservations.length; i++) {
      const currentReservation = reservations[i];
      if (currentReservation && currentReservation.startTimeUtc) {
        const startDateForEvent = new Date(currentReservation.startTimeUtc);
        const dayToUse = new Date(
          startDateForEvent.getFullYear(),
          startDateForEvent.getMonth(),
          startDateForEvent.getDate()
        );
        const dayIdx = dayToUse.getTime() / 1000;
        let pushedDayReservations: EventReservation[] = [];
        if (reservationsByDays.has(dayIdx)) {
          pushedDayReservations = reservationsByDays.get(dayIdx)!;
        }
        pushedDayReservations.push(currentReservation);
        reservationsByDays.set(dayIdx, pushedDayReservations);
      }
    }
    const keys: number[] = [];
    for (const entry of Array.from(reservationsByDays.entries())) {
      const k = entry[0];
      keys.push(k);
    }
    keys.sort();
    return (
      <View style={style.eventsByDayContainer}>
        {keys.map(function (k) {
          if (reservationsByDays.has(k)) {
            return renderReservationsGroupedByDay(reservationsByDays.get(k), k);
          }
          return '';
        })}
      </View>
    );
  };

  const renderReservationsGroupedByDay = (
    renderingReservations: EventReservation[] | undefined,
    dayTimestamp: number
  ) => {
    if (
      !renderingReservations ||
      !renderingReservations.length ||
      !renderingReservations[0] ||
      !renderingReservations[0].startTimeUtc
    ) {
      return '';
    }
    const startDay = new Date(renderingReservations[0].startTimeUtc);
    const dayToUse = new Date(
      startDay.getFullYear(),
      startDay.getMonth(),
      startDay.getDate()
    );
    return (
      <View key={'g' + dayTimestamp}>
        <Text style={style.dayGroupLabel}>{dayToUse.toDateString()}</Text>
        <View style={style.dayGroupContainer}>
          {renderReservations(renderingReservations as EventReservation[])}
        </View>
        <Divider width={1} />
      </View>
    );
  };

  const renderReservations = (renderingEvents: EventReservation[]) => {
    return (
      <View style={style.eventsContainer}>
        {renderingEvents.map(function (e, idx) {
          if (renderReservationFunc) {
            return renderReservationFunc(e, idx);
          }
          return (
            <ReservationDetail
              uniqueKey={'' + idx}
              key={'detail-' + idx}
              reservation={e}
              onPress={(res) => {
                if (onPress) {
                  onPress(res);
                }
              }}
            />
          );
        })}
      </View>
    );
  };

  return renderReservationsByDay();
};

const style = StyleSheet.create({
  eventsByDayContainer: {
    flex: 1,
  },
  eventsContainer: {
    width: '100%',
    paddingBottom: 5,
  },
  dayGroupLabel: {
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 14,
    color: '#777777',
  },
  dayGroupContainer: {
    flex: 1,
  },
});
