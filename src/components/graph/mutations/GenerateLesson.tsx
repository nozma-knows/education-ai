import { gql } from "@apollo/client";

export const generateLessonDocument = gql`
  mutation GenerateLesson($input: GenerateLessonInput!) {
    generateLesson(input: $input) {
      id
      createdAt
      updatedAt
      unitId
      title
      topics
      content
      status
    }
  }
`;

export default generateLessonDocument;
