import { useState, useContext } from "react";
import { NextRouter, useRouter } from "next/router";
import { Box, Grid } from "@mui/material";
import { BsSearch } from "react-icons/bs";
import CourseContext from "@/components/feature-course/context/CourseContext";
import { Course } from "@/__generated__/graphql";
import CreateCoursePopup from "./ui/popups/CreateCoursePopup";
import Button from "../ui/buttons/Button";

const SearchBar = () => {
  return (
    <div className="flex flex-1 items-center gap-4 px-4 bg-black rounded-lg border-2 border-black hover:border-white focus-within:border-white">
      <BsSearch className="text-2xl text-gray-400" />
      <input
        className="flex w-full text-lg bg-transparent outline-none text-white"
        placeholder="Search..."
      />
    </div>
  );
};

const CourseSelectorTopbar = ({
  router,
  setShowCreateCoursePopup,
}: {
  router: NextRouter;
  setShowCreateCoursePopup: (sccp: boolean) => void;
}) => {
  return (
    <div className="flex w-full h-14 gap-4">
      <SearchBar />
      <Button
        label="Generate New Course"
        onClick={() => setShowCreateCoursePopup(true)}
      />
    </div>
  );
};

const CoursePreview = ({
  course,
  router,
}: {
  course: Course;
  router: NextRouter;
}) => {
  console.log("course: ", course);
  const parsedContent = JSON.parse(course.content);
  const { title, description } = parsedContent;
  return (
    <Grid item xs={12} sm={6} md={4}>
      <div
        className="bg-red-500 h-48 p-4 rounded-lg border-2 border-black hover:border-white cursor-pointer"
        onClick={() =>
          router.push({
            pathname: "/app/course/[courseId]",
            query: { courseId: course.id },
          })
        }
      >
        <div className="text-2xl font-bold">{title}</div>
        <div className="h-18 line-clamp-3">{description}</div>
      </div>
    </Grid>
  );
};

export default function CourseSelector() {
  const router = useRouter();
  const { courses } = useContext(CourseContext);
  const [showCreateCoursePopup, setShowCreateCoursePopup] = useState(false);

  return (
    <div className="flex flex-col w-full h-full items-center bg-blue-400">
      <div className="flex flex-col w-full h-full p-4 gap-4 max-w-7xl">
        {showCreateCoursePopup && (
          <CreateCoursePopup onClose={() => setShowCreateCoursePopup(false)} />
        )}
        <CourseSelectorTopbar
          router={router}
          setShowCreateCoursePopup={setShowCreateCoursePopup}
        />
        <div className="overflow-auto">
          <Grid container spacing={2}>
            {courses.map((course) => {
              return (
                <CoursePreview
                  key={course.id}
                  course={course}
                  router={router}
                />
              );
            })}
          </Grid>
        </div>
      </div>
    </div>
  );
}
