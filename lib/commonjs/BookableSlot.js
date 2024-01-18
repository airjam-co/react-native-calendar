"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BookableSlot = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeElements = require("react-native-elements");
var _native = require("@react-navigation/native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const showTime = (timeToShow, timezone) => {
  return timeToShow.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: timezone.toString()
  });
};
const BookableSlot = ({
  key,
  resource,
  slot,
  timezone,
  onPress
}) => {
  _react.default.useEffect(() => {});
  (0, _native.useFocusEffect)(_react.default.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const renderBookableSlot = () => {
    if (!slot.startTimeUtc || !slot.endTimeUtc) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        key: key
      });
    }
    const startTimeUtc = new Date(slot.startTimeUtc);
    const dialogResource = {
      resource: resource,
      startTimeUtc: startTimeUtc,
      endTimeUtc: slot.endTimeUtc
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      key: key
    }, /*#__PURE__*/_react.default.createElement(_reactNativeElements.Button, {
      style: style.resourceSlotButton,
      onPress: () => {
        if (onPress) {
          onPress(dialogResource);
        }
      },
      title: showTime(startTimeUtc, timezone)
    }));
  };
  return renderBookableSlot();
};
exports.BookableSlot = BookableSlot;
const style = _reactNative.StyleSheet.create({
  resourceSlotButton: {
    width: '80%',
    margin: 5,
    alignSelf: 'center'
  }
});
//# sourceMappingURL=BookableSlot.js.map