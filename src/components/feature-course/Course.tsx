/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  SyllabusType,
  CourseModuleType,
} from "@/pages/api/generate-course-syllabus";
import { PulseLoader } from "react-spinners";
import ReactMarkdown from "react-markdown";

const CourseNavigator = ({
  title,
  activeModule,
  setActiveModule,
  modules,
  activeSection,
  setActiveSection,
}: {
  title: string;
  activeModule: CourseModuleType;
  setActiveModule: (module: CourseModuleType) => void;
  modules: CourseModuleType[];
  activeSection: CourseModuleType["sections"][0];
  setActiveSection: (section: CourseModuleType["sections"][0]) => void;
}) => {
  console.log("activeModule: ", activeModule);
  console.log("modules: ", modules);
  return (
    <div className="flex flex-col w-96 bg-blue-500 px-2">
      <div className="flex self-center text-2xl font-bold p-2">{title}</div>
      <div className="h-1 w-full bg-black" />
      <div className="flex flex-col p-4 gap-2">
        {modules.map((module, index) => {
          const { title } = module;
          const isActiveModule = activeModule.title === title;
          return (
            <div
              key={index}
              className={`cursor-pointer rounded-lg`}
              onClick={() => setActiveModule(modules[index])}
            >
              <div
                className={`text-base ${isActiveModule && "font-bold"}`}
              >{`Module ${index + 1} - ${title}`}</div>
              {isActiveModule && (
                <div className="flex flex-col px-4">
                  {module.sections.map((section, index) => {
                    const isActiveSection =
                      activeSection.title === section.title;
                    return (
                      <div
                        key={index}
                        className={`text-sm ${
                          isActiveSection && "font-semibold"
                        }`}
                        onClick={() => setActiveSection(section)}
                      >
                        {`Section ${index + 1} - ${section.title}`}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CourseLesson = ({
  activeModule,
  activeSection,
  sectionContent,
}: {
  activeModule: CourseModuleType;
  activeSection: CourseModuleType["sections"][0];
  sectionContent: string | null;
}) => {
  return (
    <div className="p-4">
      {sectionContent ? (
        <ReactMarkdown>{sectionContent}</ReactMarkdown>
      ) : (
        <div>No content to display</div>
      )}
    </div>
  );
};

export default function Course({ syllabus }: { syllabus: SyllabusType }) {
  const { title, modules } = syllabus;
  const [loading, setLoading] = useState(false);
  const [activeModule, setActiveModule] = useState(modules[0]);
  const [activeSection, setActiveSection] = useState(modules[0].sections[0]);
  const [sectionContent, setSectionContent] = useState<string | null>(null);

  useEffect(() => {
    setActiveSection(activeModule.sections[0]);
  }, [activeModule]);

  useEffect(() => {
    async function fetchSection() {
      try {
        setLoading(true);
        const response = await fetch(`../api/generate-section-content`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            module: activeModule.title,
            section: activeSection.title,
          }),
        });
        const responseData = await response.json();
        setSectionContent(responseData.result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error calling openai-test endpoint: ", error);
      }
    }
    fetchSection();
  }, [activeSection]);

  return (
    <div className="flex w-full h-full bg-red-200">
      <CourseNavigator
        title={title}
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        modules={modules}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      {loading ? (
        <PulseLoader color="#58335e" size={8} />
      ) : (
        <CourseLesson
          activeModule={activeModule}
          activeSection={activeSection}
          sectionContent={sectionContent}
        />
      )}
    </div>
  );
}
