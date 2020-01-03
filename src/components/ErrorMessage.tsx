import { useFormContext } from "react-hook-form";
import { errorColor } from "../utils/theme";
import { useMemo } from "react";

interface Props {
  name: string;
}

interface Error {
  type: string;
  message: string;
}

interface Errors {
  [key: string]: Error;
}

export const ErrorMessage: React.FunctionComponent<Props> = ({ name }) => {
  const { errors } = useFormContext();
  const error = useMemo(() => ((errors as unknown) as Errors)[name], [errors]);
  return (
    <span className="error">
      {error != null ? error.message : "Secret hidden messages"}
      <style jsx>{`
        .error {
          color: ${error != null ? errorColor : "white"};
          font-size: 14px;
        }
      `}</style>
    </span>
  );
};
