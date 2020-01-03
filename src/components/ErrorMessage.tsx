import { useFormContext } from "react-hook-form";
import { secondaryColor } from "../utils/theme";
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
  const error = useMemo(() => ((errors as unknown) as Errors)[name], [
    errors[name],
  ]);
  return (
    <span className="error">
      {error != null ? error.message : "Secret hidden messages"}
      <style jsx>{`
        .error {
          color: ${secondaryColor.light.color};
          opacity: ${error != null ? 1 : 0};
          font-size: 14px;
        }
      `}</style>
    </span>
  );
};
