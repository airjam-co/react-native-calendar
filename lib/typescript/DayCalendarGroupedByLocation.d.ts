import React from 'react';
import { BookableEvent, CalendarEvent } from '@airjam/types';
interface Props {
    events: CalendarEvent[];
    descriptionLength?: number;
    renderEventFunc?: (event: CalendarEvent | BookableEvent, index: number) => React.JSX.Element;
}
export declare const DayCalendarGroupedByLocation: ({ events, descriptionLength, renderEventFunc, }: Props) => React.JSX.Element;
export {};
//# sourceMappingURL=DayCalendarGroupedByLocation.d.ts.map