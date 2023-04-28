import { gql } from "@apollo/client";

export const signupDocument = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      id
      issuer
      publicAddress
      email
    }
  }
`;

export default signupDocument;
