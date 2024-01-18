import React from 'react';
import type { BookableEvent, CalendarEvent } from '@airjam/types';
interface Props {
    eventList: CalendarEvent[] | BookableEvent[];
    descriptionLength?: number;
    onPress?: (event: CalendarEvent | BookableEvent) => void;
    renderEventFunc?: (event: CalendarEvent | BookableEvent, index: number) => React.JSX.Element;
}
export declare const EventDetailList: ({ eventList, onPress, descriptionLength, renderEventFunc, }: Props) => React.JSX.Element;
export {};
//# sourceMappingURL=EventDetailList.d.ts.map