import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { BookableSlot } from './BookableSlot';
export const BookableSlotsForADay = ({
  resource,
  startTime,
  timezone,
  onPress
}) => {
  React.useEffect(() => {});
  useFocusEffect(React.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const renderAvailableSlots = () => {
    // filter available times to current day only
    const relevantTimes = resource.availableTimes.filter(et => {
      // true if it's the same locale date as the startTime
      if (!et || !et.startTimeUtc) {
        return false;
      }
      const sTime = new Date(et.startTimeUtc);
      return sTime.getFullYear() === startTime.getUTCFullYear() && sTime.getMonth() === startTime.getMonth() && sTime.getDay() === startTime.getDay();
    });
    if (!relevantTimes.length) {
      return /*#__PURE__*/React.createElement(View, {
        style: style.bookingSlotsContainer
      }, /*#__PURE__*/React.createElement(Text, {
        style: style.emptySectionText
      }, "There are no availabilities for this resource"));
    }
    return /*#__PURE__*/React.createElement(View, {
      style: style.bookingSlotsContainer
    }, relevantTimes.map(function (timeSlot, idx) {
      return /*#__PURE__*/React.createElement(BookableSlot, {
        key: '' + idx,
        resource: resource,
        slot: timeSlot,
        timezone: timezone.toString(),
        onPress: dialogResource => {
          if (onPress) {
            onPress(dialogResource);
          }
        }
      });
    }));
  };
  return renderAvailableSlots();
};
const style = StyleSheet.create({
  emptySectionText: {
    textAlign: 'center',
    color: '#999999'
  },
  resourceSlotButton: {
    width: '80%',
    margin: 5,
    alignSelf: 'center'
  },
  bookingSlotsContainer: {
    marginBottom: 10,
    marginTop: 10
  }
});
//# sourceMappingURL=BookableSlotsForADay.js.map