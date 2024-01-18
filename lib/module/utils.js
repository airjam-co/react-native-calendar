export const compareDropdownItems = (a, b) => {
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
//# sourceMappingURL=utils.js.map