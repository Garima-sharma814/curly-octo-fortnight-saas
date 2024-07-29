import React, { useState } from 'react';

//* initial values schema (for the context)
type InitialValueProps = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

//* initial values schema is used to this to make sure the values are correct
const InitialValues: InitialValueProps = {
  currentStep: 0,
  setCurrentStep: () => undefined,
};

//* create a context (context is something which we need to access globally without having to pass it in props)
const authContext = React.createContext(InitialValues);

//* context returns a Provider function which make the context value available to other components
const { Provider } = authContext;

type Props = {
  children: React.ReactNode;
};

//* component
export const AuthContextProvider = ({ children }: Props) => {
  const [currentStep, setCurrentStep] = useState<number>(InitialValues.currentStep);
  const values = {
    currentStep,
    setCurrentStep,
  };
  return <Provider value={values}>{children}</Provider>;
};

//* a custom hook to make the context value available easily to the other nested components
export const useAuthContextHook = () => {
  const state = React.useContext(authContext);
  return state;
};
