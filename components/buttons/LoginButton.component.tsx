import Link from 'next/link';

export type LoginButtonProps = {};

const LoginButton = (props: LoginButtonProps) => {
  return (
    <Link href='/login' className='btn btn-ghost'>
      Log In
    </Link>
  );
};

export default LoginButton;
