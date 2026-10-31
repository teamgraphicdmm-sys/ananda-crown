"""Generate deployable WebP hero frames from the locally retained source video."""
import argparse, hashlib, json, os, shutil, subprocess
from pathlib import Path
root=Path(__file__).resolve().parent.parent
parser=argparse.ArgumentParser()
parser.add_argument('--source',default='public/videos/Website_Video.mp4')
parser.add_argument('--ffmpeg')
parser.add_argument('--frames',type=int,default=511,help='Keep only this many frames (default: 511).')
args=parser.parse_args()
if args.frames<1:raise SystemExit('--frames must be positive')
source=(root/args.source).resolve()
if not source.is_file():raise SystemExit('Source video not found: '+str(source))
ffmpeg=args.ffmpeg or shutil.which('ffmpeg')
if not ffmpeg:
 try:
  import imageio_ffmpeg
  ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()
 except ImportError:raise SystemExit('Install FFmpeg or pass --ffmpeg with its executable path.')
version=hashlib.sha256(source.read_bytes()).hexdigest()[:12]
base='videos/hero-website-'+version
folders={name:root/'public'/base/name for name in ['desktop','mobile']}
for folder in folders.values():folder.mkdir(parents=True,exist_ok=True)
command=[ffmpeg,'-hide_banner','-loglevel','error','-y','-i',str(source),'-filter_complex',f'[0:v]fps=24,trim=end_frame={args.frames},split=2[wide][small];[wide]scale=1920:-2:flags=lanczos[desktop];[small]scale=960:-2:flags=lanczos[mobile]']
for name,quality in [('desktop',83),('mobile',82)]:
 command+=['-map','['+name+']','-c:v','libwebp','-quality',str(quality),'-compression_level','4','-threads','2','-fps_mode','passthrough',str(folders[name]/'frame_%04d.webp')]
print('Generating full-length desktop and mobile sequences...',flush=True)
subprocess.run(command,check=True)
for folder in folders.values():
 for frame in folder.glob('frame_*.webp'):
  if int(frame.stem.split('_')[-1])>args.frames:frame.unlink()
counts=[len(list(folder.glob('frame_*.webp'))) for folder in folders.values()]
if not counts[0] or counts[0]!=counts[1]:raise SystemExit('Generated frame sequences do not match.')
for name,folder in folders.items():
 mirror=root/base/name
 mirror.mkdir(parents=True,exist_ok=True)
 for frame in folder.glob('frame_*.webp'):shutil.copy2(frame,mirror/frame.name)
manifest={'source':args.source,'version':version,'fps':24,'frameCount':counts[0],'desktop':base+'/desktop/','desktopWidth':1920,'mobile':base+'/mobile/','mobileWidth':960,'sourceBytes':source.stat().st_size,'outputBytes':{name:sum(f.stat().st_size for f in folder.glob('frame_*.webp')) for name,folder in folders.items()}}
(root/'scripts/hero-sequence.json').write_text(json.dumps(manifest,indent=2)+'\n',encoding='utf-8')
print(json.dumps(manifest),flush=True)
