import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Settings, Save, Image as ImageIcon, Link as LinkIcon, FileText } from 'lucide-react';
import Image from 'next/image';

export default function SettingsManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '', title: '', bio: '', profileImage: '', cvUrl: ''
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/profile');
      const data = await res.json();
      if (data.id) {
        setForm({
          name: data.name || '',
          title: data.title || '',
          bio: data.bio || '',
          profileImage: data.profileImage || '',
          cvUrl: data.cvUrl || ''
        });
      }
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
    setSaving(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        Swal.fire({
          title: 'Success!',
          text: 'Profile settings updated successfully!',
          icon: 'success',
          confirmButtonColor: '#3ca2fa',
          background: '#1f2937',
          color: '#fff'
        });
      } else {
        throw new Error('Failed to update');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to update settings',
        icon: 'error',
        confirmButtonColor: '#ef4444',
        background: '#1f2937',
        color: '#fff'
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-200">Global Settings</h2>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full mx-auto"></div>
        </div>
      ) : (
        <div className="bg-[#1a1f2e] border border-gray-800 rounded-2xl p-6 md:p-8 max-w-4xl shadow-xl shadow-black/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Display Name</label>
                <input required type="text" className="w-full bg-gray-900 border border-gray-700 p-3.5 rounded-xl text-white focus:border-[#3ca2fa] transition-colors" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Professional Title</label>
                <input required type="text" className="w-full bg-gray-900 border border-gray-700 p-3.5 rounded-xl text-white focus:border-[#3ca2fa] transition-colors" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g. Full Stack Developer" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Short Bio</label>
              <textarea required className="w-full bg-gray-900 border border-gray-700 p-3.5 rounded-xl text-white h-32 focus:border-[#3ca2fa] transition-colors" value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} placeholder="Write a short summary about yourself..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-400">Profile Image URL</label>
                <div className="flex gap-2">
                  <div className="w-12 h-12 bg-gray-900 border border-gray-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ImageIcon className="w-5 h-5 text-gray-500" />
                  </div>
                  <input type="text" className="flex-1 bg-gray-900 border border-gray-700 p-3 rounded-xl text-white focus:border-[#3ca2fa] transition-colors" value={form.profileImage} onChange={e => setForm({...form, profileImage: e.target.value})} placeholder="https://..." />
                </div>
                {form.profileImage && (
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden border border-gray-700 mt-2">
                    <Image src={form.profileImage} alt="Profile preview" fill className="object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Resume / CV Link</label>
                <div className="flex gap-2">
                  <div className="w-12 h-12 bg-gray-900 border border-gray-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-gray-500" />
                  </div>
                  <input type="text" className="flex-1 bg-gray-900 border border-gray-700 p-3 rounded-xl text-white focus:border-[#3ca2fa] transition-colors" value={form.cvUrl} onChange={e => setForm({...form, cvUrl: e.target.value})} placeholder="Link to Google Drive or PDF..." />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-800">
              <button disabled={saving} type="submit" className="flex items-center gap-2 bg-[#3ca2fa] hover:bg-blue-500 text-gray-900 font-bold py-3.5 px-8 rounded-xl transition disabled:opacity-50">
                <Save className="w-5 h-5" />
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
