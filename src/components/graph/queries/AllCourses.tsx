import { gql } from "@apollo/client";

const allCoursesDocument = gql`
  query AllCourses {
    allCourses {
      title
      description
    }
  }
`;

export default allCoursesDocument;
