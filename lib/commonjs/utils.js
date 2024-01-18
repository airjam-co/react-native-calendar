"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compareDropdownItems = void 0;
const compareDropdownItems = (a, b) => {
  if (!a.label || !b.label) {
    return 0;
  }
  if (!a.label) {
    return -1;
  }
  if (!b.label) {
    return 1;
  }
  if (a.label < b.label) {
    return -1;
  }
  if (a.label > b.label) {
    return 1;
  }
  return 0;
};
exports.compareDropdownItems = compareDropdownItems;
//# sourceMappingURL=utils.js.map