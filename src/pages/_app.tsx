import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import client from "@/apollo-client";
import { useEffect, useState } from "react";
import { MagicUserMetadata } from "magic-sdk";
import UserContext from "@/lib/UserContext";
import { magic } from "@/lib/magic";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<MagicUserMetadata | null>(null);
  const issuer =
    typeof window !== "undefined" && localStorage.getItem("issuer");
  const router = useRouter();

  useEffect(() => {
    if (magic) {
      magic.user.isLoggedIn().then((value) => {
        if (value) {
          magic!.user.getMetadata().then((userData) => setUser(userData));
          if (router.pathname.includes("/auth/")) {
            console.log("HEREE");
            router.push("/app/courses");
          }
        } else {
          setUser(null);
          if (router.pathname.includes("/app/")) {
            router.push("/");
          }
        }
      });
    }
  }, [user, router]);

  useEffect(() => {
    if (user && user.issuer !== issuer) {
      localStorage.setItem("issuer", user?.issuer || "");
    }
  }, [issuer, user]);

  return (
    <ApolloProvider client={client}>
      <Head>
        <title>rabbit hole</title>
      </Head>
      <UserContext.Provider value={{ user, setUser }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </ApolloProvider>
  );
}
