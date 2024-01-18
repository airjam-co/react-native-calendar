"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewReservation = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _native = require("@react-navigation/native");
var _MaterialCommunityIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialCommunityIcons"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ViewReservation = ({
  reservation,
  onClose,
  cancellationClicked
}) => {
  _react.default.useEffect(() => {
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
  const viewMyReservation = () => {
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
    }, reservation.title), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.modalHeader
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.modalRow
    }, /*#__PURE__*/_react.default.createElement(_MaterialCommunityIcons.default, {
      name: "calendar-month",
      size: 16,
      style: style.flexIcon
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.flexText
    }, new Date(reservation.startTimeUtc).toLocaleString('en-us', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }), ' ', "to\xA0", new Date(reservation.endTimeUtc).toLocaleString('en-us', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.modalRow
    }, /*#__PURE__*/_react.default.createElement(_MaterialCommunityIcons.default, {
      name: "earth",
      size: 16,
      style: style.flexIcon
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.flexText
    }, "Reservation id: ", reservation.reservationId)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.modalRow
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
      style: [style.modalButton, style.modalCloseButton],
      onPress: () => {
        if (cancellationClicked) {
          cancellationClicked(reservation);
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.textStyle
    }, "Cancel Reservation")), /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
      style: [style.modalButton, style.modalCloseButton],
      onPress: () => closeModal()
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.textStyle
    }, "Close"))))))))));
  };
  return viewMyReservation();
};
exports.ViewReservation = ViewReservation;
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
  scrollModal: {},
  errorMessage: {
    color: 'red'
  }
});
//# sourceMappingURL=ViewReservation.js.map