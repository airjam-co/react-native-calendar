"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridTimedEventList = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _native = require("@react-navigation/native");
var _EventDetail = require("./EventDetail");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const GridTimedEventList = ({
  eventList,
  descriptionLength,
  renderEventFunc
}) => {
  _react.default.useEffect(() => {});
  (0, _native.useFocusEffect)(_react.default.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const renderGridTimedEvents = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, eventList.filter(e => e.startTimeUtc && e.endTimeUtc && !e.isAllDay).map(function (e, idx) {
      const renderedEvent = renderEventFunc ? renderEventFunc(e, idx) : /*#__PURE__*/_react.default.createElement(_EventDetail.EventDetail, {
        key: '' + idx,
        event: e,
        descriptionLength: descriptionLength
      });
      return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        key: 'schedule-events-container-' + idx
      }, renderedEvent);
    }));
  };
  return renderGridTimedEvents();
};
exports.GridTimedEventList = GridTimedEventList;
//# sourceMappingURL=GridTimedEventList.js.map