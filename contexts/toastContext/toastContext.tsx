'use client';
import {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from 'react';
import useContextWrapper from '../useContextWrapper';
import { SuccessToast } from './components/SuccessToast';
import { v4 as uuid } from 'uuid';
import { Toast, ToastType } from './toast';
import { ErrorToast } from './components/ErrorToast';
import { toastReducer } from './toastReducer';
import { createToast } from './toastUtils';

interface ToastContextProps {
  success: (message: string, dismiss?: () => void) => void;
  error: (message: string, dismiss?: () => void) => void;
  warning: (message: string, dismiss?: () => void) => void;
  info: (message: string, dismiss?: () => void) => void;
}

const ToastContext = createContext<ToastContextProps>({
  success: () => {
    throw new Error('Success toast no implemented');
  },
  error: () => {
    throw new Error('Error toast no implemented');
  },
  warning: () => {
    throw new Error('Error toast no implemented');
  },
  info: () => {
    throw new Error('Error toast no implemented');
  },
});

interface ToastContextProviderProps {
  children: ReactNode;
}

const ToastContextProvider = (props: ToastContextProviderProps) => {
  const { children } = props;
  // const [toasts, setToasts] = useState<Array<Toast>>([]);

  const [toasts, dispatch] = useReducer(toastReducer, []);

  const dismissToast = (toast: Toast) => () => {
    dispatch({
      type: 'DISMISS_TOAST',
      payload: toast,
    });
  };

  const autoDismissToast = (toast: Toast) => {
    setTimeout(dismissToast(toast), 6000);
  };

  /**
   * Creates a success toast that display a given message.
   * @param {string} message to be displayed in a success toast.
   */
  const success = (message: string) => {
    const toast: Toast = createToast(message, 'success');

    dispatch({
      type: 'CREATE_TOAST',
      payload: toast,
    });

    autoDismissToast(toast);
  };

  /**
   * Creates a error toast that display a given message.
   * @param {string} message to be displayed in a error toast.
   */
  const error = (message: string) => {
    const toast: Toast = createToast(message, 'error');

    dispatch({
      type: 'CREATE_TOAST',
      payload: toast,
    });

    autoDismissToast(toast);
  };

  /**
   * Creates a warning toast that display a given message.
   * @param {string} message to be displayed in a warning toast.
   */
  const warning = (message: string) => {
    const toast: Toast = createToast(message, 'warning');

    dispatch({
      type: 'CREATE_TOAST',
      payload: toast,
    });

    autoDismissToast(toast);
  };

  /**
   * Creates a info toast that display a given message.
   * @param {string} message to be displayed in a info toast.
   */
  const info = (message: string) => {
    const toast: Toast = createToast(message, 'info');

    dispatch({
      type: 'CREATE_TOAST',
      payload: toast,
    });

    autoDismissToast(toast);
  };

  /**
   * Renders toasts to be displayed.
   * @returns {Array<ReactNode>} Rendered Toasts that are to be displayed;
   */
  const renderToasts = () => {
    return toasts.map((toast) => {
      if (toast.type == 'success') {
        return (
          <SuccessToast
            key={toast.id}
            {...toast}
            onDismiss={dismissToast(toast)}
          />
        );
      } else if (toast.type == 'error') {
        return (
          <ErrorToast
            key={toast.id}
            {...toast}
            onDismiss={dismissToast(toast)}
          />
        );
      }
    });
  };

  return (
    <ToastContext.Provider
      value={{
        success,
        error,
        warning,
        info,
      }}
    >
      {children}
      {toasts.length > 0 && (
        <div className='fixed right-0 bottom-0 w-full max-w-md p-4 flex flex-col gap-4'>
          {renderToasts()}
        </div>
      )}
    </ToastContext.Provider>
  );
};

const useToast = () =>
  useContextWrapper(ToastContext, {
    contextName: useToast.name,
    providerName: ToastContextProvider.name,
  });

export { useToast, ToastContextProvider };
