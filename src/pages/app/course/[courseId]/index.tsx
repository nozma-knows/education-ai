import { useState, useEffect } from "react";
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
  const [timer, setTimer] = useState(0);
  const [loadingPrereqs, setLoadingPrereqs] = useState(false);
  const [loadingUnits, setLoadingUnits] = useState(false);

  const {
    loading,
    error,
    data,
    refetch: refetchCourse,
  } = useQuery(CourseQuery, {
    variables: { courseId },
  });

  useEffect(() => {
    if (data && data.course.prereqs.length === 0) {
      setLoadingPrereqs(true);
      setLoadingUnits(true);
      refetchCourse();
      //Implementing the setInterval method
      const interval = setInterval(() => {
        setTimer(timer + 1);
      }, 1000);

      //Clearing the interval
      return () => clearInterval(interval);
    } else {
      setLoadingPrereqs(false);
    }

    if (data && data.course.units.length === 0) {
      refetchCourse();
      //Implementing the setInterval method
      const interval = setInterval(() => {
        setTimer(timer + 1);
      }, 1000);

      //Clearing the interval
      return () => clearInterval(interval);
    } else {
      setLoadingUnits(false);
    }
  }, [data, refetchCourse, timer]);

  if (loading) return <LoadingPage />;

  if (error) {
    console.log("ERROR: ", error);
    return <ErrorPage />;
  }

  if (data && courseId) {
    const { course } = data;
    return (
      <Page noPadding>
        <CourseLandingPage
          course={course}
          loadingPrereqs={loadingPrereqs}
          loadingUnits={loadingUnits}
        />
      </Page>
    );
  }

  return null;
}
