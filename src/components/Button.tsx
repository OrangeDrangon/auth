import React from "react";
import { secondaryColor } from "../utils/theme";

type ButtonProps = JSX.IntrinsicElements["button"];

interface Props {
  cover?: boolean;
}

export const Button: React.FunctionComponent<React.PropsWithChildren<
  Props & ButtonProps
>> = ({ children, cover, ...props }) => {
  return (
    <div className="container">
      <button type="submit" {...props}>
        {cover != null && cover && <span className="cover"></span>}
        {children}
      </button>
      <style jsx>{`
        .container {
          overflow: hidden;
          position: relative;
        }

        button {
          outline: none;
          padding: 10px;
          height: 100%;
          width: 100%;
          border: none;
          background-color: ${secondaryColor.color};
          color: white;
          left: 0px;
          bottom: 0px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .cover {
          height: 100%;
          width: 100%;
          background-color: black;
          opacity: 0.2;
          position: absolute;
          left: 0px;
          bottom: 0px;
          transform: translateX(-100%);
          transition: all 0.3s ease;
        }

        button:disabled {
          cursor: not-allowed;
          border: none;
        }

        button:disabled .cover {
          transform: translateX(0%);
          opacity: 20%;
        }
      `}</style>
    </div>
  );
};
