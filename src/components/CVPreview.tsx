import { useAppSelector } from "../app/hooks";

function CVPreview() {
  const personal = useAppSelector((state) => state.cv.personal);
  const education = useAppSelector((state) => state.cv.education);
  const experience = useAppSelector((state) => state.cv.experience);
  const skills = useAppSelector((state) => state.cv.skills);
  const projects = useAppSelector((state) => state.cv.projects);
  const printCV = () => {
    window.print();
  };
  return (
    <div className="mx-auto min-h-250 max-w-2xl bg-white p-10 shadow-lg">
      <div className="border-b pb-5">
        <button
          onClick={printCV}
          className="print:hidden rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white"
        >
          Print
        </button>

        <h1 className="text-4xl font-bold text-gray-900">
          {personal.name || "Your Name"}
        </h1>

        <p className="mt-1 text-lg font-medium text-blue-600">
          {personal.jobTitle || "Job Title"}
        </p>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
          {personal.email && <span>{personal.email}</span>}
          {personal.phonenum && <span>{personal.phonenum}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
        </div>
      </div>

      {experience.length > 0 && (
        <section className="mt-7">
          <h2 className="mb-4 border-b-2 border-gray-900 pb-1 text-lg font-bold uppercase tracking-wide">
            Experience
          </h2>

          {experience.map((experienceItem, index) => (
            <div key={index} className="mb-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {experienceItem.job}
                  </h3>

                  <p className="text-sm font-medium text-blue-600">
                    {experienceItem.company}
                  </p>
                </div>

                <p className="text-sm text-gray-500">
                  {experienceItem.startDate} - {experienceItem.endDate}
                </p>
              </div>

              {experienceItem.description && (
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {experienceItem.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="mt-7">
          <h2 className="mb-4 border-b-2 border-gray-900 pb-1 text-lg font-bold uppercase tracking-wide">
            Education
          </h2>

          {education.map((educationItem, index) => (
            <div key={index} className="mb-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {educationItem.level}
                  </h3>

                  <p className="text-sm font-medium text-blue-600">
                    {educationItem.institution}
                  </p>
                </div>

                <p className="text-sm text-gray-500">
                  {educationItem.startYear} - {educationItem.endYear}
                </p>
              </div>

              {educationItem.field && (
                <p className="mt-1 text-sm text-gray-600">
                  {educationItem.field}
                </p>
              )}

              {educationItem.gpa && (
                <p className="mt-1 text-sm font-medium text-gray-700">
                  GPA: {educationItem.gpa}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="mt-7">
          <h2 className="mb-4 border-b-2 border-gray-900 pb-1 text-lg font-bold uppercase tracking-wide">
            Skills
          </h2>

          <div className="flex flex-wrap gap-2">
            {skills.map((skillItem, index) => (
              <div
                key={index}
                className="rounded-md bg-gray-100 px-3 py-2 text-sm"
              >
                <span className="font-medium">{skillItem.name}</span>

                {skillItem.level && (
                  <span className="text-gray-500"> · {skillItem.level}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mt-7">
          <h2 className="mb-4 border-b-2 border-gray-900 pb-1 text-lg font-bold uppercase tracking-wide">
            Projects
          </h2>

          {projects.map((projectItem, index) => (
            <div key={index} className="mb-5">
              <h3 className="font-semibold text-gray-900">
                {projectItem.name}
              </h3>

              {projectItem.description && (
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  {projectItem.description}
                </p>
              )}

              {projectItem.technologies.length > 0 && (
                <p className="mt-2 text-sm font-medium text-blue-600">
                  {projectItem.technologies.join(" · ")}
                </p>
              )}

              {projectItem.link && (
                <p className="mt-1 text-xs text-gray-500">{projectItem.link}</p>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default CVPreview;
