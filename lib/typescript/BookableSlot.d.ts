import React from 'react';
import type { BookingResource, TimeRange } from '@airjam/types';
import type { BookingRequestResource } from './BookingRequestResource';
interface Props {
    resource: BookingResource;
    slot: TimeRange;
    key?: string;
    descriptionLength?: number;
    timezone: string;
    onPress?: (dialogResource: BookingRequestResource) => void;
}
export declare const BookableSlot: ({ key, resource, slot, timezone, onPress, }: Props) => React.JSX.Element;
export {};
//# sourceMappingURL=BookableSlot.d.ts.map