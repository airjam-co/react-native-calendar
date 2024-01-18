import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { BookableSlotsForADay } from './BookableSlotsForADay';
export const AvailabilitiesForADay = ({
  availability,
  startTime,
  timezone,
  onPress
}) => {
  React.useEffect(() => {});
  useFocusEffect(React.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const renderAvailableTimes = () => {
    if (!availability || !availability.resources) {
      return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, {
        style: style.emptySectionText
      }, "There are no availabilities for the given time frame"));
    }
    return /*#__PURE__*/React.createElement(View, null, availability.resources.map(function (resource, idx) {
      return /*#__PURE__*/React.createElement(View, {
        key: 'availability-resource-container-' + idx
      }, /*#__PURE__*/React.createElement(Text, {
        style: style.resourceName
      }, resource.name), /*#__PURE__*/React.createElement(BookableSlotsForADay, {
        key: 'available-slots-' + resource._id,
        resource: resource,
        timezone: timezone.toString(),
        startTime: startTime,
        onPress: dialogResource => {
          if (onPress) {
            onPress(dialogResource);
          }
        }
      }));
    }));
  };
  return renderAvailableTimes();
};
const style = StyleSheet.create({
  resourceName: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#999999',
    marginTop: 10
  },
  emptySectionText: {
    textAlign: 'center',
    color: '#999999'
  }
});
//# sourceMappingURL=AvailabilitiesForADay.js.map