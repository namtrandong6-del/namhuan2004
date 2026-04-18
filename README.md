# NamHuan - Personal Task Kanban Dashboard

A modern, responsive Kanban board application for personal task management built with React, Supabase, and Express.

## 🎯 Features

- ✅ **Kanban Board**: Organize tasks into columns (To Do, In Progress, Done)
- ✅ **Real-time Sync**: Live updates with Supabase
- ✅ **Dark Mode**: Toggle between light and dark themes
- ✅ **Drag & Drop**: Move tasks between columns
- ✅ **Priority Levels**: High, Medium, Low priority badges
- ✅ **Task Management**: Create, edit, delete, and archive tasks
- ✅ **User Authentication**: Email/Password and GitHub OAuth
- ✅ **Responsive Design**: Mobile-friendly UI with Tailwind CSS

## 📋 Tech Stack

### Frontend
- **React 18** - UI Framework
- **Tailwind CSS** - Styling
- **Material Symbols** - Icons
- **Supabase JS** - Real-time updates

### Backend
- **Node.js** - Runtime
- **Express** - API Server
- **Supabase** - Database & Auth

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16
- npm or yarn
- Supabase account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd NamHuan2004-main
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables**
   ```bash
   # Create .env file in backend folder
   cp .env.example .env
   
   # Edit .env and add your Supabase credentials
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_KEY=your_service_key_here
   PORT=5000
   NODE_ENV=development
   ```

4. **Start Backend Server**
   ```bash
   # Development with auto-reload
   npm run dev
   
   # Production
   npm start
   ```

5. **Open Frontend**
   - Open `index.html` in your browser at `http://localhost:8000`
   - Or serve with Live Server: `Live Server > Open with Live Server`

## 📁 Project Structure

```
NamHuan2004-main/
├── index.html              # Login page
├── dashboard/
│   └── dashboard.html      # Main Kanban board
├── login/
│   └── resign.html         # Signup page
├── js/
│   └── supabase-config.js  # Supabase configuration
├── style/
│   └── style.css           # Global styles
├── backend/
│   ├── server.js           # Express server
│   ├── package.json        # Dependencies
│   └── .env                # Environment variables (not versioned)
├── .env.example            # Example environment variables
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🔐 Security Notes

⚠️ **Important**: Never commit sensitive information:
- `.env` files are gitignored
- API keys are stored on the backend only
- Service keys are NOT exposed to the frontend
- Use environment variables for all credentials

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login` - Email login
- `POST /api/auth/signup` - Email signup
- `POST /api/auth/user` - Get current user
- `POST /api/auth/logout` - Logout

### Tasks
- `POST /api/tasks` - Fetch user tasks
- `POST /api/tasks/create` - Create new task
- `PUT /api/tasks/:taskId` - Update task
- `DELETE /api/tasks/:taskId` - Delete task

### Health
- `GET /api/health` - Server status check

## 🛠️ Development

### Frontend Development
- Edit HTML files directly (no build step needed)
- Use Live Server extension for hot-reload
- Check browser console for errors

### Backend Development
```bash
# Terminal 1: Start backend with auto-reload
cd backend
npm run dev

# Terminal 2: Open frontend with Live Server
# Right-click index.html → Open with Live Server
```

## 🚢 Deployment

### Supabase Setup
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Create `tasks` table with columns:
   - `id` (UUID, Primary Key)
   - `user_id` (UUID, Foreign Key)
   - `title` (Text)
   - `description` (Text)
   - `status` (Text)
   - `priority` (Text)
   - `created_at` (Timestamp)

### Backend Deployment (Recommended: Railway, Heroku, or Vercel)
```bash
# Update .env with production credentials
# Deploy to your hosting provider
```

### Frontend Deployment (GitHub Pages, Netlify, etc.)
```bash
# Simply upload HTML files to static hosting
```

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check Node version
node --version

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Supabase connection fails
- Verify `.env` has correct credentials
- Check internet connection
- Ensure Supabase project is active

### Tasks not syncing
- Open browser DevTools Console
- Check for error messages
- Verify backend server is running on port 5000

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Express Documentation](https://expressjs.com)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)

## 📄 License

MIT License - feel free to use this project for personal and commercial purposes

## 👨‍💻 Author

**NamHuan** - Personal Task Kanban Dashboard

---

**Last Updated**: April 18, 2026
