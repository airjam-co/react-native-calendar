import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import {
  BookableEvent,
  CalendarBookingAvailability,
  CalendarEvent,
  EventReservation,
  GetEventsDuration,
  CalendarViewType as ViewType,
  addDays,
} from '@airjam/types';
import { EventDetailList } from './EventDetailList';
import type { BookingRequestResource } from './BookingRequestResource';
import type { BookingResultPage } from './BookingResultPage';
import { timezoneData } from './timezone_data';
import { AvailabilitiesForADay } from './AvailabilitiesForADay';
import { compareDropdownItems } from './utils';
import type { CalendarProps } from './CalendarProps';
import {
  deleteReservation,
  fetchCalendarView,
  fetchMyReservations,
  fetchReservationTerms,
  submitBookReservation,
} from './thunk';
import { BookableEventList } from './BookableEventList';
import { ReservationSuccessModal } from './ReservationSuccessModal';
import { ViewReservation } from './ViewReservation';
import { ReservationModal } from './ReservationModal';
import { CalendarBook } from './CalendarBook';
import { CalendarExclusiveBook } from './CalendarExclusiveBook';
import { CalendarView } from './CalendarView';
import { SingleDayReservationList } from './SingleDayReservationList';
import { DayCalendarGroupedByLocation } from './DayCalendarGroupedByLocation';
import { EventListGroupedByDay } from './EventListGroupedByDay';

const timezones: string[] = [];
const timezoneSelectOptions: ItemType<string>[] = [
  { label: 'loading', value: 'loading' },
];

