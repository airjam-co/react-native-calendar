import React from 'react';
import type { EventReservation } from '@airjam/types';
interface Props {
    reservation: EventReservation;
    onClose?: () => void;
    cancellationClicked?: (reservation: EventReservation) => void;
}
export declare const ViewReservation: ({ reservation, onClose, cancellationClicked, }: Props) => React.JSX.Element;
export {};
//# sourceMappingURL=ViewReservation.d.ts.map