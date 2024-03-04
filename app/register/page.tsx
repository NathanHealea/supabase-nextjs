import Link from 'next/link';
import RegisterContent from './components/RegisterContent';
import RegisterForm from './components/RegisterForm';
import { RegistrationStatus } from './Registration.types';

export interface RegisterPageProps {
  searchParams: {
    message?: string;
    status?: RegistrationStatus;
  };
}

const RegisterPage = (props: RegisterPageProps) => {
  const {
    searchParams: { message, status },
  } = props;
  return (
    <main className='flex flex-1 flex-col justify-center'>
      <header className='hero '>
        <div className='hero-content flex-col lg:flex-row-reverse gap-x-8'>
          <RegisterContent />
          <div className='shrink-0 w-full max-w-sm flex flex-col justify-center gap-4'>
            <div className='card shadow-2xl bg-base-100'>
              <div className='card-body'>
                <RegisterForm />
              </div>
            </div>
            <Link
              href='/login'
              className='text-center underline-offset-4 decoration-primary hover:underline'
            >
              Log in to existing account.
            </Link>
          </div>
        </div>
      </header>

      <div className='absolute bottom-0 w-full p-4'>
        {message && status === 'ERROR' && (
          <div role='alert' className='alert alert-error '>
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
                d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <span>Error! {message}</span>
          </div>
        )}

        {message && status === 'SUCCESS' && (
          <div role='alert' className='alert alert-success'>
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
          </div>
        )}
      </div>
    </main>
  );
};

export default RegisterPage;
