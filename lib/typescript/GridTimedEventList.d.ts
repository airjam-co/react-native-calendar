import React from 'react';
import type { BookableEvent, CalendarEvent } from '@airjam/types';
interface Props {
    eventList: CalendarEvent[] | BookableEvent[];
    descriptionLength?: number;
    renderEventFunc?: (event: CalendarEvent | BookableEvent, index: number) => React.JSX.Element;
}
export declare const GridTimedEventList: ({ eventList, descriptionLength, renderEventFunc, }: Props) => React.JSX.Element;
export {};
//# sourceMappingURL=GridTimedEventList.d.ts.map