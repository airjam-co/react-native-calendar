import React from 'react';
import { CalendarBookingAvailability } from '@airjam/types';
interface Props {
    startTime: Date;
    availability?: CalendarBookingAvailability;
    onPress?: (newDate: Date) => void;
}
export declare const CalendarExclusiveBook: ({ availability, startTime, onPress, }: Props) => React.JSX.Element;
export {};
//# sourceMappingURL=CalendarExclusiveBook.d.ts.map