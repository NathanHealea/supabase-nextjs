'use client';

import clsx from 'clsx';
import {
  ChangeEvent,
  ChangeEventHandler,
  HTMLAttributes,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';

interface ProfileImageInputProp extends InputHTMLAttributes<HTMLInputElement> {
  avatar: File | null;
}

const ProfileImageInput = (props: ProfileImageInputProp) => {
  const { id, name, avatar } = props;
  const [file, setFile] = useState<any>(avatar || null);
  const [fileDataURL, setFileDataURL] = useState<any>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (file) {
      const fileReader = new FileReader();
      let isCancel = false;
      fileReader.onload = (e) => {
        if (e.target != null) {
          const { result } = e.target;

          if (result && !isCancel) {
            setFileDataURL(result);
          }
        }
      };

      fileReader.readAsDataURL(file);

      return () => {
        isCancel = true;
        if (fileReader && fileReader.readyState === 1) {
          fileReader.abort();
        }
      };
    }
  }, [file]);

  const handleOnAvatarClick = (e) => {
    inputRef.current?.click();

    e.preventDefault();
  };

  const handleOnFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;

    if (files != null && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  return (
    <>
      <input
        id={id}
        name={name}
        type='file'
        accept='image/*'
        className='hidden'
        ref={inputRef}
        onChange={handleOnFileChange}
      />

      <div
        className={clsx(
          ' w-32 h-32 flex justify-center items-center cursor-pointer rounded overflow-clip',
          { skeleton: !fileDataURL }
        )}
        onClick={handleOnAvatarClick}
      >
        {fileDataURL && (
          <img src={fileDataURL} alt='preview' className='h-full w-full' />
        )}
      </div>
    </>
  );
};

export { ProfileImageInput };
