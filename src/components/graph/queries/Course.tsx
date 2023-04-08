import { gql } from "@apollo/client";

const courseDocument = gql`
  query Course($courseId: String!) {
    course(id: $courseId) {
      id
      createdAt
      updatedAt
      authorId
      title
      description
      status
    }
  }
`;

export default courseDocument;
