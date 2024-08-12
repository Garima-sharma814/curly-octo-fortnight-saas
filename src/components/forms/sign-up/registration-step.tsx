'use client';
import { useAuthContextHook } from '@/context/use-auth-context';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import TypeSelectionFrom from './type-selection-form';

type Props = {};

const RegistrationFormStep = (props: Props) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { currentStep } = useAuthContextHook();
  const [onOTP, setOnOTP] = useState<string>('');
  const [onUserType, setOnUserType] = useState<'student' | 'owner'>('owner');

  setValue('otp', onOTP);

  switch (currentStep) {
    case 0:
      return (
        <TypeSelectionFrom
          register={register}
          userType={onUserType}
          setUserType={setOnUserType}></TypeSelectionFrom>
      );
      break;

    default:
      break;
  }

  return <div>RegistrationFormStep</div>;
};

export default RegistrationFormStep;
