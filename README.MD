# Buildable Labs Take-Home Assignment

A full-stack Task Management application built as part of the **Buildable Labs Software Engineer Take-Home Assignment**.

The project consists of:

* **Backend:** Express + TypeScript + PostgreSQL (Supabase)
* **Mobile App:** React Native (Expo) + React Query + Zustand
* **Offline-first support:** Create, Update and Delete operations continue to work without an internet connection and automatically synchronize once connectivity is restored.

---

# Demo

## 📱 App Demo

[▶ Watch App Demo](./images/demo.mp4)

## 📡 Offline Sync Demo

[▶ Watch Offline Sync Demo](./images/offline-sync.mp4)

*logs for backend and mobile app are available in the respective folders*
> (https://www.loom.com/share/eff998edf75648e6a91574c4e5888ba7) 

```
demo.gif
```

---

# Features

### Backend

* RESTful Task API
* PostgreSQL (Supabase)
* Repository-Service architecture
* Request validation using Zod
* Global error handling
* Pagination
* Search
* Sorting
* Filtering
* Soft Delete
* Logging using Pino

---

### Mobile App

* View all tasks
* Create task
* Edit task
* Delete task
* Mark task as completed
* Pull-to-refresh
* React Query caching
* Clean component-based architecture

---

### Offline Support

The application supports working without an internet connection.

When the device goes offline:

* Create operations are stored locally
* Update operations are queued locally
* Delete operations are queued locally

Once connectivity is restored:

* Pending actions are synchronized automatically
* Queue is cleared after successful synchronization
* Task list refreshes automatically

This behavior is completely transparent to the user.

---

# Tech Stack

## Backend

* Node.js
* Express
* TypeScript
* PostgreSQL (Supabase)
* Zod
* Pino Logger

## Mobile

* React Native
* Expo SDK 54
* Expo Router
* TypeScript
* React Query
* Zustand
* AsyncStorage
* Axios
* React Hook Form

---

# Project Structure

```
buildable_take_home_assignment
│
├── backend
│   ├── controllers
│   ├── repositories
│   ├── services
│   ├── middleware
│   ├── routes
│   ├── schemas
│   └── config
│
└── mobile
    ├── app
    ├── components
    ├── services
    ├── store
    ├── hooks
    ├── storage
    └── utils
```

---

# Architecture

## Backend

```
Client
   │
Routes
   │
Controllers
   │
Services
   │
Repositories
   │
PostgreSQL
```

---

## Mobile

```
UI

↓

React Query

↓

Task Service

↓

Axios API

↓

Express Backend
```

Offline operations follow a different path:

```
UI

↓

Task Service

↓

Offline Queue (Zustand)

↓

AsyncStorage

↓

Automatic Sync

↓

Backend
```

---

# API Endpoints

| Method | Endpoint   | Description       |
| ------ | ---------- | ----------------- |
| GET    | /tasks     | Fetch all tasks   |
| GET    | /tasks/:id | Fetch single task |
| POST   | /tasks     | Create task       |
| PATCH  | /tasks/:id | Update task       |
| DELETE | /tasks/:id | Soft delete task  |
| GET    | /health    | Health check      |

---

# Getting Started

## Clone Repository

```bash
git clone https://github.com/vNihar007/Buildable_labs_take_home.git

cd Buildable_labs_take_home
```

---

# Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file:

```
SUPABASE_URI=your_database_connection_string
PORT=3000
```

Run the server:

```bash
npm run dev
```

---

# Mobile Setup

```bash
cd mobile

npm install
```

Update the backend URL inside:

```
services/api.ts
```

Example:

```ts
baseURL: "http://YOUR_LOCAL_IP:3000"
```

Run the Expo application:

```bash
npm start
```

---

# Offline Synchronization Flow

```
User Action
      │
      ▼
Check Network
      │
 ┌────┴────┐
 │         │
Online   Offline
 │         │
 ▼         ▼
API     Queue Action
 │         │
 ▼         ▼
Success AsyncStorage
           │
           ▼
Internet Restored
           │
           ▼
Sync Queue
           │
           ▼
Refresh Tasks
```

---

# Design Decisions

* Repository pattern separates database logic from business logic.
* React Query handles server-state caching and invalidation.
* Zustand manages offline queue state.
* AsyncStorage persists queued actions across application restarts.
* Network status is detected using NetInfo.
* Synchronization occurs automatically when connectivity is restored.

---

# Future Improvements

* Conflict resolution for concurrent updates
* Background synchronization
* Retry with exponential backoff
* Optimistic UI updates
* Offline image/file attachments
* Authentication & authorization
* Unit and integration tests
* Dockerized deployment

---

# Screenshots

| Home                 | Create               | Edit                 |
| -------------------- | -------------------- | -------------------- |
| Add screenshots here | Add screenshots here | Add screenshots here |

---

# Author

**Varun Nihar**

GitHub: https://github.com/vNihar007

LinkedIn: https://www.linkedin.com/in/varun-nihar

---

Thank you for reviewing my submission.
