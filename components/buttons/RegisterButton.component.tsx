import Link from 'next/link';

export type RegisterButtonProps = {};

const RegisterButton = (props: RegisterButtonProps) => {
  return (
    <Link href='/register' className='btn btn-ghost'>
      Register
    </Link>
  );
};

export default RegisterButton;
