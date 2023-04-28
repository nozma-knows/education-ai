import { createContext } from "react";
import { ApolloQueryResult } from "@apollo/client";
import { Course } from "@/__generated__/graphql";

type CourseContentType = {
  // authorId: string;
  courses: Course[];
  refetchCourses: (
    variables?:
      | Partial<{
          authorId: string | undefined;
        }>
      | undefined
  ) => Promise<ApolloQueryResult<any>>;
};

const CourseContext = createContext<CourseContentType>({
  // authorId: "",
  courses: [],
  refetchCourses: () => Promise.resolve({} as ApolloQueryResult<any>),
});

export default CourseContext;
