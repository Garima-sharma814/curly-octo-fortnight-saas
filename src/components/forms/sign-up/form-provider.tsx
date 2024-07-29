import React from 'react';
import { useSignUpForm } from '@/hooks/sign-up/use-sign-up';
import { FormProvider } from 'react-hook-form';
import { AuthContextProvider } from '@/context/use-auth-context';

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
            className='h-full'></form>
        </FormProvider>
      </AuthContextProvider>
    </div>
  );
};

export default SignUpFormProvider;
