import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addExperience, removeExperience } from "../features/cv/cvSlice.ts";

function Field({
  value,
  placeholder,
  onChange,
}: {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function Experience() {
  const dispatch = useAppDispatch();
  const experienceList = useAppSelector((state) => state.cv.experience);

  const [experience, setExperience] = useState({
    job: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const updateField = (field: string, value: string) => {
    setExperience({
      ...experience,
      [field]: value,
    });
  };

  const resetExperience = () => {
    setExperience({
      job: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Experience</h2>

      <div className="grid gap-3 sm:grid-cols-2">
        {[
          ["job", "Job Title"],
          ["company", "Company"],
          ["startDate", "Start Date"],
          ["endDate", "End Date"],
        ].map(([field, placeholder]) => (
          <Field
            key={field}
            value={experience[field as keyof typeof experience]}
            placeholder={placeholder}
            onChange={(value) => updateField(field, value)}
          />
        ))}
      </div>

      <textarea
        className="mt-3 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500"
        placeholder="Description"
        rows={4}
        value={experience.description}
        onChange={(e) => updateField("description", e.target.value)}
      />

      <button
        className="mt-3 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white"
        onClick={() => {
          dispatch(addExperience(experience));
          resetExperience();
        }}
      >
        Add Experience
      </button>

      <div className="mt-4 space-y-2">
        {experienceList.map((exp, index) => (
          <div
            key={index}
            className="flex items-start justify-between rounded-lg border p-3"
          >
            <div>
              <p className="font-medium">{exp.job}</p>
              <p className="text-sm text-gray-500">{exp.company}</p>

              <p className="text-sm text-gray-500">
                {exp.startDate} - {exp.endDate}
              </p>

              {exp.description && (
                <p className="mt-1 text-sm">{exp.description}</p>
              )}
            </div>

            <button
              className="text-sm text-red-500"
              onClick={() => dispatch(removeExperience(index))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experience;
