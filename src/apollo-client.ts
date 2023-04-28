import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

console.log(
  "process.env.NEXT_PUBLIC_BACKEND_URI: ",
  process.env.NEXT_PUBLIC_BACKEND_URI
);
const uri = `${process.env.NEXT_PUBLIC_BACKEND_URI}/api`;
const httpLink = createHttpLink({
  uri,
});

const sessionLink = setContext((request, { headers }) => {
  const issuer = localStorage.getItem("issuer");
  const didToken = localStorage.getItem("didToken");
  return {
    headers: {
      ...headers,
      authorization: issuer
        ? `Bearer ${issuer}`
        : didToken
        ? `Bearer ${didToken}`
        : ``,
    },
  };
});
const client = new ApolloClient({
  link: sessionLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
