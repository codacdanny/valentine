import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/client';
import { useValentine } from '../../context/ValentineContext';
import {
  LayoutDashboard, Upload, Music, Calendar, Edit, Save, Eye,
  LogOut, Copy, Check, Trash2, Image as ImageIcon
} from 'lucide-react';
import './Dashboard.css';

const BUCKET = 'valentines';

function Dashboard() {
  const navigate = useNavigate();
  const { currentUser, valentineData, setValentineData } = useValentine();

  const [activeTab, setActiveTab] = useState('photos');
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  const [formData, setFormData] = useState({
    relationshipStartDate: '',
    milestones: [],
    loveReasons: []
  });

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (valentineData) {
      setFormData({
        relationshipStartDate: valentineData.relationshipStartDate || '',
        milestones: valentineData.milestones || [],
        loveReasons: valentineData.loveReasons || []
      });
    }
  }, [currentUser, valentineData, navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setLoading(true);
    setSaveStatus('Uploading photos...');

    try {
      const uploaded = [];
      for (const file of files) {
        const path = `${currentUser.id}/photos/${Date.now()}_${file.name}`;
        const { error: uploadErr } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: true });
        if (uploadErr) throw uploadErr;
        const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
        uploaded.push({
          id: Date.now() + Math.random(),
          url: urlData.publicUrl,
          path,
          caption: 'A precious memory',
          date: new Date().toLocaleDateString()
        });
      }

      const updatedPhotos = [...(valentineData.photos || []), ...uploaded];
      const { error: updateErr } = await supabase
        .from('valentines')
        .update({ photos: updatedPhotos })
        .eq('user_id', currentUser.id);
      if (updateErr) throw updateErr;

      setValentineData({ ...valentineData, photos: updatedPhotos });
      setSaveStatus('Photos uploaded! ✓');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error('Upload error:', error);
      setSaveStatus(error.message || 'Upload failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePhoto = async (photoId, photoPath) => {
    if (!confirm('Delete this photo?')) return;

    setLoading(true);
    try {
      if (photoPath) {
        await supabase.storage.from(BUCKET).remove([photoPath]);
      }
      const updatedPhotos = (valentineData.photos || []).filter(p => p.id !== photoId);
      const { error } = await supabase
        .from('valentines')
        .update({ photos: updatedPhotos })
        .eq('user_id', currentUser.id);
      if (error) throw error;
      setValentineData({ ...valentineData, photos: updatedPhotos });
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMusicUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setSaveStatus('Uploading music...');

    try {
      const path = `${currentUser.id}/music/${file.name}`;
      const { error: uploadErr } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: true });
      if (uploadErr) throw uploadErr;
      const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);

      const { error: updateErr } = await supabase
        .from('valentines')
        .update({ music: urlData.publicUrl })
        .eq('user_id', currentUser.id);
      if (updateErr) throw updateErr;

      setValentineData({ ...valentineData, music: urlData.publicUrl });
      setSaveStatus('Music uploaded! ✓');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error('Upload error:', error);
      setSaveStatus(error.message || 'Upload failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveContent = async () => {
    setLoading(true);
    setSaveStatus('Saving...');

    try {
      const { error } = await supabase
        .from('valentines')
        .update({
          relationship_start_date: formData.relationshipStartDate,
          milestones: formData.milestones,
          love_reasons: formData.loveReasons
        })
        .eq('user_id', currentUser.id);
      if (error) throw error;

      setValentineData({
        ...valentineData,
        relationshipStartDate: formData.relationshipStartDate,
        milestones: formData.milestones,
        loveReasons: formData.loveReasons
      });

      setSaveStatus('Saved! ✓');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error('Save error:', error);
      setSaveStatus(error.message || 'Save failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    const link = `${window.location.origin}/u/${valentineData?.username || currentUser.email?.split('@')[0]}`;
    navigator.clipboard.writeText(link);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const previewPage = () => {
    const username = valentineData?.username || currentUser.email?.split('@')[0];
    window.open(`/u/${username}`, '_blank');
  };

  if (!valentineData) {
    return (
      <div className="dashboard-loading">
        <LayoutDashboard className="loading-icon" size={60} />
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-title-section">
            <LayoutDashboard className="dashboard-icon" size={40} />
            <div>
              <h1>Dashboard</h1>
              <p>Manage your personalized page</p>
            </div>
          </div>

          <div className="dashboard-actions">
            <motion.button
              className="dashboard-btn preview"
              onClick={previewPage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye size={20} />
              Preview
            </motion.button>

            <motion.button
              className="dashboard-btn logout"
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut size={20} />
              Logout
            </motion.button>
          </div>
        </div>

        <div className="dashboard-link-section">
          <div className="shareable-link">
            <span>Your link:</span>
            <code>{window.location.origin}/u/{valentineData.username}</code>
            <motion.button
              onClick={copyLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {linkCopied ? <Check size={18} /> : <Copy size={18} />}
              {linkCopied ? 'Copied!' : 'Copy'}
            </motion.button>
          </div>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button
          className={activeTab === 'photos' ? 'active' : ''}
          onClick={() => setActiveTab('photos')}
        >
          <ImageIcon size={20} />
          Photos
        </button>
        <button
          className={activeTab === 'music' ? 'active' : ''}
          onClick={() => setActiveTab('music')}
        >
          <Music size={20} />
          Music
        </button>
        <button
          className={activeTab === 'dates' ? 'active' : ''}
          onClick={() => setActiveTab('dates')}
        >
          <Calendar size={20} />
          Timeline
        </button>
        <button
          className={activeTab === 'reasons' ? 'active' : ''}
          onClick={() => setActiveTab('reasons')}
        >
          <Edit size={20} />
          Messages
        </button>
      </div>

      <div className="dashboard-content">
        {saveStatus && (
          <motion.div
            className="save-status"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {saveStatus}
          </motion.div>
        )}

        {activeTab === 'photos' && (
          <div className="dashboard-section">
            <h2>Upload Photos</h2>
            <p className="section-hint">Add 6-10 photos of you two together</p>

            <div className="upload-zone">
              <label className="upload-label">
                <Upload size={40} />
                <span>Click to upload photos</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  disabled={loading}
                />
              </label>
            </div>

            {valentineData.photos && valentineData.photos.length > 0 && (
              <div className="photos-grid">
                {valentineData.photos.map((photo) => (
                  <div key={photo.id} className="photo-card">
                    <img src={photo.url} alt={photo.caption} />
                    <button
                      className="delete-photo"
                      onClick={() => handleDeletePhoto(photo.id, photo.path)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'music' && (
          <div className="dashboard-section">
            <h2>Upload Music</h2>
            <p className="section-hint">Add your special romantic song (MP3 format)</p>

            <div className="upload-zone">
              <label className="upload-label">
                <Music size={40} />
                <span>{valentineData.music ? 'Change music' : 'Click to upload music'}</span>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleMusicUpload}
                  disabled={loading}
                />
              </label>
            </div>

            {valentineData.music && (
              <div className="music-player-preview">
                <Music size={30} />
                <p>Music uploaded! ✓</p>
                <audio controls src={valentineData.music} />
              </div>
            )}
          </div>
        )}

        {activeTab === 'dates' && (
          <div className="dashboard-section">
            <h2>Timeline & Milestones</h2>
            <p className="section-hint">Customize your relationship journey</p>

            <div className="form-group">
              <label>Relationship Start Date</label>
              <input
                type="date"
                value={formData.relationshipStartDate}
                onChange={(e) => setFormData({
                  ...formData,
                  relationshipStartDate: e.target.value
                })}
              />
            </div>

            <h3>Milestones</h3>
            {formData.milestones.map((milestone, index) => (
              <div key={index} className="milestone-editor">
                <input
                  type="text"
                  placeholder="Title"
                  value={milestone.title}
                  onChange={(e) => {
                    const updated = [...formData.milestones];
                    updated[index].title = e.target.value;
                    setFormData({ ...formData, milestones: updated });
                  }}
                />
                <input
                  type="text"
                  placeholder="Date (e.g., August 2024)"
                  value={milestone.date}
                  onChange={(e) => {
                    const updated = [...formData.milestones];
                    updated[index].date = e.target.value;
                    setFormData({ ...formData, milestones: updated });
                  }}
                />
                <textarea
                  placeholder="Description"
                  value={milestone.description}
                  onChange={(e) => {
                    const updated = [...formData.milestones];
                    updated[index].description = e.target.value;
                    setFormData({ ...formData, milestones: updated });
                  }}
                  rows={3}
                />
              </div>
            ))}

            <motion.button
              className="dashboard-btn save-btn"
              onClick={handleSaveContent}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Save size={20} />
              Save Timeline
            </motion.button>
          </div>
        )}

        {activeTab === 'reasons' && (
          <div className="dashboard-section">
            <h2>Personal Messages</h2>
            <p className="section-hint">Customize the 9 messages - make them personal and meaningful</p>

            {formData.loveReasons.map((reason, index) => (
              <div key={index} className="reason-editor">
                <div className="reason-number">{index + 1}</div>
                <div className="reason-fields">
                  <input
                    type="text"
                    placeholder="Title"
                    value={reason.title}
                    onChange={(e) => {
                      const updated = [...formData.loveReasons];
                      updated[index].title = e.target.value;
                      setFormData({ ...formData, loveReasons: updated });
                    }}
                  />
                  <textarea
                    placeholder="Why you love this about her..."
                    value={reason.text}
                    onChange={(e) => {
                      const updated = [...formData.loveReasons];
                      updated[index].text = e.target.value;
                      setFormData({ ...formData, loveReasons: updated });
                    }}
                    rows={3}
                  />
                </div>
              </div>
            ))}

            <motion.button
              className="dashboard-btn save-btn"
              onClick={handleSaveContent}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Save size={20} />
              Save Messages
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
