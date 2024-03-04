import { Toast, ToastAction } from './toast';

export const toastReducer = (state: Array<Toast>, action: ToastAction) => {
  switch (action.type) {
    case 'CREATE_TOAST':
      return [...state, action.payload];

    case 'DISMISS_TOAST':
      return [...state.filter((toast) => toast.id !== action.payload.id)];
  }
};
