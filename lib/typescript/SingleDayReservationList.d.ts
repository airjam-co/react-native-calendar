import React from 'react';
import type { EventReservation } from '@airjam/types';
interface Props {
    reservations: EventReservation[];
    renderReservationFunc?: (event: EventReservation, index: number) => React.JSX.Element;
    onPress?: (reservation: EventReservation) => void;
}
export declare const SingleDayReservationList: ({ reservations, onPress, renderReservationFunc, }: Props) => React.JSX.Element;
export {};
//# sourceMappingURL=SingleDayReservationList.d.ts.map