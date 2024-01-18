import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { EventDetailList } from './EventDetailList';
import { Divider } from 'react-native-elements';
export const SingleDayEventList = ({
  eventList,
  descriptionLength,
  onPress,
  renderEventFunc
}) => {
  React.useEffect(() => {});
  useFocusEffect(React.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const renderEventGroupedByDay = () => {
    if (!eventList.length || !eventList[0] || !eventList[0].startTimeUtc) {
      return /*#__PURE__*/React.createElement(View, null);
    }
    const startDay = new Date(eventList[0].startTimeUtc);
    let dayToUse = new Date(startDay.getFullYear(), startDay.getMonth(), startDay.getDate());
    if (eventList[0].isAllDay) {
      dayToUse = new Date(startDay.getUTCFullYear(), startDay.getUTCMonth(), startDay.getUTCDate());
    }
    return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, {
      style: style.dayGroupLabel
    }, dayToUse.toDateString()), /*#__PURE__*/React.createElement(View, {
      style: style.dayGroupContainer
    }, /*#__PURE__*/React.createElement(EventDetailList, {
      eventList: eventList,
      renderEventFunc: renderEventFunc,
      descriptionLength: descriptionLength,
      onPress: e => {
        if (onPress) {
          onPress(e);
        }
      }
    })), /*#__PURE__*/React.createElement(Divider, {
      width: 1
    }));
  };
  return renderEventGroupedByDay();
};
const style = StyleSheet.create({
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
//# sourceMappingURL=SingleDayEventList.js.map