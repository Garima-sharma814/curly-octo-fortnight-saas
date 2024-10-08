'use client';
import { Label } from '@/components/ui/label';
import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

type Props = {
  value: string;
  title: string;
  text: string;
  register: UseFormRegister<FieldValues>;
  userType: 'owner' | 'student';
  setUserType: React.Dispatch<React.SetStateAction<'owner' | 'student'>>;
};

const UserTypeCard = ({ value, title, text, register, userType, setUserType }: Props) => {
  return <Label> </Label>;
};

export default UserTypeCard;
