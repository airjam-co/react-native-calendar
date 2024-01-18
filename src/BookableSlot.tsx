import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import type { BookingResource, TimeRange } from '@airjam/types';
import type { BookingRequestResource } from './BookingRequestResource';

interface Props {
  resource: BookingResource;
  slot: TimeRange;
  key?: string;
  descriptionLength?: number;
  timezone: string;
  onPress?: (dialogResource: BookingRequestResource) => void;
}

const showTime = (timeToShow: Date, timezone: string) => {
  return timeToShow.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: timezone.toString(),
  });
};

export const BookableSlot = ({
  key,
  resource,
  slot,
  timezone,
  onPress,
}: Props) => {
  React.useEffect(() => {});

  useFocusEffect(
    React.useCallback(() => {
      return; // happens when this view is unfocused
    }, [])
  );

  const renderBookableSlot = () => {
    if (!slot.startTimeUtc || !slot.endTimeUtc) {
      return <View key={key} />;
    }
    const startTimeUtc = new Date(slot.startTimeUtc);
    const dialogResource = {
      resource: resource,
      startTimeUtc: startTimeUtc,
      endTimeUtc: slot.endTimeUtc,
    } as BookingRequestResource;
    return (
      <View key={key}>
        <Button
          style={style.resourceSlotButton}
          onPress={() => {
            if (onPress) {
              onPress(dialogResource);
            }
          }}
          title={showTime(startTimeUtc, timezone)}
        />
      </View>
    );
  };

  return renderBookableSlot();
};

const style = StyleSheet.create({
  resourceSlotButton: {
    width: '80%',
    margin: 5,
    alignSelf: 'center',
  },
});
