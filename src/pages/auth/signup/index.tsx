import React, { useContext, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { FieldValues } from "react-hook-form";
import { Session } from "@/__generated__/graphql";
import { SignupMutation } from "@/components/graph";
import AuthPage from "@/components/feature-auth";
import SignupForm from "@/components/feature-auth/ui/forms/SignupForm";
import { magic } from "@/lib/magic";
import UserContext from "@/lib/UserContext";

export default function Signup() {
  const [errorMessage, setErrorMessage] = useState<string>();

  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    console.log("user: ", user);
    user?.issuer && router.push("/app/courses");
  }, [user, router]);

  const [signup, { loading, error }] = useMutation(SignupMutation, {
    onCompleted: (data: { signup: Session }) => {
      console.log("data: ", data);
      setUser({
        issuer: data.signup.issuer,
        publicAddress: data.signup.publicAddress,
        email: data.signup.email,
        phoneNumber: null,
      });
      router.push("/app/courses");
    },
    onError: (error) => setErrorMessage(error.message),
  });

  const onSubmit = async (data: FieldValues) => {
    const { email } = data;
    try {
      let didToken = await magic?.auth.loginWithMagicLink({
        email,
      });

      // validate didToken with server
      signup({
        variables: {
          input: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
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
      title="Sign up"
      loading={false}
      onSubmit={onSubmit}
      Form={SignupForm}
      error={undefined}
      errorMessage={errorMessage}
    />
  );
}
