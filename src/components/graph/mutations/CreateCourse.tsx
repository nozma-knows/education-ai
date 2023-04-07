import { gql } from "@apollo/client";

export const createCourseDocument = gql`
  mutation CreateCourse($input: CreateCourseInput!) {
    createCourse(input: $input) {
      id
      createdAt
      updatedAt
      authorId
      content
    }
  }
`;

export default createCourseDocument;
