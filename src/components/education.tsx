import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addEducation, removeEducation } from "../features/cv/cvSlice.ts";

function Field({
  value,
  placeholder,
  onChange,
  type = "text",
}: {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <input
      type={type}
      className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function Education() {
  const dispatch = useAppDispatch();
  const educationList = useAppSelector((state) => state.cv.education);

  const [education, setEducation] = useState({
    level: "",
    institution: "",
    field: "",
    startYear: "",
    endYear: "",
    gpa: "",
  });

  const updateField = (field: string, value: string) => {
    setEducation({
      ...education,
      [field]: value,
    });
  };

  const resetEducation = () => {
    setEducation({
      level: "",
      institution: "",
      field: "",
      startYear: "",
      endYear: "",
      gpa: "",
    });
  };

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Education</h2>

      <div className="grid gap-3 sm:grid-cols-2">
        {[
          ["institution", "Institution"],
          ["field", "Field of Study"],
          ["startYear", "Start Year"],
          ["endYear", "End Year"],
          ["gpa", "GPA"],
        ].map(([field, placeholder]) => (
          <Field
            key={field}
            value={education[field as keyof typeof education]}
            placeholder={placeholder}
            onChange={(value) => updateField(field, value)}
          />
        ))}

        <select
          className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500"
          value={education.level}
          onChange={(e) => updateField("level", e.target.value)}
        >
          <option value="">Select Level</option>
          <option value="+2">+2</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Master">Master</option>
        </select>
      </div>

      <button
        className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white"
        onClick={() => {
          dispatch(addEducation(education));
          resetEducation();
        }}
      >
        Add Education
      </button>

      <div className="mt-4 space-y-2">
        {educationList.map((edu, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg border p-3"
          >
            <div>
              <p className="font-medium">{edu.level}</p>
              <p className="text-sm text-gray-500">{edu.institution}</p>

              <p className="text-sm text-gray-500">
                {edu.field} · {edu.startYear} - {edu.endYear}
              </p>

              {edu.gpa && (
                <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>
              )}
            </div>

            <button
              className="text-sm text-red-500"
              onClick={() => dispatch(removeEducation(index))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Education;
