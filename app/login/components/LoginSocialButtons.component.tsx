'use client';

import { baseurl } from '@/app.config';
import GoogleIcon from '@/components/icons/GoogleIcon.component';
import { createClient } from '@/utils/supabase/client';

export type LoginSocialButtonsProps = {};

const LoginButtons = (props: LoginSocialButtonsProps) => {
  const supabase = createClient();

  const handelLoginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${baseurl}/auth/callback?redirectTo=/dashboard`,
      },
    });
  };
  return (
    <div className='flex flex-col gap-2'>
      <button
        type='button'
        onClick={handelLoginWithGoogle}
        className='btn btn-ghost'
      >
        <GoogleIcon className='fill-white w-4 h-4' /> Login With Google
      </button>
    </div>
  );
};

export default LoginButtons;
