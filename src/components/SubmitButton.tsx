import React from "react";
import { useFormContext } from "react-hook-form";
import { secondaryColor } from "../utils/theme";

interface Props {
  text: string;
}

export const SubmitButton: React.FunctionComponent<Props> = ({ text }) => {
  const { errors } = useFormContext();
  return (
    <div className="container">
      <div className="wrapper">
        <button type="submit" disabled={Object.values(errors).length > 0}>
          <span className="cover"></span>
          <span className="text">{text}</span>
        </button>
      </div>
      <style jsx>{`
        .container {
          height: 30px;
          width: 60px;
          margin-top: 10px;
          overflow: hidden;
        }

        .wrapper {
          height: 100%;
          width: 100%;
          position: relative;
        }

        button {
          border-radius: 5px;
          outline: none;
          border: 1px solid black;
          background-color: ${secondaryColor};
          color: white;
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0px;
          bottom: 0px;
          transition: all 0.3s ease;
        }

        .cover {
          height: 100%;
          width: 100%;
          background-color: black;
          opacity: 0%;
          position: absolute;
          left: 0px;
          bottom: 0px;
          transform: translateX(-100%);
          transition: all 0.3s ease;
        }

        button:disabled {
          cursor: not-allowed;
          border: none;
          border-radius: 0;
        }

        button:disabled .cover {
          transform: translateX(0%);
          opacity: 20%;
        }
      `}</style>
    </div>
  );
};
