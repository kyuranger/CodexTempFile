from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import argparse
parser = argparse.ArgumentParser(description="Preview the complete A8-C website locally.")
parser.add_argument("--port", type=int, default=8769)
args = parser.parse_args()
handler = partial(SimpleHTTPRequestHandler, directory=str(Path(__file__).resolve().parent))
with ThreadingHTTPServer(("127.0.0.1", args.port), handler) as server:
    print(f"A8-C preview: http://127.0.0.1:{server.server_port}/", flush=True)
    print("Press Ctrl+C to stop.", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
