import { useFormContext } from "react-hook-form";
import { secondaryColor } from "../utils/theme";
import { ErrorMessage } from "./ErrorMessage";

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
  const { register, errors, watch } = useFormContext();
  const value: string = watch(name) || "";
  return (
    <div className="container">
      <div className="wrapper">
        <div className="container-input">
          <input
            className={value.length > 0 ? "has-content" : ""}
            type={type != null ? type : "text"}
            name={name}
            ref={register({ required: `Please enter a ${name}.`, validate })}
          />
          {placeholder != null ? (
            <label htmlFor="name">
              <span className="label-content">{placeholder}</span>
            </label>
          ) : null}
        </div>
      </div>
      <ErrorMessage name={name} />
      <style jsx>{`
        .container {
          display: flex;
          flex-flow: column;
          width: 50%;
          overflow: hidden;
          margin-top: 10px;
        }

        .wrapper {
          height: 50px;
          width: 100%;
        }

        .container-input {
          position relative;
          height: 100%;
          width: 100%:
        }

        input {
          width: 100%;
          height: 100%;
          padding-top 20px;
          border: none;
          outline: none;
        }

        label {
          position: absolute;
          bottom: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
          pointer-events: none;
          border-bottom: 1px solid black;
        }

        label::after {
          content: "";
          position: absolute;
          left: 0px;
          bottom: -1px;
          height: 100%;
          width: 100%;
          border-bottom: 3px solid ${secondaryColor};
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        label .label-content {
          position absolute;
          bottom: 5px;
          left: 0px;
          transition: all 0.3s ease;
        }

        input:focus + label .label-content,
        .has-content + label .label-content {
          transform: translateY(-150%);
          font-size: 14px;
          color: ${secondaryColor};
        }

        input:focus + label::after,
        .has-content + label::after {
          transform: translateX(0%);
        }
      `}</style>
    </div>
  );
};
