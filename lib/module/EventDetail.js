import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { DEFAULT_DESCRIPTION_LENGTH_CUTOFF, getEventTime } from '@airjam/types';
export const EventDetail = ({
  event,
  descriptionLength
}) => {
  React.useEffect(() => {});
  useFocusEffect(React.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const renderView = () => {
    let description = event.description ? event.description : '';
    const descLimit = descriptionLength || DEFAULT_DESCRIPTION_LENGTH_CUTOFF;
    if (descLimit > 2 && description.length > descLimit) {
      description = description.substring(0, descLimit - 3) + '...';
    }
    return /*#__PURE__*/React.createElement(View, {
      style: [style.eventContainer]
    }, /*#__PURE__*/React.createElement(View, {
      style: style.eventContainerLhs
    }, /*#__PURE__*/React.createElement(Text, {
      style: style.eventTime
    }, getEventTime(event))), /*#__PURE__*/React.createElement(View, {
      style: style.eventContainerRhs
    }, /*#__PURE__*/React.createElement(Text, {
      style: style.eventTitle
    }, event.title), /*#__PURE__*/React.createElement(Text, {
      style: style.eventLocation
    }, event.location), /*#__PURE__*/React.createElement(Text, {
      style: style.eventDescription
    }, description)));
  };
  return renderView();
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
//# sourceMappingURL=EventDetail.js.map