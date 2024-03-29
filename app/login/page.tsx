import Link from 'next/link';
import LoginContent from './components/LoginContent.component';
import LoginForm from './components/LoginForm.component';
import LoginButtons from './components/LoginSocialButtons.component';
import { LoginStatus } from './Login.types';

export type LoginPageProps = {
  searchParams: {
    message?: string;
    status?: LoginStatus;
  };
};

const LoginPage = (props: LoginPageProps) => {
  const {
    searchParams: { message, status },
  } = props;
  return (
    <main className='flex flex-1 justify-center items-center'>
      <header className='hero '>
        <div className='hero-content flex-col lg:flex-row-reverse gap-x-8'>
          <LoginContent />
          <div className='shrink-0 w-full max-w-sm flex flex-col justify-center gap-4'>
            <div className='card shrink-0 shadow-2xl bg-base-100'>
              <div className='card-body'>
                <LoginForm />
                <div className='divider'>OR</div>
                <LoginButtons />
              </div>
            </div>
            <Link
              href='/register'
              className='text-center underline-offset-4 decoration-primary hover:underline'
            >
              Dont have an account? Register today!
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

export default LoginPage;