export const Calendar = ({
  id,
  authToken,
  host,
  renderEventFunc,
  renderReservationFunc,
  viewAs,
  showDate,
  showEndDate,
  location,
  descriptionLength,
}: CalendarProps) => {
  const [startTime, setStartTime] = useState<Date>(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [events, setEvents] = React.useState<CalendarEvent[] | undefined>(
    undefined
  );
  const [isMounted, setIsMounted] = React.useState<Boolean>(false);
  const [availability, setAvailability] = React.useState<
    CalendarBookingAvailability | undefined
  >(undefined);
  const [reservations, setReservations] = React.useState<EventReservation[]>(
    []
  );
  const [bookingDialog, setBookingDialog] = React.useState<
    BookingRequestResource | undefined
  >(undefined);
  const [bookingResult, setBookingResult] = React.useState<
    BookingResultPage | undefined
  >(undefined);
  const [selectedReservation, setSelectedReservation] = React.useState<
    EventReservation | undefined
  >(undefined);
  const [selectedBookableEvent, setSelectedBookableEvent] = React.useState<
    BookableEvent | undefined
  >(undefined);
  const [nameText, onChangeNameText] = React.useState('');
  const [emailText, onChangeEmailText] = React.useState('');
  const [notesText, onChangeNotesText] = React.useState('');
  const [timezone, setTimezone] = React.useState<String>('');
  const [timezoneDropdownOpen, setTimezoneDropdownOpen] =
    React.useState<boolean>(false);
  const [dropdownTimezone, setDropdownTimezone] = React.useState<any>(null);
  const startDate = showDate || undefined;

  const onChange = (newDate: Date) => {
    if (newDate) {
      const newStartTime: Date = new Date(newDate);
      setStartTime(newStartTime);
      if (isMounted) {
        if (
          viewAs === ViewType.CalendarBook ||
          viewAs === ViewType.CalendarExclusiveBook
        ) {
          fetchReservationAvailability(newStartTime);
        } else if (viewAs === ViewType.MyEventsList) {
          fetchReservations(newStartTime);
        } else {
          fetchCalendarEvents(newStartTime);
        }
      }
    }
  };

  const fetchDay = (newDate: Date) => {
    setStartTime(newDate);
    if (isMounted) {
      if (
        viewAs === ViewType.CalendarBook ||
        viewAs === ViewType.CalendarExclusiveBook
      ) {
        fetchReservationAvailability(newDate);
      } else {
        fetchCalendarEvents(newDate);
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchReservationAvailability = (
    queryStartTime: Date,
    queryEndTime?: Date | undefined,
    getDuration: GetEventsDuration = GetEventsDuration.WholeMonth
  ) => {
    fetchReservationTerms(
      id,
      queryStartTime,
      queryEndTime,
      host,
      authToken,
      getDuration
    ).then((terms) => {
      if (terms) {
        setAvailability(terms);
      }
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchReservations = (
    queryStartTime: Date,
    queryEndTime?: Date | undefined
  ) => {
    fetchMyReservations(id, queryStartTime, queryEndTime, authToken, host).then(
      (myReservations) => {
        if (myReservations) {
          setReservations(myReservations);
        }
      }
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchCalendarEvents = (
    queryStartTime: Date,
    queryEndTime?: Date | undefined
  ) => {
    fetchCalendarView(
      id,
      queryStartTime,
      queryEndTime,
      host,
      authToken,
      location
    ).then((newCalendarEvents) => {
      if (newCalendarEvents) {
        setEvents(newCalendarEvents);
      }
    });
  };

  const cancelReservation = () => {
    if (selectedReservation === undefined) {
      console.log('you cannot cancel without a reservation');
      return;
    }
    deleteReservation(selectedReservation.reservationId, host, authToken)
      .then((success) => {
        if (success) {
          setSelectedReservation(undefined);
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert(err);
      });
  };

  useEffect(() => {
    if (
      viewAs === ViewType.CalendarBook ||
      viewAs === ViewType.CalendarExclusiveBook
    ) {
      // force reload if authentication is changed.
      setIsMounted(false);
    }
  }, [authToken, viewAs]);

  useEffect(() => {
    if (!isMounted) {
      if (viewAs === ViewType.MyEventsList && !authToken) {
        return;
      }
      setIsMounted(true);

      // Set timezone and load all timezones
      const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
      setTimezone(timeZone);
      setDropdownTimezone(timeZone);
      const newTimezoneData: string[] = [];
      const newTimezoneSelectData: [] = [];
      timezoneData.forEach((tzDefinition: any) =>
        tzDefinition.utc.forEach((tzName: string) => {
          // remove any duplicates
          const cleanName = tzName.replace(/_/g, ' ');
          if (newTimezoneData.indexOf(tzName) < 0) {
            newTimezoneData.push(tzName);
            newTimezoneSelectData.push({
              label: cleanName,
              value: tzName,
            } as never);
          }
        })
      );
      timezones.length = 0;
      timezones.push(...newTimezoneData.sort());
      timezoneSelectOptions.length = 0;
      newTimezoneSelectData.sort(compareDropdownItems);
      timezoneSelectOptions.push(...newTimezoneSelectData);

      if (showDate) {
        setStartTime(new Date(showDate));
      }
      if (startDate) {
        if (showEndDate && viewAs && viewAs === ViewType.List) {
          fetchCalendarEvents(startDate, showEndDate);
        } else if (
          viewAs === ViewType.CalendarBook ||
          viewAs === ViewType.CalendarExclusiveBook
        ) {
          fetchReservationAvailability(startDate, showEndDate);
        } else if (viewAs === ViewType.MyEventsList) {
          fetchReservations(startDate, showEndDate);
        } else {
          fetchCalendarEvents(startDate, showEndDate);
        }
      } else {
        if (
          viewAs === ViewType.CalendarBook ||
          viewAs === ViewType.CalendarExclusiveBook
        ) {
          fetchReservationAvailability(
            new Date(new Date().setHours(0, 0, 0, 0))
          );
        } else if (viewAs === ViewType.MyEventsList) {
          fetchReservations(
            new Date(new Date().setHours(0, 0, 0, 0)),
            showEndDate
          );
        } else {
          fetchCalendarEvents(new Date(new Date().setHours(0, 0, 0, 0)));
        }
      }
    }
  }, [
    authToken,
    fetchCalendarEvents,
    fetchReservations,
    fetchReservationAvailability,
    isMounted,
    showDate,
    showEndDate,
    startDate,
    viewAs,
  ]);

  useFocusEffect(
    React.useCallback(() => {
      setIsMounted(false);

      return () => console.log('unfocused');
    }, [])
  );

  const renderDayCalendarByLocation = () => {
    if (!events || !events.length) {
      return (
        <View>
          <Text style={style.emptySectionText}>No events found</Text>
        </View>
      );
    }
    return (
      <DayCalendarGroupedByLocation
        events={events}
        descriptionLength={descriptionLength}
        renderEventFunc={renderEventFunc}
      />
    );
  };

  const renderCalendarView = () => {
    const splitDate = startTime.toISOString().split('T');
    const selectedTime: string = splitDate.length > 0 ? splitDate[0]! : '';
    return (
      <View style={style.eventsContainer}>
        <CalendarView
          onPress={(pressedDate) => onChange(pressedDate)}
          markedDates={{
            [selectedTime]: { selected: true },
          }}
        />
        {!events || !events.length ? (
          <Text style={style.eventNotFound}>No scheduled events found</Text>
        ) : (
          ''
        )}
        {events && events.length > 0 ? (
          <EventDetailList
            eventList={events}
            key={'detail-list'}
            renderEventFunc={renderEventFunc}
            descriptionLength={descriptionLength}
            onPress={(e) => {
              if (viewAs === ViewType.CalendarExclusiveBook) {
                setSelectedBookableEvent(e as BookableEvent);
              }
            }}
          />
        ) : (
          ''
        )}
      </View>
    );
  };

  const renderCalendarExclusiveBook = () => {
    return (
      <View>
        <CalendarExclusiveBook
          startTime={startTime}
          availability={availability}
          onPress={(newDate) => onChange(newDate)}
        />
        {renderAvailableEventsToBook()}
        <View>
          <Text style={style.sectionHeader2}>Time zone</Text>
          {getTimezoneSelector()}
        </View>
        {bookingResult ? (
          <ReservationSuccessModal
            key={'reservation-success'}
            timezone={timezone.toString()}
            bookingResult={bookingResult}
            onClose={() => {
              setSelectedBookableEvent(undefined);
              setBookingResult(undefined);
            }}
          />
        ) : (
          ''
        )}
        {selectedBookableEvent !== undefined
          ? reserveDialog(selectedBookableEvent)
          : ''}
      </View>
    );
  };

  const renderAvailableEventsToBook = () => {
    if (!availability || !availability.resources) {
      return (
        <View>
          <Text style={style.emptySectionText}>
            There are no availabilities for the given time frame
          </Text>
        </View>
      );
    }
    return (
      <View>
        {availability.resources.map(function (resource, idx) {
          return (
            <View key={'availability-resource-container-' + idx}>
              <Text style={style.resourceName}>{resource.name}</Text>
              <BookableEventList
                resource={resource}
                startTime={startTime}
                descriptionLength={descriptionLength}
                key={'available-events-' + resource._id}
                onPress={(e) => {
                  if (viewAs === ViewType.CalendarExclusiveBook) {
                    setSelectedBookableEvent(e as BookableEvent);
                  }
                }}
                renderEventFunc={renderEventFunc}
              />
            </View>
          );
        })}
      </View>
    );
  };

  const renderCalendarBook = () => {
    return (
      <View>
        <CalendarBook
          startTime={startTime}
          availability={availability}
          onPress={(newDate) => onChange(newDate)}
        />
        <AvailabilitiesForADay
          key={'available-times'}
          timezone={timezone.toString()}
          startTime={startTime}
          availability={availability}
          onPress={(dialogResource) => setBookingDialog(dialogResource)}
        />
        <View>
          <Text style={style.sectionHeader2}>Time zone</Text>
          {getTimezoneSelector()}
        </View>
        {bookingResult && selectedBookableEvent ? (
          <ReservationSuccessModal
            key={'reservation-success'}
            timezone={timezone.toString()}
            bookingResult={bookingResult}
            onClose={() => closeBookingDialog()}
          />
        ) : (
          ''
        )}
        {bookingDialog !== undefined ? reserveDialog(bookingDialog) : ''}
      </View>
    );
  };

  const reserveDialog = (
    resourceOrEvent: BookingRequestResource | BookableEvent
  ): React.ReactNode => {
    if (bookingDialog === undefined && selectedBookableEvent === undefined) {
      return <View />;
    } else {
      return (
        <ReservationModal
          key={'reservation-modal'}
          timezone={timezone.toString()}
          resourceOrEvent={resourceOrEvent}
          authToken={authToken}
          name={nameText}
          onNameChanged={(newName) => onChangeNameText(newName)}
          email={emailText}
          onEmailChanged={(newEmail) => onChangeEmailText(newEmail)}
          notes={notesText}
          onNotesChanged={(newNotes) => onChangeNotesText(newNotes)}
          submitPressed={() => submitReservation()}
          onClose={() => closeBookingDialog()}
        />
      );
    }
  };

  function closeBookingDialog() {
    setBookingDialog(undefined);
    setSelectedBookableEvent(undefined);
  }

  function submitReservation() {
    if (bookingDialog === undefined && selectedBookableEvent === undefined) {
      console.log('you cant book without an object to book with');
      return;
    }
    const resourceOrEvent = bookingDialog
      ? bookingDialog
      : selectedBookableEvent;
    submitBookReservation(
      id,
      resourceOrEvent!,
      host,
      authToken,
      nameText,
      emailText,
      notesText
    ).then((bookingResponse) => {
      if (
        !bookingResponse ||
        !bookingResponse.response ||
        !bookingResponse.response.success
      ) {
        const errMsg =
          'There was an error submitting the request to book: ' +
          bookingResponse.response.message;
        Alert.alert(errMsg);
      } else {
        setBookingDialog(undefined);
        setBookingResult(bookingResponse);
        setSelectedBookableEvent(undefined);
      }
    });
  }

  const getTimezoneSelector = () => {
    // TODO Add filter (https://react-bootstrap.netlify.app/docs/components/dropdowns#custom-dropdown-components)
    return (
      <DropDownPicker
        style={style.defaultDropdownStyle}
        open={timezoneDropdownOpen}
        value={dropdownTimezone}
        items={timezoneSelectOptions}
        setOpen={setTimezoneDropdownOpen}
        setValue={setDropdownTimezone}
        onSelectItem={(item) => {
          if (item.value) {
            setTimezone(item.value);
          }
        }}
        placeholder={'Choose a timezone'}
        listMode="SCROLLVIEW"
      />
    );
  };

  const renderDayListWithDaySelector = () => {
    return (
      <View>
        <View style={style.daySelectorContainer}>
          <Button
            style={style.prevNextButton}
            title={'<'}
            onPress={() => fetchDay(addDays(startTime, -1))}
          />
          <Text style={style.daySelectorDayText}>
            {startTime.toDateString()}
          </Text>
          <Button
            style={style.prevNextButton}
            title={'>'}
            onPress={() => fetchDay(addDays(startTime, 1))}
          />
        </View>
        {!events || !events.length ? (
          <Text>No events scheduled for today</Text>
        ) : (
          ''
        )}
        {events && events.length > 0 ? (
          <EventDetailList
            eventList={events}
            key={'detail-list'}
            renderEventFunc={renderEventFunc}
            descriptionLength={descriptionLength}
            onPress={(e) => {
              if (viewAs === ViewType.CalendarExclusiveBook) {
                setSelectedBookableEvent(e as BookableEvent);
              }
            }}
          />
        ) : (
          ''
        )}
      </View>
    );
  };

  const renderDayList = () => {
    return (
      <View>
        {!events || !events.length ? (
          <Text>No events scheduled for today</Text>
        ) : (
          ''
        )}
        {events && events.length > 0 ? (
          <EventDetailList
            eventList={events}
            key={'detail-list'}
            renderEventFunc={renderEventFunc}
            descriptionLength={descriptionLength}
            onPress={(e) => {
              if (viewAs === ViewType.CalendarExclusiveBook) {
                setSelectedBookableEvent(e as BookableEvent);
              }
            }}
          />
        ) : (
          ''
        )}
      </View>
    );
  };

  const renderList = () => {
    return (
      <View style={style.viewContainer}>
        {!events || !events.length ? (
          <Text style={style.emptySectionText}>No events found</Text>
        ) : (
          ''
        )}
        {events && events.length > 0 ? (
          <EventListGroupedByDay
            events={events}
            descriptionLength={descriptionLength}
            renderEventFunc={renderEventFunc}
            onPress={(e) => {
              if (viewAs === ViewType.CalendarExclusiveBook) {
                setSelectedBookableEvent(e as BookableEvent);
              }
            }}
          />
        ) : (
          ''
        )}
      </View>
    );
  };

  const renderMyReservationsList = () => {
    return (
      <View style={style.viewContainer}>
        {!reservations || !reservations.length ? (
          <Text style={style.emptySectionText}>No reservations found</Text>
        ) : (
          ''
        )}
        {reservations && reservations.length > 0 ? (
          <SingleDayReservationList
            reservations={reservations}
            renderReservationFunc={renderReservationFunc}
            onPress={(res) => setSelectedReservation(res)}
          />
        ) : (
          ''
        )}
        {selectedReservation ? viewMyReservation() : ''}
      </View>
    );
  };

  const viewMyReservation = () => {
    if (selectedReservation === undefined) {
      console.log('there is no reservation to show');
      return '';
    }
    return (
      <ViewReservation
        key="view-reservation"
        reservation={selectedReservation}
        onClose={() => setSelectedReservation(undefined)}
        cancellationClicked={() => cancelReservation()}
      />
    );
  };

  const renderView = () => {
    if (!viewAs || viewAs === ViewType.List) {
      return renderList();
    }
    if (viewAs === ViewType.CalendarView) {
      return renderCalendarView();
    }
    if (viewAs === ViewType.DayList) {
      return renderDayListWithDaySelector();
    }
    if (viewAs === ViewType.DayView) {
      return renderDayList();
    }
    if (viewAs === ViewType.DayViewByLocation) {
      return renderDayCalendarByLocation();
    }
    if (viewAs === ViewType.CalendarBook) {
      return renderCalendarBook();
    }
    if (viewAs === ViewType.CalendarExclusiveBook) {
      return renderCalendarExclusiveBook();
    }
    if (viewAs === ViewType.MyEventsList) {
      return renderMyReservationsList();
    }
    return renderList();
  };

  return <SafeAreaView>{renderView()}</SafeAreaView>;
};

const style = StyleSheet.create({
  defaultDropdownStyle: {
    width: '80%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  sectionHeader2: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  emptySectionText: {
    textAlign: 'center',
    color: '#999999',
  },
  viewContainer: {},
  eventsContainer: {
    width: '100%',
    paddingBottom: 5,
  },
  resourceName: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#999999',
    marginTop: 10,
  },
  daySelectorContainer: {
    alignContent: 'center',
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 20,
    paddingRight: 10,
  },
  daySelectorDayText: {
    flex: 1,
    alignContent: 'center',
    verticalAlign: 'middle',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    paddingTop: 10,
  },
  prevNextButton: {
    width: 40,
    height: 40,
    flexDirection: 'row',
    flex: 1,
  },
  eventNotFound: {
    textAlign: 'center',
    padding: 20,
  },
});
