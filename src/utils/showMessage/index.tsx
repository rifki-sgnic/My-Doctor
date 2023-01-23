import {showMessage} from 'react-native-flash-message';
import {colors} from '../colors';

export const showError = (message: string) => {
  showMessage({
    message: message,
    backgroundColor: colors.error,
    color: colors.white,
    type: 'danger',
  });
};

export const showSuccess = (message: string) => {
  showMessage({
    message: message,
    backgroundColor: colors.primary,
    color: colors.white,
    type: 'success',
  });
};
