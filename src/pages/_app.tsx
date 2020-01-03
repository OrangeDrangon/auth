function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <>
      <Component {...pageProps} />
      <style global jsx>
        {`
          html,
          body,
          #__next {
            height: 100vh;
            width: 100vw;
          }
          @font-face {
            font-family: "Roboto";
            src: url("https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2")
              format("woff2");
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
          * {
            font-family: "Roboto", sans-serif;
            font-size: 16px;
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
        `}
      </style>
    </>
  );
}

export default MyApp;
