"""
Entrypoint for Locust tests in tests/ directory.
Re-exports test suite from tests.load.locustfile
"""
import os
import sys

# Ensure tests directory is on python path
sys.path.insert(0, os.path.dirname(__file__))

from load.locustfile import *  # noqa: F401, F403
