# VishramSthal Locust Load Testing

This directory contains the load and stress testing suite for **VishramSthal**, configured to test the capacity and resilience of the website and API endpoints.

---

## 📦 What Was Installed & Configured

- **Virtual Environment**: Located at `tests/.venv/` with Python `pip` and `locust 2.46.6` installed.
- **Locust Test File**: `tests/load/locustfile.py` (also linked via `tests/locustfile.py`).
- **Runner Script**: `tests/run_load_test.sh` (executable helper with CLI options).
- **Default Config**: `tests/load/locust.conf` with preconfigured defaults.
- **Report Directory**: `tests/load/reports/` for HTML visual reports and CSV raw data.

---

## 🎯 Simulated Traffic & User Behaviors

The suite models realistic guest and backend interactions across two user classes:

1. **`VishramSthalUser`** (Simulated Guest Traffic):
   - Home Page (`/`)
   - Room Listings & Search (`/rooms`, `/api/rooms?available=true&capacity=2`)
   - Wedding Venues & Services (`/wedding`, `/wedding/venues`, `/wedding/services`, `/wedding/gallery`)
   - Photo Gallery (`/gallery`)
   - Guest Reviews (`/reviews`, `/api/reviews`)
   - Information pages (`/about`, `/contact`, `/terms`, `/privacy`, `/cancellation`)

2. **`ApiStressUser`** (High-Throughput API Traffic):
   - Direct database and API load testing on `/api/rooms`, `/api/reviews`, `/api/wedding/venues`, and `/api/wedding/services`.

---

## 🚀 How to Run the Load Test

When you are ready to test your website (make sure your dev server `npm run dev` or production server is running first):

### 1. Run 1000 Total Requests (Headless)
Runs 1000 total requests across 50 concurrent simulated users, then automatically stops and generates an HTML report:

```bash
./tests/run_load_test.sh
```

Or targeting a custom port or domain:
```bash
./tests/run_load_test.sh --host http://localhost:3000
# Or remote website:
./tests/run_load_test.sh --host https://your-website.com
```

### 2. Run Stress Test with 1000 Concurrent Users
Tests how the server holds up under 1,000 simultaneous users:

```bash
./tests/run_load_test.sh --users 1000 --spawn-rate 50
```

### 3. Interactive Web UI Mode (Real-Time Graphs)
Starts Locust with an interactive web dashboard:

```bash
./tests/run_load_test.sh --web
```
Open **[http://localhost:8089](http://localhost:8089)** in your browser:
- Set number of users (e.g. `1000`)
- Set spawn rate (e.g. `50` users/sec)
- Enter host (e.g. `http://localhost:3000`)
- Watch live requests/sec, latency percentiles, and failure graphs in real time!

---

## 📊 Reports & Results

After a test run, visual and tabular reports are automatically generated in:
- **HTML Report**: `tests/load/reports/load_test_report.html` (open in browser)
- **CSV Statistics**: `tests/load/reports/locust_stats_stats.csv`

---

## ⚙️ Options Reference

| Option | Flag | Description | Default |
|--------|------|-------------|---------|
| Host | `--host`, `-H` | Target URL to test | `http://localhost:3000` |
| Users | `--users`, `-u` | Peak concurrent users | `50` |
| Spawn Rate | `--spawn-rate`, `-r` | Users spawned per second | `10` |
| Max Requests | `--max-requests`, `-m` | Total requests before stopping | `1000` |
| Duration | `--run-time`, `-t` | Optional time limit (e.g., `1m`, `30s`) | None |
| Web UI | `--web`, `-w` | Launch browser UI at port 8089 | False |
| Help | `--help`, `-h` | Display usage instructions | - |
