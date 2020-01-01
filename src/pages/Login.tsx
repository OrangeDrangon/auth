import { NextPage } from "next";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { LoginBody, LoginSuccess, LoginError } from "./api/Login";

interface Props {
  callbackUrl?: string;
  clientId?: string;
}

const LoginPage: NextPage<Props> = ({ callbackUrl, clientId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (callbackUrl == null) {
    return (
      <h1>
        There is a problem with the callback URL. Authentication cannot
        continue.
      </h1>
    );
  }

  if (clientId == null) {
    return (
      <h1>
        There is a problem with the Client ID. Authentication cannot continue.
      </h1>
    );
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post<
            LoginBody,
            AxiosResponse<LoginSuccess>
          >("/api/login", {
            email,
            password,
          });
          window.location.assign(`${callbackUrl}?token=${response.data.token}`);
        } catch (error) {
          if (error.response != null) {
            const response: AxiosResponse<LoginError> = error.response;
            setErrorMessage(response?.data.error);
          }
        }
      }}
    >
      {errorMessage != null ? <div>{errorMessage}</div> : null}
      <input
        type="text"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <input type="submit" />
    </form>
  );
};

LoginPage.getInitialProps = ({ query }): Props => {
  const { clientId, callbackUrl } = query;
  return {
    callbackUrl: typeof callbackUrl === "string" ? callbackUrl : undefined,
    clientId: typeof clientId === "string" ? clientId : undefined,
  };
};

export default LoginPage;
