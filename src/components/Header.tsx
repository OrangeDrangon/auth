import React from "react";
import { primaryColor } from "../utils/theme";

interface Props {}

export const Header: React.FunctionComponent<React.PropsWithChildren<
  Props
>> = ({ children }) => {
  return (
    <div className="container">
      <div className="head">
        <img src="/images/neptune.png" alt="" className="neptune" />
        <h1>kmr.pw</h1>
        <div className="fill"></div>
        <a
          className="github"
          href="https://www.github.com/OrangeDrangon/auth"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/github.svg" alt="Github" />
        </a>
      </div>
      {children}
      <style jsx>{`
        .container {
          height: 100vh;
          width: 100vw;
          display: flex;
          flex-flow: column;
        }
        .head {
          height: 50px;
          width: 100%;
          background-color: ${primaryColor.color};
          color: ${primaryColor.text};
          display: flex;
          flex-flow: row;
          align-items: center;
          margin-bottom: 10px;
        }

        .neptune {
          height: 40px;
          margin: 10px;
        }

        h1 {
          font-size: 20px;
        }

        .fill {
          flex: 1;
        }

        .github {
          height: 30px;
          margin: 10px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .github img {
          height: 100%;
        }

        .github:hover {
          box-shadow: 1px 3px 8px rgba(255, 255, 255, 0.35);
        }
      `}</style>
    </div>
  );
};
