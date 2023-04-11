import { useState } from "react";
import { useRouter } from "next/router";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { Course, Maybe } from "@/__generated__/graphql";

type PrereqTopic = {
  title: string;
  description: string;
};

type CoursePrereq = {
  id: string;
  title: string;
  description: string;
  topics: Maybe<Maybe<PrereqTopic>[]> | undefined;
};

type UnitLesson = {
  id: string;
  title: string;
  content: string | null;
};

type CourseUnit = {
  id: string;
  title: string;
  description: string;
  lessons: Maybe<UnitLesson>[];
};

const CourseDetails = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col w-full h-full px-4 gap-4">
      <div className="text-4xl font-bold">Course Details</div>
      <div className="hidden md:flex gap-4 px-8">
        <div className="text-lg font-semibold">
          <div>Name</div>
          <div>Description</div>
        </div>
        <div className="text-lg">
          <div>{title}</div>
          <div>{description}</div>
        </div>
      </div>
      <div className="flex flex-col md:hidden gap-4 px-8">
        <div className="flex flex-col">
          <div className="text-lg font-semibold">Name</div>
          <div>{title}</div>
        </div>
        <div className="flex flex-col">
          <div className="text-lg font-semibold"> Description</div>
          <div>{description}</div>
        </div>
      </div>
    </div>
  );
};

const PrereqTopics = ({
  description,
  topics,
}: {
  description: string;
  topics: Maybe<Maybe<PrereqTopic>[]>;
}) => {
  return (
    <div className="flex gap-4 px-8 text-base">
      <ul>
        {topics &&
          topics.map((topic, index) => {
            if (topic) {
              const { title } = topic;
              return (
                <li key={index} className="font-semibold">
                  {title}
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
};

const CoursePrereqs = ({
  prereqs,
  expandedPrereqs,
  setExpandedPrereqs,
}: {
  prereqs: Maybe<CoursePrereq>[];
  expandedPrereqs: string[];
  setExpandedPrereqs: (expandedPrereqs: string[]) => void;
}) => {
  return (
    <div className="flex flex-col w-full h-full px-4 gap-4">
      <div className="text-4xl font-bold">Prerequisites</div>
      <div className="flex flex-col px-8 w-fit">
        {prereqs.map((prereq, index) => {
          if (prereq) {
            const { id, title, description, topics } = prereq;
            const isExpanded = expandedPrereqs.includes(id);
            return (
              <div key={index} className="flex flex-col text-lg">
                <div
                  className="flex items-center gap-2 cursor-pointer hover:underline"
                  onClick={() =>
                    isExpanded
                      ? setExpandedPrereqs(
                          expandedPrereqs.filter((item) => item !== id)
                        )
                      : setExpandedPrereqs([...expandedPrereqs, id])
                  }
                >
                  <div className="flex font-semibold">{title}</div>
                  {isExpanded ? <BsChevronUp /> : <BsChevronDown />}
                </div>
                {isExpanded && topics && (
                  <PrereqTopics description={description} topics={topics} />
                )}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

const UnitLessons = ({
  description,
  lessons,
}: {
  description: string;
  lessons: Maybe<UnitLesson>[];
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2 px-8 text-base bg-gray-300 py-4 rounded-lg">
      <div>{description}</div>
      <div>
        {lessons.map((lesson, index) => {
          if (lesson) {
            console.log("lesson: ", lesson);
            const { id, title } = lesson;
            return (
              <div key={index} className="flex flex-col text-base">
                <label className="flex gap-2 font-semibold">
                  <input type="checkbox" disabled />
                  <div
                    className="cursor-pointer hover:font-bold"
                    onClick={() =>
                      router.push({
                        pathname: "/app/course/[courseId]/unit/[unitId]",
                        query: {
                          courseId: router.query.courseId,
                          unitId: id,
                        },
                      })
                    }
                  >
                    {title}
                  </div>
                </label>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

const CourseUnits = ({
  units,
  expandedUnits,
  setExpandedUnits,
}: {
  units: Maybe<CourseUnit>[];
  expandedUnits: string[];
  setExpandedUnits: (expandedUnits: string[]) => void;
}) => {
  return (
    <div className="flex flex-col w-full h-full px-4 gap-4">
      <div className="text-4xl font-bold">Units</div>
      <ol className="flex flex-col px-8 w-fit">
        {units.map((unit, index) => {
          if (unit) {
            const { id, title, description, lessons } = unit;
            const isExpanded = expandedUnits.includes(id);
            return (
              <li key={index} className="text-lg">
                <div
                  className="flex items-center gap-2 font-semibold cursor-pointer hover:underline"
                  onClick={() =>
                    isExpanded
                      ? setExpandedUnits(
                          expandedUnits.filter((item) => item !== id)
                        )
                      : setExpandedUnits([...expandedUnits, id])
                  }
                >
                  <div className="flex">{title}</div>
                  {isExpanded ? <BsChevronUp /> : <BsChevronDown />}
                </div>
                {isExpanded && (
                  <div className="">
                    <UnitLessons description={description} lessons={lessons} />
                  </div>
                )}
              </li>
            );
          }
        })}
      </ol>
    </div>
  );
};

const IntendedOutcomes = ({ outcomes }: { outcomes: Maybe<string>[] }) => {
  return (
    <div className="flex flex-col w-full h-full p-4 gap-4">
      <div className="text-4xl font-bold">Intended Outcomes</div>
      <ul>
        {outcomes.map((outcome, index) => (
          <li key={index} className="text-lg">
            {outcome}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function CourseLandingPage({ course }: { course: Course }) {
  const { title, description, prereqs, units, intendedOutcomes } = course;
  const [expandedPrereqs, setExpandedPrereqs] = useState<string[]>([]);
  const [expandedUnits, setExpandedUnits] = useState<string[]>([]);
  return (
    <div className="flex flex-col w-full h-full items-center p-4 overflow-auto">
      <div className="flex flex-col gap-4 w-full">
        <CourseDetails title={title} description={description} />
        {prereqs && prereqs.length !== 0 && (
          <CoursePrereqs
            prereqs={prereqs}
            expandedPrereqs={expandedPrereqs}
            setExpandedPrereqs={setExpandedPrereqs}
          />
        )}
        {units && (
          <CourseUnits
            units={units}
            expandedUnits={expandedUnits}
            setExpandedUnits={setExpandedUnits}
          />
        )}
        {intendedOutcomes && <IntendedOutcomes outcomes={intendedOutcomes} />}
      </div>
    </div>
  );
}
