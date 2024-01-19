"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReservationSuccessModal = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _native = require("@react-navigation/native");
var _MaterialCommunityIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialCommunityIcons"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ReservationSuccessModal = ({
  bookingResult,
  timezone,
  onClose
}) => {
  (0, _react.useEffect)(() => {
    // TODO check this logic
  }, []);
  (0, _native.useFocusEffect)(_react.default.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const reserveSuccessDialog = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
      animationType: "none",
      transparent: true,
      onRequestClose: () => {
        if (onClose) {
          onClose();
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      activeOpacity: 1,
      style: style.modalContainer,
      onPressOut: () => {
        if (onClose) {
          onClose();
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
      directionalLockEnabled: true,
      contentContainerStyle: style.scrollModal
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.centeredView
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.modalView
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.sectionHeader2
    }, "Booking confirmed"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.modalHeader
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.flexText
    }, "You've booked", ' ', bookingResult.resource ? bookingResult.resource.resource.name : bookingResult.event ? bookingResult.event.title : '')), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.modalHeader
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.modalRow
    }, /*#__PURE__*/_react.default.createElement(_MaterialCommunityIcons.default, {
      name: "calendar-month",
      size: 16,
      style: style.flexIcon
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.flexText
    }, new Date(bookingResult.request.startTimeUtc).toLocaleString('en-us', {
      timeZone: timezone.toString(),
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }), ' ', "to\xA0", new Date(bookingResult.request.endTimeUtc).toLocaleString('en-us', {
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
      name: bookingResult && bookingResult.resource ? 'clock-outline' : 'note-text',
      size: 16,
      style: style.flexIcon
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.flexText
    }, bookingResult && bookingResult.resource ? bookingResult.resource.resource.bookingDurationInMin + ' min' : bookingResult.event ? bookingResult.event.description : '')), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.modalRow
    }, /*#__PURE__*/_react.default.createElement(_MaterialCommunityIcons.default, {
      name: "earth",
      size: 16,
      style: style.flexIcon
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.flexText
    }, timezone)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.modalRow
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.flexText
    }, "An invitation has been emailed to you.")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.modalRow
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
      style: [style.modalButton, style.modalCloseButton],
      onPress: () => {
        if (onClose) {
          onClose();
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.textStyle
    }, "Close"))))))))));
  };
  return reserveSuccessDialog();
};
exports.ReservationSuccessModal = ReservationSuccessModal;
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
  sectionHeader2: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '500'
  },
  scrollModal: {}
});
//# sourceMappingURL=ReservationSuccessModal.js.map