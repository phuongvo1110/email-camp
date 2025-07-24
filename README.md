# 📧 Email Camp – Feedback Campaign Management Platform

A full-stack web application to create, schedule, and manage email-based feedback campaigns using OAuth authentication, Redis-powered job queues (Bull), and SendGrid integration.

---

## 🚀 Features

- Google OAuth 2.0 login
- Create surveys with Yes/No questions
- Schedule & send campaigns via SendGrid
- Dashboard with analytics and quick actions
- Background job processing using Bull + Redis
- Admin queue monitoring via Bull Board
- Pagination, sorting, and filtering using React + Redux + TanStack Query

---

## 🛠️ Tech Stack

| Layer       | Technology                                |
|------------|--------------------------------------------|
| Frontend    | React (Vite) + TypeScript + Tailwind CSS   |
| State Mgmt  | Redux Toolkit, Redux Thunk, TanStack Query |
| Backend     | Node.js + Express + Passport.js            |
| Auth        | Google OAuth 2.0                           |
| Email       | SendGrid API                               |
| Queue       | Bull (backed by Redis)                     |
| Queue UI    | Bull Board                                 |
| Database    | MongoDB (via Mongoose)                     |
| Deployment  | Render.com                                 |

---

## 📦 Project Structure

```bash
email-camp/
├── client/              # React frontend
├── server/              # Node.js backend
│   ├── routes/
│   ├── services/
│   ├── queues/
│   ├── jobs/
│   └── bullboard/
├── .env
├── Dockerfile
└── README.md
````

---

## ⚙️ Setup Instructions

### 🔐 1. Environment Variables

Create a `.env` file in both `/server` and `/client` directories:

#### Server `.env`

```env
PORT=3000
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/...
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SENDGRID_API_KEY=your_sendgrid_key
REDIS_URL=redis://default:<password>@<redis-host>:6379
```

---

### 🖥️ 2. Install Dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd client
npm install
```

---

### 🧪 3. Development

Run backend & frontend together:

```bash
npm run dev
# Runs concurrently: nodemon for backend + vite for frontend
```

---

## 🐳 Redis via Docker (Local Dev)

```bash
docker run -p 6379:6379 --name redis \
  -d redis redis-server --appendonly yes --requirepass 123456
```

Update `.env` with:

```env
REDIS_URL=redis://default:123456@localhost:6379
```

---

## 🧵 Background Jobs with Bull

* Jobs are added when sending surveys
* Redis stores the queue
* Queue UI via Bull Board:

> [http://localhost:3000/admin/queues](http://localhost:3000/admin/queues)

---

## 🌐 Deployment (Render)

### Services:

* Web Server (Node.js)
* Static Frontend (React)
* Redis (use Render Key-Value DB and set `REDIS_URL` accordingly)

---

## 🧾 License

MIT License

---

## 👨‍💻 Author

[Phuong Vo](https://github.com/phuongvo1110)

```

