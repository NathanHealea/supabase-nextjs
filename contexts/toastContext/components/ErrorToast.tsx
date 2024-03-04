import clsx from 'clsx';
import { Toast } from '../toast';
import { useState } from 'react';

interface ErrorToastProps extends Omit<Toast, 'type'> {
  onDismiss: (id?: string) => void;
}

const ErrorToast = (props: ErrorToastProps) => {
  const { message, onDismiss } = props;

  const [showToast, setShowToast] = useState<boolean>(true);

  const handleDismiss = () => {
    setShowToast(false);
    onDismiss();
  };
  return (
    <div
      role='alert'
      className={clsx(
        'alert alert-error transition-all ease-in-out duration-50',
        { hidden: !showToast }
      )}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='stroke-current shrink-0 h-6 w-6'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z'
        />
      </svg>

      <span>{message}</span>
      <div>
        <button
          type='button'
          className='btn btn-error btn-sm'
          onClick={handleDismiss}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className=' h-6 w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18 18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export { ErrorToast };
