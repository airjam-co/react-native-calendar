import { CALENDAR_BOOK_ENDPOINT, CALENDAR_CONFIG_ENDPOINT, CALENDAR_MY_RESERVATIONS_ENDPOINT, DEFAULT_HOST, GetEventsDuration, addDays, compareEventsByStartTime } from '@airjam/types';
export const fetchMyReservations = async (componentId, startTime, endTime, authToken, host) => {
  let hostUrl = host || DEFAULT_HOST;
  hostUrl += CALENDAR_MY_RESERVATIONS_ENDPOINT + componentId + '&startTimeUtc=' + startTime.toISOString();
  if (endTime) {
    hostUrl += '&endTimeUtc=' + endTime.toISOString();
  } else {
    hostUrl += '&endTimeUtc=' + addDays(startTime, 1).toISOString();
  }
  if (!authToken) {
    console.log('You need authentication to call this function');
    return undefined;
  }
  try {
    const json = await fetch(hostUrl, {
      headers: new Headers({
        Authorization: authToken ? 'Bearer ' + authToken : ''
      })
    });
    if (json) {
      const response = await json.json();
      if (response) {
        return response.reservations;
      }
    } else {
      console.log(json);
    }
    return undefined;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
export const fetchCalendarView = async (componentId, queryStartTime, queryEndTime, host, authToken, location) => {
  let hostUrl = host || DEFAULT_HOST;
  const queryStartDate = new Date(queryStartTime);
  hostUrl += CALENDAR_CONFIG_ENDPOINT + componentId + '&startTimeUtc=' + queryStartDate.toISOString();
  if (queryEndTime) {
    const queryEndDate = new Date(queryEndTime);
    hostUrl += '&endTimeUtc=' + queryEndDate.toISOString();
  } else {
    hostUrl += '&endTimeUtc=' + addDays(queryStartDate, 1).toISOString();
  }
  if (location) {
    hostUrl += '&location=' + encodeURIComponent(location);
  }
  try {
    const json = await fetch(hostUrl, {
      headers: new Headers({
        Authorization: authToken ? 'Bearer ' + authToken : ''
      })
    });
    if (json) {
      const resp = await json.json();
      if (resp && resp.events) {
        const newEvents = [];
        for (const e of resp.events) {
          // TODO: legacy backward compatibility code, remove when you can
          e.start = e.calculatedStartTimeUtc ? e.calculatedStartTimeUtc : e.startTimeUtc;
          e.end = e.calculatedRecurrenceEndTimeUtc ? e.calculatedRecurrenceEndTimeUtc : e.endTimeUtc;
          e.isAllDay = e.isAllDay;
          newEvents.push(e);
        }
        newEvents.sort(compareEventsByStartTime); // sort events by start time
        return newEvents;
      }
    }
    return undefined;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
export const fetchReservationTerms = async (componentId, queryStartTime, queryEndTime, host, authToken, getDuration = GetEventsDuration.WholeMonth) => {
  let hostUrl = host || DEFAULT_HOST;
  const fetchStartTime = getDuration === GetEventsDuration.WholeMonth ? new Date(queryStartTime.getFullYear(), queryStartTime.getMonth(), 1) : new Date(queryStartTime);
  let fetchEndTime = queryEndTime ? new Date(queryEndTime) : addDays(fetchStartTime, 1);
  if (getDuration === GetEventsDuration.WholeMonth) {
    // move to the last day of the given month
    fetchEndTime = new Date(fetchEndTime.getFullYear(), fetchEndTime.getMonth() + 1, 0);
  }
  hostUrl += CALENDAR_BOOK_ENDPOINT + componentId + '&startTimeUtc=' + fetchStartTime.toISOString() + '&endTimeUtc=' + fetchEndTime.toISOString();
  try {
    const json = await fetch(hostUrl, {
      headers: new Headers({
        Authorization: authToken ? 'Bearer ' + authToken : ''
      })
    });
    if (json) {
      const response = await json.json();
      if (response) {
        // backfill start dates for compatibility
        if (response.resources) {
          for (let i = 0; i < response.resources.length; i++) {
            for (let j = 0; j < response.resources[i].availableEvents.length; j++) {
              if (!response.resources[i].availableEvents[j].startTimeUtc) {
                response.resources[i].availableEvents[j].startTimeUtc = response.resources[i].availableEvents[j].startTimeUtc;
              }
              if (!response.resources[i].availableEvents[j].endTimeUtc) {
                response.resources[i].availableEvents[j].endTimeUtc = response.resources[i].availableEvents[j].endTimeUtc;
              }
            }
          }
        }
        return response;
      }
    }
    return undefined;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
export const bookReservation = async (componentId, request, host, authToken) => {
  let hostUrl = host || DEFAULT_HOST;
  hostUrl += CALENDAR_BOOK_ENDPOINT + componentId;
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authToken ? 'Bearer ' + authToken : ''
    },
    body: JSON.stringify(request)
  };
  try {
    const json = await fetch(hostUrl, requestOptions);
    if (json) {
      const resp = await json.json();
      return resp;
    }
    return undefined;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

// This function throws on error
export const deleteReservation = async (reservationId, host, authToken) => {
  let hostUrl = host || DEFAULT_HOST;
  hostUrl += CALENDAR_BOOK_ENDPOINT + reservationId;
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authToken ? 'Bearer ' + authToken : ''
    }
  };
  const resp = await fetch(hostUrl, requestOptions);
  if (resp) {
    return true;
  }
  return false;
};
export const submitBookReservation = async (componentId, resourceOrEvent, host, authToken, name, email, notes) => {
  const requestStartTime = new Date(resourceOrEvent.startTimeUtc);
  const requestEndTime = new Date(resourceOrEvent.endTimeUtc);
  const bookingRequest = {};
  const resource = 'resource' in resourceOrEvent ? resourceOrEvent : undefined;
  const event = 'eventId' in resourceOrEvent ? resourceOrEvent : undefined;
  bookingRequest.id = componentId;
  bookingRequest.resourceId = resource ? resource.resource._id : event ? event.componentResourceId : '';
  bookingRequest.startTimeUtc = requestStartTime.toISOString();
  bookingRequest.endTimeUtc = requestEndTime.toISOString();
  bookingRequest.eventId = event ? String(event.eventId) : '';
  if (authToken) {
    bookingRequest.authToken = authToken;
  }
  if (!authToken && !name) {
    return {
      response: {
        success: false,
        message: 'Please provide a valid name for the booking'
      }
    };
  } else {
    bookingRequest.name = name ? name : '';
  }
  if (!authToken && !email) {
    return {
      response: {
        success: false,
        message: 'Please provide a valid email address for the booking'
      }
    };
  } else {
    bookingRequest.email = email ? email : '';
  }
  if (notes) {
    bookingRequest.comment = notes;
  }
  const bookResponse = await bookReservation(componentId, bookingRequest, host, authToken);
  return {
    resource: resource,
    response: bookResponse,
    request: bookingRequest,
    event: event
  };
};
//# sourceMappingURL=thunk.js.map