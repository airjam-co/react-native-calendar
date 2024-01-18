import type {
  BookableEvent,
  CalendarEvent,
  CalendarViewType,
  EventReservation,
} from '@airjam/types';

export interface CalendarProps {
  id: string;
  authToken?: string;
  host?: string;
  location?: string;
  showDate?: Date;
  showEndDate?: Date;
  viewAs?: CalendarViewType;
  darkMode: boolean;
  descriptionLength?: number;
  renderEventFunc?: (
    event: CalendarEvent | BookableEvent,
    index: number
  ) => React.JSX.Element;
  renderReservationFunc?: (
    event: EventReservation,
    index: number
  ) => React.JSX.Element;
}
