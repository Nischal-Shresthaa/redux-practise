import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PersonalInfo {
  name: string;
  phonenum: string;
  email: string;
  location: string;
  jobTitle: string;
  linkedin: string;
}

interface Education {
  level: string;
  institution: string;
  field: string;
  startYear: string;
  endYear: string;
  gpa: string;
}

interface Experience {
  job: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Skill {
  name: string;
  level: string;
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
  link: string;
}

interface CVState {
  personal: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
}

const initialState: CVState = {
  personal: {
    name: "",
    phonenum: "",
    email: "",
    location: "",
    jobTitle: "",
    linkedin: "",
  },

  education: [],
  experience: [],
  skills: [],
  projects: [],
};

const cvSlice = createSlice({
  name: "cv",
  initialState: initialState,
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.personal.name = action.payload;
    },

    updatePhone: (state, action: PayloadAction<string>) => {
      state.personal.phonenum = action.payload;
    },

    updateEmail: (state, action: PayloadAction<string>) => {
      state.personal.email = action.payload;
    },

    updateLocation: (state, action: PayloadAction<string>) => {
      state.personal.location = action.payload;
    },

    updateJobTitle: (state, action: PayloadAction<string>) => {
      state.personal.jobTitle = action.payload;
    },

    updateLinkedin: (state, action: PayloadAction<string>) => {
      state.personal.linkedin = action.payload;
    },
    addEducation: (state, action: PayloadAction<Education>) => {
      state.education.push(action.payload);
    },

    removeEducation: (state, action: PayloadAction<number>) => {
      state.education = state.education.filter(
        (_, index) => index !== action.payload,
      );
    },
    addExperience: (state, action: PayloadAction<Experience>) => {
      state.experience.push(action.payload);
    },

    removeExperience: (state, action: PayloadAction<number>) => {
      state.experience = state.experience.filter(
        (_, index) => index !== action.payload,
      );
    },
    addSkill: (state, action: PayloadAction<Skill>) => {
      state.skills.push(action.payload);
    },

    removeSkill: (state, action: PayloadAction<number>) => {
      state.skills = state.skills.filter(
        (_, index) => index !== action.payload,
      );
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },

    removeProject: (state, action: PayloadAction<number>) => {
      state.projects = state.projects.filter(
        (_, index) => index !== action.payload,
      );
    },
  },
});

export const {
  updateName,
  updatePhone,
  updateEmail,
  updateLocation,
  updateJobTitle,
  updateLinkedin,
  addEducation,
  removeEducation,
  addExperience,
  removeExperience,
  addSkill,
  removeSkill,
  addProject,
  removeProject,
} = cvSlice.actions;
export default cvSlice.reducer;
