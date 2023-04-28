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
import { useContext, useEffect } from "react";
import UserContext from "@/lib/UserContext";
import { useRouter } from "next/router";

// Redirect to homepage if not signed in
// export async function getServerSideProps(context: Context) {
//   let sessionId = null;
//   if (typeof window !== "undefined") {
//     sessionId = localStorage.getItem("sessionId");
//   }
//   if (sessionId) {
//     return { props: { sessionId } };
//   }
//   return { redirect: { destination: "/app/courses" } };
// }

export default function Courses() {
  const router = useRouter();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user?.issuer) {
      router.push("/");
    }
  }, [user, router]);

  const {
    loading,
    error,
    data,
    refetch: refetchCourses,
  } = useQuery(CoursesQuery);

  if (loading) return <LoadingPage />;

  if (error) return <ErrorPage />;

  if (data) {
    const { courses } = data;
    return (
      <CourseContext.Provider
        value={{
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
  // return (
  //   <Page>
  //     <div>Courses</div>
  //   </Page>
  // );
}
