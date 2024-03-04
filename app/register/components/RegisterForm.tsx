import { createClient } from '@/utils/supabase/server';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

export interface RegisterFormProps {}

const RegisterForm = (props: RegisterFormProps) => {
  const handleRegisterFormAction = async (formData: FormData) => {
    'use server';

    const origin = headers().get('origin');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    console.log(email, password);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect(`/register?message=${error}&status=ERROR`);
    }

    return redirect(
      '/register?message=Check email to continue sign in process&status=SUCCESS'
    );
  };

  return (
    <form action={handleRegisterFormAction}>
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
      </div>
      <div className='form-control mt-6'>
        <button type='submit' className='btn btn-primary'>
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
