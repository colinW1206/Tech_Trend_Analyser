# Tech Trend Analyser

**Live Application:** [http://tech-trend-alb-1324845896.eu-west-1.elb.amazonaws.com](http://tech-trend-alb-1324845896.eu-west-1.elb.amazonaws.com)

A Full-Stack Cloud AI application designed to autonomously scrape, analyse, and summarise the latest trends in technology. This project leverages an asynchronous multi-agent pipeline to process news articles and serves the summarised intelligence through a modern, responsive web dashboard.

## Architecture

This application is deployed on AWS.

- **Frontend:** React + TypeScript + Vite + Tailwind CSS v4 (Glassmorphism UI)
- **Backend:** Python + FastAPI + Motor (Async MongoDB Driver)
- **AI Agents:** CrewAI + OpenAI
- **Database:** MongoDB Atlas
- **Cloud Infrastructure:**
  - **AWS ECS (Fargate):** Serverless container execution
  - **AWS ECR:** Private Docker container registry
  - **AWS Application Load Balancer (ALB):** Public internet gateway and reverse proxy
  - **Nginx:** High-performance static file server and API router
- **CI/CD:** GitHub Actions for automated zero-downtime deployments to AWS ECS.

## How It Works
1. **The Pipeline (`/workers`):** A scheduled Python script autonomously scrapes articles posted on Hacker News (https://news.ycombinator.com) through their API, and then utilises `CrewAI` to read the articles, and generate concise summaries using LLMs.
2. **The Database (`MongoDB`):** The structured intelligence is stored in a cloud-hosted MongoDB Atlas cluster.
3. **The API (`/backend`):** A high-performance asynchronous FastAPI server retrieves the data and exposes it via REST endpoints.
4. **The Client (`/frontend`):** A React single-page application hosted behind an Nginx reverse proxy fetches the data and presents it to the user.

## Local Development

### Prerequisites
- Docker & Docker Compose
- Node.js (v18+)
- Python (v3.12+)

### Option 1: Docker Compose (Full Stack)
```bash
docker-compose up --build
```
The app will be available at `http://localhost`.

### Option 2: Frontend Development Only (Points to Live AWS API)
You can work on the UI locally while pulling live data directly from the AWS Load Balancer.
```bash
cd frontend
npm install
npm run dev
```

---
