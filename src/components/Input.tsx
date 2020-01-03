import React from "react";
import {
  NestDataObject,
  ErrorMessage,
  ValidationOptions,
  useFormContext,
} from "react-hook-form";

interface Props {
  name: string;
  placeholder?: string;
  type?: string;
  validate?: (data: string) => boolean | string;
}

export const Input: React.FunctionComponent<Props> = ({
  name,
  placeholder,
  type,
  validate,
}) => {
  const { register, errors } = useFormContext();
  return (
    <div>
      <input
        type={type != null ? type : "text"}
        name={name}
        placeholder={placeholder != null ? placeholder : ""}
        ref={register({ required: `Please enter a ${name}.`, validate })}
      />
      <ErrorMessage errors={errors} name={name} as={<span />} />
      <style jsx>{`
        div {
          display: flex;
          flex-flow: column;
        }

        div span {
          color: red;
        }
      `}</style>
    </div>
  );
};
