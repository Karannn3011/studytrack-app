# StudyTrack

**StudyTrack** is a web application that helps students organize their learning. It enables you to create subjects, break them down into topics, track progress visually, and attach study materials like videos, PDFs, and articles. Whether you're preparing for exams or learning independently, StudyTrack simplifies and centralizes your study workflow.

## Features

- **Subject & Topic Management**: Organize your study material hierarchically.
- **Progress Tracking**: Mark topics as completed or starred for easy revision.
- **Resource Attachment**: Add links to videos, PDFs, or external articles.
- **Personal Notes**: Write and manage notes per subject.
- **React Context State Management**: Centralized state using React's Context API.
- **Local Persistence**: Automatically saves your data using browser `localStorage`.
- **Responsive, Minimal UI**: Built for distraction-free study sessions.

## Live Demo

Visit the deployed app here:  
[https://studytrack-app-two.vercel.app/](https://studytrack-app-two.vercel.app/)


## Tech Stack

- **Framework**: React (Vite)
- **Styling**: TailwindCSS + DaisyUI
- **State Management**: React Context API
- **Deployment**: Vercel
- **Persistence**: LocalStorage (No backend)

## Getting Started Locally

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/studytrack.git
cd studytrack
npm install
npm run dev
```
The app will run on http://localhost:5173 (or another port if occupied).

## Deployment

This app is deployed using Vercel. To deploy your own version:

1. Push your code to GitHub
2. Go to vercel.com and import your repository
3. Set up the project (defaults work fine for Vite)
4. Vercel will automatically deploy on every push

## Planned Improvements

- Search & filter subjects/topics
- Calendar or schedule view
- Export/import data (JSON/CSV)
- Cloud sync using backend or third-party auth (e.g., Firebase)
