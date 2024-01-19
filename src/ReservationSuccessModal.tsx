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
import { useFocusEffect } from '@react-navigation/native';
import type { BookingResultPage } from './BookingResultPage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Pressable } from 'react-native';

interface Props {
  timezone: string;
  bookingResult: BookingResultPage;
  onClose?: () => void;
}

export const ReservationSuccessModal = ({
  bookingResult,
  timezone,
  onClose,
}: Props) => {
  useEffect(() => {
    // TODO check this logic
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      return; // happens when this view is unfocused
    }, [])
  );

  const reserveSuccessDialog = () => {
    return (
      <Modal
        animationType="none"
        transparent={true}
        onRequestClose={() => {
          if (onClose) {
            onClose();
          }
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={style.modalContainer}
          onPressOut={() => {
            if (onClose) {
              onClose();
            }
          }}
        >
          <ScrollView
            directionalLockEnabled={true}
            contentContainerStyle={style.scrollModal}
          >
            <TouchableWithoutFeedback>
              <View style={style.centeredView}>
                <View style={style.modalView}>
                  <Text style={style.sectionHeader2}>Booking confirmed</Text>
                  <View style={style.modalHeader}>
                    <Text style={style.flexText}>
                      You've booked{' '}
                      {bookingResult.resource
                        ? bookingResult.resource.resource.name
                        : bookingResult.event
                        ? bookingResult.event.title
                        : ''}
                    </Text>
                  </View>

                  <View style={style.modalHeader}>
                    <View style={style.modalRow}>
                      <MaterialCommunityIcons
                        name="calendar-month"
                        size={16}
                        style={style.flexIcon}
                      />
                      <Text style={style.flexText}>
                        {new Date(
                          bookingResult.request.startTimeUtc
                        ).toLocaleString('en-us', {
                          timeZone: timezone.toString(),
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true,
                        })}{' '}
                        to&nbsp;
                        {new Date(
                          bookingResult.request.endTimeUtc
                        ).toLocaleString('en-us', {
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
                        name={
                          bookingResult && bookingResult.resource
                            ? 'clock-outline'
                            : 'note-text'
                        }
                        size={16}
                        style={style.flexIcon}
                      />
                      <Text style={style.flexText}>
                        {bookingResult && bookingResult.resource
                          ? bookingResult.resource.resource
                              .bookingDurationInMin + ' min'
                          : bookingResult.event
                          ? bookingResult.event.description
                          : ''}
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

                    <View style={style.modalRow}>
                      <Text style={style.flexText}>
                        An invitation has been emailed to you.
                      </Text>
                    </View>

                    <View style={style.modalRow}>
                      <Pressable
                        style={[style.modalButton, style.modalCloseButton]}
                        onPress={() => {
                          if (onClose) {
                            onClose();
                          }
                        }}
                      >
                        <Text style={style.textStyle}>Close</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    );
  };

  return reserveSuccessDialog();
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
  sectionHeader2: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  scrollModal: {},
});
