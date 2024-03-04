'use client';
import { useToast } from '@/contexts/toastContext/toastContext';
import { createClient } from '@/utils/supabase/client';

export interface RegisterFormProps {}

const RegisterForm = (props: RegisterFormProps) => {
  const toast = useToast();
  const handleRegisterFormAction = async (formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Check your email to continue sign in process');
    }
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
