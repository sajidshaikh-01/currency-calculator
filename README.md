# currency-calculator-k8s

A small demo project that shows a frontend (static HTML) and a backend (Node.js) deployed to Kubernetes. This file contains the `README.md` for the repo and **step-by-step commands** to push the project to GitHub (multiple options: web UI, `gh` CLI, SSH).

---

## Repo structure (what you should have locally)

```
currency-calculator/
├─ backend/
│  ├─ package.json
│  ├─ index.js
│  └─ Dockerfile
├─ frontend/
│  ├─ index.html
│  └─ Dockerfile
├─ k8s/
│  ├─ namespace.yaml
│  ├─ backend-deployment.yaml
│  ├─ backend-service.yaml
│  ├─ frontend-deployment.yaml
│  ├─ frontend-service.yaml
│  └─ ingress.yaml
├─ .gitignore
└─ README.md
```

---

## README.md (project summary)

Place this content into `README.md` at the project root (this document already contains the README content):

```md
# Currency Calculator (Kubernetes demo)

Small demo project: a static frontend served by NGINX and a Node.js backend that proxies `exchangerate.host` convert endpoint. The app is packaged into Docker images and deployed to a Kubernetes cluster (GKE is used in examples).

## Quick start (locally)

Prerequisites: Docker, Node 18+, Git.

### Backend (local)
```

cd backend
npm install
node index.js

# or build and run container:

docker build -t currency-backend\:local .
docker run -p 3000:3000 currency-backend\:local

```

### Frontend (local)
```

cd frontend
docker build -t currency-frontend\:local .
docker run -p 8080:80 currency-frontend\:local

# open [http://localhost:8080](http://localhost:8080) and use the UI

```

## Deploy to Kubernetes (short)
```

# build and push images to a registry (see k8s manifests for image placeholders)

# apply manifests

kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
kubectl apply -f k8s/ingress.yaml

```

## Useful commands
```

kubectl get pods -n currency-app
kubectl get svc -n ingress-nginx
kubectl describe ingress currency-ingress -n currency-app
kubectl logs deployment/currency-backend -n currency-app

```

## License
MIT
```

````

---

## .gitignore recommended contents

Create a file called `.gitignore` at repo root with this content:

```gitignore
# Node
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# dotenv
.env

# VS Code
.vscode/

# Docker
**/Dockerfile
**/docker-compose*.yml

# Build outputs
dist/
build/

# Misc
.idea/

````

---

## Step-by-step: push this project to GitHub

> Make sure you have `git` installed and configured locally:

```bash
git --version
# configure if not already
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

### 1) Initialize the repo (run from project root)

```bash
cd /path/to/currency-calculator
# if repo already exists locally, skip init
git init
git add .
git commit -m "Initial commit: currency calculator k8s demo"
# ensure branch is named main
git branch -M main
```

### 2) Option A — Create repository using GitHub web UI (easiest)

1. Open [https://github.com/new](https://github.com/new) and create a new repository (name it e.g. `currency-calculator`), set Public or Private.
2. Do **not** initialize with a README (you already have one), unless you prefer.
3. After creating the repo, GitHub will show you commands to push an existing repo. Use the HTTPS OR SSH remote they display.

Example (HTTPS remote):

```bash
# replace USERNAME and REPO with your values
git remote add origin https://github.com/USERNAME/currency-calculator.git
git push -u origin main
```

If you see an authentication prompt when pushing and your GitHub account requires a token (password auth deprecated), create a **Personal Access Token (PAT)** on GitHub and use it as the password when prompted OR use a credential helper.

### 3) Option B — Create repository using `gh` (GitHub CLI)

*(Install `gh` beforehand or use GitHub Cloud Shell that has it installed.)*

```bash
# login (interactive)
gh auth login
# create the repo and push current directory
gh repo create USERNAME/currency-calculator --public --source=. --remote=origin --push
```

This command will create the repo on GitHub, add the remote `origin`, and push your `main` branch.

### 4) Option C — Use SSH (recommended once set up)

If you prefer SSH keys (no need for PATs), generate an SSH key and add to your GitHub account:

```bash
# generate key (choose ed25519 if available)
ssh-keygen -t ed25519 -C "you@example.com"
# start ssh-agent and add key
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
# show the public key
cat ~/.ssh/id_ed25519.pub
```

Copy the printed public key and add it to GitHub: **Settings > SSH and GPG keys > New SSH key**.

Then add SSH remote and push:

```bash
git remote add origin git@github.com:USERNAME/currency-calculator.git
git push -u origin main
```

### 5) Later updates

After you make changes locally:

```bash
git add .
git commit -m "Describe change"
git push
```

### 6) Optional: create a release or tag

```bash
git tag -a v1.0 -m "v1.0"
git push origin v1.0
```

---

## Troubleshooting / common issues

* **Push rejected / authentication failed**: Use `gh auth login`, create a PAT or set up SSH keys.
* **Line endings issues (Windows/WSL)**: Run `git config --global core.autocrlf true` on Windows and `input` on Linux/WSL depending on preference.
* **Large files**: If you accidentally committed big files, use `git rm --cached <file>` then add to `.gitignore`.

---

## What I can do next

* Create the actual `.gitignore` file in your project and add it to the repo.
* Create a `.github/workflows/ci.yml` GitHub Actions file that builds Docker images or runs simple lint/tests.
* Create the remote repo for you (if you provide your GitHub username and allow me to produce `gh` commands for you to run).

---

Happy to walk you through any of the options interactively — tell me which option you prefer (Web UI / `gh` CLI / SSH), and I'll give the exact copy-paste commands with your GitHub username filled in.
