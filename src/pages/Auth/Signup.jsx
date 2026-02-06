import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../supabase/client';
import { UserPlus, Mail, Lock, User, AlertCircle } from 'lucide-react';
import './Auth.css';

const DEFAULT_MILESTONES = [
  { title: 'The Beginning', date: '', description: '', color: '#6366f1' },
  { title: 'First Month', date: '', description: '', color: '#8b5cf6' },
  { title: 'Growing Stronger', date: '', description: '', color: '#a855f7' },
  { title: '6 Months Strong', date: '', description: '', color: '#d946ef' }
];

const DEFAULT_LOVE_REASONS = [
  { title: 'Reason 1', text: '', color: '#6366f1' },
  { title: 'Reason 2', text: '', color: '#8b5cf6' },
  { title: 'Reason 3', text: '', color: '#a855f7' },
  { title: 'Reason 4', text: '', color: '#d946ef' },
  { title: 'Reason 5', text: '', color: '#6366f1' },
  { title: 'Reason 6', text: '', color: '#8b5cf6' },
  { title: 'Reason 7', text: '', color: '#a855f7' },
  { title: 'Reason 8', text: '', color: '#d946ef' },
  { title: 'Reason 9', text: '', color: '#6366f1' }
];

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const createValentineRow = async (userId, displayName, usernameVal, emailVal) => {
    await supabase.from('valentines').insert({
      user_id: userId,
      username: usernameVal,
      name: displayName,
      email: emailVal,
      photos: [],
      milestones: DEFAULT_MILESTONES,
      love_reasons: DEFAULT_LOVE_REASONS
    });
  };

  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSignupSuccess(false);
    setLoading(true);

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError('Username can only contain letters, numbers, and underscores');
      setLoading(false);
      return;
    }

    try {
      const { data, error: err } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, username },
          emailRedirectTo: window.location.origin + '/bro-code'
        }
      });
      if (err) throw err;

      if (data?.user) {
        try {
          await createValentineRow(data.user.id, name, username, email);
        } catch (insertErr) {
          console.warn('Valentine row insert failed (may already exist):', insertErr);
        }
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/bro-code');
      } else {
        setSignupSuccess(true);
        setError('');
      }
    } catch (err) {
      const msg = err?.message || '';
      if (msg.includes('already registered') || msg.includes('already exists')) {
        setError('Email already in use. Try logging in instead.');
      } else if (msg.includes('Invalid') || msg.includes('validation')) {
        setError('Please check your email and password (min 6 characters).');
      } else {
        setError(msg || 'Sign up failed. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    setLoading(true);

    try {
      const { error: err } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (err) throw err;
      navigate('/bro-code');
    } catch (err) {
      setError(err.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <motion.div
        className="auth-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="auth-icon">
          <UserPlus size={50} />
        </div>

        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Sign up to create your personalized page</p>

        {error && (
          <motion.div
            className="auth-error"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <AlertCircle size={20} />
            <span>{error}</span>
          </motion.div>
        )}

        {signupSuccess && (
          <motion.div
            className="auth-success"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p><strong>Check your email</strong></p>
            <p>We sent you a confirmation link. Click it to activate your account, then come back and log in.</p>
            <Link to="/login" className="auth-success-link">Go to Login →</Link>
          </motion.div>
        )}

        {!signupSuccess && (
        <>
        <form onSubmit={handleEmailSignup} className="auth-form">
          <div className="auth-input-group">
            <User className="auth-input-icon" size={20} />
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="auth-input-group">
            <User className="auth-input-icon" size={20} />
            <input
              type="text"
              placeholder="Username (for your unique link)"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              required
              disabled={loading}
            />
            <span className="auth-hint">Your link: /u/{username || 'yourname'}</span>
          </div>

          <div className="auth-input-group">
            <Mail className="auth-input-icon" size={20} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="auth-input-group">
            <Lock className="auth-input-icon" size={20} />
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={loading}
            />
          </div>

          <motion.button
            type="submit"
            className="auth-button primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </motion.button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <motion.button
          className="auth-button google"
          onClick={handleGoogleSignup}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" />
          Continue with Google
        </motion.button>

        <p className="auth-switch">
          Already have an account?{' '}
          <Link to="/login">Login</Link>
        </p>
        </>
        )}
      </motion.div>
    </div>
  );
}

export default Signup;
