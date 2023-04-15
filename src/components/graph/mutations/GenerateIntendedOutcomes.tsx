import { gql } from "@apollo/client";

export const generateIntendedOutcomesDocument = gql`
  mutation GenerateIntendedOutcomes($id: String!) {
    generateIntendedOutcomes(id: $id) {
      id
    }
  }
`;

export default generateIntendedOutcomesDocument;
