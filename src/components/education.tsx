import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  updateEducationForm,
  saveEducation,
  startEditingEducation,
  updateEducation,
  removeEducation,
} from "../features/cv/cvSlice.ts";

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
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

function Education() {
  const dispatch = useAppDispatch();

  const educationForm = useAppSelector((state) => state.cv.educationForm);

  const educationList = useAppSelector((state) => state.cv.education);

  const editingEducationIndex = useAppSelector(
    (state) => state.cv.editingEducationIndex,
  );

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
        ].map(([educationField, placeholder]) => (
          <Field
            key={educationField}
            value={educationForm[educationField as keyof typeof educationForm]}
            placeholder={placeholder}
            onChange={(newText) =>
              dispatch(
                updateEducationForm({
                  field: educationField as keyof typeof educationForm,
                  value: newText,
                }),
              )
            }
          />
        ))}

        <select
          className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500"
          value={educationForm.level}
          onChange={(event) =>
            dispatch(
              updateEducationForm({
                field: "level",
                value: event.target.value,
              }),
            )
          }
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
          if (editingEducationIndex === null) {
            dispatch(saveEducation());
          } else {
            dispatch(updateEducation());
          }
        }}
      >
        {editingEducationIndex === null ? "Add Education" : "Update Education"}
      </button>

      <div className="mt-4 space-y-2">
        {educationList.map((educationItem, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg border p-3"
          >
            <div>
              <p className="font-medium">{educationItem.level}</p>

              <p className="text-sm text-gray-500">
                {educationItem.institution}
              </p>

              <p className="text-sm text-gray-500">
                {educationItem.field} · {educationItem.startYear} -{" "}
                {educationItem.endYear}
              </p>

              {educationItem.gpa && (
                <p className="text-sm text-gray-500">
                  GPA: {educationItem.gpa}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                className="text-sm text-blue-500"
                onClick={() => dispatch(startEditingEducation(index))}
              >
                Edit
              </button>

              <button
                className="text-sm text-red-500"
                onClick={() => dispatch(removeEducation(index))}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Education;
