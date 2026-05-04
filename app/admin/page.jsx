'use client';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form States
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    image: '',
    tags: '',
    gitUrl: '',
    previewUrl: ''
  });

  const [expForm, setExpForm] = useState({
    title: '',
    company: '',
    location: '',
    date: '',
    type: 'Professional',
    description: '',
    technologies: '',
    achievements: ''
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/${activeTab}`);
      const data = await res.json();
      if (activeTab === 'projects') setProjects(data);
      else setExperiences(data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...projectForm,
          tags: projectForm.tags.split(',').map(t => t.trim())
        })
      });
      if (res.ok) {
        Swal.fire('Success', 'Project created!', 'success');
        setProjectForm({ title: '', description: '', image: '', tags: '', gitUrl: '', previewUrl: '' });
        fetchData();
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to create project', 'error');
    }
  };

  const handleExpSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...expForm,
          description: expForm.description.split('\n').filter(d => d.trim()),
          technologies: expForm.technologies.split(',').map(t => t.trim()),
          achievements: expForm.achievements.split(',').map(a => a.trim())
        })
      });
      if (res.ok) {
        Swal.fire('Success', 'Experience created!', 'success');
        setExpForm({ title: '', company: '', location: '', date: '', type: 'Professional', description: '', technologies: '', achievements: '' });
        fetchData();
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to create experience', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-400 mb-8">Portfolio Admin Dashboard</h1>
        
        <div className="flex space-x-4 mb-8">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${activeTab === 'projects' ? 'bg-yellow-500 text-gray-900' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
          >
            Manage Projects
          </button>
          <button 
            onClick={() => setActiveTab('experience')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${activeTab === 'experience' ? 'bg-yellow-500 text-gray-900' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
          >
            Manage Experience
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl font-bold mb-6 text-yellow-400">Add New {activeTab === 'projects' ? 'Project' : 'Experience'}</h2>
            
            {activeTab === 'projects' ? (
              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <input type="text" placeholder="Title" className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} required />
                <textarea placeholder="Description" className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg h-32" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} required />
                <input type="text" placeholder="Image URL" className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg" value={projectForm.image} onChange={e => setProjectForm({...projectForm, image: e.target.value})} required />
                <input type="text" placeholder="Tags (comma separated)" className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg" value={projectForm.tags} onChange={e => setProjectForm({...projectForm, tags: e.target.value})} />
                <input type="text" placeholder="GitHub URL" className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg" value={projectForm.gitUrl} onChange={e => setProjectForm({...projectForm, gitUrl: e.target.value})} />
                <input type="text" placeholder="Preview URL" className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg" value={projectForm.previewUrl} onChange={e => setProjectForm({...projectForm, previewUrl: e.target.value})} />
                <button type="submit" className="w-full bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg hover:bg-yellow-600 transition">Create Project</button>
              </form>
            ) : (
              <form onSubmit={handleExpSubmit} className="space-y-4">
                <input type="text" placeholder="Job Title" className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg" value={expForm.title} onChange={e => setExpForm({...expForm, title: e.target.value})} required />
                <input type="text" placeholder="Company" className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg" value={expForm.company} onChange={e => setExpForm({...expForm, company: e.target.value})} required />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Location" className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg" value={expForm.location} onChange={e => setExpForm({...expForm, location: e.target.value})} />
                  <input type="text" placeholder="Date (e.g. 2022 - Present)" className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg" value={expForm.date} onChange={e => setExpForm({...expForm, date: e.target.value})} />
                </div>
                <select className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg" value={expForm.type} onChange={e => setExpForm({...expForm, type: e.target.value})}>
                  <option value="Professional">Professional</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Academic">Academic</option>
                  <option value="Technical">Technical</option>
                </select>
                <textarea placeholder="Description (One point per line)" className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg h-32" value={expForm.description} onChange={e => setExpForm({...expForm, description: e.target.value})} required />
                <input type="text" placeholder="Technologies (comma separated)" className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg" value={expForm.technologies} onChange={e => setExpForm({...expForm, technologies: e.target.value})} />
                <input type="text" placeholder="Achievements (comma separated)" className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg" value={expForm.achievements} onChange={e => setExpForm({...expForm, achievements: e.target.value})} />
                <button type="submit" className="w-full bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg hover:bg-yellow-600 transition">Create Experience</button>
              </form>
            )}
          </div>

          {/* List Section */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 overflow-y-auto max-h-[800px]">
            <h2 className="text-xl font-bold mb-6 text-yellow-400">Current {activeTab === 'projects' ? 'Projects' : 'Experiences'}</h2>
            {loading ? <p>Loading...</p> : (
              <div className="space-y-4">
                {(activeTab === 'projects' ? projects : experiences).map((item) => (
                  <div key={item.id} className="p-4 bg-gray-900 rounded-lg border border-gray-700 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="text-sm text-gray-400">{activeTab === 'projects' ? item.tags?.join(', ') : item.company}</p>
                    </div>
                    {/* Add delete button later */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
