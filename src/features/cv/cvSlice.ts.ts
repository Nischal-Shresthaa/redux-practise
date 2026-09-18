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
  educationForm: Education;
  education: Education[];
  editingEducationIndex: number | null;
  experienceForm: Experience;
  experience: Experience[];
  editingExperienceIndex: number | null;
  skillForm: Skill;
  skills: Skill[];
  editingSkillIndex: number | null;
  projects: Project[];
}

const emptyEducation: Education = {
  level: "",
  institution: "",
  field: "",
  startYear: "",
  endYear: "",
  gpa: "",
};

const emptyExperience: Experience = {
  job: "",
  company: "",
  startDate: "",
  endDate: "",
  description: "",
};

const emptySkill: Skill = {
  name: "",
  level: "",
};

const initialState: CVState = {
  personal: {
    name: "",
    phonenum: "",
    email: "",
    location: "",
    jobTitle: "",
    linkedin: "",
  },

  educationForm: { ...emptyEducation },
  education: [],
  editingEducationIndex: null,

  experienceForm: { ...emptyExperience },
  experience: [],
  editingExperienceIndex: null,

  skillForm: { ...emptySkill },
  skills: [],
  editingSkillIndex: null,

  projects: [],
};

const cvSlice = createSlice({
  name: "cv",
  initialState,

  reducers: {
    updatePersonal: (
      state,
      action: PayloadAction<{
        field: keyof PersonalInfo;
        value: string;
      }>,
    ) => {
      state.personal[action.payload.field] = action.payload.value;
    },

    updateEducationForm: (
      state,
      action: PayloadAction<{
        field: keyof Education;
        value: string;
      }>,
    ) => {
      state.educationForm[action.payload.field] = action.payload.value;
    },

    saveEducation: (state) => {
      state.education.push({ ...state.educationForm });
      state.educationForm = { ...emptyEducation };
    },

    startEditingEducation: (state, action: PayloadAction<number>) => {
      state.educationForm = { ...state.education[action.payload] };
      state.editingEducationIndex = action.payload;
    },

    updateEducation: (state) => {
      const index = state.editingEducationIndex;

      if (index !== null) {
        state.education[index] = { ...state.educationForm };
        state.educationForm = { ...emptyEducation };
        state.editingEducationIndex = null;
      }
    },

    removeEducation: (state, action: PayloadAction<number>) => {
      state.education.splice(action.payload, 1);
    },

    updateExperienceForm: (
      state,
      action: PayloadAction<{
        field: keyof Experience;
        value: string;
      }>,
    ) => {
      state.experienceForm[action.payload.field] = action.payload.value;
    },

    saveExperience: (state) => {
      state.experience.push({ ...state.experienceForm });
      state.experienceForm = { ...emptyExperience };
    },

    startEditingExperience: (state, action: PayloadAction<number>) => {
      state.experienceForm = { ...state.experience[action.payload] };
      state.editingExperienceIndex = action.payload;
    },

    updateExperience: (state) => {
      const index = state.editingExperienceIndex;

      if (index !== null) {
        state.experience[index] = { ...state.experienceForm };
        state.experienceForm = { ...emptyExperience };
        state.editingExperienceIndex = null;
      }
    },

    removeExperience: (state, action: PayloadAction<number>) => {
      state.experience.splice(action.payload, 1);
    },

    updateSkillForm: (
      state,
      action: PayloadAction<{
        field: keyof Skill;
        value: string;
      }>,
    ) => {
      state.skillForm[action.payload.field] = action.payload.value;
    },

    saveSkill: (state) => {
      state.skills.push({ ...state.skillForm });
      state.skillForm = { ...emptySkill };
    },

    startEditingSkill: (state, action: PayloadAction<number>) => {
      state.skillForm = { ...state.skills[action.payload] };
      state.editingSkillIndex = action.payload;
    },

    updateSkill: (state) => {
      const index = state.editingSkillIndex;

      if (index !== null) {
        state.skills[index] = { ...state.skillForm };
        state.skillForm = { ...emptySkill };
        state.editingSkillIndex = null;
      }
    },

    removeSkill: (state, action: PayloadAction<number>) => {
      state.skills.splice(action.payload, 1);
    },

    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },

    removeProject: (state, action: PayloadAction<number>) => {
      state.projects.splice(action.payload, 1);
    },
  },
});

export const {
  updatePersonal,
  updateEducationForm,
  saveEducation,
  startEditingEducation,
  updateEducation,
  removeEducation,
  updateExperienceForm,
  saveExperience,
  startEditingExperience,
  updateExperience,
  removeExperience,
  updateSkillForm,
  saveSkill,
  startEditingSkill,
  updateSkill,
  removeSkill,
  addProject,
  removeProject,
} = cvSlice.actions;

export default cvSlice.reducer;
