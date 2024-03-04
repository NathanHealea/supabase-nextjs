export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

export type ToastActionType = 'CREATE_TOAST' | 'DISMISS_TOAST';

export type ToastAction = {
  type: ToastActionType;
  payload: Toast;
};
