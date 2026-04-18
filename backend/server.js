// ============================================
// NamHuan Backend Proxy Server
// ============================================
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase Client (server-side)
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);

// ============================================
// Auth Endpoints
// ============================================

// Email Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const result = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (result.error) {
            return res.status(401).json({ error: result.error.message });
        }

        res.json({
            user: result.data.user,
            session: result.data.session
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Email Signup
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        const result = await supabase.auth.signUp({
            email,
            password
        });

        if (result.error) {
            return res.status(400).json({ error: result.error.message });
        }

        res.json({
            user: result.data.user,
            session: result.data.session
        });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get Current User
app.post('/api/auth/user', async (req, res) => {
    try {
        const { accessToken } = req.body;

        if (!accessToken) {
            return res.status(400).json({ error: 'Access token is required' });
        }

        const result = await supabase.auth.getUser(accessToken);

        if (result.error) {
            return res.status(401).json({ error: result.error.message });
        }

        res.json({ user: result.data.user });
    } catch (err) {
        console.error('Get user error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Sign Out (nếu cần backend xử lý)
app.post('/api/auth/logout', async (req, res) => {
    try {
        const { accessToken } = req.body;

        if (accessToken) {
            await supabase.auth.signOut();
        }

        res.json({ message: 'Logged out successfully' });
    } catch (err) {
        console.error('Logout error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ============================================
// Task Endpoints
// ============================================

// Fetch all tasks for user
app.post('/api/tasks', async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json({ data });
    } catch (err) {
        console.error('Fetch tasks error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create Task
app.post('/api/tasks/create', async (req, res) => {
    try {
        const { userId, title, description, status, priority } = req.body;

        if (!userId || !title) {
            return res.status(400).json({ error: 'User ID and title are required' });
        }

        const { data, error } = await supabase
            .from('tasks')
            .insert([{
                user_id: userId,
                title,
                description,
                status,
                priority,
                created_at: new Date().toISOString()
            }])
            .select()
            .single();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json({ data });
    } catch (err) {
        console.error('Create task error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update Task
app.put('/api/tasks/:taskId', async (req, res) => {
    try {
        const { taskId } = req.params;
        const updates = req.body;

        if (!taskId) {
            return res.status(400).json({ error: 'Task ID is required' });
        }

        const { data, error } = await supabase
            .from('tasks')
            .update(updates)
            .eq('id', taskId)
            .select()
            .single();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json({ data });
    } catch (err) {
        console.error('Update task error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete Task
app.delete('/api/tasks/:taskId', async (req, res) => {
    try {
        const { taskId } = req.params;

        if (!taskId) {
            return res.status(400).json({ error: 'Task ID is required' });
        }

        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', taskId);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error('Delete task error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend server is running' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Backend server running on http://localhost:${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});
