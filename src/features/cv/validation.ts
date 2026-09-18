export const validate = (value: string, type: string) => {
  if (!value.trim()) return "";

  if (type === "Email" && !value.includes("@")) {
    return "invalid email";
  }

  if (type === "Phone" && isNaN(Number(value))) {
    return "phone should be number";
  }

  if (type === "GPA" && isNaN(Number(value))) {
    return "number";
  }

  return "";
};

export const validatedetails = (...fields: string[]) => {
  return fields.every((field) => field.trim() !== "");
};
