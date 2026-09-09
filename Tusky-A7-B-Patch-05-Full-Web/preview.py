from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import argparse

parser = argparse.ArgumentParser(description="Preview the complete P05 website locally.")
parser.add_argument("--port", type=int, default=8768)
args = parser.parse_args()
root = Path(__file__).resolve().parent
handler = partial(SimpleHTTPRequestHandler, directory=str(root))
with ThreadingHTTPServer(("127.0.0.1", args.port), handler) as server:
    print(f"P05 preview: http://127.0.0.1:{server.server_port}/", flush=True)
    print("Press Ctrl+C to stop.", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
