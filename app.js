import React, { useState } from "react";

// --- MOCK DATABASE WITH IMAGES & PASTEL COLORS ---
const initialJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Studio Minimal",
    location: "Remote",
    salary: "$70k - $90k",
    type: "Full-time",
    logo: "https://ui-avatars.com/api/?name=Studio+Minimal&background=fce7f3&color=9d174d",
    tags: ["React", "Design", "CSS"],
  },
  {
    id: 2,
    title: "Data Analyst Intern",
    company: "Aura Metrics",
    location: "New York, NY",
    salary: "$25/hr",
    type: "Internship",
    logo: "https://ui-avatars.com/api/?name=Aura+Metrics&background=e0e7ff&color=3730a3",
    tags: ["Python", "SQL", "Tableau"],
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Pastel Canvas Co.",
    location: "San Francisco, CA",
    salary: "$80k - $110k",
    type: "Full-time",
    logo: "https://ui-avatars.com/api/?name=Pastel+Canvas&background=dcfce7&color=166534",
    tags: ["Figma", "User Research"],
  },
];

export default function App() {
  const [activeRole, setActiveRole] = useState("Home");
  const [jobs, setJobs] = useState(initialJobs);
  const [applications, setApplications] = useState([]);

  // --- STUDENT DASHBOARD ---
  const StudentDashboard = () => (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-slate-700 mb-6 font-serif">Discover Opportunities</h2>
      
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <div className="flex items-center gap-4 mb-4">
              <img src={job.logo} alt={job.company} className="w-12 h-12 rounded-2xl" />
              <div>
                <h3 className="text-xl font-bold text-slate-800">{job.title}</h3>
                <p className="text-slate-500 font-medium">{job.company} • {job.location}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">{job.type}</span>
              {job.tags.map(tag => (
                <span key={tag} className="bg-slate-50 text-slate-500 px-3 py-1 rounded-full text-xs font-medium">{tag}</span>
              ))}
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
              <span className="text-slate-700 font-semibold">{job.salary}</span>
              <button 
                onClick={() => {
                  setApplications([...applications, { id: Date.now(), job, status: "Under Review", date: "Today" }]);
                  alert(`Application sent to ${job.company}!`);
                }}
                className="bg-indigo-200 hover:bg-indigo-300 text-indigo-900 font-bold py-2 px-6 rounded-xl transition-colors"
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-slate-700 mb-6 font-serif">Your Applications</h2>
      {applications.length === 0 ? (
        <div className="bg-rose-50 p-8 rounded-3xl text-center border border-rose-100">
          <p className="text-rose-400 font-medium">You haven't applied to any roles yet. Start exploring!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between border border-slate-100">
              <div className="flex items-center gap-4">
                <img src={app.job.logo} alt="logo" className="w-10 h-10 rounded-xl" />
                <div>
                  <h4 className="font-bold text-slate-800">{app.job.title}</h4>
                  <p className="text-sm text-slate-500">{app.job.company}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">{app.status}</span>
                <span className="text-xs text-slate-400 mt-1">Applied {app.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // --- EMPLOYER DASHBOARD ---
  const EmployerDashboard = () => {
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");

    const handlePost = (e) => {
      e.preventDefault();
      const newJob = {
        id: Date.now(), title, company, location: "TBD", salary: "TBD", type: "Full-time", tags: [],
        logo: `https://ui-avatars.com/api/?name=${company}&background=random`
      };
      setJobs([newJob, ...jobs]);
      setTitle(""); setCompany("");
      alert("Job posted successfully!");
    };

    return (
      <div className="grid md:grid-cols-3 gap-8 animate-fade-in">
        <div className="md:col-span-1">
          <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 shadow-sm sticky top-24">
            <h3 className="text-xl font-bold text-emerald-900 mb-4 font-serif">Post a New Role</h3>
            <form onSubmit={handlePost} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-emerald-800 mb-1">Job Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full p-3 rounded-xl border-none focus:ring-2 focus:ring-emerald-300 outline-none shadow-sm" placeholder="e.g. Product Manager" />
              </div>
              <div>
                <label className="block text-sm font-bold text-emerald-800 mb-1">Company Name</label>
                <input type="text" value={company} onChange={e => setCompany(e.target.value)} required className="w-full p-3 rounded-xl border-none focus:ring-2 focus:ring-emerald-300 outline-none shadow-sm" placeholder="e.g. Acme Corp" />
              </div>
              <button type="submit" className="w-full bg-emerald-200 hover:bg-emerald-300 text-emerald-900 font-bold py-3 rounded-xl transition-colors mt-2">
                Publish Listing
              </button>
            </form>
          </div>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold text-slate-700 mb-6 font-serif">Incoming Applications</h2>
          {applications.length === 0 ? (
            <div className="bg-slate-50 p-12 rounded-3xl text-center border border-slate-100">
              <p className="text-slate-400 font-medium text-lg">No candidates have applied yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app.id} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={`https://ui-avatars.com/api/?name=Student+Name&background=f1f5f9&color=475569`} alt="Candidate" className="w-12 h-12 rounded-full" />
                    <div>
                      <h4 className="font-bold text-slate-800">Student Candidate</h4>
                      <p className="text-sm text-slate-500">Applied for: <span className="font-semibold text-emerald-600">{app.job.title}</span></p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-sm bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold py-2 px-4 rounded-xl transition-colors">Reject</button>
                    <button className="text-sm bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold py-2 px-4 rounded-xl transition-colors">Schedule Interview</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // --- OFFICER DASHBOARD ---
  const OfficerDashboard = () => (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-slate-700 mb-6 font-serif">Placement Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
          <p className="text-indigo-600 font-bold mb-1">Active Job Listings</p>
          <h3 className="text-4xl font-extrabold text-indigo-900">{jobs.length}</h3>
        </div>
        <div className="bg-rose-50 p-6 rounded-3xl border border-rose-100">
          <p className="text-rose-600 font-bold mb-1">Total Applications</p>
          <h3 className="text-4xl font-extrabold text-rose-900">{applications.length}</h3>
        </div>
        <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100">
          <p className="text-amber-600 font-bold mb-1">Placement Rate</p>
          <h3 className="text-4xl font-extrabold text-amber-900">84%</h3>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Recent Platform Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-slate-600">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            <p><strong>Studio Minimal</strong> posted a new job: Frontend Developer</p>
          </div>
          <div className="flex items-center gap-3 text-slate-600">
            <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
            <p><strong>3 Students</strong> applied to UI/UX Designer at Pastel Canvas Co.</p>
          </div>
          <div className="flex items-center gap-3 text-slate-600">
            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
            <p><strong>Admin</strong> updated the semester placement records.</p>
          </div>
        </div>
      </div>
    </div>
  );

  // --- ADMIN DASHBOARD ---
  const AdminDashboard = () => (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 font-serif">System Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wider">
              <th className="p-4 rounded-tl-xl rounded-bl-xl font-bold">User Name</th>
              <th className="p-4 font-bold">Role</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 rounded-tr-xl rounded-br-xl font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            <tr className="border-b border-slate-50">
              <td className="p-4 flex items-center gap-3"><img src="https://ui-avatars.com/api/?name=Alice&background=e0e7ff" className="w-8 h-8 rounded-full"/> Alice Smith</td>
              <td className="p-4"><span className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md text-xs font-bold">Student</span></td>
              <td className="p-4"><span className="text-emerald-500 font-bold text-sm">● Active</span></td>
              <td className="p-4"><button className="text-sm text-slate-400 hover:text-slate-700">Edit</button></td>
            </tr>
            <tr className="border-b border-slate-50">
              <td className="p-4 flex items-center gap-3"><img src="https://ui-avatars.com/api/?name=TechCorp&background=dcfce7" className="w-8 h-8 rounded-full"/> TechCorp HR</td>
              <td className="p-4"><span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md text-xs font-bold">Employer</span></td>
              <td className="p-4"><span className="text-emerald-500 font-bold text-sm">● Active</span></td>
              <td className="p-4"><button className="text-sm text-slate-400 hover:text-slate-700">Edit</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf9f8] font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* --- TOP NAVIGATION BAR --- */}
      <nav className="bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setActiveRole("Home")}
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-300 to-rose-300 flex items-center justify-center text-white font-black text-xl">C</div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight font-serif">CampusLink</h1>
          </div>
          
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            {["Student", "Employer", "Officer", "Admin"].map((role) => (
              <button
                key={role}
                onClick={() => setActiveRole(role)}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeRole === role 
                    ? "bg-white text-indigo-900 shadow-sm" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        
        {/* HOME HERO SECTION */}
        {activeRole === "Home" && (
          <div className="text-center animate-fade-in flex flex-col items-center">
            <div className="bg-rose-50 text-rose-600 px-4 py-1 rounded-full text-sm font-bold tracking-wide mb-6 uppercase">
              Placement Interaction System
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold text-slate-800 mb-6 font-serif tracking-tight leading-tight max-w-3xl">
              Connect top talent with <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-rose-400">
                extraordinary roles.
              </span>
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mb-12">
              A minimalist, unified platform for students, employers, and placement officers to seamlessly manage the recruitment lifecycle.
            </p>
            
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop" 
              alt="Students working together" 
              className="w-full h-96 object-cover rounded-[3rem] shadow-lg mb-12"
            />
          </div>
        )}

        {/* ROLE ROUTING */}
        {activeRole === "Student" && <StudentDashboard />}
        {activeRole === "Employer" && <EmployerDashboard />}
        {activeRole === "Officer" && <OfficerDashboard />}
        {activeRole === "Admin" && <AdminDashboard />}

      </main>
    </div>
  );
}
