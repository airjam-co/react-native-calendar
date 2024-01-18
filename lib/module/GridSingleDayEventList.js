import React from 'react';
import { Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { EventDetail } from './EventDetail';
export const GridSingleDayEventList = ({
  eventList,
  descriptionLength,
  renderEventFunc
}) => {
  React.useEffect(() => {});
  useFocusEffect(React.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const renderGridAllDayEvents = () => {
    return /*#__PURE__*/React.createElement(View, null, eventList.filter(e => e.isAllDay).map(function (e, idx) {
      const renderedEvent = renderEventFunc ? renderEventFunc(e, idx) : /*#__PURE__*/React.createElement(EventDetail, {
        key: '' + idx,
        event: e,
        descriptionLength: descriptionLength
      });
      return /*#__PURE__*/React.createElement(Text, {
        key: 'all-day-events-' + idx
      }, renderedEvent);
    }));
  };
  return renderGridAllDayEvents();
};
//# sourceMappingURL=GridSingleDayEventList.js.map