import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
const showTime = (timeToShow, timezone) => {
  return timeToShow.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: timezone.toString()
  });
};
export const BookableSlot = ({
  key,
  resource,
  slot,
  timezone,
  onPress
}) => {
  React.useEffect(() => {});
  useFocusEffect(React.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const renderBookableSlot = () => {
    if (!slot.startTimeUtc || !slot.endTimeUtc) {
      return /*#__PURE__*/React.createElement(View, {
        key: key
      });
    }
    const startTimeUtc = new Date(slot.startTimeUtc);
    const dialogResource = {
      resource: resource,
      startTimeUtc: startTimeUtc,
      endTimeUtc: slot.endTimeUtc
    };
    return /*#__PURE__*/React.createElement(View, {
      key: key
    }, /*#__PURE__*/React.createElement(Button, {
      style: style.resourceSlotButton,
      onPress: () => {
        if (onPress) {
          onPress(dialogResource);
        }
      },
      title: showTime(startTimeUtc, timezone)
    }));
  };
  return renderBookableSlot();
};
const style = StyleSheet.create({
  resourceSlotButton: {
    width: '80%',
    margin: 5,
    alignSelf: 'center'
  }
});
//# sourceMappingURL=BookableSlot.js.map