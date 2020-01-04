import React from "react";
import { FormContext, useForm, OnSubmit } from "react-hook-form";
import { Card } from "./Card";

interface Props {
  onSubmit: OnSubmit<Record<string, any>>;
  errorMessage?: string;
  header?: React.ReactNode;
}

export const Form: React.FunctionComponent<React.PropsWithChildren<Props>> = ({
  children,
  onSubmit,
  errorMessage,
  header,
}) => {
  const methods = useForm();
  return (
    <Card header={header}>
      <FormContext {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate={true}>
          {errorMessage != null ? <div>{errorMessage}</div> : null}
          {children}
          <style jsx>{`
      form {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        width: 300px;
        margin: 15px 30px 30px 30px;
      }

      @media only screen and (max-width: 500px) {
        form {
          margin 0 15px 15px 15px;
        }

        @media only screen and (max-width: 340px) {
          form {
            margin 0 0px 0px 0px;
          }

      }
    `}</style>
        </form>
      </FormContext>
    </Card>
  );
};
