import { useToast } from '@/components/ui/use-toast';
import { userRegistrationProps, UserRegistrationSchema } from '@/schemas/auth.schema';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { onCompleteUserRegistration } from '@/actions/auth';

export const useSignUpForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const { signUp, isLoaded, setActive } = useSignUp();
  const router = useRouter();
  const methods = useForm<userRegistrationProps>({
    resolver: zodResolver(UserRegistrationSchema),
    defaultValues: {
      type: 'owner',
    },
    mode: 'onChange',
  });

  const onGenerateOTP = async (email: string, password: string, onNext: React.Dispatch<React.SetStateAction<number>>) => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      onNext((prev) => prev + 1);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.errors[0].longMessage,
      });
    }
  };

  const onHandleSubmit = methods.handleSubmit(async (values: userRegistrationProps) => {
    if (!isLoaded) return;

    try {
      setLoading(true);
      const completeSignUp: any = signUp.attemptEmailAddressVerification({
        code: values.otp,
      });

      if (completeSignUp.status !== 'complete') {
        return { message: 'Something went wrong' };
      }

      if (completeSignUp.status == 'complete') {
        if (!signUp.createdUserId) return;

        const registered = await onCompleteUserRegistration({ fullname: values.fullName, clerkId: signUp.createdUserId, type: values.type });

        if (registered?.status == 200 && registered.user) {
          await setActive({
            session: completeSignUp.createSessionId,
          });

          setLoading(false);
          router.push('/dashboard');
        }

        if (registered?.status == 400) {
          toast({
            title: 'Error',
            description: 'Something went wrong',
          });
        }
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.errors[0].longMessage,
      });
    }
  });
  return {
    methods,
    onHandleSubmit,
    onGenerateOTP,
    loading,
  };
};
