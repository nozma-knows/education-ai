import { gql } from "@apollo/client";

export const generatePrereqsDocument = gql`
  mutation GeneratePrereqs($id: String!) {
    generatePrereqs(id: $id) {
      id
    }
  }
`;

export default generatePrereqsDocument;
