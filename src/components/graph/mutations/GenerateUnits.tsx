import { gql } from "@apollo/client";

export const generateUnitsDocument = gql`
  mutation GenerateUnits($id: String!) {
    generateUnits(id: $id) {
      id
    }
  }
`;

export default generateUnitsDocument;
