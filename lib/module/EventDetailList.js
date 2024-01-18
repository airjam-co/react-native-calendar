import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { EventDetail } from './EventDetail';
export const EventDetailList = ({
  eventList,
  onPress,
  descriptionLength,
  renderEventFunc
}) => {
  React.useEffect(() => {});
  useFocusEffect(React.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const pressableEvents = () => {
    return /*#__PURE__*/React.createElement(View, {
      style: style.eventsContainer
    }, eventList.map(function (e, idx) {
      return /*#__PURE__*/React.createElement(TouchableOpacity, {
        key: 'touchable-opacity-events-' + idx,
        onPress: () => {
          if (onPress) {
            onPress(e);
          }
        }
      }, renderEventDetail(e, idx));
    }));
  };
  const renderEvents = () => {
    return /*#__PURE__*/React.createElement(View, {
      style: style.eventsContainer
    }, eventList.map((e, idx) => renderEventDetail(e, idx)));
  };
  const renderEventDetail = (event, idx) => {
    if (renderEventFunc) {
      return renderEventFunc(event, idx);
    }
    return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(EventDetail, {
      key: '' + idx,
      event: event,
      descriptionLength: descriptionLength
    }));
  };
  if (onPress) {
    return pressableEvents();
  }
  return renderEvents();
};
const style = StyleSheet.create({
  eventsContainer: {
    width: '100%',
    paddingBottom: 5
  }
});
//# sourceMappingURL=EventDetailList.js.map