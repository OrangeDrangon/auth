import { NextPage } from "next";
import { useState, useCallback } from "react";
import request from "superagent";
import { LoginBody, LoginSuccess, LoginError } from "./api/login";
import { validate as validateEmail } from "email-validator";
import { Input } from "../components/Input";
import { HeaderFooter } from "../components/HeaderFooter";
import { Button } from "../components/Button";
import Link from "next/link";
import { primaryColor } from "../utils/theme";
import { Form } from "../components/Form";
import { SubmitButton } from "../components/SubmitButton";
import { FlexSpacer } from "../components/FlexSpacer";

interface Props {
  callbackUrl?: string;
  clientId?: string;
  code?: string;
}

const LoginPage: NextPage<Props> = ({ callbackUrl, clientId, code }) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

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
    <HeaderFooter
      contentProps={{
        style: { alignSelf: "center", justifyContent: "center" },
      }}
    >
      <Form
        errorMessage={errorMessage}
        onSubmit={onSubmit}
        header={<h1 style={{ marginTop: "30px", fontSize: "48px" }}>Login</h1>}
      >
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
          <SubmitButton>Login</SubmitButton>
          <FlexSpacer />
          <Link href="/register">
            <a>
              <Button
                style={{
                  backgroundColor: primaryColor.light.color,
                  color: primaryColor.light.text,
                  textDecoration: "underline",
                }}
              >
                Register
              </Button>
            </a>
          </Link>
        </div>
      </Form>
      <style jsx>{`
        .buttons {
          display: flex;
          flex-flow: row-reverse;
          width: 100%;
          margin-top: 15px;
        }
      `}</style>
    </HeaderFooter>
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
