# BlogNest Frontend

A modern blogging platform frontend built with **React 19 (RC)**, **Vite**, and **TailwindCSS**, integrated with **Clerk** for authentication and **ImageKit** for media management. This project consumes the BlogNest backend API hosted on Render.

⚠️ **Note:** The backend is hosted on Render’s free tier, so API responses may be slower. Please allow a few seconds for requests to complete.

---

## 🚀 Features

- 🔑 User authentication with Clerk (Sign In, Sign Up, User Profile).
- 📝 Rich text editor using React Quill.
- 🌊 Infinite scroll for posts and comments.
- 🖼️ Image upload & optimization via ImageKit.
- 🔔 Toast notifications for user feedback.
- 🔍 Secure content rendering with DOMPurify.
- ⭐ Save posts for later reading.
- 📌 Feature posts for highlighted visibility.
- 📈 Trending & Popular sections powered by backend analytics.
- ⚡ Fast builds and hot reload with Vite.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 19 (RC) + Vite
- **Styling:** TailwindCSS
- **Auth:** Clerk
- **Media:** ImageKit
- **Data Fetching:** Axios + TanStack React Query
- **Routing:** React Router v7
- **Utilities:** React Toastify, Timeago.js

---

## ⚙️ Setup & Installation

### 1. Clone the repo:

        git clone https://github.com/viknesh-sathya/blog-nest-frontend.git
        cd blog-nest-frontend

### 2. Install dependencies:

        npm install

### 3. Create a file in the root:

        VITE_API_URL=https://blog-nest-backend-g5og.onrender.com
        VITE_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_endpoint
        VITE_IMAGEKIT_PUBLIC_KEY=your_public_key
        VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

### 4. Build for production:

        npm run build
