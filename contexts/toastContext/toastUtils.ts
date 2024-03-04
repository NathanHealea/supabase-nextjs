import { Toast, ToastType } from './toast';
import { v4 as uuid } from 'uuid';

export const createToast = (message: string, type: ToastType): Toast => ({
  id: uuid(),
  message: message,
  type: type,
});
