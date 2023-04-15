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
          unitId
          title
          topics
          content
        }
        exercises {
          id
          task
          status
        }
      }
      status
    }
  }
`;

export default courseDocument;
