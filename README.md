# BlogSphere – A Blogging Platform

A full-stack blogging platform where users can create, publish, manage, and explore blog posts. BlogSphere provides a user-friendly interface with secure authentication, blog management, image uploads, and content discovery features.

## 🚀 Features

- **User Authentication** – Secure user registration and login.
- **User Profiles** – Manage personal profile information.
- **Create & Manage Blogs** – Create, edit, and delete blog posts.
- **Draft Management** – Save posts as drafts before publishing.
- **Rich Text Editor** – Write and format blog content.
- **Image Uploads** – Upload and manage blog images using Cloudinary.
- **Categories & Tags** – Organize blog posts by topics.
- **Search & Pagination** – Easily find and navigate blog posts.
- **Likes & Comments** – Interact with published content.
- **Bookmarks** – Save interesting blogs for later.
- **User Dashboard** – Manage blogs and view personal activity.
- **View Counter** – Track blog post views.
- **Dark Mode** – Enjoy a comfortable reading experience.
- **Admin Panel** – Manage platform content and users.

## 🛠️ Tech Stack

**Frontend**
- HTML5
- CSS3
- JavaScript
- EJS (Embedded JavaScript Templates)

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose

**Authentication & Security**
- Express Session
- bcrypt
- JSON Web Token (JWT)
- Express Validator

**Cloud & File Upload**
- Cloudinary
- Multer

**Other Tools**
- Git & GitHub
- npm
- dotenv

## 📂 Project Structure

```text
BlogSphere/
│
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   └── images/
│
├── server/
│
├── utils/
│
├── views/
│   ├── layouts/
│   ├── partials/
│   └── ...
│
├── app.js
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
└── README.md
```

## ⚙️ Installation & Setup

Follow these steps to run BlogSphere locally.

### 1. Clone the repository

```bash
git clone https://github.com/gauravkri8090-oss/BlogSphere-a-bloging-platform.git
```

### 2. Navigate to the project directory

```bash
cd BlogSphere-a-bloging-platform
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory and configure your credentials.

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Use the exact environment variable names expected by your application configuration.

### 5. Start the application

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

Open your browser and visit:

```text
http://localhost:3000
```

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| PORT | Application port |
| MONGODB_URI | MongoDB connection string |
| SESSION_SECRET | Secret used for session management |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name |
| CLOUDINARY_API_KEY | Cloudinary API key |
| CLOUDINARY_API_SECRET | Cloudinary API secret |

**Note:** Never commit your `.env` file or expose private API credentials.

## 🎯 Project Goals

The main goal of BlogSphere is to build a practical full-stack web application while gaining hands-on experience with:

- RESTful routing and backend development.
- Database design and CRUD operations.
- User authentication and session management.
- Cloud-based image storage.
- Dynamic rendering using EJS.
- Form validation and error handling.
- Organizing and maintaining a scalable project structure.

## 🔮 Future Improvements

- Social login integration.
- Email notifications.
- Advanced blog recommendation system.
- Improved analytics dashboard.
- Enhanced mobile responsiveness.

## 👨‍💻 Author

**Gaurav Krishna**

B.Tech – Computer Science & Engineering (Data Science)

- GitHub: [@gauravkri8090-oss](https://github.com/gauravkri8090-oss)

---

⭐ If you find this project interesting, consider giving it a star!

**Built with ❤️ using Node.js, Express.js, MongoDB and EJS.**
