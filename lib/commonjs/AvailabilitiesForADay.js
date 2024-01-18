"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AvailabilitiesForADay = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _native = require("@react-navigation/native");
var _BookableSlotsForADay = require("./BookableSlotsForADay");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const AvailabilitiesForADay = ({
  availability,
  startTime,
  timezone,
  onPress
}) => {
  _react.default.useEffect(() => {});
  (0, _native.useFocusEffect)(_react.default.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const renderAvailableTimes = () => {
    if (!availability || !availability.resources) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: style.emptySectionText
      }, "There are no availabilities for the given time frame"));
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, availability.resources.map(function (resource, idx) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        key: 'availability-resource-container-' + idx
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: style.resourceName
      }, resource.name), /*#__PURE__*/_react.default.createElement(_BookableSlotsForADay.BookableSlotsForADay, {
        key: 'available-slots-' + resource._id,
        resource: resource,
        timezone: timezone.toString(),
        startTime: startTime,
        onPress: dialogResource => {
          if (onPress) {
            onPress(dialogResource);
          }
        }
      }));
    }));
  };
  return renderAvailableTimes();
};
exports.AvailabilitiesForADay = AvailabilitiesForADay;
const style = _reactNative.StyleSheet.create({
  resourceName: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#999999',
    marginTop: 10
  },
  emptySectionText: {
    textAlign: 'center',
    color: '#999999'
  }
});
//# sourceMappingURL=AvailabilitiesForADay.js.map