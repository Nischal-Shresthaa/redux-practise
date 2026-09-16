import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addSkill, removeSkill } from "../features/cv/cvSlice.ts";

function Skills() {
  const dispatch = useAppDispatch();
  const skillsList = useAppSelector((state) => state.cv.skills);

  const [skill, setSkill] = useState({
    name: "",
    level: "",
  });

  const inputClass =
    "w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500";

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Skills</h2>

      <div className="flex gap-3">
        <input
          className={inputClass}
          placeholder="Skill"
          value={skill.name}
          onChange={(e) => setSkill({ ...skill, name: e.target.value })}
        />

        <input
          className={inputClass}
          placeholder="Level"
          value={skill.level}
          onChange={(e) => setSkill({ ...skill, level: e.target.value })}
        />
      </div>

      <button
        className="mt-3 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white"
        onClick={() => {
          dispatch(addSkill(skill));
          setSkill({ name: "", level: "" });
        }}
      >
        Add Skill
      </button>

      <div className="mt-4 flex flex-wrap gap-2">
        {skillsList.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm"
          >
            <span>
              {skill.name} · {skill.level}
            </span>

            <button
              className="text-red-500"
              onClick={() => dispatch(removeSkill(index))}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
