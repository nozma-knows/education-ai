import { AllCoursesQuery } from "@/components/graph";
import Button from "@/components/ui/buttons/Button";
import Logo from "@/components/ui/icons/Logo";
import rabbitHoleLogo from "@/icons/logo.svg";
import Page from "@/components/ui/pages/Page";
import { useQuery } from "@apollo/client";
import { Grid, Icon } from "@mui/material";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const title = `rabbit hole`;
const headerTitle = `Experience the future of learning...`;
const headerSubtitle = `Generate tailored courses for any topic. Learn anything you want whenever you want!`;

const generatedCoursesTitle = `Check out what others are learning...`;

const Header = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full h-fit p-8 bg-[#64B6AC] gap-8 rounded-lg">
      <motion.div
        className="flex flex-col gap-8"
        initial={{ opacity: 0, x: 0, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{
          duration: 1,
        }}
      >
        <div className="u text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
          {headerTitle}
        </div>
        <div className="font-overpass text-xl sm:text-3xl md:text-4xl lg:text-5xl">
          {headerSubtitle}
        </div>
      </motion.div>
      <div className="flex self-center">
        <Button
          label="Get Started for Free"
          onClick={() => router.push("auth/signup")}
        />
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="flex w-full justify-between items-center text-xs sm:text-sm md:text-md font-bold">
      <div className="flex items-center gap-2 justify">
        <div className="relative flex w-10 h-10">
          <Image src={rabbitHoleLogo} alt="rabbit hole Logo" fill />
        </div>
        <div className="hidden sm:block font-lilita text-lg">{title}</div>
      </div>
      <div className="flex gap-4">
        <div className="cursor-pointer button">Terms of Service</div>
        <div className="cursor-pointer button">Privacy Policy</div>
        <div className="cursor-pointer button">Contact Us</div>
      </div>
      <div className="text-end">
        <div className="hidden md:flex">Made with ❤️ in Salem, MA</div>
        <div>{`© ${new Date().getFullYear()} Milbo LLC`}</div>
      </div>
    </div>
  );
};

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

const GeneratedCourses = ({
  courses,
  setSearch,
}: {
  courses: { title: string; description: string }[];
  setSearch: (search: string) => void;
}) => {
  return (
    <div className="flex flex-col w-full h-fit p-8 bg-[#173F5F] gap-8 rounded-lg">
      <div className="font-lilita text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
        {generatedCoursesTitle}
      </div>
      <div className="flex h-12">
        <SearchBar setSearch={setSearch} />
      </div>
      <div className="flex h-[272px] overflow-auto">
        <Grid container spacing={2}>
          {courses.map((course, index) => {
            return (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <div className="flex flex-col p-4 h-32 rounded-lg bg-[#64B6AC]">
                  <div className="flex font-lilita text-xl">
                    <p className="truncate">{course.title}</p>
                  </div>
                  <div className="flex items-center text-lg h-full">
                    <p className="line-clamp-2 text-ellipsis">
                      {course.description}
                    </p>
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default function Home() {
  const { loading, error, data } = useQuery(AllCoursesQuery);
  const [search, setSearch] = useState("");
  const [displayedCourses, setDisplayedCourses] = useState<
    { title: string; description: string }[]
  >([]);

  useEffect(() => {
    if (data && data.allCourses) {
      setDisplayedCourses(data.allCourses);
    }
  }, [data]);

  useEffect(() => {
    if (search && data) {
      const coursesToDisplay = data.allCourses.filter(
        (course: { title: string; description: string }) => {
          const lowerCaseTitle = course.title.toLowerCase();
          const lowerCaseDescription = course.description.toLowerCase();
          const lowerCaseSearch = search.toLowerCase();
          return (
            lowerCaseTitle.includes(lowerCaseSearch) ||
            lowerCaseDescription.includes(lowerCaseSearch)
          );
        }
      );
      setDisplayedCourses(coursesToDisplay);
    } else {
      setDisplayedCourses(data ? data.allCourses : []);
    }
  }, [data, search]);

  return (
    <Page>
      <div className="h-full flex flex-col justify-between">
        <div className="flex  flex-col gap-4 w-full h-fit ">
          <Header />
          {loading ? (
            <div>Loading...</div>
          ) : (
            <GeneratedCourses
              courses={displayedCourses}
              setSearch={setSearch}
            />
          )}
        </div>
        <div className="py-8">
          <Footer />
        </div>
      </div>
    </Page>
  );
}
