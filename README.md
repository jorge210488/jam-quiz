# 🟢 JAM Quiz Platform – Backend

This is the **backend** of **JAM Quiz Platform**, a real-time multiplayer quiz application built with **Node.js**, **Express**, and **Socket.io**. It supports user authentication, quiz management, real-time game sessions, statistics, internationalization, and more.

---

## 🚀 Features

- User authentication with roles (admin / player)
- Quiz and question creation (admin)
- Real-time game sessions using Socket.io
- Timer and question control from the server
- Team mode, power-ups, and player feedback
- Badge system for achievements
- Open quizzes (publicly accessible quizzes)
- Final ranking and statistics
- Question internationalization
- Admin dashboard with analytics

---

## ⚙️ Tech Stack

- **Node.js** + **Express**
- **MongoDB** (Mongoose)
- **Socket.io** for real-time communication
- **JWT** for authentication
- **Bcrypt** for password encryption

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone [https://github.com/your-username/jam-quiz-platform-backend.git](https://github.com/jorge210488/jam-quiz.git)
cd jam-quiz
````

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root folder:

```env
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>
JWT_SECRET=your_jwt_secret
```

> ⚠️ Replace credentials with secure values before pushing to production.

### 4. Start the server

```bash
npm run dev
```

The backend will run at `http://localhost:4000`.

---

## 🌐 API Endpoints

| Method | Endpoint                       | Description                        |
| ------ | ------------------------------ | ---------------------------------- |
| POST   | `/api/auth/login`              | Log in and receive JWT             |
| GET    | `/api/users`                   | Get all users (admin only)         |
| POST   | `/api/quizzes`                 | Create a new quiz (admin)          |
| GET    | `/api/quizzes/:id`             | Get quiz details                   |
| POST   | `/api/questions`               | Create a question                  |
| GET    | `/api/questions/:quizId`       | Get all questions of a quiz        |
| POST   | `/api/game-sessions`           | Start a new game session           |
| GET    | `/api/game-sessions/:id`       | Get session results and statistics |
| POST   | `/api/question-feedback`       | Submit feedback for a question     |
| GET    | `/api/admin/question-feedback` | Admin view of feedback             |
| GET    | `/api/admin/ranking`           | Global player ranking              |
| POST   | `/api/badges`                  | Create a new badge (admin)         |
| GET    | `/api/badges/user/:userId`     | Get badges for a user              |

All endpoints are secured with role-based access where needed.

---

## 🧩 Real-Time Engine

Socket.io is used to power live game rooms. The server:

* Emits question events (`startQuestion`)
* Receives answers in real time (`answerSubmitted`)
* Calculates rankings and timers
* Sends updates to all players in the room

---

## 🌍 Internationalization

Questions support translations:

```js
translations: {
  en: {
    questionText: String,
    options: [String],
    correctAnswer: String
  },
  es: { ... },
  fr: { ... }
}
```

Clients can request questions in the preferred language.

---

## 🧭 Feature Roadmap (Completed ✅)

1. ✅ Real-time game sessions with player tracking
2. ✅ Server-side countdown timer for each question
3. ✅ Team play and power-ups
4. ✅ User feedback system
5. ✅ Admin dashboard and quiz history
6. ✅ Badge system
7. ✅ Open quizzes
8. ✅ Question internationalization

---

## 👨‍💻 Author

**Jorge Martínez**
GitHub: [@jorgemartinezjam](https://github.com/jorge210488/)
