import React from 'react';
import type { BookableEvent } from '@airjam/types';
import type { BookingRequestResource } from './BookingRequestResource';
interface Props {
    timezone: string;
    resourceOrEvent: BookingRequestResource | BookableEvent;
    authToken?: string;
    name: string;
    email: string;
    notes: string;
    onClose?: () => void;
    submitPressed?: (resourceOrEvent: BookingRequestResource | BookableEvent) => void;
    onNameChanged?: (newName: string) => void;
    onEmailChanged?: (newEmail: string) => void;
    onNotesChanged?: (newNotes: string) => void;
}
export declare const ReservationModal: ({ timezone, resourceOrEvent, authToken, name, email, notes, onClose, submitPressed, onNameChanged, onEmailChanged, onNotesChanged, }: Props) => React.JSX.Element;
export {};
//# sourceMappingURL=ReservationModal.d.ts.map