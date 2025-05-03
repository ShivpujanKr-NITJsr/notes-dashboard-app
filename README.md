# 📝 Notes Dashboard App

A full-stack note-taking application built using the **MERN stack** (MongoDB, Express, React, Node.js). Users can create, update, and manage notes with rich-text formatting, tag suggestions, and AI-powered summarization.

---

## 🌐 Live Demo

> _[Optional: Add your deployed link here]_

---

## 📁 Project Structure

```
notes-dashboard-app/
├── frontend/         # React frontend (TailwindCSS + React Router)
│   ├── public/
│   ├── src/
│   └── package.json
│
├── backend/          # Express backend (Node.js + MongoDB)
│   ├── src/
│   └── package.json
│
├             # Environment variables (DB URI, port, API keys) -.env
├── README.md
```

---

## 🛠 Tech Stack

### 🔹 Frontend
- React 18+
- TailwindCSS
- React Router DOM
- [`react-quill-new`](https://www.npmjs.com/package/react-quill-new) – rich-text editor compatible with React 18/19

### 🔹 Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- CORS
- OpenAI (for summarization)
- Hugging Face Transformers API (as alternative summarizer)

---

## ✅ Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [OpenAI API key](https://platform.openai.com/account/api-keys)
- [Hugging Face Access Token](https://huggingface.co/settings/tokens)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/notes-dashboard-app.git
cd notes-dashboard-app
```

### 2. Setup Backend

```bash
cd backend
npm install
```

> Create a `.env` file inside `/backend`:

```env
PORT=5500
MONGO_URI=mongodb://localhost:27017/smartnotes
OPENAI_API_KEY=your-openai-api-key
HUGGINGFACE_API_KEY=your-huggingface-access-token
```

> Start the backend server:

```bash
npm start
```

> Backend will run at: `http://localhost:5500`

---

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm start
```

> Frontend will run at: `http://localhost:5173`

---

## 🧠 Features

- ✨ Rich-text editor (`react-quill-new`)
- 📝 Create, update, delete notes
- 🔍 Filter notes by search or tags
- 📄 Pagination support
- 🏷️ **Tag suggestions while creating notes**
- 🤖 **Summarization of note content using OpenAI & Hugging Face Transformers**
- 📱 Fully responsive design (TailwindCSS)

---

## 🔗 AI Integrations

- When creating/editing notes, tags are auto-suggested based on content.
- AI summarization is triggered to generate short note previews using:
  - **OpenAI GPT**
  - **Hugging Face Transformers API** as fallback

---

## 🧪 API Routes

| Method | Route           | Description             |
|--------|------------------|-------------------------|
| GET    | /api/notes        | Get all notes (paginated) |
| GET    | /api/notes/:id    | Get a single note       |
| POST   | /api/notes        | Create a new note       |
| PUT    | /api/notes/:id    | Update a note           |
| DELETE | /api/notes/:id    | Delete a note           |
| POST   | /api/summarize    | Generate summary (AI)   |
| POST   | /api/tagsuggest   | Get tag suggestions     |

---

## 📦 Scripts

### Frontend

```bash
npm start       # Run React app
```

### Backend

```bash
npm start          # Run with nodemon
node src/index.js     # Run manually
```

---

## 📝 Environment Variables

`.env` file inside `/backend`:

```env
PORT=5500
MONGO_URI=mongodb://localhost:27017/notesapp
OPENAI_API_KEY=your-openai-api-key
HUGGINGFACE_API_KEY=your-huggingface-access-token
```

---

## 🔒 Notes

- MongoDB must be running locally or hosted on MongoDB Atlas
- `OPENAI_API_KEY` and `HUGGINGFACE_API_KEY` are required for AI features

---
