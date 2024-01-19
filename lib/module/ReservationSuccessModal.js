import React, { useEffect } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Pressable } from 'react-native';
export const ReservationSuccessModal = ({
  bookingResult,
  timezone,
  onClose
}) => {
  useEffect(() => {
    // TODO check this logic
  }, []);
  useFocusEffect(React.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const reserveSuccessDialog = () => {
    return /*#__PURE__*/React.createElement(Modal, {
      animationType: "none",
      transparent: true,
      onRequestClose: () => {
        if (onClose) {
          onClose();
        }
      }
    }, /*#__PURE__*/React.createElement(TouchableOpacity, {
      activeOpacity: 1,
      style: style.modalContainer,
      onPressOut: () => {
        if (onClose) {
          onClose();
        }
      }
    }, /*#__PURE__*/React.createElement(ScrollView, {
      directionalLockEnabled: true,
      contentContainerStyle: style.scrollModal
    }, /*#__PURE__*/React.createElement(TouchableWithoutFeedback, null, /*#__PURE__*/React.createElement(View, {
      style: style.centeredView
    }, /*#__PURE__*/React.createElement(View, {
      style: style.modalView
    }, /*#__PURE__*/React.createElement(Text, {
      style: style.sectionHeader2
    }, "Booking confirmed"), /*#__PURE__*/React.createElement(View, {
      style: style.modalHeader
    }, /*#__PURE__*/React.createElement(Text, {
      style: style.flexText
    }, "You've booked", ' ', bookingResult.resource ? bookingResult.resource.resource.name : bookingResult.event ? bookingResult.event.title : '')), /*#__PURE__*/React.createElement(View, {
      style: style.modalHeader
    }, /*#__PURE__*/React.createElement(View, {
      style: style.modalRow
    }, /*#__PURE__*/React.createElement(MaterialCommunityIcons, {
      name: "calendar-month",
      size: 16,
      style: style.flexIcon
    }), /*#__PURE__*/React.createElement(Text, {
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
    }))), /*#__PURE__*/React.createElement(View, {
      style: style.modalRow
    }, /*#__PURE__*/React.createElement(MaterialCommunityIcons, {
      name: bookingResult && bookingResult.resource ? 'clock-outline' : 'note-text',
      size: 16,
      style: style.flexIcon
    }), /*#__PURE__*/React.createElement(Text, {
      style: style.flexText
    }, bookingResult && bookingResult.resource ? bookingResult.resource.resource.bookingDurationInMin + ' min' : bookingResult.event ? bookingResult.event.description : '')), /*#__PURE__*/React.createElement(View, {
      style: style.modalRow
    }, /*#__PURE__*/React.createElement(MaterialCommunityIcons, {
      name: "earth",
      size: 16,
      style: style.flexIcon
    }), /*#__PURE__*/React.createElement(Text, {
      style: style.flexText
    }, timezone)), /*#__PURE__*/React.createElement(View, {
      style: style.modalRow
    }, /*#__PURE__*/React.createElement(Text, {
      style: style.flexText
    }, "An invitation has been emailed to you.")), /*#__PURE__*/React.createElement(View, {
      style: style.modalRow
    }, /*#__PURE__*/React.createElement(Pressable, {
      style: [style.modalButton, style.modalCloseButton],
      onPress: () => {
        if (onClose) {
          onClose();
        }
      }
    }, /*#__PURE__*/React.createElement(Text, {
      style: style.textStyle
    }, "Close"))))))))));
  };
  return reserveSuccessDialog();
};
const style = StyleSheet.create({
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