import { Session } from "@/__generated__/graphql";
import { SigninMutation } from "@/components/graph";
import UserContext from "@/lib/UserContext";
import { magic } from "@/lib/magic";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function AuthCallback() {
  const { user, setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState<string>();
  const router = useRouter();

  // Signin Mutation Call
  const [signin, { loading, error }] = useMutation(SigninMutation, {
    onCompleted: (data: { signin: Session }) => {
      console.log("SIGNIN callback: data: ", data);
      localStorage.setItem("issuer", data.signin.issuer);
      setUser({
        issuer: data.signin.issuer,
        publicAddress: data.signin.publicAddress,
        email: data.signin.email,
        phoneNumber: null,
      });
      router.push("/app/courses");
    },
    onError: (error) => setErrorMessage(error.message),
  });

  // `loginWithCredential()` returns a didToken for the user logging in
  const finishEmailRedirectLogin = async () => {
    if (router.query.magic_credential) {
      console.log("HERE");
      await magic?.auth
        .loginWithCredential(router.query.magic_credential as string)
        .then((didToken) => {
          localStorage.setItem("didToken", didToken || "");
          signin({
            variables: {
              input: {
                didToken,
              },
            },
          });
        });
    }
  };

  finishEmailRedirectLogin();

  return <div>AuthCallback</div>;
}
