'use client';

import { useToast } from '@/contexts/toastContext/toastContext';
import { createClient } from '@/utils/supabase/client';
import clsx from 'clsx';
import React, { FormEvent, useState } from 'react';

export interface ProfileFormData {
  displayName?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
}

export interface ProfileFormProps {
  initialData: ProfileFormData;
  userId: string;
}

const ProfileForm = (props: ProfileFormProps) => {
  const { initialData, userId } = props;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const toast = useToast();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    console.log(formData.values());

    const supabase = createClient();

    const { error } = await supabase
      .from('profiles')
      .update({
        display_name: formData.get('displayName'),
        first_name: formData.get('firstName'),
        last_name: formData.get('lastName'),
        date_of_birth: formData.get('dateOfBirth'),
      })
      .eq('id', userId);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Profile was saved.');
    }

    setIsSubmitting(false);
  };

  return (
    <form className='flex flex-col gap-8 items-center' onSubmit={onSubmit}>
      {/* Profile Picture */}
      <div className='skeleton w-32 h-32'></div>

      {/* Display Name */}
      <label className='form-control w-full max-w-xs' htmlFor='displayName'>
        <div className='label'>
          <span className='label-text'>Display Name</span>
        </div>
        <input
          id='displayName'
          name='displayName'
          type='text'
          className={clsx('input input-bordered w-full max-w-xs', {
            disabled: isSubmitting,
          })}
          defaultValue={initialData.displayName}
        />
      </label>

      {/* First Name */}
      <label className='form-control w-full max-w-xs' htmlFor='firstName'>
        <div className='label'>
          <span className='label-text'>First Name</span>
        </div>
        <input
          id='firstName'
          name='firstName'
          type='text'
          className={clsx('input input-bordered w-full max-w-xs', {
            disabled: isSubmitting,
          })}
          defaultValue={initialData.firstName}
        />
      </label>

      {/* Last Name */}
      <label className='form-control w-full max-w-xs' htmlFor='lastName'>
        <div className='label'>
          <span className='label-text'>Last Name</span>
        </div>
        <input
          id='lastName'
          name='lastName'
          type='text'
          className={clsx('input input-bordered w-full max-w-xs', {
            disabled: isSubmitting,
          })}
          defaultValue={initialData.lastName}
        />
      </label>

      {/* Date of Birth */}
      <label className='form-control w-full max-w-xs' htmlFor='dateOfBirth'>
        <div className='label'>
          <span className='label-text'>Date of Birth</span>
        </div>
        <input
          id='dateOfBirth'
          name='dateOfBirth'
          type='date'
          placeholder=''
          className={clsx('input input-bordered w-full max-w-xs', {
            disabled: isSubmitting,
          })}
          defaultValue={initialData.dateOfBirth}
        />
      </label>

      <div className='card-actions w-full max-w-xs justify-end '>
        <button type='submit' className='btn btn-primary'>
          Save
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
