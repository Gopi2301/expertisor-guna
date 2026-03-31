# Multi-Container Deployment Guide for Coolify

This guide explains how to deploy the Expertisor Academy project (Frontend, Backend, and SSO) to Coolify using Docker containers.

## Architecture
The application is split into four main containers:
1.  **Frontend**: Vite + Nginx (React/JS)
2.  **Backend**: PHP 8.2 + Apache (API)
3.  **SSO**: Node.js 18 (Auth Service)
4.  **Database**: MySQL 8.0

## 1. Prerequisites
- A Hostinger VPS with **Coolify** installed.
- Your project pushed to a Git repository (GitHub/GitLab).

## 2. Docker Configuration
Ensure the following files are in your repository:
- `Dockerfile` (Root): For the Frontend.
- `nginx.conf` (Root): Nginx configuration for the Frontend.
- `api/Dockerfile`: For the PHP Backend.
- `sso/Dockerfile`: For the SSO Service.
- `docker-compose.prod.yml`: The main orchestration file.

## 3. Coolify Setup Steps

### Step A: Create a New Project
1.  Log in to your Coolify dashboard.
2.  Click on **Projects** -> **Add New Project**.
3.  Name it `Expertisor Academy`.

### Step B: Add a Resource (Docker Compose)
1.  Inside the project, click **Add Resource**.
2.  Select **Docker Compose**.
3.  Choose **GitHub/GitLab Repository** and select your repo.
4.  Select the **Branch** (e.g., `main`).
5.  In the "Compose File Path" field, enter: `./docker-compose.prod.yml`.
6.  Click **Continue**.

### Step C: Configure Environment Variables
Coolify will parse the `docker-compose.prod.yml`. Go to the **Environment Variables** tab of the resource and add:

| Key | Example Value | Description |
| :--- | :--- | :--- |
| `DB_NAME` | `expertisor` | Database name |
| `DB_USER` | `admin` | Database username |
| `DB_PASSWORD` | `your_secure_password` | Database password |
| `DB_ROOT_PASSWORD` | `root_password` | MySQL Root password |
| `VITE_API_URL` | `https://api.yourdomain.com/api` | Full URL to your Backend API |
| `VITE_SSO_URL` | `https://sso.yourdomain.com` | Full URL to your SSO Service |

> [!IMPORTANT]
> Because the Frontend is built during the Docker build stage, these `VITE_` variables must be available as **Build Arguments**. Coolify handles this if you mark them as "Build Variable" in the UI.

### Step D: Configure Domains
In the **Services** or **Settings** tab of the Docker Compose resource, you need to assign domains to each service. Coolify uses Traefik to route traffic.

1.  **Frontend**: Set domain to `https://yourdomain.com` (Expose port 80).
2.  **Backend**: Set domain to `https://api.yourdomain.com` (Expose port 80).
3.  **SSO**: Set domain to `https://sso.yourdomain.com` (Expose port 5999).

## 4. Deployment
1.  Click **Deploy**.
2.  Monitor the logs. Coolify will build each image according to your Dockerfiles.
3.  Once finished, your database will be initialized with `api/schema.sql` automatically.

## 5. Maintenance
- To update the app, simply click **Redeploy** in Coolify after pushing changes to Git.
- Database data is persisted in a Docker volume named `db_data`.
