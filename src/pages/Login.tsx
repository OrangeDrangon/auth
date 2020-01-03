import { NextPage } from "next";
import { useState, useCallback } from "react";
import request from "superagent";
import { LoginBody, LoginSuccess, LoginError } from "./api/login";
import { validate as validateEmail } from "email-validator";
import { useForm, FormContext } from "react-hook-form";
import { Input } from "../components/Input";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import Link from "next/link";
import { primaryColor } from "../utils/theme";

interface Props {
  callbackUrl?: string;
  clientId?: string;
  code?: string;
}

const LoginPage: NextPage<Props> = ({ callbackUrl, clientId, code }) => {
  const methods = useForm({ reValidateMode: "onChange" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = useCallback(
    async (data: Record<string, any>) => {
      const { email, password } = (data as unknown) as Pick<
        LoginBody,
        "email" | "password"
      >;
      try {
        const { body }: { body: LoginSuccess } = await request
          .post("/api/login")
          .send({
            email,
            password,
            callbackUrl,
            clientId,
            code,
          });
        window.location.assign(`${callbackUrl}?token=${body.token}`);
      } catch (error) {
        const { response }: { response?: { body: LoginError } } = error;
        if (response != null) {
          setErrorMessage(response.body.error);
        }
      }
    },
    [callbackUrl, clientId, code]
  );

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

  if (code == null) {
    return (
      <h1>There is a problem with the Code. Authentication cannot continue.</h1>
    );
  }

  return (
    <Header>
      <FormContext {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate={true}>
          <h1>Login</h1>
          {errorMessage != null ? <div>{errorMessage}</div> : null}
          <Input
            name="email"
            type="email"
            placeholder="Email"
            validate={(email) =>
              validateEmail(email) || "Please enter a valid email."
            }
          />
          <Input name="password" placeholder="Password" type="password" />

          <div className="buttons">
            <Button
              type="submit"
              cover={true}
              disabled={Object.keys(methods.errors).length > 0}
            >
              Login
            </Button>
            <div className="fill"></div>
            <Link href="/register">
              <Button
                style={{
                  textDecoration: "underline",
                  backgroundColor: primaryColor.dark.color,
                }}
              >
                Register
              </Button>
            </Link>
          </div>

          <style jsx>{`
            form {
              display: flex;
              flex-flow: column;
              justify-content: center;
              align-items: center;
            }

            h1 {
              font-size: 32px;
            }

            .buttons {
              display: flex;
              flex-flow: row-reverse;
              width: 100%;
            }

            .fill {
              flex: 1;
            }
          `}</style>
        </form>
      </FormContext>
    </Header>
  );
};

LoginPage.getInitialProps = ({ query }): Props => {
  const { clientId, callbackUrl, code } = query;
  return {
    callbackUrl: typeof callbackUrl === "string" ? callbackUrl : undefined,
    clientId: typeof clientId === "string" ? clientId : undefined,
    code: typeof code === "string" ? code : undefined,
  };
};

export default LoginPage;
