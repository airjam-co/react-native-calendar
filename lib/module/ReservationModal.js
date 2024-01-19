import React, { useEffect } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Pressable } from 'react-native';
export const ReservationModal = ({
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
  useEffect(() => {
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
  const reserveDialog = () => {
    const resource = 'resource' in resourceOrEvent ? resourceOrEvent : undefined;
    const event = 'eventId' in resourceOrEvent ? resourceOrEvent : undefined;
    if (!resourceOrEvent || !resourceOrEvent.startTimeUtc || !resourceOrEvent.endTimeUtc) {
      return /*#__PURE__*/React.createElement(View, null);
    }
    const selectedStartTime = new Date(resourceOrEvent.startTimeUtc);
    const selectedEndTime = new Date(resourceOrEvent.endTimeUtc);
    if (!selectedStartTime || !selectedEndTime) {
      return /*#__PURE__*/React.createElement(View, null);
    }
    const requestStartTime = new Date(resourceOrEvent.startTimeUtc);
    const requestEndTime = new Date(resourceOrEvent.endTimeUtc);
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
    }, resource ? resource.resource.name : '', event ? event.title : ''), /*#__PURE__*/React.createElement(View, {
      style: style.modalHeader
    }, /*#__PURE__*/React.createElement(View, {
      style: style.modalRow
    }, /*#__PURE__*/React.createElement(MaterialCommunityIcons, {
      name: "calendar-month",
      size: 16,
      style: style.flexIcon
    }), /*#__PURE__*/React.createElement(Text, {
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
    }))), /*#__PURE__*/React.createElement(View, {
      style: style.modalRow
    }, /*#__PURE__*/React.createElement(MaterialCommunityIcons, {
      name: resource ? 'clock-outline' : 'note-text',
      size: 16,
      style: style.flexIcon
    }), /*#__PURE__*/React.createElement(Text, {
      style: style.flexText
    }, resource ? resource.resource.bookingDurationInMin + ' min' : '', event ? event.description : '')), /*#__PURE__*/React.createElement(View, {
      style: style.modalRow
    }, /*#__PURE__*/React.createElement(MaterialCommunityIcons, {
      name: "earth",
      size: 16,
      style: style.flexIcon
    }), /*#__PURE__*/React.createElement(Text, {
      style: style.flexText
    }, timezone))), /*#__PURE__*/React.createElement(View, {
      style: style.modalForm
    }, !authToken ? /*#__PURE__*/React.createElement(Text, null, "Name*") : '', !authToken ? /*#__PURE__*/React.createElement(TextInput, {
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
    }) : '', !authToken ? /*#__PURE__*/React.createElement(Text, null, "Email*") : '', !authToken ? /*#__PURE__*/React.createElement(TextInput, {
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
    }) : '', /*#__PURE__*/React.createElement(Text, null, "Notes"), /*#__PURE__*/React.createElement(TextInput, {
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
    })), /*#__PURE__*/React.createElement(View, {
      style: style.modalRow
    }, /*#__PURE__*/React.createElement(Pressable, {
      style: [style.modalButton, style.modalCloseButton],
      onPress: () => {
        if (submitPressed) {
          submitPressed(resourceOrEvent);
        }
      }
    }, /*#__PURE__*/React.createElement(Text, {
      style: style.textStyle
    }, "Book")), /*#__PURE__*/React.createElement(Pressable, {
      style: [style.modalButton, style.modalCloseButton],
      onPress: () => closeModal()
    }, /*#__PURE__*/React.createElement(Text, {
      style: style.textStyle
    }, "Close")))))))));
  };
  return reserveDialog();
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