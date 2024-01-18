"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingleDayReservationList = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _native = require("@react-navigation/native");
var _reactNativeElements = require("react-native-elements");
var _ReservationDetail = require("./ReservationDetail");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const SingleDayReservationList = ({
  reservations,
  onPress,
  renderReservationFunc
}) => {
  _react.default.useEffect(() => {});
  (0, _native.useFocusEffect)(_react.default.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const renderReservationsByDay = () => {
    const reservationsByDays = new Map();
    for (let i = 0; i < reservations.length; i++) {
      const currentReservation = reservations[i];
      if (currentReservation && currentReservation.startTimeUtc) {
        const startDateForEvent = new Date(currentReservation.startTimeUtc);
        const dayToUse = new Date(startDateForEvent.getFullYear(), startDateForEvent.getMonth(), startDateForEvent.getDate());
        const dayIdx = dayToUse.getTime() / 1000;
        let pushedDayReservations = [];
        if (reservationsByDays.has(dayIdx)) {
          pushedDayReservations = reservationsByDays.get(dayIdx);
        }
        pushedDayReservations.push(currentReservation);
        reservationsByDays.set(dayIdx, pushedDayReservations);
      }
    }
    const keys = [];
    for (const entry of Array.from(reservationsByDays.entries())) {
      const k = entry[0];
      keys.push(k);
    }
    keys.sort();
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.eventsByDayContainer
    }, keys.map(function (k) {
      if (reservationsByDays.has(k)) {
        return renderReservationsGroupedByDay(reservationsByDays.get(k), k);
      }
      return '';
    }));
  };
  const renderReservationsGroupedByDay = (renderingReservations, dayTimestamp) => {
    if (!renderingReservations || !renderingReservations.length || !renderingReservations[0] || !renderingReservations[0].startTimeUtc) {
      return '';
    }
    const startDay = new Date(renderingReservations[0].startTimeUtc);
    const dayToUse = new Date(startDay.getFullYear(), startDay.getMonth(), startDay.getDate());
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      key: 'g' + dayTimestamp
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.dayGroupLabel
    }, dayToUse.toDateString()), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.dayGroupContainer
    }, renderReservations(renderingReservations)), /*#__PURE__*/_react.default.createElement(_reactNativeElements.Divider, {
      width: 1
    }));
  };
  const renderReservations = renderingEvents => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.eventsContainer
    }, renderingEvents.map(function (e, idx) {
      if (renderReservationFunc) {
        return renderReservationFunc(e, idx);
      }
      return /*#__PURE__*/_react.default.createElement(_ReservationDetail.ReservationDetail, {
        uniqueKey: '' + idx,
        key: 'detail-' + idx,
        reservation: e,
        onPress: res => {
          if (onPress) {
            onPress(res);
          }
        }
      });
    }));
  };
  return renderReservationsByDay();
};
exports.SingleDayReservationList = SingleDayReservationList;
const style = _reactNative.StyleSheet.create({
  eventsByDayContainer: {
    flex: 1
  },
  eventsContainer: {
    width: '100%',
    paddingBottom: 5
  },
  dayGroupLabel: {
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 14,
    color: '#777777'
  },
  dayGroupContainer: {
    flex: 1
  }
});
//# sourceMappingURL=SingleDayReservationList.js.map