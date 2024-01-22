import { createClient } from '@/utils/supabase/server';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

export type LoginFormProps = {};

const LoginForm = (props: LoginFormProps) => {
  const handleLoginFormAction = async (formData: FormData) => {
    'use server';

    const origin = headers().get('origin');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect(
        `/login?message=Could not authenticate user&status=ERROR`
      );
    }

    return redirect('/dashboard');
  };

  return (
    <form action={handleLoginFormAction}>
      <div className='form-control'>
        <label className='label' htmlFor='email'>
          <span className='label-text'>Email</span>
        </label>
        <input
          name='email'
          type='email'
          placeholder='email'
          className='input input-bordered'
          required
        />
      </div>
      <div className='form-control'>
        <label className='label' htmlFor='password'>
          <span className='label-text'>Password</span>
        </label>
        <input
          name='password'
          type='password'
          placeholder='password'
          className='input input-bordered'
          required
        />
        <label className='label'>
          <a href='#' className='label-text-alt link link-hover'>
            Forgot password?
          </a>
        </label>
      </div>
      <div className='form-control mt-6'>
        <button type='submit' className='btn btn-primary'>
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
