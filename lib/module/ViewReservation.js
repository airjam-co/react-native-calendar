import React from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export const ViewReservation = ({
  reservation,
  onClose,
  cancellationClicked
}) => {
  React.useEffect(() => {
    // TODO check this logic
  }, []);
  useFocusEffect(React.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const closeModal = () => {
    if (onClose) {
      onClose();
    }
  };
  const viewMyReservation = () => {
    return /*#__PURE__*/React.createElement(Modal, {
      animationType: "none",
      transparent: true,
      onRequestClose: () => closeModal()
    }, /*#__PURE__*/React.createElement(TouchableOpacity, {
      activeOpacity: 1,
      style: style.modalContainer,
      onPressOut: () => closeModal()
    }, /*#__PURE__*/React.createElement(ScrollView, {
      directionalLockEnabled: true,
      contentContainerStyle: style.scrollModal
    }, /*#__PURE__*/React.createElement(TouchableWithoutFeedback, null, /*#__PURE__*/React.createElement(View, {
      style: style.centeredView
    }, /*#__PURE__*/React.createElement(View, {
      style: style.modalView
    }, /*#__PURE__*/React.createElement(Text, {
      style: style.sectionHeader2
    }, reservation.title), /*#__PURE__*/React.createElement(View, {
      style: style.modalHeader
    }, /*#__PURE__*/React.createElement(View, {
      style: style.modalRow
    }, /*#__PURE__*/React.createElement(MaterialCommunityIcons, {
      name: "calendar-month",
      size: 16,
      style: style.flexIcon
    }), /*#__PURE__*/React.createElement(Text, {
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
    }))), /*#__PURE__*/React.createElement(View, {
      style: style.modalRow
    }, /*#__PURE__*/React.createElement(MaterialCommunityIcons, {
      name: "earth",
      size: 16,
      style: style.flexIcon
    }), /*#__PURE__*/React.createElement(Text, {
      style: style.flexText
    }, "Reservation id: ", reservation.reservationId)), /*#__PURE__*/React.createElement(View, {
      style: style.modalRow
    }, /*#__PURE__*/React.createElement(Pressable, {
      style: [style.modalButton, style.modalCloseButton],
      onPress: () => {
        if (cancellationClicked) {
          cancellationClicked(reservation);
        }
      }
    }, /*#__PURE__*/React.createElement(Text, {
      style: style.textStyle
    }, "Cancel Reservation")), /*#__PURE__*/React.createElement(Pressable, {
      style: [style.modalButton, style.modalCloseButton],
      onPress: () => closeModal()
    }, /*#__PURE__*/React.createElement(Text, {
      style: style.textStyle
    }, "Close"))))))))));
  };
  return viewMyReservation();
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
  scrollModal: {},
  errorMessage: {
    color: 'red'
  }
});
//# sourceMappingURL=ViewReservation.js.map