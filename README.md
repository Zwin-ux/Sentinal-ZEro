# Sentinel-ZEro

> **A full-stack, cloud-ready AI infrastructure monitoring and LLM demo platform.**

---

##  Overview

**Sentinel-ZEro** is a modern, real-time dashboard and demo suite for monitoring, evaluating, and showcasing fine-tuned LLMs in production. It combines:

- **AWS Lambda:** Serverless, HuggingFace-powered LLM chatbot API
- **Supabase:** Real-time database for chat logs, evaluation results, and metrics
- **React Dashboard (Sentinel Zero):** Live metrics, evaluation charts, and interactive chat UI
- **Automated Evaluation:** Scripts for rigorous, repeatable LLM benchmarking

---

##  Features

- **Live LLM Chatbot:** Serverless API (AWS Lambda) for text generation using HuggingFace models
- **Real-Time Monitoring:** Visualize chatbot usage, latency, and evaluation scores with React + Supabase
- **Automated Evaluation:** Run BLEU and other metrics on chatbot responses, store results in Supabase, and view trends in the dashboard
- **Interactive Demo UI:** Chat with the deployed LLM and see responses and metrics instantly
- **Cloud Native:** Easily deployable to AWS and Supabase; all code and infra as code

---

##  Project Structure

```
lambda/                # AWS Lambda function (HuggingFace LLM API)
  ├── llm_chatbot.py
  └── requirements.txt
supabase/              # SQL schema for Supabase tables
  └── schema.sql
scripts/               # Automated evaluation scripts
  └── evaluate_chatbot_advanced.py
src/                   # React dashboard (Sentinel Zero)
  └── components/
      ├── ChatbotDemo.jsx
      ├── EvaluationMetrics.jsx
      ├── EvaluationMetricsChart.jsx
      └── ...
.env                   # Environment variables (see .env.example)
README.md
```

---

##  Quick Start

### 1. Supabase Setup
- Create a project on [Supabase](https://supabase.com/)
- Run `supabase/schema.sql` in the SQL editor

### 2. Deploy Lambda LLM
- Package and deploy `lambda/llm_chatbot.py` with dependencies (`transformers`, `torch`, `requests`) to AWS Lambda
- Set environment variables: `HF_MODEL`, `SUPABASE_URL`, `SUPABASE_KEY`

### 3. Frontend Setup
- Edit `.env` with your Supabase and Lambda API details
- Install dependencies: `npm install`
- Start the dashboard: `npm run dev`

### 4. Automated Evaluation
- Install Python requirements for `scripts/evaluate_chatbot_advanced.py`
- Run the script to benchmark LLM responses and log metrics to Supabase

---

##  Dashboard Features

- **ChatbotDemo:** Chat with your LLM live
- **EvaluationMetrics:** Table of recent evaluation results
- **EvaluationMetricsChart:** Trend chart of evaluation score
---

##  Security & Best Practices

- Never commit secrets—use `.env` for local config
- Use Supabase service role key only for server-side scripts

---

## License

MIT (or specify your preferred license)

---

**Project maintained by [Zwin-ux](https://github.com/Zwin-ux). Contributions welcome!**

- ![Login Screenshot](docs/demo-login.png)

### 2. Select a Region
- Click a region in the Navbar to filter metrics, jobs, and alerts.
- ![Region Select](docs/demo-region.png)

### 3. Watch Live Metrics and Jobs
- See real-time updates for CPU, GPU, RAM, and Power usage.
- Observe live job queue changes as new jobs appear or update.
- ![Live Metrics](docs/demo-metrics.gif)

### 4. Respond to Alerts
- Ops Engineers can acknowledge critical alerts directly in the feed.
- ![Acknowledge Alert](docs/demo-alerts.gif)

### 5. Use the Admin Panel (Ops Only)
- Inject demo jobs, alerts, and metrics for live testing.
- ![Admin Panel](docs/demo-admin.png)

### 6. Try Dark/Light Mode
- Toggle the theme in the Navbar and watch the UI adapt instantly.
- ![Dark Mode](docs/demo-darkmode.gif)

---

**Tip:** For best results, run multiple browser windows and inject data live using the Admin Panel or Supabase SQL scripts.

---

##  Architecture Diagram

![Architecture Diagram](architecture.png)
*Edit `architecture.png` to add your own diagram!*

---

## Screenshots & GIFs
- Add your own: press `PrtSc` or use a GIF tool to show off live charts, map, and alert feed!

---

## Stack
**Frontend:** React 19, Tailwind CSS, Zustand, Recharts, react-simple-maps  
**Backend:** Supabase (PostgreSQL, Realtime, Auth)

---

##  Data Models (Supabase)
```sql
-- regions, system_metrics, jobs, alerts, users (see docs above)
```

---

##  How to Run (with Real Data)
1. **Create a Supabase project** at https://supabase.com/ (free tier works)
2. **Run the SQL** in this README to create tables
3. **Copy `.env.example` to `.env`** and add your Supabase URL & anon key
4. **Seed demo data**: use the included SQL or Admin panel
5. `npm install` (use `--legacy-peer-deps` if needed)
6. `npm run dev` — open [http://localhost:5173](http://localhost:5173)

---

## 🔄 Real-Time Integration
- Uses Supabase Realtime subscriptions for jobs & alerts
- Polls or listens for system_metrics updates
- All charts/tables update instantly when data changes

---

##  Auth & Roles
- **Login** with Supabase Auth (see LoginModal)
- **Viewer**: read-only
- **Ops Engineer**: can acknowledge/dismiss alerts
- Demo users: see `.env.example` or Supabase Auth table

---

##  Demo Flow
1. Select a region on the map
2. Watch live metrics animate in ResourceChart
3. See jobs update in real time
4. Trigger alerts (via Admin panel or Supabase)
5. Login as Ops to acknowledge/dismiss alerts

---

##  Advanced Features
- Z-score anomaly detection (on resource metrics)
- Heatmap overlay for cluster load
- Admin/test data panel for live demos

---

##  Stretch Goals
- Mobile layout polish
- Advanced analytics & trendlines
- Multi-user activity feed

---

##  License
MIT
#   S e n t i n a l - Z E r o 
 
 