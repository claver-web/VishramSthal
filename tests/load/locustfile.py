"""
Locust Load Testing Suite for VishramSthal
Configured for running 1000 requests or testing high concurrent load (up to 1000 users).
"""

import os
import random
import gevent
from locust import HttpUser, task, between, events

# Global request counter and runner reference
request_counter = 0
max_requests_limit = int(os.getenv("MAX_REQUESTS", "1000"))
target_runner = None
is_stopping = False


@events.init_command_line_parser.add_listener
def _(parser):
    parser.add_argument(
        "--max-requests",
        type=int,
        env_var="MAX_REQUESTS",
        default=1000,
        help="Stop the load test after this total number of requests (default: 1000). Set to 0 to disable.",
    )


@events.init.add_listener
def on_locust_init(environment, runner=None, **kwargs):
    global target_runner, max_requests_limit
    target_runner = runner or getattr(environment, "runner", None)
    if environment.parsed_options and hasattr(environment.parsed_options, "max_requests"):
        max_requests_limit = environment.parsed_options.max_requests
    print(f"\n[Locust] Initialized. Target request limit: {max_requests_limit if max_requests_limit > 0 else 'Unlimited'}")


@events.test_start.add_listener
def on_test_start(environment, **kwargs):
    global target_runner
    if not target_runner and environment.runner:
        target_runner = environment.runner


@events.request.add_listener
def on_request(request_type, name, response_time, response_length, exception, context, **kwargs):
    global request_counter, target_runner, max_requests_limit, is_stopping
    request_counter += 1

    if max_requests_limit > 0 and request_counter >= max_requests_limit and not is_stopping:
        is_stopping = True
        print(f"\n[Locust] Target of {max_requests_limit} requests reached ({request_counter} executed). Stopping test runner...")
        if target_runner:
            # Spawn asynchronous quit to avoid gevent worker greenlet blocking
            gevent.spawn_later(0.01, target_runner.quit)


class VishramSthalUser(HttpUser):
    """
    Simulates real visitor and guest traffic browsing VishramSthal resort & hotel.
    """
    wait_time = between(1.0, 3.0)

    @task(10)
    def view_home_page(self):
        self.client.get("/", name="Page: Home")

    @task(6)
    def view_rooms_page(self):
        self.client.get("/rooms", name="Page: Rooms Listing")

    @task(6)
    def fetch_rooms_api(self):
        filter_options = [
            "",
            "?available=true",
            "?capacity=2",
            "?capacity=4",
            "?sort=price_asc",
            "?sort=price_desc",
        ]
        param = random.choice(filter_options)
        self.client.get(f"/api/rooms{param}", name="API: Get Rooms")

    @task(4)
    def view_wedding_pages(self):
        wedding_paths = [
            "/wedding",
            "/wedding/venues",
            "/wedding/services",
            "/wedding/gallery",
        ]
        path = random.choice(wedding_paths)
        self.client.get(path, name=f"Page: {path}")

    @task(4)
    def fetch_wedding_api(self):
        endpoints = [
            "/api/wedding/venues",
            "/api/wedding/services",
        ]
        path = random.choice(endpoints)
        self.client.get(path, name=f"API: {path}")

    @task(3)
    def view_gallery(self):
        self.client.get("/gallery", name="Page: Gallery")

    @task(3)
    def view_reviews(self):
        self.client.get("/reviews", name="Page: Reviews")
        self.client.get("/api/reviews", name="API: Get Reviews")

    @task(2)
    def view_static_pages(self):
        static_pages = [
            "/about",
            "/contact",
            "/terms",
            "/privacy",
            "/cancellation",
        ]
        path = random.choice(static_pages)
        self.client.get(path, name=f"Page: {path}")


class ApiStressUser(HttpUser):
    """
    Focuses specifically on backend API endpoints to test database and server performance.
    """
    wait_time = between(1.0, 2.5)

    @task(4)
    def test_rooms_api(self):
        self.client.get("/api/rooms", name="API: Get Rooms")

    @task(3)
    def test_reviews_api(self):
        self.client.get("/api/reviews", name="API: Get Reviews")

    @task(2)
    def test_wedding_venues_api(self):
        self.client.get("/api/wedding/venues", name="API: Get Wedding Venues")

    @task(2)
    def test_wedding_services_api(self):
        self.client.get("/api/wedding/services", name="API: Get Wedding Services")
