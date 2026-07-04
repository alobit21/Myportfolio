import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Plus, Edit2, Trash2, X, GraduationCap } from 'lucide-react';

export default function EducationManager() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({
    title: '', type: '', date: '', description: '', icon: 'school'
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/education');
      const data = await res.json();
      setEducation(data);
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

      const res = await fetch('/api/education', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        Swal.fire({
          title: 'Success!',
          text: modalMode === 'edit' ? 'Education updated!' : 'Education created!',
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
        text: 'Failed to save education',
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
        const res = await fetch(`/api/education?id=${id}`, { method: 'DELETE' });
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
    setForm({ title: '', type: '', date: '', description: '', icon: 'school' });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      type: item.type,
      date: item.date,
      description: item.description,
      icon: item.icon || 'school'
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
        <h2 className="text-2xl font-bold text-blue-400">Manage Education</h2>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-gray-900 font-semibold py-2 px-4 rounded-lg transition"
        >
          <Plus className="w-5 h-5" /> Add Education
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full mx-auto"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map(edu => (
            <div key={edu.id} className="bg-[#1a1f2e] p-5 rounded-2xl border border-gray-800 flex items-start gap-5 group hover:border-blue-500/50 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-500/20">
                <GraduationCap className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{edu.title}</h3>
                    <p className="text-blue-400/90 font-medium">{edu.type}</p>
                    <p className="text-sm text-gray-400 mt-1">{edu.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(edu)} className="p-2 bg-gray-800 hover:bg-[#3ca2fa] text-gray-400 hover:text-white rounded-xl transition-all border border-gray-700 hover:border-[#3ca2fa]">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(edu.id)} className="p-2 bg-gray-800 hover:bg-red-500 text-gray-400 hover:text-white rounded-xl transition-all border border-gray-700 hover:border-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-3">{edu.description}</p>
              </div>
            </div>
          ))}
          {education.length === 0 && <p className="text-gray-500 text-center py-12">No education records found.</p>}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-gray-800 rounded-xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-blue-400">{modalMode === 'edit' ? 'Edit' : 'Add'} Education</h2>
              <button type="button" onClick={closeModal} className="p-2 hover:bg-gray-700 rounded-lg"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Title (e.g. BSc Computer Science)</label>
                <input required type="text" className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg text-white" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Institution / Type</label>
                  <input required type="text" className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg text-white" value={form.type} onChange={e => setForm({...form, type: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                  <input required type="text" className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg text-white" placeholder="2018 - 2022" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                <textarea required className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg text-white h-24" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={closeModal} className="flex-1 py-3 border border-gray-600 text-gray-400 rounded-lg hover:bg-gray-700 transition">Cancel</button>
                <button type="submit" className="flex-1 bg-blue-500 hover:bg-blue-600 text-gray-900 font-semibold py-3 rounded-lg transition">{modalMode === 'edit' ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
