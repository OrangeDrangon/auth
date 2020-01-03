import React from "react";

interface Props {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FunctionComponent<React.PropsWithChildren<Props>> = ({
  header,
  footer,
  children,
}) => {
  return (
    <div className="card">
      {header != null && <header className="header">{header}</header>}
      <section> {children}</section>
      {footer != null && <footer className="footer">{footer}</footer>}
      <style jsx>{`
        .card {
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          display: flex;
          flex-flow: column;
          padding: 10px;
          width: fit-content;
          height: fit-content;
          overflow-x: auto;
        }

        .card:hover {
          box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};
