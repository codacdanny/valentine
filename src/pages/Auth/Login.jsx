import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../supabase/client';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) throw err;
      navigate('/bro-code');
    } catch (err) {
      const msg = err?.message || '';
      if (msg.includes('Invalid login') || msg.includes('invalid_credentials')) {
        setError('Wrong email or password. Try again.');
      } else if (msg.includes('Email not confirmed')) {
        setError('Please confirm your email first (check your inbox).');
      } else {
        setError(msg || 'Login failed. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
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
          <LogIn size={50} />
        </div>

        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to access your dashboard</p>

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

        <form onSubmit={handleEmailLogin} className="auth-form">
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <motion.button
          className="auth-button google"
          onClick={handleGoogleLogin}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" />
          Continue with Google
        </motion.button>

        <p className="auth-switch">
          Don't have an account?{' '}
          <Link to="/signup">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
