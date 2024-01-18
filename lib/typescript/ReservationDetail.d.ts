import React from 'react';
import { EventReservation } from '@airjam/types';
interface Props {
    reservation: EventReservation;
    uniqueKey?: string;
    descriptionLength?: number;
    onPress?: (event: EventReservation, key?: string) => void;
}
export declare const ReservationDetail: ({ reservation, uniqueKey, descriptionLength, onPress, }: Props) => React.JSX.Element;
export {};
//# sourceMappingURL=ReservationDetail.d.ts.map