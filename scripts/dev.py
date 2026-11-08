"""Local preview with content regeneration, using only Python's standard library."""
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
import argparse
import subprocess
import sys
import threading
import time

ROOT=Path(__file__).resolve().parents[1]

def build():
    return subprocess.run([sys.executable,str(ROOT/'scripts/build_content.py')],cwd=ROOT).returncode==0

def inputs():
    return {str(p):p.stat().st_mtime_ns for p in (ROOT/'content').rglob('*')
            if p.is_file() and p.suffix in ('.md','.json')}

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port',type=int,default=8001)
    args=parser.parse_args()
    if not build():sys.exit(1)
    server=ThreadingHTTPServer(('127.0.0.1',args.port),partial(SimpleHTTPRequestHandler,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start()
    print(f'Preview: http://127.0.0.1:{args.port} — desa el contingut i actualitza el navegador.',flush=True)
    previous=inputs()
    try:
        while True:
            time.sleep(.8)
            current=inputs()
            if current!=previous:
                time.sleep(.2)
                if build():print('Contingut actualitzat. Recarrega el navegador.',flush=True)
                else:print('Revisa el fitxer indicat; la previsualització continua oberta.',flush=True)
                previous=inputs()
    except KeyboardInterrupt:
        server.shutdown()
