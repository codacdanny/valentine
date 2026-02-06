import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase/client';

const ValentineContext = createContext();

export const useValentine = () => {
  const context = useContext(ValentineContext);
  if (!context) {
    throw new Error('useValentine must be used within ValentineProvider');
  }
  return context;
};

function mapRowToValentineData(row) {
  if (!row) return null;
  return {
    ...row,
    relationshipStartDate: row.relationship_start_date ?? row.relationshipStartDate ?? '',
    loveReasons: row.love_reasons ?? row.loveReasons ?? [],
    milestones: row.milestones ?? [],
    photos: row.photos ?? [],
    music: row.music ?? null,
    username: row.username,
    name: row.name,
    email: row.email,
  };
}

export const ValentineProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [valentineData, setValentineData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    const fetchValentineForUser = async (user) => {
      const { data, error } = await supabase
        .from('valentines')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!error && data) {
        setValentineData(mapRowToValentineData(data));
        return;
      }

      const base = user.email?.split('@')[0]?.replace(/[^a-zA-Z0-9]/g, '_') || 'user';
      const username = user.user_metadata?.username || `${base}_${user.id.slice(0, 8)}`;
      const { data: inserted, error: insertErr } = await supabase.from('valentines').insert({
        user_id: user.id,
        username,
        name: user.user_metadata?.name || user.user_metadata?.full_name || user.email,
        email: user.email,
        photos: [],
        milestones: DEFAULT_MILESTONES,
        love_reasons: DEFAULT_LOVE_REASONS
      }).select().maybeSingle();

      if (!insertErr && inserted) {
        setValentineData(mapRowToValentineData(inserted));
      } else {
        const { data: existing } = await supabase.from('valentines').select('*').eq('user_id', user.id).maybeSingle();
        if (existing) setValentineData(mapRowToValentineData(existing));
        else setValentineData(null);
      }
    };

    const init = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setCurrentUser(session.user);
          await fetchValentineForUser(session.user);
        } else {
          setCurrentUser(null);
          setValentineData(null);
        }
      } catch (err) {
        console.error('Auth init error:', err);
        setCurrentUser(null);
        setValentineData(null);
      } finally {
        setLoading(false);
      }
    };

    init();

    let subscription;
    try {
      const { data: { subscription: sub } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          try {
            if (session?.user) {
              setCurrentUser(session.user);
              await fetchValentineForUser(session.user);
            } else {
              setCurrentUser(null);
              setValentineData(null);
            }
          } catch (err) {
            console.error('Auth state change error:', err);
          } finally {
            setLoading(false);
          }
        }
      );
      subscription = sub;
    } catch (err) {
      console.error('Auth listener error:', err);
      setLoading(false);
    }

    return () => subscription?.unsubscribe();
  }, []);

  const value = {
    currentUser,
    valentineData,
    setValentineData,
    loading
  };

  return (
    <ValentineContext.Provider value={value}>
      {children}
    </ValentineContext.Provider>
  );
};
