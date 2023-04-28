import { gql } from "@apollo/client";

const coursesDocument = gql`
  query Courses {
    courses {
      id
      createdAt
      updatedAt
      authorId
      title
      description
    }
  }
`;

export default coursesDocument;
