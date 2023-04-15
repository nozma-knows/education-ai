import { gql } from "@apollo/client";

export const generateQuizDocument = gql`
  mutation GenerateQuiz($id: String!) {
    generateQuiz(id: $id) {
      id
    }
  }
`;

export default generateQuizDocument;
