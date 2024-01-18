import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { EventDetailList } from './EventDetailList';
export const BookableEventList = ({
  resource,
  startTime,
  descriptionLength,
  onPress,
  renderEventFunc
}) => {
  React.useEffect(() => {});
  useFocusEffect(React.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const renderBookableEvents = () => {
    // filter available times to current day only
    const currentDayEvents = resource.availableEvents.filter(ae => {
      // true if it's the same locale date as the startTime
      if (!ae || !ae.startTimeUtc) {
        return false;
      }
      const sTime = new Date(ae.startTimeUtc);
      return sTime.getFullYear() === startTime.getFullYear() && sTime.getMonth() === startTime.getMonth() && sTime.getDate() === startTime.getDate();
    });
    if (!currentDayEvents.length) {
      return /*#__PURE__*/React.createElement(View, {
        style: style.bookingSlotsContainer
      }, /*#__PURE__*/React.createElement(Text, {
        style: style.emptySectionText
      }, "There are no availabilities for this resource"));
    }
    return /*#__PURE__*/React.createElement(View, {
      style: style.bookingSlotsContainer
    }, /*#__PURE__*/React.createElement(EventDetailList, {
      eventList: currentDayEvents,
      renderEventFunc: renderEventFunc,
      descriptionLength: descriptionLength,
      onPress: e => {
        if (onPress) {
          onPress(e);
        }
      }
    }));
  };
  return renderBookableEvents();
};
const style = StyleSheet.create({
  emptySectionText: {
    textAlign: 'center',
    color: '#999999'
  },
  bookingSlotsContainer: {
    marginBottom: 10,
    marginTop: 10
  }
});
//# sourceMappingURL=BookableEventList.js.map