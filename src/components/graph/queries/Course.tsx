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
      prereqs {
        id
        title
        description
        topics {
          id
          title
          description
        }
      }
      units {
        id
        title
        description
        lessons {
          id
          title
          content
        }
      }
      status
    }
  }
`;

export default courseDocument;
