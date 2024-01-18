import type { BookableEvent } from '@airjam/types';
import type { BookingRequestInternal } from './BookingRequestInternal';
import type { BookingRequestResource } from './BookingRequestResource';
import type { BookingResponse } from './BookingResponse';

export interface BookingResultPage {
  request: BookingRequestInternal;
  response: BookingResponse;
  resource: BookingRequestResource;
  event?: BookableEvent;
}
