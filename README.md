# 📘 Google NotebookLM Clone

A **PDF-powered AI chat application** inspired by Google’s NotebookLM.  
Upload a PDF, process it, and start asking AI-powered questions about the content.  

🚀 **Live Demo:** [google-notebooklm-frontend.vercel.app](https://google-notebooklm-frontend.vercel.app/)

---

## ✨ Features
- 📂 Upload PDF files (drag & drop or file picker).  
- ⏳ Dynamic upload progress with smooth animation.  
- 🤖 Chat interface powered by AI (`ask` endpoint).  
- 📑 PDF preview using `react-pdf`.  
- 🔒 Session-based storage for multiple chats.  
- ⚡ Built with **Next.js (App Router)** and **Axios**.  

---

## 🛠️ Tech Stack
**Frontend:**
- Next.js 14 (App Router)
- React, TailwindCSS, Shadcn UI
- Axios (with upload progress & API service layer)
- React-PDF (`pdfjs`)

**Backend:**
- Node.js / Express
- Multer (for PDF upload handling)
- OpenAI API (Embeddings + Chat)
- Local storage/session handling

---

## 📦 Installation

### 1. Clone the repo
```bash
git clone https://github.com/d-parinita/google-notebooklm-frontend
cd google-notebooklm-clone
