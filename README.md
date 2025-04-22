Welcome to **PicklePals**, a community-driven app designed to connect pickleball players with local courts and events.<br>Our mission is to make it easy for players of all skill levels to discover nearby courts, join games, and grow our local pickleball community.

# 🛠️ Development Setup

## ✅ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

---

## 📦 Install Dependencies

```bash
npm install
```

---

## 🔑 Environment Variables

1. Create the following files in the root directory:
   ```
   .env.local
   ```

2. If you’re a contributor, paste in the environment keys provided to you.

> ✅ *Tip: Check if a `.env.example` is available for reference.*

---

## 🗄️ MongoDB Configuration (Contributors Only)

1. Make sure you are added as a **member** of the MongoDB Atlas project.
2. Go to the **PicklePals MongoDB cluster**.
3. Add your IP address to the **Network Access List** via the Atlas dashboard.

---

## 🧬 Generate Prisma Client

Run the following to generate the Prisma client:

```bash
npx prisma generate
```

---

## 🚀 Run the App Locally

```bash
npm run dev
```
