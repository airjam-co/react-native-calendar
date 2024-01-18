import React from 'react';
import type { BookingResource } from '@airjam/types';
import type { BookingRequestResource } from './BookingRequestResource';
interface Props {
    resource: BookingResource;
    timezone: string;
    startTime: Date;
    onPress?: (dialogResource: BookingRequestResource) => void;
}
export declare const BookableSlotsForADay: ({ resource, startTime, timezone, onPress, }: Props) => React.JSX.Element;
export {};
//# sourceMappingURL=BookableSlotsForADay.d.ts.map