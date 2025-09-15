# Planora 🌟

[![Next.js](https://img.shields.io/badge/Next.js-13-blue?logo=next.js)](https://nextjs.org/) 
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-purple?logo=tailwindcss)](https://tailwindcss.com/) 
[![MongoDB](https://img.shields.io/badge/MongoDB-5.0-green?logo=mongodb)](https://www.mongodb.com/)  
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

**Admin Credentials:**  
- **Email:** adminplanora@gmail.com  
- **Password:** 123456789#Admin_Planora

---

## About Planora

Planora is a modern event management platform designed for both **event explorers** and **event planners**:

- **Explorers** can browse, discover, and join local or online events.  
- **Event Planners** can create, manage, and promote their events efficiently.  
- Features a **clean, responsive design**, **interactive components**, and **real-time event data**.

---

## Features

- **Home Page**  
  - Hero Slider with featured events  
  - Upcoming events displayed in a 3x3 grid  
  - Testimonials and reviews from users  
  - FAQ / Accordion section  
  - Footer with contact info and quick links  

- **Authentication**  
  - Register/Login with Email & Password or Google  
  - Role-based login: `Explorer` or `Event Planner`  

- **Dashboard**  
  - Admin dashboard with bar chart statistics  
  - Users dashboard  
  - Event management 

- **Event Pages**  
  - Events fetched from `events` and `my-events` collections  
  - Display event image, title, location, and details  
  - “See More” functionality based on login  

- **About & Contact Pages**  
  - About page highlighting features of Planora  
  - Contact page with form and company info  
  - “Return to Home” button for easy navigation  

---

## Tech Stack

- **Frontend**: Next.js , React, TailwindCSS, shadcn/ui, Lottie animations, Lucide icons  
- **Backend**: Next.js API Routes, MongoDB, NextAuth.js  
- **Libraries**: Axios, Recharts  

---

## NPM Packages Used

- `next`, `react`, `react-dom`  
- `tailwindcss`, `@tailwindcss/forms`, `@tailwindcss/typography`  
- `axios`, `next-auth`, `mongodb`, `recharts`, `lottie-react`, `lucide-react`  
- `@radix-ui/react-accordion`, `@radix-ui/react-card`, `@radix-ui/react-button` (via shadcn/ui)  

---

## Quick Start

### 1. Clone the Repository

```bash
git clone <https://github.com/Sumyta-Bentey-Habib/planora.git>
cd planora
npm install
npm run dev

