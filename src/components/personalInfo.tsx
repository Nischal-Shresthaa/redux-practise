import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updatePersonal } from "../features/cv/cvSlice.ts";
function Field({
  label,
  value,
  placeholder,
  onChange,
  full = false,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  full?: boolean;
}) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function PersonalInfo() {
  const dispatch = useAppDispatch();
  const personal = useAppSelector((state) => state.cv.personal);

  return (
    <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Personal Information
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Add your basic information for your CV.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field
          label="Full Name"
          value={personal.name}
          placeholder="e.g. Nischal Shrestha"
          onChange={(value) =>
            dispatch(
              updatePersonal({
                field: "name",
                value,
              }),
            )
          }
          full
        />

        <Field
          label="Job Title"
          value={personal.jobTitle}
          placeholder="e.g. Frontend Developer"
          onChange={(value) =>
            dispatch(
              updatePersonal({
                field: "jobTitle",
                value,
              }),
            )
          }
        />

        <Field
          label="Phone"
          value={personal.phonenum}
          placeholder="e.g. 98XXXXXXXX"
          onChange={(value) =>
            dispatch(
              updatePersonal({
                field: "phonenum",
                value,
              }),
            )
          }
        />

        <Field
          label="Email"
          value={personal.email}
          placeholder="e.g. you@email.com"
          onChange={(value) =>
            dispatch(
              updatePersonal({
                field: "email",
                value,
              }),
            )
          }
        />

        <Field
          label="Location"
          value={personal.location}
          placeholder="e.g. Kathmandu, Nepal"
          onChange={(value) =>
            dispatch(
              updatePersonal({
                field: "location",
                value,
              }),
            )
          }
        />

        <Field
          label="LinkedIn"
          value={personal.linkedin}
          placeholder="linkedin.com/xxx"
          onChange={(value) =>
            dispatch(
              updatePersonal({
                field: "linkedin",
                value,
              }),
            )
          }
          full
        />
      </div>
    </div>
  );
}

export default PersonalInfo;
