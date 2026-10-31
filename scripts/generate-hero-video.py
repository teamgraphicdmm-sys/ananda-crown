"""Encode the trimmed desktop hero for native browser scroll scrubbing."""
import hashlib, json, shutil, subprocess
from pathlib import Path
root = Path(__file__).resolve().parent.parent
source = root / 'public/videos/Website_Video.mp4'
try:
    import imageio_ffmpeg
    ffmpeg = shutil.which('ffmpeg') or imageio_ffmpeg.get_ffmpeg_exe()
except ImportError:
    ffmpeg = shutil.which('ffmpeg')
if not ffmpeg:
    raise SystemExit('Install FFmpeg or imageio_ffmpeg.')
version = hashlib.sha256(source.read_bytes()).hexdigest()[:12]
relative = 'videos/hero-desktop-' + version + '-v1.mp4'
target = root / 'public' / relative
# Frequent closed GOPs and no B-frames reduce decoding work on forward/reverse seeks.
subprocess.run([ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', '-i', str(source),
    '-t', '21.291667', '-an', '-vf', 'fps=30,scale=1600:-2:flags=lanczos',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '25', '-pix_fmt', 'yuv420p',
    '-g', '12', '-keyint_min', '12', '-sc_threshold', '0', '-bf', '0',
    '-movflags', '+faststart', str(target)], check=True)
shutil.copy2(target, root / relative)
manifest = root / 'scripts/hero-sequence.json'
data = json.loads(manifest.read_text())
data['desktopVideo'] = relative
data['desktopVideoBytes'] = target.stat().st_size
manifest.write_text(json.dumps(data, indent=2) + '\n')
print(json.dumps({'path': relative, 'bytes': target.stat().st_size}), flush=True)

