import React from "react";
import { Button } from "./Button";
import { useFormContext } from "react-hook-form";

interface Props {}

export const SubmitButton: React.FunctionComponent<React.PropsWithChildren<
  Props
>> = ({ children }) => {
  const { errors } = useFormContext();
  return (
    <Button
      type="submit"
      cover={true}
      disabled={Object.keys(errors).length > 0}
    >
      {children}
    </Button>
  );
};
