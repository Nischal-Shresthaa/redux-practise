import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addProject, removeProject } from "../features/cv/cvSlice.ts";

function Projects() {
  const dispatch = useAppDispatch();
  const projectList = useAppSelector((state) => state.cv.projects);

  const [projectInput, setProjectInput] = useState({
    name: "",
    description: "",
    technologies: "",
    link: "",
  });

  const projectInputs = [
    ["name", "Project Name"],
    ["technologies", "Technologies (React, TypeScript, Redux)"],
    ["link", "Project Link"],
  ];

  const updateProjectInput = (name: string, value: string) => {
    setProjectInput({
      ...projectInput,
      [name]: value,
    });
  };

  const addNewProject = () => {
    dispatch(
      addProject({
        ...projectInput,
        technologies: projectInput.technologies
          .split(",")
          .map((technology) => technology.trim()),
      }),
    );

    setProjectInput({
      name: "",
      description: "",
      technologies: "",
      link: "",
    });
  };

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Projects</h2>

      <div className="space-y-3">
        {projectInputs.map(([projectName, projectPlaceholder]) => (
          <input
            key={projectName}
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500"
            placeholder={projectPlaceholder}
            value={projectInput[projectName as keyof typeof projectInput]}
            onChange={(e) => updateProjectInput(projectName, e.target.value)}
          />
        ))}

        <textarea
          className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500"
          placeholder="Description"
          rows={3}
          value={projectInput.description}
          onChange={(e) => updateProjectInput("description", e.target.value)}
        />

        <button
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white"
          onClick={addNewProject}
        >
          Add Project
        </button>
      </div>

      <div className="mt-4 space-y-2">
        {projectList.map((savedProject, index) => (
          <div
            key={index}
            className="flex items-start justify-between rounded-lg border p-3"
          >
            <div>
              <p className="font-medium">{savedProject.name}</p>
              <p className="text-sm text-gray-600">
                {savedProject.description}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {savedProject.technologies.join(", ")}
              </p>
            </div>

            <button
              className="text-sm text-red-500"
              onClick={() => dispatch(removeProject(index))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
