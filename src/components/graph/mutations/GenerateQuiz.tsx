import { gql } from "@apollo/client";

export const generateQuizDocument = gql`
  mutation GenerateQuiz($id: String!) {
    generateQuiz(id: $id) {
      id
      questions {
        id
        question
        choices
        answer
        status
      }
      status
    }
  }
`;

export default generateQuizDocument;
