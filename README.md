# Rohit Desai — Professional Developer Portfolio & Admin System

> **Design Direction:** Modern Editorial Engineering  
> A premium, recruiter-grade developer portfolio built with React, Vite, TypeScript, Tailwind CSS, and a private Express + JWT persistent content management backend.

---

## Table of Contents
1. [Quick Start & Local Development](#quick-start--local-development)
2. [Private Admin Dashboard (`/admin`)](#private-admin-dashboard-admin)
   - [Accessing the Dashboard](#accessing-the-dashboard)
   - [Default Credentials & Authentication](#default-credentials--authentication)
   - [Configuring Environment Variables](#configuring-environment-variables)
3. [Managing Content via the Admin Dashboard](#managing-content-via-the-admin-dashboard)
   - [Updating Personal Bio & Tagline](#1-updating-personal-bio--tagline)
   - [Adding & Editing Projects & Case Studies](#2-adding--editing-projects--case-studies)
   - [Adding Certifications & Result Transcripts](#3-adding-certifications--result-transcripts)
   - [Adding & Managing Achievements](#4-adding--managing-achievements)
   - [Managing Technical Skills & Categories](#5-managing-technical-skills--categories)
   - [Updating Academic History & Journey](#6-updating-academic-history--journey)
   - [Section Visibility Toggles](#7-section-visibility-toggles)
   - [Uploading Images & Documents](#8-uploading-images--documents)
4. [Project Architecture](#project-architecture)
5. [Persistent Storage Architecture](#persistent-storage-architecture)
6. [Managing the Resume PDF](#managing-the-resume-pdf)
7. [Building for Production & Deployment](#building-for-production--deployment)

---

## Quick Start & Local Development

### Prerequisites
- Node.js `v18.0` or higher
- npm or pnpm package manager

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` (already created locally):
```env
PORT=5000
ADMIN_USERNAME=rohit
ADMIN_PASSWORD=admin123
JWT_SECRET=rohit_editorial_portfolio_jwt_secret_key_2026
```

### 3. Start the Full Application (Frontend + Backend)
To start both the Vite frontend (`http://localhost:3000`) and the API backend (`http://localhost:5000`) concurrently:
```bash
npm run dev:all
```
Or run them in separate terminals:
```bash
# Terminal 1: Backend API
npm run server

# Terminal 2: Vite Frontend
npm run dev
```

* Open the public portfolio: [http://localhost:3000](http://localhost:3000)
* Open the private admin console: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Private Admin Dashboard (`/admin`)

### Accessing the Dashboard
Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) in your web browser.

### Default Credentials & Authentication
* **Default Username:** `rohit`
* **Default Password:** `admin123`

When you sign in, the server generates a cryptographically signed JSON Web Token (JWT) valid for 7 days, granting access to the content management console.

### Configuring Environment Variables
To change your username or password, open `.env`:
```env
PORT=5000
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_new_secure_password
JWT_SECRET=a_random_cryptographic_secret_string
```
Restart the server after editing `.env`.

---

## Managing Content via the Admin Dashboard

### 1. Updating Personal Bio & Tagline
1. Open `/admin` and navigate to the **Personal & Bio** tab.
2. Edit your **Full Name**, **Display Name**, **Role Title**, or **Location**.
3. Edit your **Hero Tagline** or add new **Narrative Paragraphs** in the About section.
4. Update your direct contact channels (Email, Phone) and social URLs (GitHub, LinkedIn, LeetCode, GeeksForGeeks).
5. Click **Save Profile Changes**. The public website reflects your updates immediately without rebuilding!

---

### 2. Adding & Editing Projects & Case Studies
1. Go to the **Projects** tab.
2. Click **Add New Project** (or click **Edit** on an existing project).
3. Fill in:
   - **Title**, **Subtitle**, and **Timeline**.
   - **Short Overview** for the homepage card.
   - **Technologies** (comma separated, e.g. `Python, NLP, Flask, React.js`).
   - **GitHub URL** and **Live Demo URL** (leave blank if not yet public; no fake buttons will appear).
   - **Case Study Specifications** (Problem Statement, Objective, Technical Approach, Implementation Details, Contribution, Challenges & Learnings).
4. Reorder projects using the **Move Up** and **Move Down** arrows.
5. Click **Save Project Entry**.

---

### 3. Adding Certifications & Result Transcripts
1. Go to the **Certifications & Results** tab.
2. Click **Add Certification** (or edit an existing one).
3. Enter the **Title**, **Issuing Organization**, **Score**, and **Session Date**.
4. **Attach Documents:**
   - Under *Attached Certificate & Result Documents*, add document tabs (e.g. *Certificate of Completion*, *Official Result & Grade Card*).
   - Click **Upload File** to select your PDF document. The file is saved directly to `public/assets/uploads/`.
5. **Visibility:** Toggle **Public Visibility** on or off. Hidden credentials are saved in the database but remain hidden from recruiters until you enable them.
6. Click **Test In-Website View** to inspect how the certificate appears in the modal.
7. Click **Save Certification**.

---

### 4. Adding & Managing Achievements
1. Go to the **Achievements** tab.
2. Click **Add Achievement**.
3. Choose a category (**Hackathon**, **Technical Training**, or **Academic**).
4. Enter the **Title**, **Organization**, **Description**, and **Key Impact Highlight**.
5. Click **Save Achievement**.

---

### 5. Managing Technical Skills & Categories
1. Go to the **Skills** tab.
2. Select any category (e.g. *Programming Languages*, *Backend Development*, *Databases*).
3. Add a new skill by typing its name (e.g. `Docker`) and an optional tag (e.g. `Core`, `Primary`), then click **Add**.
4. Remove unwanted skills by clicking the `×` on any chip.
5. Add new skill categories using **Add Category**.
6. Click **Save Skills Changes**.

---

### 6. Updating Academic History & Journey
1. Go to the **Education** tab.
2. Click **Edit** on your B.Tech milestone to update your CGPA, coursework highlights, or expected graduation year.
3. Click **Add Milestone** to record additional degrees, certifications, or diplomas.
4. Click **Save Milestone**.

---

### 7. Section Visibility Toggles
1. Go to the **Section Visibility** tab.
2. Toggle any section on or off (About, Projects, Skills, Education, Certifications, Achievements, Contact).
3. **Hero Availability Pulse Badge:** Toggle the availability status on or off and customize the badge text (e.g. *"Available for Summer 2026 Engineering Internships"*).
4. Click **Save Visibility Settings**.

---

### 8. Uploading Images & Documents
- Whenever a file upload input is present (e.g. in Projects or Certifications):
  1. Click **Upload File**.
  2. Select any `.png`, `.jpg`, `.webp`, `.svg`, or `.pdf` file up to 15MB.
  3. The server validates the file type, assigns a secure timestamped filename, and saves it in `public/assets/uploads/`.
  4. The input is automatically populated with the public web path (e.g. `/assets/uploads/certificate_173160...pdf`).

---

## Persistent Storage Architecture

Unlike client-only `localStorage` setups:
1. **Atomic Server Storage:** All changes are committed directly to disk at `server/data/portfolio-db.json` using atomic temporary file swaps to prevent corruption.
2. **Server-Side Authorization:** Every mutation (`PUT`, `DELETE`, `POST /api/upload`) requires a valid Bearer JWT. Unauthorized calls are strictly blocked (`401 Unauthorized`).
3. **Zero Data Loss:** When the app starts, it initializes from your verified resume data. Any changes you make in `/admin` are saved permanently on disk and survive server restarts.
4. **Fallback Mechanism:** The public frontend loads initial static data instantly for maximum speed and zero layout shift, then seamlessly merges updates from the server API.

---

## Managing the Resume PDF

To update your live downloadable resume:
1. Copy your new PDF to `public/assets/documents/resume.pdf`.
2. All **Download Resume** buttons on the website will automatically serve the updated file.

---

## Building for Production & Deployment

### 1. Build the Frontend
```bash
npm run build
```
Creates an optimized static bundle in `dist/`.

### 2. Deploying on Node.js Hosting (Render, Railway, VPS, Docker)
1. Set environment variables on your host:
   - `PORT=5000` (or host-provided `$PORT`)
   - `ADMIN_USERNAME=rohit`
   - `ADMIN_PASSWORD=your_secure_password`
   - `JWT_SECRET=your_jwt_secret`
2. Start command:
   ```bash
   node --loader tsx server/index.ts
   ```
   *The Express server automatically serves the API and static upload assets.*

---

## Design Tokens

| Token | Hex | Semantic Role |
|---|---|---|
| Canvas | `#F7F7F2` | Warm Ivory main background |
| Secondary Canvas | `#E8EEE8` | Sage surface for badges & specification panels |
| Ink Primary | `#202522` | Deep charcoal for headings & high-contrast body |
| Ink Muted | `#777D78` | Editorial slate for metadata & timelines |
| Forest Accent | `#285943` | Primary interactive color for buttons, active tabs & links |
| Border | `#DDDFD8` | Precision dividers and card borders |
