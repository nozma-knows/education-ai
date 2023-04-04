import {
  SyllabusType,
  CourseModuleType,
} from "@/pages/api/generate-course-syllabus";
import Syllabus from "./Syllabus";
import Button from "../ui/buttons/Button";

const WelcomeMessage = ({ title }: { title: string }) => (
  <div className="text-4xl font-bold">{`Welcome to your personalized course on ${title}`}</div>
);

const CourseModules = ({ modules }: { modules: CourseModuleType[] }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-2xl font-semibold">Modules</div>
      <ol className="flex flex-col px-4 gap-2">
        {modules.map((modules, index) => {
          const { title, sections } = modules;
          return (
            <div key={index}>
              <li>{title}</li>
              <ol style={{ listStyleType: "lower-alpha" }}>
                {sections.map((section, index) => {
                  return (
                    <li key={index}>
                      <div>{section.title}</div>
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        })}
      </ol>
    </div>
  );
};

export default function CourseLandingPage({
  syllabus,
  setCompletingCourse,
}: {
  syllabus: SyllabusType;
  setCompletingCourse: (value: boolean) => void;
}) {
  console.log("noah - CourseLangingPage - syllabus: ", syllabus);
  const { title } = syllabus;
  return (
    <div className="flex flex-col w-full h-full px-8">
      <div className="flex w-full p-8 justify-center">
        <WelcomeMessage title={title} />
      </div>
      <div className="flex h-2/3 overflow-auto max-w-2xl md:max-w-4xl self-center border-2 border-black rounded-lg p-4">
        <Syllabus syllabus={syllabus} />
      </div>
      <div className="flex self-center p-4">
        <Button
          label="Get started!"
          onClick={() => setCompletingCourse(true)}
        />
      </div>
    </div>
  );
}
