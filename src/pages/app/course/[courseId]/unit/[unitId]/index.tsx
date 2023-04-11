import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { CourseQuery } from "@/components/graph";
import Page from "@/components/ui/pages/Page";
import LoadingPage from "@/components/ui/pages/LoadingPage";
import ErrorPage from "@/components/ui/pages/ErrorPage";

export default function Unit() {
  const router = useRouter();
  const { courseId, unitId } = router.query;
  console.log("unitId: ", unitId);

  const { loading, error, data } = useQuery(CourseQuery, {
    variables: { courseId },
  });

  if (loading) return <LoadingPage />;

  if (error) {
    console.log("ERROR: ", error);
    return <ErrorPage />;
  }

  if (data && courseId && unitId) {
    return (
      <Page noPadding>
        <div>Unit View</div>
      </Page>
    );
  }

  return null;
}
