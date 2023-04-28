import { gql } from "@apollo/client";

export const signoutDocument = gql`
  mutation Signout {
    signout {
      id
      issuer
      publicAddress
      email
    }
  }
`;

export default signoutDocument;
