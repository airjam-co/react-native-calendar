import React from 'react';
import type { BookableEvent, BookingResource, CalendarEvent } from '@airjam/types';
interface Props {
    resource: BookingResource;
    startTime: Date;
    descriptionLength?: number;
    renderEventFunc?: (event: CalendarEvent | BookableEvent, index: number) => React.JSX.Element;
    onPress?: (event: CalendarEvent | BookableEvent) => void;
}
export declare const BookableEventList: ({ resource, startTime, descriptionLength, onPress, renderEventFunc, }: Props) => React.JSX.Element;
export {};
//# sourceMappingURL=BookableEventList.d.ts.map