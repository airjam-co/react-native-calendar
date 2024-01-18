"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridSingleDayEventList = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _native = require("@react-navigation/native");
var _EventDetail = require("./EventDetail");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const GridSingleDayEventList = ({
  eventList,
  descriptionLength,
  renderEventFunc
}) => {
  _react.default.useEffect(() => {});
  (0, _native.useFocusEffect)(_react.default.useCallback(() => {
    return; // happens when this view is unfocused
  }, []));
  const renderGridAllDayEvents = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, eventList.filter(e => e.isAllDay).map(function (e, idx) {
      const renderedEvent = renderEventFunc ? renderEventFunc(e, idx) : /*#__PURE__*/_react.default.createElement(_EventDetail.EventDetail, {
        key: '' + idx,
        event: e,
        descriptionLength: descriptionLength
      });
      return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        key: 'all-day-events-' + idx
      }, renderedEvent);
    }));
  };
  return renderGridAllDayEvents();
};
exports.GridSingleDayEventList = GridSingleDayEventList;
//# sourceMappingURL=GridSingleDayEventList.js.map