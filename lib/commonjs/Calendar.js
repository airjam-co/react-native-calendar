"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Calendar = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeElements = require("react-native-elements");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _native = require("@react-navigation/native");
var _reactNativeDropdownPicker = _interopRequireDefault(require("react-native-dropdown-picker"));
var _types = require("@airjam/types");
var _EventDetailList = require("./EventDetailList");
var _timezone_data = require("./timezone_data");
var _AvailabilitiesForADay = require("./AvailabilitiesForADay");
var _utils = require("./utils");
var _thunk = require("./thunk");
var _BookableEventList = require("./BookableEventList");
var _ReservationSuccessModal = require("./ReservationSuccessModal");
var _ViewReservation = require("./ViewReservation");
var _ReservationModal = require("./ReservationModal");
var _CalendarBook = require("./CalendarBook");
var _CalendarExclusiveBook = require("./CalendarExclusiveBook");
var _CalendarView = require("./CalendarView");
var _SingleDayReservationList = require("./SingleDayReservationList");
var _DayCalendarGroupedByLocation = require("./DayCalendarGroupedByLocation");
var _EventListGroupedByDay = require("./EventListGroupedByDay");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const timezones = [];
const timezoneSelectOptions = [{
  label: 'loading',
  value: 'loading'
}];
const Calendar = ({
  id,
  authToken,
  host,
  renderEventFunc,
  renderReservationFunc,
  viewAs,
  showDate,
  showEndDate,
  location,
  descriptionLength
}) => {
  const [startTime, setStartTime] = (0, _react.useState)(new Date(new Date().setHours(0, 0, 0, 0)));
  const [events, setEvents] = _react.default.useState(undefined);
  const [isMounted, setIsMounted] = _react.default.useState(false);
  const [availability, setAvailability] = _react.default.useState(undefined);
  const [reservations, setReservations] = _react.default.useState([]);
  const [bookingDialog, setBookingDialog] = _react.default.useState(undefined);
  const [bookingResult, setBookingResult] = _react.default.useState(undefined);
  const [selectedReservation, setSelectedReservation] = _react.default.useState(undefined);
  const [selectedBookableEvent, setSelectedBookableEvent] = _react.default.useState(undefined);
  const [nameText, onChangeNameText] = _react.default.useState('');
  const [emailText, onChangeEmailText] = _react.default.useState('');
  const [notesText, onChangeNotesText] = _react.default.useState('');
  const [timezone, setTimezone] = _react.default.useState('');
  const [timezoneDropdownOpen, setTimezoneDropdownOpen] = _react.default.useState(false);
  const [dropdownTimezone, setDropdownTimezone] = _react.default.useState(null);
  const startDate = showDate || undefined;
  const onChange = newDate => {
    if (newDate) {
      const newStartTime = new Date(newDate);
      setStartTime(newStartTime);
      if (isMounted) {
        if (viewAs === _types.CalendarViewType.CalendarBook || viewAs === _types.CalendarViewType.CalendarExclusiveBook) {
          fetchReservationAvailability(newStartTime);
        } else if (viewAs === _types.CalendarViewType.MyEventsList) {
          fetchReservations(newStartTime);
        } else {
          fetchCalendarEvents(newStartTime);
        }
      }
    }
  };
  const fetchDay = newDate => {
    setStartTime(newDate);
    if (isMounted) {
      if (viewAs === _types.CalendarViewType.CalendarBook || viewAs === _types.CalendarViewType.CalendarExclusiveBook) {
        fetchReservationAvailability(newDate);
      } else {
        fetchCalendarEvents(newDate);
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchReservationAvailability = (queryStartTime, queryEndTime, getDuration = _types.GetEventsDuration.WholeMonth) => {
    (0, _thunk.fetchReservationTerms)(id, queryStartTime, queryEndTime, host, authToken, getDuration).then(terms => {
      if (terms) {
        setAvailability(terms);
      }
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchReservations = (queryStartTime, queryEndTime) => {
    (0, _thunk.fetchMyReservations)(id, queryStartTime, queryEndTime, authToken, host).then(myReservations => {
      if (myReservations) {
        setReservations(myReservations);
      }
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchCalendarEvents = (queryStartTime, queryEndTime) => {
    (0, _thunk.fetchCalendarView)(id, queryStartTime, queryEndTime, host, authToken, location).then(newCalendarEvents => {
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
    (0, _thunk.deleteReservation)(selectedReservation.reservationId, host, authToken).then(success => {
      if (success) {
        setSelectedReservation(undefined);
      }
    }).catch(err => {
      console.log(err);
      _reactNative.Alert.alert(err);
    });
  };
  (0, _react.useEffect)(() => {
    if (viewAs === _types.CalendarViewType.CalendarBook || viewAs === _types.CalendarViewType.CalendarExclusiveBook) {
      // force reload if authentication is changed.
      setIsMounted(false);
    }
  }, [authToken, viewAs]);
  (0, _react.useEffect)(() => {
    if (!isMounted) {
      if (viewAs === _types.CalendarViewType.MyEventsList && !authToken) {
        return;
      }
      setIsMounted(true);

      // Set timezone and load all timezones
      const {
        timeZone
      } = Intl.DateTimeFormat().resolvedOptions();
      setTimezone(timeZone);
      setDropdownTimezone(timeZone);
      const newTimezoneData = [];
      const newTimezoneSelectData = [];
      _timezone_data.timezoneData.forEach(tzDefinition => tzDefinition.utc.forEach(tzName => {
        // remove any duplicates
        const cleanName = tzName.replace(/_/g, ' ');
        if (newTimezoneData.indexOf(tzName) < 0) {
          newTimezoneData.push(tzName);
          newTimezoneSelectData.push({
            label: cleanName,
            value: tzName
          });
        }
      }));
      timezones.length = 0;
      timezones.push(...newTimezoneData.sort());
      timezoneSelectOptions.length = 0;
      newTimezoneSelectData.sort(_utils.compareDropdownItems);
      timezoneSelectOptions.push(...newTimezoneSelectData);
      if (showDate) {
        setStartTime(new Date(showDate));
      }
      if (startDate) {
        if (showEndDate && viewAs && viewAs === _types.CalendarViewType.List) {
          fetchCalendarEvents(startDate, showEndDate);
        } else if (viewAs === _types.CalendarViewType.CalendarBook || viewAs === _types.CalendarViewType.CalendarExclusiveBook) {
          fetchReservationAvailability(startDate, showEndDate);
        } else if (viewAs === _types.CalendarViewType.MyEventsList) {
          fetchReservations(startDate, showEndDate);
        } else {
          fetchCalendarEvents(startDate, showEndDate);
        }
      } else {
        if (viewAs === _types.CalendarViewType.CalendarBook || viewAs === _types.CalendarViewType.CalendarExclusiveBook) {
          fetchReservationAvailability(new Date(new Date().setHours(0, 0, 0, 0)));
        } else if (viewAs === _types.CalendarViewType.MyEventsList) {
          fetchReservations(new Date(new Date().setHours(0, 0, 0, 0)), showEndDate);
        } else {
          fetchCalendarEvents(new Date(new Date().setHours(0, 0, 0, 0)));
        }
      }
    }
  }, [authToken, fetchCalendarEvents, fetchReservations, fetchReservationAvailability, isMounted, showDate, showEndDate, startDate, viewAs]);
  (0, _native.useFocusEffect)(_react.default.useCallback(() => {
    setIsMounted(false);
    return () => console.log('unfocused');
  }, []));
  const renderDayCalendarByLocation = () => {
    if (!events || !events.length) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: style.emptySectionText
      }, "No events found"));
    }
    return /*#__PURE__*/_react.default.createElement(_DayCalendarGroupedByLocation.DayCalendarGroupedByLocation, {
      events: events,
      descriptionLength: descriptionLength,
      renderEventFunc: renderEventFunc
    });
  };
  const renderCalendarView = () => {
    const splitDate = startTime.toISOString().split('T');
    const selectedTime = splitDate.length > 0 ? splitDate[0] : '';
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.eventsContainer
    }, /*#__PURE__*/_react.default.createElement(_CalendarView.CalendarView, {
      onPress: pressedDate => onChange(pressedDate),
      markedDates: {
        [selectedTime]: {
          selected: true
        }
      }
    }), !events || !events.length ? /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.eventNotFound
    }, "No scheduled events found") : '', events && events.length > 0 ? /*#__PURE__*/_react.default.createElement(_EventDetailList.EventDetailList, {
      eventList: events,
      key: 'detail-list',
      renderEventFunc: renderEventFunc,
      descriptionLength: descriptionLength,
      onPress: e => {
        if (viewAs === _types.CalendarViewType.CalendarExclusiveBook) {
          setSelectedBookableEvent(e);
        }
      }
    }) : '');
  };
  const renderCalendarExclusiveBook = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_CalendarExclusiveBook.CalendarExclusiveBook, {
      startTime: startTime,
      availability: availability,
      onPress: newDate => onChange(newDate)
    }), renderAvailableEventsToBook(), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.sectionHeader2
    }, "Time zone"), getTimezoneSelector()), bookingResult ? /*#__PURE__*/_react.default.createElement(_ReservationSuccessModal.ReservationSuccessModal, {
      key: 'reservation-success',
      timezone: timezone.toString(),
      bookingResult: bookingResult,
      onClose: () => {
        setSelectedBookableEvent(undefined);
        setBookingResult(undefined);
      }
    }) : '', selectedBookableEvent !== undefined ? reserveDialog(selectedBookableEvent) : '');
  };
  const renderAvailableEventsToBook = () => {
    if (!availability || !availability.resources) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: style.emptySectionText
      }, "There are no availabilities for the given time frame"));
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, availability.resources.map(function (resource, idx) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        key: 'availability-resource-container-' + idx
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: style.resourceName
      }, resource.name), /*#__PURE__*/_react.default.createElement(_BookableEventList.BookableEventList, {
        resource: resource,
        startTime: startTime,
        descriptionLength: descriptionLength,
        key: 'available-events-' + resource._id,
        onPress: e => {
          if (viewAs === _types.CalendarViewType.CalendarExclusiveBook) {
            setSelectedBookableEvent(e);
          }
        },
        renderEventFunc: renderEventFunc
      }));
    }));
  };
  const renderCalendarBook = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_CalendarBook.CalendarBook, {
      startTime: startTime,
      availability: availability,
      onPress: newDate => onChange(newDate)
    }), /*#__PURE__*/_react.default.createElement(_AvailabilitiesForADay.AvailabilitiesForADay, {
      key: 'available-times',
      timezone: timezone.toString(),
      startTime: startTime,
      availability: availability,
      onPress: dialogResource => setBookingDialog(dialogResource)
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.sectionHeader2
    }, "Time zone"), getTimezoneSelector()), bookingResult && selectedBookableEvent ? /*#__PURE__*/_react.default.createElement(_ReservationSuccessModal.ReservationSuccessModal, {
      key: 'reservation-success',
      timezone: timezone.toString(),
      bookingResult: bookingResult,
      onClose: () => closeBookingDialog()
    }) : '', bookingDialog !== undefined ? reserveDialog(bookingDialog) : '');
  };
  const reserveDialog = resourceOrEvent => {
    if (bookingDialog === undefined && selectedBookableEvent === undefined) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null);
    } else {
      return /*#__PURE__*/_react.default.createElement(_ReservationModal.ReservationModal, {
        key: 'reservation-modal',
        timezone: timezone.toString(),
        resourceOrEvent: resourceOrEvent,
        authToken: authToken,
        name: nameText,
        onNameChanged: newName => onChangeNameText(newName),
        email: emailText,
        onEmailChanged: newEmail => onChangeEmailText(newEmail),
        notes: notesText,
        onNotesChanged: newNotes => onChangeNotesText(newNotes),
        submitPressed: () => submitReservation(),
        onClose: () => closeBookingDialog()
      });
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
    const resourceOrEvent = bookingDialog ? bookingDialog : selectedBookableEvent;
    (0, _thunk.submitBookReservation)(id, resourceOrEvent, host, authToken, nameText, emailText, notesText).then(bookingResponse => {
      if (!bookingResponse || !bookingResponse.response || !bookingResponse.response.success) {
        const errMsg = 'There was an error submitting the request to book: ' + bookingResponse.response.message;
        _reactNative.Alert.alert(errMsg);
      } else {
        setBookingDialog(undefined);
        setBookingResult(bookingResponse);
        setSelectedBookableEvent(undefined);
      }
    });
  }
  const getTimezoneSelector = () => {
    // TODO Add filter (https://react-bootstrap.netlify.app/docs/components/dropdowns#custom-dropdown-components)
    return /*#__PURE__*/_react.default.createElement(_reactNativeDropdownPicker.default, {
      style: style.defaultDropdownStyle,
      open: timezoneDropdownOpen,
      value: dropdownTimezone,
      items: timezoneSelectOptions,
      setOpen: setTimezoneDropdownOpen,
      setValue: setDropdownTimezone,
      onSelectItem: item => {
        if (item.value) {
          setTimezone(item.value);
        }
      },
      placeholder: 'Choose a timezone',
      listMode: "SCROLLVIEW"
    });
  };
  const renderDayListWithDaySelector = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.daySelectorContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNativeElements.Button, {
      style: style.prevNextButton,
      title: '<',
      onPress: () => fetchDay((0, _types.addDays)(startTime, -1))
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.daySelectorDayText
    }, startTime.toDateString()), /*#__PURE__*/_react.default.createElement(_reactNativeElements.Button, {
      style: style.prevNextButton,
      title: '>',
      onPress: () => fetchDay((0, _types.addDays)(startTime, 1))
    })), !events || !events.length ? /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, "No events scheduled for today") : '', events && events.length > 0 ? /*#__PURE__*/_react.default.createElement(_EventDetailList.EventDetailList, {
      eventList: events,
      key: 'detail-list',
      renderEventFunc: renderEventFunc,
      descriptionLength: descriptionLength,
      onPress: e => {
        if (viewAs === _types.CalendarViewType.CalendarExclusiveBook) {
          setSelectedBookableEvent(e);
        }
      }
    }) : '');
  };
  const renderDayList = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, !events || !events.length ? /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, "No events scheduled for today") : '', events && events.length > 0 ? /*#__PURE__*/_react.default.createElement(_EventDetailList.EventDetailList, {
      eventList: events,
      key: 'detail-list',
      renderEventFunc: renderEventFunc,
      descriptionLength: descriptionLength,
      onPress: e => {
        if (viewAs === _types.CalendarViewType.CalendarExclusiveBook) {
          setSelectedBookableEvent(e);
        }
      }
    }) : '');
  };
  const renderList = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.viewContainer
    }, !events || !events.length ? /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.emptySectionText
    }, "No events found") : '', events && events.length > 0 ? /*#__PURE__*/_react.default.createElement(_EventListGroupedByDay.EventListGroupedByDay, {
      events: events,
      descriptionLength: descriptionLength,
      renderEventFunc: renderEventFunc,
      onPress: e => {
        if (viewAs === _types.CalendarViewType.CalendarExclusiveBook) {
          setSelectedBookableEvent(e);
        }
      }
    }) : '');
  };
  const renderMyReservationsList = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.viewContainer
    }, !reservations || !reservations.length ? /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.emptySectionText
    }, "No reservations found") : '', reservations && reservations.length > 0 ? /*#__PURE__*/_react.default.createElement(_SingleDayReservationList.SingleDayReservationList, {
      reservations: reservations,
      renderReservationFunc: renderReservationFunc,
      onPress: res => setSelectedReservation(res)
    }) : '', selectedReservation ? viewMyReservation() : '');
  };
  const viewMyReservation = () => {
    if (selectedReservation === undefined) {
      console.log('there is no reservation to show');
      return '';
    }
    return /*#__PURE__*/_react.default.createElement(_ViewReservation.ViewReservation, {
      key: "view-reservation",
      reservation: selectedReservation,
      onClose: () => setSelectedReservation(undefined),
      cancellationClicked: () => cancelReservation()
    });
  };
  const renderView = () => {
    if (!viewAs || viewAs === _types.CalendarViewType.List) {
      return renderList();
    }
    if (viewAs === _types.CalendarViewType.CalendarView) {
      return renderCalendarView();
    }
    if (viewAs === _types.CalendarViewType.DayList) {
      return renderDayListWithDaySelector();
    }
    if (viewAs === _types.CalendarViewType.DayView) {
      return renderDayList();
    }
    if (viewAs === _types.CalendarViewType.DayViewByLocation) {
      return renderDayCalendarByLocation();
    }
    if (viewAs === _types.CalendarViewType.CalendarBook) {
      return renderCalendarBook();
    }
    if (viewAs === _types.CalendarViewType.CalendarExclusiveBook) {
      return renderCalendarExclusiveBook();
    }
    if (viewAs === _types.CalendarViewType.MyEventsList) {
      return renderMyReservationsList();
    }
    return renderList();
  };
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, null, renderView());
};
exports.Calendar = Calendar;
const style = _reactNative.StyleSheet.create({
  defaultDropdownStyle: {
    width: '80%',
    alignSelf: 'center',
    marginBottom: 10
  },
  sectionHeader2: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '500'
  },
  emptySectionText: {
    textAlign: 'center',
    color: '#999999'
  },
  viewContainer: {},
  eventsContainer: {
    width: '100%',
    paddingBottom: 5
  },
  resourceName: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#999999',
    marginTop: 10
  },
  daySelectorContainer: {
    alignContent: 'center',
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 20,
    paddingRight: 10
  },
  daySelectorDayText: {
    flex: 1,
    alignContent: 'center',
    verticalAlign: 'middle',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    paddingTop: 10
  },
  prevNextButton: {
    width: 40,
    height: 40,
    flexDirection: 'row',
    flex: 1
  },
  eventNotFound: {
    textAlign: 'center',
    padding: 20
  }
});
//# sourceMappingURL=Calendar.js.map