'use client';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Image from 'next/image';
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  GraduationCap,
  Settings,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  X,
  Upload,
  ImageIcon,
  ChevronRight,
  Menu,
  Wrench,
  Layers
} from 'lucide-react';

// Sidebar Navigation Items
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills & Tech', icon: Wrench },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [editingItem, setEditingItem] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form States
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    image: '',
    images: [],
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
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && (activeTab === 'projects' || activeTab === 'experience')) {
      fetchData();
    }
  }, [activeTab, isAuthenticated]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/${activeTab}`);
      const data = await res.json();
      if (activeTab === 'projects') setProjects(data);
      else if (activeTab === 'experience') setExperiences(data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      const data = await res.json();
      if (res.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('admin_auth', 'true');
        Swal.fire({
          title: 'Welcome!',
          text: 'Login successful',
          icon: 'success',
          confirmButtonColor: '#3ca2fa',
          background: '#1f2937',
          color: '#fff'
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: data.error || 'Login failed',
          icon: 'error',
          confirmButtonColor: '#ef4444',
          background: '#1f2937',
          color: '#fff'
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'An error occurred during login',
        icon: 'error',
        confirmButtonColor: '#ef4444',
        background: '#1f2937',
        color: '#fff'
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  // Image Upload Handler - supports multiple images
  const handleImageUpload = async (e, formType, isMainImage = false) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploadingImage(true);
    const uploadedUrls = [];

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', formType === 'project' ? 'portfolio/projects' : 'portfolio/experience');

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });

        const data = await res.json();
        if (res.ok) {
          uploadedUrls.push(data.url);
        } else {
          throw new Error(data.error);
        }
      }

      if (formType === 'project') {
        if (isMainImage) {
          setProjectForm(prev => ({ ...prev, image: uploadedUrls[0] }));
        } else {
          setProjectForm(prev => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
        }
      }

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: `${uploadedUrls.length} image(s) uploaded!`,
        showConfirmButton: false,
        timer: 2000,
        background: '#1f2937',
        color: '#fff'
      });
    } catch (error) {
      Swal.fire({
        title: 'Upload Failed',
        text: error.message || 'Failed to upload image',
        icon: 'error',
        confirmButtonColor: '#ef4444',
        background: '#1f2937',
        color: '#fff'
      });
    } finally {
      setUploadingImage(false);
    }
  };

  // Remove image from images array
  const handleRemoveImage = (index) => {
    setProjectForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // Project CRUD
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = modalMode === 'edit' ? 'PUT' : 'POST';
      const body = {
        ...projectForm,
        tags: projectForm.tags.split(',').map(t => t.trim()),
        images: projectForm.images || []
      };
      if (modalMode === 'edit') body.id = editingItem.id;

      const res = await fetch('/api/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        Swal.fire({
          title: 'Success!',
          text: modalMode === 'edit' ? 'Project updated!' : 'Project created!',
          icon: 'success',
          confirmButtonColor: '#3ca2fa',
          background: '#1f2937',
          color: '#fff'
        });
        setProjectForm({ title: '', description: '', image: '', tags: '', gitUrl: '', previewUrl: '' });
        setShowModal(false);
        setModalMode('create');
        setEditingItem(null);
        fetchData();
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to save project',
        icon: 'error',
        confirmButtonColor: '#ef4444',
        background: '#1f2937',
        color: '#fff'
      });
    }
  };

  const handleDeleteProject = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This project will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#3ca2fa',
      confirmButtonText: 'Yes, delete it!',
      background: '#1f2937',
      color: '#fff'
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          Swal.fire({
            title: 'Deleted!',
            text: 'Project has been deleted.',
            icon: 'success',
            confirmButtonColor: '#3ca2fa',
            background: '#1f2937',
            color: '#fff'
          });
          fetchData();
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Failed to delete project',
          icon: 'error',
          confirmButtonColor: '#ef4444',
          background: '#1f2937',
          color: '#fff'
        });
      }
    }
  };

  const handleEditProject = (project) => {
    setEditingItem(project);
    setProjectForm({
      title: project.title,
      description: project.description,
      image: project.image,
      images: project.images || [],
      tags: project.tags?.join(', ') || '',
      gitUrl: project.gitUrl || '',
      previewUrl: project.previewUrl || ''
    });
    setModalMode('edit');
    setShowModal(true);
  };

  // Experience CRUD
  const handleExpSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = modalMode === 'edit' ? 'PUT' : 'POST';
      const body = {
        ...expForm,
        description: expForm.description.split('\n').filter(d => d.trim()),
        technologies: expForm.technologies.split(',').map(t => t.trim()),
        achievements: expForm.achievements.split(',').map(a => a.trim())
      };
      if (modalMode === 'edit') body.id = editingItem.id;

      const res = await fetch('/api/experience', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        Swal.fire({
          title: 'Success!',
          text: modalMode === 'edit' ? 'Experience updated!' : 'Experience created!',
          icon: 'success',
          confirmButtonColor: '#3ca2fa',
          background: '#1f2937',
          color: '#fff'
        });
        setExpForm({ title: '', company: '', location: '', date: '', type: 'Professional', description: '', technologies: '', achievements: '' });
        setShowModal(false);
        setModalMode('create');
        setEditingItem(null);
        fetchData();
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to save experience',
        icon: 'error',
        confirmButtonColor: '#ef4444',
        background: '#1f2937',
        color: '#fff'
      });
    }
  };

  const handleDeleteExperience = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This experience will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#3ca2fa',
      confirmButtonText: 'Yes, delete it!',
      background: '#1f2937',
      color: '#fff'
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/experience?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          Swal.fire({
            title: 'Deleted!',
            text: 'Experience has been deleted.',
            icon: 'success',
            confirmButtonColor: '#3ca2fa',
            background: '#1f2937',
            color: '#fff'
          });
          fetchData();
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Failed to delete experience',
          icon: 'error',
          confirmButtonColor: '#ef4444',
          background: '#1f2937',
          color: '#fff'
        });
      }
    }
  };

  const handleEditExperience = (exp) => {
    setEditingItem(exp);
    setExpForm({
      title: exp.title,
      company: exp.company,
      location: exp.location || '',
      date: exp.date || '',
      type: exp.type || 'Professional',
      description: exp.description?.join('\n') || '',
      technologies: exp.technologies?.join(', ') || '',
      achievements: exp.achievements?.join(', ') || ''
    });
    setModalMode('edit');
    setShowModal(true);
  };

  const openCreateModal = () => {
    setModalMode('create');
    setEditingItem(null);
    setProjectForm({ title: '', description: '', image: '', images: [], tags: '', gitUrl: '', previewUrl: '' });
    setExpForm({ title: '', company: '', location: '', date: '', type: 'Professional', description: '', technologies: '', achievements: '' });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMode('create');
    setEditingItem(null);
  };

  // Dashboard Stats
  const DashboardContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#3ca2fa]">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Projects</p>
              <p className="text-3xl font-bold text-[#3ca2fa]">{projects.length}</p>
            </div>
            <FolderKanban className="w-10 h-10 text-[#3ca2fa]/50" />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Experiences</p>
              <p className="text-3xl font-bold text-emerald-400">{experiences.length}</p>
            </div>
            <Briefcase className="w-10 h-10 text-emerald-400/50" />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Quick Actions</p>
              <button
                onClick={() => setActiveTab('projects')}
                className="mt-2 text-sm text-[#3ca2fa] hover:underline flex items-center gap-1"
              >
                Add Project <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <Plus className="w-10 h-10 text-purple-400/50" />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Portfolio Status</p>
              <p className="text-lg font-semibold text-yellow-400">Active</p>
            </div>
            <Layers className="w-10 h-10 text-yellow-400/50" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Projects</h3>
          <div className="space-y-3">
            {projects.slice(0, 5).map(project => (
              <div key={project.id} className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg">
                <div className="w-12 h-12 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                  {project.image && (
                    <Image src={project.image} alt={project.title} width={48} height={48} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{project.title}</p>
                  <p className="text-sm text-gray-400 truncate">{project.tags?.join(', ')}</p>
                </div>
              </div>
            ))}
            {projects.length === 0 && <p className="text-gray-500 text-center py-4">No projects yet</p>}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Experiences</h3>
          <div className="space-y-3">
            {experiences.slice(0, 5).map(exp => (
              <div key={exp.id} className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{exp.title}</p>
                  <p className="text-sm text-gray-400 truncate">{exp.company} • {exp.date}</p>
                </div>
              </div>
            ))}
            {experiences.length === 0 && <p className="text-gray-500 text-center py-4">No experiences yet</p>}
          </div>
        </div>
      </div>
    </div>
  );

  // Projects List Component
  const ProjectsContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#3ca2fa]">Manage Projects</h2>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-[#3ca2fa] hover:bg-[#3ca2fa]/80 text-gray-900 font-semibold py-2 px-4 rounded-lg transition"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-[#3ca2fa] border-t-transparent rounded-full mx-auto"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(project => (
            <div key={project.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden group">
              <div className="relative h-40 bg-gray-700">
                {project.image ? (
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="w-12 h-12 text-gray-600" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                {project.images && project.images.length > 0 && (
                  <div className="absolute top-2 left-2 bg-gray-900/80 px-2 py-1 rounded text-xs text-white flex items-center gap-1">
                    <ImageIcon className="w-3 h-3" />
                    {project.images.length + 1} photos
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditProject(project)}
                    className="p-2 bg-[#3ca2fa] hover:bg-[#3ca2fa]/80 text-gray-900 rounded-lg transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-white truncate">{project.title}</h3>
                  {project.images && project.images.length > 0 && (
                    <span className="text-xs bg-[#3ca2fa]/20 text-[#3ca2fa] px-2 py-1 rounded flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" />
                      {project.images.length + 1}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400 mt-1 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {project.tags?.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-xs bg-gray-700 text-[#3ca2fa] px-2 py-1 rounded">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && projects.length === 0 && (
        <div className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700">
          <FolderKanban className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No projects found</p>
          <button
            onClick={openCreateModal}
            className="mt-4 text-[#3ca2fa] hover:underline"
          >
            Create your first project
          </button>
        </div>
      )}
    </div>
  );

  // Experience List Component
  const ExperienceContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-emerald-400">Manage Experience</h2>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-gray-900 font-semibold py-2 px-4 rounded-lg transition"
        >
          <Plus className="w-5 h-5" />
          Add Experience
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full mx-auto"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map(exp => (
            <div key={exp.id} className="bg-gray-800 p-4 rounded-xl border border-gray-700 flex items-start gap-4 group">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-white">{exp.title}</h3>
                    <p className="text-emerald-400">{exp.company}</p>
                    <p className="text-sm text-gray-400">{exp.location} • {exp.date}</p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditExperience(exp)}
                      className="p-2 bg-[#3ca2fa] hover:bg-[#3ca2fa]/80 text-gray-900 rounded-lg transition"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteExperience(exp.id)}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {exp.technologies?.slice(0, 4).map((tech, i) => (
                    <span key={i} className="text-xs bg-gray-700 text-emerald-400 px-2 py-1 rounded">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && experiences.length === 0 && (
        <div className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700">
          <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No experiences found</p>
          <button
            onClick={openCreateModal}
            className="mt-4 text-emerald-400 hover:underline"
          >
            Create your first experience
          </button>
        </div>
      )}
    </div>
  );

  // Modal JSX - rendered inline to prevent remounting
  const ModalContent = showModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal} />
      <div className="relative bg-gray-800 rounded-xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#3ca2fa]">
              {modalMode === 'edit' ? 'Edit' : 'Add New'} {activeTab === 'projects' ? 'Project' : 'Experience'}
            </h2>
            <button onClick={closeModal} className="p-2 hover:bg-gray-700 rounded-lg transition">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'projects' ? (
              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                  <input
                    type="text"
                    className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg text-white focus:border-[#3ca2fa] focus:outline-none transition"
                    value={projectForm.title}
                    onChange={e => setProjectForm({...projectForm, title: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                  <textarea
                    className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg text-white h-24 focus:border-[#3ca2fa] focus:outline-none transition"
                    value={projectForm.description}
                    onChange={e => setProjectForm({...projectForm, description: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Main Project Image</label>
                  <div className="flex items-center gap-4">
                    {projectForm.image && (
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-700">
                        <Image src={projectForm.image} alt="Preview" width={80} height={80} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <label className={`flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition ${uploadingImage ? 'opacity-50' : ''}`}>
                      <Upload className="w-4 h-4 text-[#3ca2fa]" />
                      <span className="text-sm">{uploadingImage ? 'Uploading...' : 'Upload Main Image'}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'project', true)} disabled={uploadingImage} />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Additional Screenshots ({projectForm.images.length})</label>
                  <div className="space-y-3">
                    {projectForm.images.length > 0 && (
                      <div className="grid grid-cols-4 gap-2">
                        {projectForm.images.map((img, index) => (
                          <div key={index} className="relative group">
                            <div className="w-full h-20 rounded-lg overflow-hidden bg-gray-700">
                              <Image src={img} alt={`Screenshot ${index + 1}`} width={80} height={80} className="w-full h-full object-cover" />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <label className={`flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition ${uploadingImage ? 'opacity-50' : ''}`}>
                      <Upload className="w-4 h-4 text-[#3ca2fa]" />
                      <span className="text-sm">{uploadingImage ? 'Uploading...' : 'Add Screenshots'}</span>
                      <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleImageUpload(e, 'project', false)} disabled={uploadingImage} />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">GitHub URL</label>
                    <input
                      type="url"
                      className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg text-white focus:border-[#3ca2fa] focus:outline-none transition"
                      value={projectForm.gitUrl}
                      onChange={e => setProjectForm({...projectForm, gitUrl: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Preview URL</label>
                    <input
                      type="url"
                      className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg text-white focus:border-[#3ca2fa] focus:outline-none transition"
                      value={projectForm.previewUrl}
                      onChange={e => setProjectForm({...projectForm, previewUrl: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg text-white focus:border-[#3ca2fa] focus:outline-none transition"
                    value={projectForm.tags}
                    onChange={e => setProjectForm({...projectForm, tags: e.target.value})}
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 py-3 border border-gray-600 text-gray-400 rounded-lg hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploadingImage}
                    className="flex-1 bg-[#3ca2fa] hover:bg-[#3ca2fa]/80 text-gray-900 font-semibold py-3 rounded-lg transition disabled:opacity-50"
                  >
                    {modalMode === 'edit' ? 'Update Project' : 'Create Project'}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleExpSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Job Title</label>
                  <input
                    type="text"
                    className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg text-white focus:border-emerald-500 focus:outline-none transition"
                    value={expForm.title}
                    onChange={e => setExpForm({...expForm, title: e.target.value})}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Company</label>
                    <input
                      type="text"
                      className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg text-white focus:border-emerald-500 focus:outline-none transition"
                      value={expForm.company}
                      onChange={e => setExpForm({...expForm, company: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Type</label>
                    <select
                      className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg text-white focus:border-emerald-500 focus:outline-none transition"
                      value={expForm.type}
                      onChange={e => setExpForm({...expForm, type: e.target.value})}
                    >
                      <option value="Professional">Professional</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Academic">Academic</option>
                      <option value="Technical">Technical</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                    <input
                      type="text"
                      className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg text-white focus:border-emerald-500 focus:outline-none transition"
                      value={expForm.location}
                      onChange={e => setExpForm({...expForm, location: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                    <input
                      type="text"
                      className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg text-white focus:border-emerald-500 focus:outline-none transition"
                      value={expForm.date}
                      onChange={e => setExpForm({...expForm, date: e.target.value})}
                      placeholder="2022 - Present"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Description (one point per line)</label>
                  <textarea
                    className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg text-white h-24 focus:border-emerald-500 focus:outline-none transition"
                    value={expForm.description}
                    onChange={e => setExpForm({...expForm, description: e.target.value})}
                    placeholder="• Led a team of 5 developers&#10;• Improved performance by 40%"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Technologies (comma separated)</label>
                  <input
                    type="text"
                    className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg text-white focus:border-emerald-500 focus:outline-none transition"
                    value={expForm.technologies}
                    onChange={e => setExpForm({...expForm, technologies: e.target.value})}
                    placeholder="React, Node.js, AWS"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Achievements (comma separated)</label>
                  <input
                    type="text"
                    className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg text-white focus:border-emerald-500 focus:outline-none transition"
                    value={expForm.achievements}
                    onChange={e => setExpForm({...expForm, achievements: e.target.value})}
                    placeholder="Award winner, Top performer"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 py-3 border border-gray-600 text-gray-400 rounded-lg hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-gray-900 font-semibold py-3 rounded-lg transition"
                  >
                    {modalMode === 'edit' ? 'Update Experience' : 'Create Experience'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
  );

  // Placeholder for other tabs
  const PlaceholderContent = ({ title }) => (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-4">
        <Settings className="w-10 h-10 text-gray-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-400">{title}</h2>
      <p className="text-gray-500 mt-2">This feature is coming soon</p>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 w-full max-w-md shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#3ca2fa]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <LayoutDashboard className="w-8 h-8 text-[#3ca2fa]" />
            </div>
            <h1 className="text-3xl font-bold text-white">Admin Login</h1>
            <p className="text-gray-400 mt-2">Sign in to manage your portfolio</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
              <input
                type="text"
                className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg text-white focus:border-[#3ca2fa] focus:outline-none transition"
                value={loginData.username}
                onChange={e => setLoginData({...loginData, username: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
              <input
                type="password"
                className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg text-white focus:border-[#3ca2fa] focus:outline-none transition"
                value={loginData.password}
                onChange={e => setLoginData({...loginData, password: e.target.value})}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#3ca2fa] hover:bg-[#3ca2fa]/80 text-gray-900 font-bold py-3 rounded-lg transition"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 border-r border-gray-700 flex flex-col transition-all duration-300 fixed h-full z-40`}>
        {/* Logo */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#3ca2fa]/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <LayoutDashboard className="w-6 h-6 text-[#3ca2fa]" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-white">Admin</h1>
                <p className="text-xs text-gray-400">Portfolio CMS</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#3ca2fa]/20 text-[#3ca2fa] border border-[#3ca2fa]/30'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#3ca2fa]' : ''}`} />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-700 space-y-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-gray-400 hover:bg-gray-700 hover:text-white rounded-lg transition"
          >
            <Menu className="w-5 h-5" />
            {sidebarOpen && <span className="text-sm">Collapse</span>}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <div className="p-8">
          {activeTab === 'dashboard' && <DashboardContent />}
          {activeTab === 'projects' && <ProjectsContent />}
          {activeTab === 'experience' && <ExperienceContent />}
          {['education', 'skills', 'settings'].includes(activeTab) && <PlaceholderContent title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} />}
        </div>
      </main>

      {/* Modal */}
      {ModalContent}
    </div>
  );
}
