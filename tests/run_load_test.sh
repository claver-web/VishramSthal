#!/usr/bin/env bash
# ==============================================================================
# VishramSthal Locust Load Test Runner
# ==============================================================================
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
VENV_DIR="$SCRIPT_DIR/.venv"
REPORTS_DIR="$SCRIPT_DIR/load/reports"
LOCUSTFILE="$SCRIPT_DIR/load/locustfile.py"

mkdir -p "$REPORTS_DIR"

# Locate Locust executable
if [ -f "$VENV_DIR/bin/locust" ]; then
    LOCUST_BIN="$VENV_DIR/bin/locust"
elif command -v locust &> /dev/null; then
    LOCUST_BIN="$(command -v locust)"
else
    echo "❌ Error: Locust is not found in $VENV_DIR or system PATH."
    echo "Run: python3 -m venv tests/.venv && tests/.venv/bin/pip install locust"
    exit 1
fi

# Defaults
HOST="${TARGET_HOST:-http://localhost:3000}"
USERS="${USERS:-50}"
SPAWN_RATE="${SPAWN_RATE:-10}"
MAX_REQUESTS="${MAX_REQUESTS:-1000}"
RUN_TIME="${RUN_TIME:-}"
MODE="headless"
REPORT_HTML="$REPORTS_DIR/load_test_report.html"
REPORT_CSV="$REPORTS_DIR/locust_stats"

# Parse CLI arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --web|-w)
            MODE="web"
            shift
            ;;
        --host|-H)
            HOST="$2"
            shift 2
            ;;
        --users|-u)
            USERS="$2"
            shift 2
            ;;
        --spawn-rate|-r)
            SPAWN_RATE="$2"
            shift 2
            ;;
        --max-requests|-m)
            MAX_REQUESTS="$2"
            shift 2
            ;;
        --run-time|-t)
            RUN_TIME="$2"
            shift 2
            ;;
        --help|-h)
            echo "VishramSthal Locust Load Testing Script"
            echo ""
            echo "Usage: ./tests/run_load_test.sh [options]"
            echo ""
            echo "Options:"
            echo "  --web, -w              Start Locust in Web UI mode (http://localhost:8089)"
            echo "  --host, -H <url>       Target host URL (default: http://localhost:3000)"
            echo "  --users, -u <num>      Peak number of concurrent users (default: 50)"
            echo "  --spawn-rate, -r <num> Rate to spawn users per second (default: 10)"
            echo "  --max-requests, -m <n> Total number of requests to execute (default: 1000, 0 for unlimited)"
            echo "  --run-time, -t <time>  Maximum run time, e.g. '2m', '30s' (optional)"
            echo "  --help, -h             Show this help message"
            echo ""
            echo "Examples:"
            echo "  ./tests/run_load_test.sh                           # Run 1000 requests headless"
            echo "  ./tests/run_load_test.sh --host https://mysite.com # Run 1000 requests against remote host"
            echo "  ./tests/run_load_test.sh --users 1000              # Run stress test with 1000 concurrent users"
            echo "  ./tests/run_load_test.sh --web                     # Open interactive web UI at http://localhost:8089"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            echo "Use --help for usage instructions"
            exit 1
            ;;
    esac
done

echo "=================================================================="
echo "🚀 VishramSthal Locust Load Testing Setup"
echo "=================================================================="
echo "🎯 Target Host:         $HOST"
echo "👥 Concurrent Users:    $USERS"
echo "⚡ Spawn Rate:          $SPAWN_RATE users/sec"
echo "📊 Target Requests:     $MAX_REQUESTS"
[ -n "$RUN_TIME" ] && echo "⏱️  Run Time:            $RUN_TIME"
echo "📁 Locust File:         $LOCUSTFILE"
echo "=================================================================="

if [ "$MODE" = "web" ]; then
    echo "🌐 Starting Locust in Web UI mode..."
    echo "👉 Open your browser at: http://localhost:8089"
    echo "Press CTRL+C to stop."
    exec "$LOCUST_BIN" -f "$LOCUSTFILE" --host "$HOST"
else
    echo "⚡ Starting headless load test for $MAX_REQUESTS requests..."
    EXTRA_ARGS=()
    [ -n "$RUN_TIME" ] && EXTRA_ARGS+=("-t" "$RUN_TIME")

    "$LOCUST_BIN" -f "$LOCUSTFILE" \
        --headless \
        --host "$HOST" \
        -u "$USERS" \
        -r "$SPAWN_RATE" \
        --max-requests "$MAX_REQUESTS" \
        --html "$REPORT_HTML" \
        --csv "$REPORT_CSV" \
        "${EXTRA_ARGS[@]}"

    EXIT_CODE=$?
    echo ""
    echo "=================================================================="
    if [ $EXIT_CODE -eq 0 ]; then
        echo "✅ Load test completed successfully!"
    else
        echo "⚠️ Load test exited with code: $EXIT_CODE"
    fi
    echo "📊 HTML Report generated at: $REPORT_HTML"
    echo "📈 CSV Data saved at:        ${REPORT_CSV}_stats.csv"
    echo "=================================================================="
    exit $EXIT_CODE
fi
