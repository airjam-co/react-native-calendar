import React from 'react';
import type { BookableEvent, CalendarEvent } from '@airjam/types';
interface Props {
    events: CalendarEvent[];
    descriptionLength?: number;
    onPress?: (event: CalendarEvent | BookableEvent) => void;
    renderEventFunc?: (event: CalendarEvent | BookableEvent, index: number) => React.JSX.Element;
}
export declare const EventListGroupedByDay: ({ onPress, events, descriptionLength, renderEventFunc, }: Props) => React.JSX.Element;
export {};
//# sourceMappingURL=EventListGroupedByDay.d.ts.map