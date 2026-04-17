// ============================================
// Supabase Configuration - NamHuan Project
// ============================================

const SUPABASE_URL = 'https://gaattdmfuyxnaofspfvy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhYXR0ZG1mdXl4bmFvZnNwZnZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMDUxOTYsImV4cCI6MjA5MTg4MTE5Nn0.IOb6H2BofMFr14S-fjV8AANSNef-3zlEwRfenbNES10';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================
// Auth Helpers
// ============================================

async function getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
        console.error('Error getting user:', error.message);
        return null;
    }
    return user;
}

async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Error signing out:', error.message);
        return false;
    }
    return true;
}

// Redirect to login if not authenticated
async function requireAuth() {
    const user = await getCurrentUser();
    if (!user) {
        window.location.href = '../index.html';
        return null;
    }
    return user;
}

// Redirect to dashboard if already authenticated
async function redirectIfLoggedIn() {
    const user = await getCurrentUser();
    if (user) {
        window.location.href = '../dashboard/dashboard.html';
        return true;
    }
    return false;
}

// ============================================
// Task CRUD Operations
// ============================================

async function fetchTasks(userId) {
    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching tasks:', error.message);
        return [];
    }
    return data;
}

async function createTask(taskData) {
    const { data, error } = await supabase
        .from('tasks')
        .insert([taskData])
        .select()
        .single();

    if (error) {
        console.error('Error creating task:', error.message);
        return null;
    }
    return data;
}

async function updateTask(taskId, updates) {
    const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', taskId)
        .select()
        .single();

    if (error) {
        console.error('Error updating task:', error.message);
        return null;
    }
    return data;
}

async function deleteTask(taskId) {
    const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

    if (error) {
        console.error('Error deleting task:', error.message);
        return false;
    }
    return true;
}
