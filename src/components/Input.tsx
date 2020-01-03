import { useFormContext } from "react-hook-form";
import { primaryColor } from "../utils/theme";
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
  const { register } = useFormContext();
  return (
    <>
      <div className="wrapper">
        <input
          type={type != null ? type : "text"}
          name={name}
          required={true}
          placeholder=" "
          ref={register({ required: `Please enter a ${name}.`, validate })}
        />
        {placeholder != null ? (
          <label htmlFor="name">
            <span className="label-content">{placeholder}</span>
          </label>
        ) : null}
      </div>
      <ErrorMessage name={name} />
      <style jsx>{`
        .container {
          width: 100%;
          display: flex;
          flex-flow: column;
        }

        .wrapper {
          position: relative;
          width 100%;
          height: 50px;
          overflow: hidden;
        }

        input {
          border: none;
          outline: none;
          position: absolute;
          bottom: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
          padding-top: 25px;
          padding-bottom: 5px
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
          border-bottom: 3px solid ${primaryColor.light.color};
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
        input:not(:placeholder-shown) + input::placeholder {
          transform: translateY(-120%);
          font-size: 14px;
          color: ${primaryColor.light.color};
        }

        input:focus + label::after,
        input:not(:placeholder-shown) + label::after {
          transform: translateX(0%);
        }
      `}</style>
    </>
  );
};
