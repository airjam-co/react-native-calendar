import React from 'react';
import type { CalendarBookingAvailability } from '@airjam/types';
import type { BookingRequestResource } from './BookingRequestResource';
interface Props {
    timezone: string;
    startTime: Date;
    availability: CalendarBookingAvailability | undefined;
    onPress?: (dialogResource: BookingRequestResource) => void;
}
export declare const AvailabilitiesForADay: ({ availability, startTime, timezone, onPress, }: Props) => React.JSX.Element;
export {};
//# sourceMappingURL=AvailabilitiesForADay.d.ts.map