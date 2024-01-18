import { BookableEvent, CalendarBookingAvailability, CalendarEvent, EventReservation, GetEventsDuration } from '@airjam/types';
import type { BookingRequestInternal } from './BookingRequestInternal';
import type { BookingResponse } from './BookingResponse';
import type { BookingRequestResource } from './BookingRequestResource';
import type { BookingResultPage } from './BookingResultPage';
export declare const fetchMyReservations: (componentId: string, startTime: Date, endTime?: Date | undefined, authToken?: string, host?: string) => Promise<EventReservation[] | undefined>;
export declare const fetchCalendarView: (componentId: string, queryStartTime: Date, queryEndTime?: Date | undefined, host?: string, authToken?: string, location?: string) => Promise<CalendarEvent[] | undefined>;
export declare const fetchReservationTerms: (componentId: string, queryStartTime: Date, queryEndTime?: Date | undefined, host?: string, authToken?: string, getDuration?: GetEventsDuration) => Promise<CalendarBookingAvailability | undefined>;
export declare const bookReservation: (componentId: string, request: BookingRequestInternal, host?: string, authToken?: string) => Promise<BookingResponse | undefined>;
export declare const deleteReservation: (reservationId: string, host?: string, authToken?: string) => Promise<boolean>;
export declare const submitBookReservation: (componentId: string, resourceOrEvent: BookingRequestResource | BookableEvent, host?: string, authToken?: string, name?: string, email?: string, notes?: string) => Promise<BookingResultPage>;
//# sourceMappingURL=thunk.d.ts.map