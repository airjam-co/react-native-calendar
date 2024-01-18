import React from 'react';
import { CalendarBookingAvailability } from '@airjam/types';
interface Props {
    startTime: Date;
    availability?: CalendarBookingAvailability;
    onPress?: (newDate: Date) => void;
}
export declare const CalendarBook: ({ availability, startTime, onPress }: Props) => React.JSX.Element;
export {};
//# sourceMappingURL=CalendarBook.d.ts.map