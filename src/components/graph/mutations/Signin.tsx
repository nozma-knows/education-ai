import { gql } from "@apollo/client";

export const signinDocument = gql`
  mutation Signin($input: SigninInput!) {
    signin(input: $input) {
      issuer
      publicAddress
    }
  }
`;

export default signinDocument;
