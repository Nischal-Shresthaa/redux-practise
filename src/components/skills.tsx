import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  updateSkillForm,
  saveSkill,
  startEditingSkill,
  updateSkill,
  removeSkill,
} from "../features/cv/cvSlice.ts";

function Skills() {
  const dispatch = useAppDispatch();

  const skillForm = useAppSelector((state) => state.cv.skillForm);

  const skillList = useAppSelector((state) => state.cv.skills);

  const editingSkillIndex = useAppSelector(
    (state) => state.cv.editingSkillIndex,
  );

  return (
    <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Skills</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          placeholder="e.g. React"
          value={skillForm.name}
          onChange={(event) =>
            dispatch(
              updateSkillForm({
                field: "name",
                value: event.target.value,
              }),
            )
          }
        />

        <select
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          value={skillForm.level}
          onChange={(event) =>
            dispatch(
              updateSkillForm({
                field: "level",
                value: event.target.value,
              }),
            )
          }
        >
          <option value="">Select Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <button
        className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white"
        onClick={() => {
          if (editingSkillIndex === null) {
            dispatch(saveSkill());
          } else {
            dispatch(updateSkill());
          }
        }}
      >
        {editingSkillIndex === null ? "Add Skill" : "Update Skill"}
      </button>

      <div className="mt-5 space-y-2">
        {skillList.map((skillItem, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg border p-3"
          >
            <div>
              <p className="font-medium">{skillItem.name}</p>

              <p className="text-sm text-gray-500">{skillItem.level}</p>
            </div>

            <div className="flex gap-3">
              <button
                className="text-sm text-blue-500"
                onClick={() => dispatch(startEditingSkill(index))}
              >
                Edit
              </button>

              <button
                className="text-sm text-red-500"
                onClick={() => dispatch(removeSkill(index))}
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

export default Skills;
