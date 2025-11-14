# 🏋️‍♂️ Fitness Tracking Application

A full-stack fitness tracking platform that helps users monitor their daily calorie intake, manage meals, log workout sessions, and track exercises — all from a clean and intuitive dashboard.

## 🚀 Tech Stack

### Frontend
* React (Vite or CRA — depending on your setup)
* MantineUI styled components
* Axios (API communication)

### Backend
* Java Spring Boot
* Spring Data JPA
* Spring Security

### Database
* PostgreSQL

## 📌 Features

### 🍽️ Meal Tracking
* Add, update, and delete meals.
* Track calories for each meal.
* View a full overview of meals for the day.

### 🔥 Calorie Monitoring
* Automatically calculates total daily calories.
* Displays calorie summaries in the dashboard.

### 🏋️‍♂️ Workout Sessions
* Add custom workout sessions.
* Log individual exercises inside each session.
* Track sets, reps, duration, or calories burned (if implemented).

### 📊 Daily Dashboard
* Overview of meals, calories, and workouts.
* Clean UI to visualize your daily fitness activity.

### 👤 User Management (optional, depending on actual app features)
* Login / registration
* Secure API for personal fitness data

## 🏗️ Architecture

This project follows a client-server architecture:

```
Frontend (React) ↔ REST API (Spring Boot) ↔ PostgreSQL Database
```

### Backend Responsibilities
* Expose REST endpoints for meals, workouts, exercises.
* Handle business logic (calorie calculation, summaries).
* Communicate with PostgreSQL using JPA repositories.

### Frontend Responsibilities
* Display dashboard and data visualizations.
* Manage forms for meals, exercises, and workouts.
* Communicate with backend APIs using Axios or Fetch.

