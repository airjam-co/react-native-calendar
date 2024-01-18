import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
export const CalendarView = ({
  markedDates,
  onPress
}) => {
  React.useEffect(() => {});
  useFocusEffect(React.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  return /*#__PURE__*/React.createElement(Calendar, {
    onDayPress: pressedDate => {
      if (onPress) {
        onPress(new Date(pressedDate.year, pressedDate.month - 1, pressedDate.day, 0, 0, 0, 0));
      }
    },
    markedDates: markedDates
  });
};
//# sourceMappingURL=CalendarView.js.map