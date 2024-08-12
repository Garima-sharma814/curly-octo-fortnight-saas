'use client';
import React from 'react';
import { useSignUpForm } from '@/hooks/sign-up/use-sign-up';
import { FormProvider } from 'react-hook-form';
import { AuthContextProvider } from '@/context/use-auth-context';
import { Loader } from '../../loader';

type Props = {
  children: React.ReactNode;
};

const SignUpFormProvider = ({ children }: Props) => {
  const { methods, onHandleSubmit, loading } = useSignUpForm();

  return (
    <div>
      <AuthContextProvider>
        <FormProvider {...methods}>
          <form
            action=''
            onSubmit={onHandleSubmit}
            className='h-full'>
            <div className='flex flex-col justify-between gap-3 h-full'>
              <Loader loading={loading}>{children}</Loader>
            </div>
          </form>
        </FormProvider>
      </AuthContextProvider>
    </div>
  );
};

export default SignUpFormProvider;
