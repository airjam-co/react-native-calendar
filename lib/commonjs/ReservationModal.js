"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReservationModal = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativePaper = require("react-native-paper");
var _native = require("@react-navigation/native");
var _MaterialCommunityIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialCommunityIcons"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ReservationModal = ({
  timezone,
  resourceOrEvent,
  authToken,
  name,
  email,
  notes,
  onClose,
  submitPressed,
  onNameChanged,
  onEmailChanged,
  onNotesChanged
}) => {
  (0, _react.useEffect)(() => {
    // TODO check this logic
  }, []);
  (0, _native.useFocusEffect)(_react.default.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const closeModal = () => {
    if (onClose) {
      onClose();
    }
  };
  const reserveDialog = () => {
    const resource = 'resource' in resourceOrEvent ? resourceOrEvent : undefined;
    const event = 'eventId' in resourceOrEvent ? resourceOrEvent : undefined;
    if (!resourceOrEvent || !resourceOrEvent.startTimeUtc || !resourceOrEvent.endTimeUtc) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null);
    }
    const selectedStartTime = new Date(resourceOrEvent.startTimeUtc);
    const selectedEndTime = new Date(resourceOrEvent.endTimeUtc);
    if (!selectedStartTime || !selectedEndTime) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null);
    }
    const requestStartTime = new Date(resourceOrEvent.startTimeUtc);
    const requestEndTime = new Date(resourceOrEvent.endTimeUtc);
    return /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
      animationType: "none",
      transparent: true,
      onRequestClose: () => closeModal()
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      activeOpacity: 1,
      style: style.modalContainer,
      onPressOut: () => closeModal()
    }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
      directionalLockEnabled: true,
      contentContainerStyle: style.scrollModal
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.centeredView
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.modalView
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.sectionHeader2
    }, resource ? resource.resource.name : '', event ? event.title : ''), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.modalHeader
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.modalRow
    }, /*#__PURE__*/_react.default.createElement(_MaterialCommunityIcons.default, {
      name: "calendar-month",
      size: 16,
      style: style.flexIcon
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.flexText
    }, requestStartTime.toLocaleString('en-us', {
      timeZone: timezone.toString(),
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }), ' ', "to", ' ', requestEndTime.toLocaleString('en-us', {
      timeZone: timezone.toString(),
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.modalRow
    }, /*#__PURE__*/_react.default.createElement(_MaterialCommunityIcons.default, {
      name: resource ? 'clock-outline' : 'note-text',
      size: 16,
      style: style.flexIcon
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.flexText
    }, resource ? resource.resource.bookingDurationInMin + ' min' : '', event ? event.description : '')), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.modalRow
    }, /*#__PURE__*/_react.default.createElement(_MaterialCommunityIcons.default, {
      name: "earth",
      size: 16,
      style: style.flexIcon
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.flexText
    }, timezone))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.modalForm
    }, !authToken ? /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, "Name*") : '', !authToken ? /*#__PURE__*/_react.default.createElement(_reactNativePaper.TextInput, {
      mode: "outlined",
      style: style.modalTextInput,
      label: 'Name',
      autoCapitalize: "none",
      autoComplete: "name",
      autoFocus: true,
      onChangeText: text => {
        if (onNameChanged) {
          onNameChanged(text);
        }
      },
      value: name
    }) : '', !authToken ? /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, "Email*") : '', !authToken ? /*#__PURE__*/_react.default.createElement(_reactNativePaper.TextInput, {
      mode: "outlined",
      style: style.modalTextInput,
      label: 'Email',
      keyboardType: "email-address",
      autoCapitalize: "none",
      autoCorrect: false,
      autoComplete: "email",
      autoFocus: true,
      onChangeText: text => {
        if (onEmailChanged) {
          onEmailChanged(text);
        }
      },
      value: email
    }) : '', /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, "Notes"), /*#__PURE__*/_react.default.createElement(_reactNativePaper.TextInput, {
      mode: "outlined",
      style: style.modalTextInput,
      label: 'Notes',
      keyboardType: "default",
      autoCapitalize: "none",
      autoCorrect: false,
      autoComplete: "off",
      autoFocus: true,
      onChangeText: text => {
        if (onNotesChanged) {
          onNotesChanged(text);
        }
      },
      value: notes
    })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.modalRow
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
      style: [style.modalButton, style.modalCloseButton],
      onPress: () => {
        if (submitPressed) {
          submitPressed(resourceOrEvent);
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.textStyle
    }, "Book")), /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
      style: [style.modalButton, style.modalCloseButton],
      onPress: () => closeModal()
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.textStyle
    }, "Close")))))))));
  };
  return reserveDialog();
};
exports.ReservationModal = ReservationModal;
const style = _reactNative.StyleSheet.create({
  modalHeader: {
    marginTop: 10,
    marginBottom: 10
  },
  modalRow: {
    flexDirection: 'row',
    marginBottom: 5
  },
  modalButton: {
    borderRadius: 5,
    margin: 5,
    padding: 10,
    elevation: 2
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalCloseButton: {
    backgroundColor: '#2196F3'
  },
  flexIcon: {
    alignSelf: 'flex-start'
  },
  flexText: {
    fontSize: 14,
    marginLeft: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalForm: {
    alignSelf: 'stretch'
  },
  modalTextInput: {
    backgroundColor: 'transparent',
    color: ''
  },
  sectionHeader2: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '500'
  },
  scrollModal: {}
});
//# sourceMappingURL=ReservationModal.js.map