import { useState, useEffect, useContext } from "react";
import { NextRouter, useRouter } from "next/router";
import { Grid } from "@mui/material";
import { BsSearch } from "react-icons/bs";
import CourseContext from "@/components/feature-course/context/CourseContext";
import { Course } from "@/__generated__/graphql";
import CreateCoursePopup from "./ui/popups/CreateCoursePopup";
import Button from "../ui/buttons/Button";

const SearchBar = ({ setSearch }: { setSearch: (search: string) => void }) => {
  return (
    <div className="flex flex-1 items-center gap-4 px-4 bg-black rounded-lg border-2 border-black hover:border-white focus-within:border-white">
      <BsSearch className="text-2xl text-gray-400" />
      <input
        className="flex w-full text-lg bg-transparent outline-none text-white"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

const CourseSelectorTopbar = ({
  router,
  setSearch,
  setShowCreateCoursePopup,
}: {
  router: NextRouter;
  setSearch: (search: string) => void;
  setShowCreateCoursePopup: (sccp: boolean) => void;
}) => {
  return (
    <div className="flex w-full h-14 gap-4">
      <SearchBar setSearch={setSearch} />
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
  const { title, description } = course;
  return (
    <Grid item xs={12} sm={6} md={4}>
      <div
        className="bg-[#64B6AC] text-black h-48 p-4 rounded-lg border-2 border-transparent hover:border-white cursor-pointer"
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
  const [search, setSearch] = useState("");
  const [displayedCourses, setDisplayedCourses] = useState<Course[]>(courses);
  const [loadingPrereqs, setLoadingPrereqs] = useState(false);

  useEffect(() => {
    if (search !== "") {
      const coursesToDisplay = courses.filter((course) => {
        const lowerCaseTitle = course.title.toLowerCase();
        const lowerCaseDescription = course.description.toLowerCase();
        const lowerCaseSearch = search.toLowerCase();
        return (
          lowerCaseTitle.includes(lowerCaseSearch) ||
          lowerCaseDescription.includes(lowerCaseSearch)
        );
      });
      setDisplayedCourses(coursesToDisplay);
    } else {
      setDisplayedCourses(courses);
    }
  }, [courses, search]);

  return (
    <div className="flex flex-col w-full h-full items-center">
      <div className="flex flex-col w-full h-full p-4 gap-4">
        {showCreateCoursePopup && (
          <CreateCoursePopup onClose={() => setShowCreateCoursePopup(false)} />
        )}
        <CourseSelectorTopbar
          router={router}
          setSearch={setSearch}
          setShowCreateCoursePopup={setShowCreateCoursePopup}
        />
        <div className="overflow-auto">
          <Grid container spacing={2}>
            {displayedCourses.map((course) => {
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
