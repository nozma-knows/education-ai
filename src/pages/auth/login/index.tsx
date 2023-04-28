import React, { useContext, useEffect, useState } from "react";
import Router from "next/router";
import { useMutation } from "@apollo/client";
import { FieldValues } from "react-hook-form";
import { Session } from "@/__generated__/graphql";
import { SigninMutation } from "@/components/graph";
import AuthPage from "@/components/feature-auth";
import { magic } from "@/lib/magic";
import UserContext from "@/lib/UserContext";
import LoginForm from "@/components/feature-auth/ui/forms/LoginForm";

export default function Login() {
  // Next Router
  const { user, setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState<string>();

  // Redirect to courses page if user is logged in
  useEffect(() => {
    console.log("USER: ", user);
    user?.issuer && Router.push("/app/courses");
  }, [user]);

  // Signin Mutation Call
  const [signin, { loading, error }] = useMutation(SigninMutation, {
    onCompleted: (data: { signin: Session }) => {
      console.log("SIGNIN login: data: ", data);
      localStorage.setItem("issuer", data.signin.issuer);
      setUser({
        issuer: data.signin.issuer,
        publicAddress: data.signin.publicAddress,
        email: data.signin.email,
        phoneNumber: null,
      });
      Router.push("/app/courses");
    },
    onError: (error) => setErrorMessage(error.message),
  });

  // Function to handle form submission
  const onSubmit = async (data: FieldValues) => {
    const { email } = data; // Destructure email from form data
    try {
      // Send magic link email
      let didToken = await magic?.auth.loginWithMagicLink({
        email,
        redirectURI: new URL("/auth/callback", window.location.origin).href,
      });
      signin({
        variables: {
          input: {
            didToken,
          },
        },
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <AuthPage
      title="Login"
      loading={false}
      onSubmit={onSubmit}
      Form={LoginForm}
      error={undefined}
      errorMessage={errorMessage}
    />
  );
}
