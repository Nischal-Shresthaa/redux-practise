import PersonalInfo from "./components/personalInfo";
import Education from "./components/education";
import Experience from "./components/experience";
import Skills from "./components/skills";
import Projects from "./components/project";
import CVPreview from "./components/CVPreview";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">CV Builder</h1>
            <p className="text-sm text-gray-500">Create your professional CV</p>
          </div>

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
            Live Preview
          </span>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 lg:grid-cols-2">
        <div className="space-y-4">
          <PersonalInfo />
          <Education />
          <Experience />
          <Skills />
          <Projects />
        </div>

        <div className="rounded-xl bg-gray-200 p-6">
          <CVPreview />
        </div>
      </main>
    </div>
  );
}

export default App;
