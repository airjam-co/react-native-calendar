import React from 'react';
import { Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { EventDetail } from './EventDetail';
export const GridTimedEventList = ({
  eventList,
  descriptionLength,
  renderEventFunc
}) => {
  React.useEffect(() => {});
  useFocusEffect(React.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const renderGridTimedEvents = () => {
    return /*#__PURE__*/React.createElement(View, null, eventList.filter(e => e.startTimeUtc && e.endTimeUtc && !e.isAllDay).map(function (e, idx) {
      const renderedEvent = renderEventFunc ? renderEventFunc(e, idx) : /*#__PURE__*/React.createElement(EventDetail, {
        key: '' + idx,
        event: e,
        descriptionLength: descriptionLength
      });
      return /*#__PURE__*/React.createElement(Text, {
        key: 'schedule-events-container-' + idx
      }, renderedEvent);
    }));
  };
  return renderGridTimedEvents();
};
//# sourceMappingURL=GridTimedEventList.js.map