import React, { useEffect } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import type { BookableEvent } from '@airjam/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Pressable } from 'react-native';
import type { BookingRequestResource } from './BookingRequestResource';

interface Props {
  timezone: string;
  resourceOrEvent: BookingRequestResource | BookableEvent;
  authToken?: string;
  name: string;
  email: string;
  notes: string;
  onClose?: () => void;
  submitPressed?: (
    resourceOrEvent: BookingRequestResource | BookableEvent
  ) => void;
  onNameChanged?: (newName: string) => void;
  onEmailChanged?: (newEmail: string) => void;
  onNotesChanged?: (newNotes: string) => void;
}

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
  onNotesChanged,
}: Props) => {
  useEffect(() => {
    // TODO check this logic
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      return; // happens when this view is unfocused
    }, [])
  );

  const closeModal = () => {
    if (onClose) {
      onClose();
    }
  };

  const reserveDialog = (): React.JSX.Element => {
    const resource =
      'resource' in resourceOrEvent
        ? (resourceOrEvent as BookingRequestResource)
        : undefined;
    const event =
      'eventId' in resourceOrEvent
        ? (resourceOrEvent as BookableEvent)
        : undefined;
    if (
      !resourceOrEvent ||
      !resourceOrEvent.startTimeUtc ||
      !resourceOrEvent.endTimeUtc
    ) {
      return <View />;
    }
    const selectedStartTime = new Date(resourceOrEvent.startTimeUtc);
    const selectedEndTime = new Date(resourceOrEvent.endTimeUtc);
    if (!selectedStartTime || !selectedEndTime) {
      return <View />;
    }
    const requestStartTime = new Date(resourceOrEvent.startTimeUtc);
    const requestEndTime = new Date(resourceOrEvent.endTimeUtc);

    return (
      <Modal
        animationType="none"
        transparent={true}
        onRequestClose={() => closeModal()}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={style.modalContainer}
          onPressOut={() => closeModal()}
        >
          <ScrollView
            directionalLockEnabled={true}
            contentContainerStyle={style.scrollModal}
          >
            <TouchableWithoutFeedback>
              <View style={style.centeredView}>
                <View style={style.modalView}>
                  <Text style={style.sectionHeader2}>
                    {resource ? resource.resource.name : ''}
                    {event ? event.title : ''}
                  </Text>

                  <View style={style.modalHeader}>
                    <View style={style.modalRow}>
                      <MaterialCommunityIcons
                        name="calendar-month"
                        size={16}
                        style={style.flexIcon}
                      />
                      <Text style={style.flexText}>
                        {requestStartTime.toLocaleString('en-us', {
                          timeZone: timezone.toString(),
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true,
                        })}{' '}
                        to{' '}
                        {requestEndTime.toLocaleString('en-us', {
                          timeZone: timezone.toString(),
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true,
                        })}
                      </Text>
                    </View>
                    <View style={style.modalRow}>
                      <MaterialCommunityIcons
                        name={resource ? 'clock-outline' : 'note-text'}
                        size={16}
                        style={style.flexIcon}
                      />
                      <Text style={style.flexText}>
                        {resource
                          ? resource.resource.bookingDurationInMin + ' min'
                          : ''}
                        {event ? event.description : ''}
                      </Text>
                    </View>
                    <View style={style.modalRow}>
                      <MaterialCommunityIcons
                        name="earth"
                        size={16}
                        style={style.flexIcon}
                      />
                      <Text style={style.flexText}>{timezone}</Text>
                    </View>
                  </View>
                  <View style={style.modalForm}>
                    {!authToken ? <Text>Name*</Text> : ''}
                    {!authToken ? (
                      <TextInput
                        mode="outlined"
                        style={style.modalTextInput}
                        label={'Name'}
                        autoCapitalize="none"
                        autoComplete="name"
                        autoFocus={true}
                        onChangeText={(text: string) => {
                          if (onNameChanged) {
                            onNameChanged(text);
                          }
                        }}
                        value={name}
                      />
                    ) : (
                      ''
                    )}
                    {!authToken ? <Text>Email*</Text> : ''}
                    {!authToken ? (
                      <TextInput
                        mode="outlined"
                        style={style.modalTextInput}
                        label={'Email'}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="email"
                        autoFocus={true}
                        onChangeText={(text: string) => {
                          if (onEmailChanged) {
                            onEmailChanged(text);
                          }
                        }}
                        value={email}
                      />
                    ) : (
                      ''
                    )}
                    <Text>Notes</Text>
                    <TextInput
                      mode="outlined"
                      style={style.modalTextInput}
                      label={'Notes'}
                      keyboardType="default"
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoComplete="off"
                      autoFocus={true}
                      onChangeText={(text: string) => {
                        if (onNotesChanged) {
                          onNotesChanged(text);
                        }
                      }}
                      value={notes}
                    />
                  </View>
                  <View style={style.modalRow}>
                    <Pressable
                      style={[style.modalButton, style.modalCloseButton]}
                      onPress={() => {
                        if (submitPressed) {
                          submitPressed(resourceOrEvent);
                        }
                      }}
                    >
                      <Text style={style.textStyle}>Book</Text>
                    </Pressable>
                    <Pressable
                      style={[style.modalButton, style.modalCloseButton]}
                      onPress={() => closeModal()}
                    >
                      <Text style={style.textStyle}>Close</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    );
  };

  return reserveDialog();
};

const style = StyleSheet.create({
  modalHeader: {
    marginTop: 10,
    marginBottom: 10,
  },
  modalRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  modalButton: {
    borderRadius: 5,
    margin: 5,
    padding: 10,
    elevation: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalCloseButton: {
    backgroundColor: '#2196F3',
  },
  flexIcon: {
    alignSelf: 'flex-start',
  },
  flexText: {
    fontSize: 14,
    marginLeft: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalForm: {
    alignSelf: 'stretch',
  },
  modalTextInput: {
    backgroundColor: 'transparent',
    color: '',
  },
  sectionHeader2: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  scrollModal: {},
});
