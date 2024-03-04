import clsx from 'clsx';
import { Toast } from '../toast';
import { useState } from 'react';

interface SuccessToastProps extends Omit<Toast, 'type'> {
  onDismiss: (id?: string) => void;
}

const SuccessToast = (props: SuccessToastProps) => {
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
        'alert alert-success transition-all ease-in-out duration-50',
        { hidden: !showToast }
      )}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='stroke-current shrink-0 h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        />
      </svg>
      <span>{message}</span>
      <div>
        <button
          type='button'
          className='btn btn-success btn-sm'
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

export { SuccessToast };
