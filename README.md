# 🎯 JobHunt App — React JS (Class Components)

## 📁 Project Structure

```
src/
├── components/
│   ├── LoginForm/       → Login page with JWT authentication
│   ├── Header/          → Navbar with logout (uses withRouter)
│   ├── Home/            → Home page with Find Jobs button
│   ├── Jobs/            → Jobs list with search + API call + Loader
│   ├── JobDetail/       → Single job detail page
│   ├── ProtectedRoute/  → Guards pages from unauthenticated users
│   └── NotFound/        → 404 page
├── App.js               → Routes setup
└── index.js             → Entry point
```

---

## 🔐 How Authentication Works

```
1. User enters username & password
2. POST request sent to login API
3. If success → JWT token saved in Cookies
4. If failure → error message shown
5. ProtectedRoute checks cookie on every page
6. No cookie → redirect to /login
7. Logout → cookie removed → redirect to /login
```

---

## 🛣️ Routes

| Path | Component | Protected? |
|------|-----------|-----------|
| /login | LoginForm | ❌ No |
| / | Home | ✅ Yes |
| /jobs | Jobs | ✅ Yes |
| /jobs/:id | JobDetail | ✅ Yes |
| * | NotFound | ❌ No |

---

## ▶️ How to Run

```bash
# Step 1 - Install dependencies
npm install

# Step 2 - Start the app
npm start

# Step 3 - Open browser
http://localhost:3000
```

---

## 📦 Packages Used

```
react-router-dom  → routing & navigation
js-cookie         → store/get/remove JWT token
react-loader-spinner → loading spinner
```

---

## 🔑 Key Concepts Used

- Class Components with state
- componentDidMount (fetch data on load)
- Cookies.set / Cookies.get / Cookies.remove
- JWT Token Authentication
- Protected Routes
- React Router (Route, Switch, Redirect, Link, withRouter)
- API calls with fetch + async/await
- Conditional rendering (loading/success/failure)