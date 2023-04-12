import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { CourseQuery } from "@/components/graph";
import Page from "@/components/ui/pages/Page";
import LoadingPage from "@/components/ui/pages/LoadingPage";
import ErrorPage from "@/components/ui/pages/ErrorPage";
import CourseLandingPage from "@/components/feature-course/CourseLandingPage";

export default function ActiveCourse() {
  const router = useRouter();
  const { courseId } = router.query;

  const { loading, error, data } = useQuery(CourseQuery, {
    variables: { courseId },
  });

  if (loading) return <LoadingPage />;

  if (error) {
    console.log("ERROR: ", error);
    return <ErrorPage />;
  }

  if (data && courseId) {
    const { course } = data;
    return (
      <Page noPadding>
        <CourseLandingPage course={course} />
      </Page>
    );
  }

  return null;
}
