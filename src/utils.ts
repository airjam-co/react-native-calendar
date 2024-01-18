import type { ItemType } from 'react-native-dropdown-picker';

export const compareDropdownItems = (
  a: ItemType<string>,
  b: ItemType<string>
) => {
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
