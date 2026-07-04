import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Plus, Edit2, Trash2, X, Wrench } from 'lucide-react';

export default function SkillsManager() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({
    name: '', level: '50', color: '#3ca2fa'
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/skills');
      const data = await res.json();
      setSkills(data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = modalMode === 'edit' ? 'PUT' : 'POST';
      const body = { ...form };
      if (modalMode === 'edit') body.id = editingItem.id;

      const res = await fetch('/api/skills', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        Swal.fire({
          title: 'Success!',
          text: modalMode === 'edit' ? 'Skill updated!' : 'Skill created!',
          icon: 'success',
          confirmButtonColor: '#3ca2fa',
          background: '#1f2937',
          color: '#fff'
        });
        closeModal();
        fetchData();
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to save skill',
        icon: 'error',
        confirmButtonColor: '#ef4444',
        background: '#1f2937',
        color: '#fff'
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will be permanently deleted!',
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
        const res = await fetch(`/api/skills?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          Swal.fire({ title: 'Deleted!', icon: 'success', background: '#1f2937', color: '#fff', confirmButtonColor: '#3ca2fa' });
          fetchData();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const openCreateModal = () => {
    setModalMode('create');
    setEditingItem(null);
    setForm({ name: '', level: '50', color: '#3ca2fa' });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      level: item.level.toString(),
      color: item.color || '#3ca2fa'
    });
    setModalMode('edit');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-orange-400">Manage Skills</h2>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-gray-900 font-semibold py-2 px-4 rounded-lg transition"
        >
          <Plus className="w-5 h-5" /> Add Skill
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-orange-400 border-t-transparent rounded-full mx-auto"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map(skill => (
            <div key={skill.id} className="bg-[#1a1f2e] p-5 rounded-2xl border border-gray-800 flex flex-col group hover:border-orange-500/50 hover:shadow-lg transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${skill.color}20`, border: `1px solid ${skill.color}40` }}>
                    <Wrench className="w-5 h-5" style={{ color: skill.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{skill.name}</h3>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(skill)} className="p-1.5 bg-gray-800 hover:bg-[#3ca2fa] text-gray-400 hover:text-white rounded-lg transition-all border border-gray-700 hover:border-[#3ca2fa]">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(skill.id)} className="p-1.5 bg-gray-800 hover:bg-red-500 text-gray-400 hover:text-white rounded-lg transition-all border border-gray-700 hover:border-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="w-full bg-gray-800 rounded-full h-2.5 mt-auto">
                <div className="h-2.5 rounded-full" style={{ width: `${skill.level}%`, backgroundColor: skill.color }}></div>
              </div>
              <div className="text-right text-xs text-gray-400 mt-2">{skill.level}% Proficiency</div>
            </div>
          ))}
          {skills.length === 0 && <p className="text-gray-500 col-span-full text-center py-12">No skills records found.</p>}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-gray-800 rounded-xl border border-gray-700 w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-orange-400">{modalMode === 'edit' ? 'Edit' : 'Add'} Skill</h2>
              <button type="button" onClick={closeModal} className="p-2 hover:bg-gray-700 rounded-lg"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Skill Name (e.g. React.js)</label>
                <input required type="text" className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg text-white" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Proficiency Level ({form.level}%)</label>
                <input type="range" min="0" max="100" className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" value={form.level} onChange={e => setForm({...form, level: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Brand Color Hex (e.g. #61DAFB)</label>
                <div className="flex gap-2">
                  <input type="color" className="w-12 h-12 rounded bg-transparent border-0 cursor-pointer" value={form.color} onChange={e => setForm({...form, color: e.target.value})} />
                  <input required type="text" className="flex-1 bg-gray-900 border border-gray-700 p-3 rounded-lg text-white" value={form.color} onChange={e => setForm({...form, color: e.target.value})} />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={closeModal} className="flex-1 py-3 border border-gray-600 text-gray-400 rounded-lg hover:bg-gray-700 transition">Cancel</button>
                <button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600 text-gray-900 font-semibold py-3 rounded-lg transition">{modalMode === 'edit' ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
