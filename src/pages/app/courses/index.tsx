import { Context } from "@apollo/client";
import { parse } from "cookie";
import CourseContext from "@/components/feature-course/context/CourseContext";
import { useQuery } from "@apollo/client";
import { CoursesQuery } from "@/components/graph";
import Page from "@/components/ui/pages/Page";
import LoadingPage from "@/components/ui/pages/LoadingPage";
import ErrorPage from "@/components/ui/pages/ErrorPage";
import DecodeToken from "@/components/utils/conversion/DecodeToken";
import CourseSelector from "@/components/feature-course/CourseSelector";

// Redirect to homepage if not signed in
export async function getServerSideProps(context: Context) {
  const { token } = parse(context.req.headers.cookie);
  if (token) {
    return { props: { token } };
  }
  return { redirect: { destination: "/" } };
}

export default function Courses({ token }: { token: string }) {
  const decodedToken = DecodeToken({ token });
  const authorId = decodedToken?.userId;

  const {
    loading,
    error,
    data,
    refetch: refetchCourses,
  } = useQuery(CoursesQuery, {
    variables: { authorId },
  });

  if (loading) return <LoadingPage />;

  if (error) return <ErrorPage />;

  if (data && authorId) {
    const { courses } = data;
    return (
      <CourseContext.Provider
        value={{
          authorId,
          courses,
          refetchCourses,
        }}
      >
        <Page noPadding bgColor="#173F5F">
          <CourseSelector />
        </Page>
      </CourseContext.Provider>
    );
  }

  return null;
}
