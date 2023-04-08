import { gql } from "@apollo/client";

export const createCourseDocument = gql`
  mutation CreateCourse($input: CreateCourseInput!) {
    createCourse(input: $input) {
      id
      createdAt
      updatedAt
      authorId
      title
      description
    }
  }
`;

export default createCourseDocument;
