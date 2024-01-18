"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReservationDetail = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _native = require("@react-navigation/native");
var _types = require("@airjam/types");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ReservationDetail = ({
  reservation,
  uniqueKey,
  descriptionLength,
  onPress
}) => {
  _react.default.useEffect(() => {});
  (0, _native.useFocusEffect)(_react.default.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const pressableReservation = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      key: uniqueKey,
      onPress: () => {
        if (onPress) {
          onPress(reservation, uniqueKey);
        }
      }
    }, renderDetail());
  };
  const renderDetail = () => {
    let note = reservation.notes ? reservation.notes : '';
    const descLimit = descriptionLength || _types.DEFAULT_DESCRIPTION_LENGTH_CUTOFF;
    if (descLimit > 2 && note.length > descLimit) {
      note = note.substring(0, descLimit - 3) + '...';
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [style.eventContainer]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.eventContainerLhs
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.eventTime
    }, (0, _types.formatReservationTimeFrame)(reservation))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.eventContainerRhs
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.eventTitle
    }, reservation.title), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.eventLocation
    }, reservation.location), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.eventDescription
    }, note)));
  };
  if (onPress) {
    return pressableReservation();
  }
  return renderDetail();
};
exports.ReservationDetail = ReservationDetail;
const style = _reactNative.StyleSheet.create({
  eventContainer: {
    backgroundColor: '#e1e1e1',
    borderRadius: 3,
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 15,
    flexDirection: 'row'
  },
  eventContainerLhs: {
    alignSelf: 'stretch',
    width: '30%'
  },
  eventContainerRhs: {
    marginLeft: 5,
    width: '70%'
  },
  eventTitle: {
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 2
  },
  eventTime: {
    color: '#777777',
    fontWeight: '400'
  },
  eventLocation: {
    color: '#777777',
    flexWrap: 'wrap',
    flexShrink: 1
  },
  eventDescription: {
    color: '#777777',
    flexWrap: 'wrap',
    flexShrink: 1
  }
});
//# sourceMappingURL=ReservationDetail.js.map