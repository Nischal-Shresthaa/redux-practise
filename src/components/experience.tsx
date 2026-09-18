import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  updateExperienceForm,
  saveExperience,
  startEditingExperience,
  updateExperience,
  removeExperience,
} from "../features/cv/cvSlice.ts";
import { validatedetails } from "../features/cv/validation.ts";

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
      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

function Experience() {
  const dispatch = useAppDispatch();

  const experienceForm = useAppSelector((state) => state.cv.experienceForm);

  const experienceList = useAppSelector((state) => state.cv.experience);

  const editingExperienceIndex = useAppSelector(
    (state) => state.cv.editingExperienceIndex,
  );
  const handleAdd = () => {
    if (
      !validatedetails(
        experienceForm.job,
        experienceForm.company,
        experienceForm.startDate,
        experienceForm.endDate,
        experienceForm.description,
      )
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editingExperienceIndex === null) {
      dispatch(saveExperience());
    } else {
      dispatch(updateExperience());
    }
  };
  return (
    <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Experience</h2>

      <div className="grid grid-cols-2 gap-4">
        {[
          ["job", "Job Title"],
          ["company", "Company"],
          ["startDate", "Start Date"],
          ["endDate", "End Date"],
        ].map(([experienceField, placeholder]) => (
          <Field
            key={experienceField}
            value={
              experienceForm[experienceField as keyof typeof experienceForm]
            }
            placeholder={placeholder}
            onChange={(newText) =>
              dispatch(
                updateExperienceForm({
                  field: experienceField as keyof typeof experienceForm,
                  value: newText,
                }),
              )
            }
          />
        ))}

        <textarea
          className="col-span-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          placeholder="Describe your responsibilities and achievements"
          rows={4}
          value={experienceForm.description}
          onChange={(event) =>
            dispatch(
              updateExperienceForm({
                field: "description",
                value: event.target.value,
              }),
            )
          }
        />
      </div>

      <button
        className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white"
        onClick={handleAdd}
      >
        {editingExperienceIndex === null
          ? "Add Experience"
          : "Update Experience"}
      </button>

      <div className="mt-5 space-y-3">
        {experienceList.map((experienceItem, index) => (
          <div key={index} className="rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold">{experienceItem.job}</p>

                <p className="text-sm text-gray-600">
                  {experienceItem.company}
                </p>

                <p className="text-sm text-gray-500">
                  {experienceItem.startDate} - {experienceItem.endDate}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  className="text-sm text-blue-500"
                  onClick={() => dispatch(startEditingExperience(index))}
                >
                  Edit
                </button>

                <button
                  className="text-sm text-red-500"
                  onClick={() => dispatch(removeExperience(index))}
                >
                  Remove
                </button>
              </div>
            </div>

            {experienceItem.description && (
              <p className="mt-2 text-sm text-gray-600">
                {experienceItem.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experience;
