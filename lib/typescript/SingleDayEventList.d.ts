import React from 'react';
import type { BookableEvent, CalendarEvent } from '@airjam/types';
interface Props {
    eventList: CalendarEvent[] | BookableEvent[];
    descriptionLength?: number;
    renderEventFunc?: (event: CalendarEvent | BookableEvent, index: number) => React.JSX.Element;
    onPress?: (event: CalendarEvent | BookableEvent) => void;
}
export declare const SingleDayEventList: ({ eventList, descriptionLength, onPress, renderEventFunc, }: Props) => React.JSX.Element;
export {};
//# sourceMappingURL=SingleDayEventList.d.ts.map