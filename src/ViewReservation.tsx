import React from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { EventReservation } from '@airjam/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  reservation: EventReservation;
  onClose?: () => void;
  cancellationClicked?: (reservation: EventReservation) => void;
}

export const ViewReservation = ({
  reservation,
  onClose,
  cancellationClicked,
}: Props) => {
  React.useEffect(() => {
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

  const viewMyReservation = () => {
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
                  <Text style={style.sectionHeader2}>{reservation.title}</Text>
                  <View style={style.modalHeader}>
                    <View style={style.modalRow}>
                      <MaterialCommunityIcons
                        name="calendar-month"
                        size={16}
                        style={style.flexIcon}
                      />
                      <Text style={style.flexText}>
                        {new Date(reservation.startTimeUtc).toLocaleString(
                          'en-us',
                          {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                          }
                        )}{' '}
                        to&nbsp;
                        {new Date(reservation.endTimeUtc).toLocaleString(
                          'en-us',
                          {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                          }
                        )}
                      </Text>
                    </View>
                    <View style={style.modalRow}>
                      <MaterialCommunityIcons
                        name="earth"
                        size={16}
                        style={style.flexIcon}
                      />
                      <Text style={style.flexText}>
                        Reservation id: {reservation.reservationId}
                      </Text>
                    </View>

                    <View style={style.modalRow}>
                      <Pressable
                        style={[style.modalButton, style.modalCloseButton]}
                        onPress={() => {
                          if (cancellationClicked) {
                            cancellationClicked(reservation);
                          }
                        }}
                      >
                        <Text style={style.textStyle}>Cancel Reservation</Text>
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
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    );
  };

  return viewMyReservation();
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
  errorMessage: {
    color: 'red',
  },
});
