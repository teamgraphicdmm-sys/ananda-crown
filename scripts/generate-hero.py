"""Generate deployable WebP hero frames from the locally retained source video."""
import argparse, hashlib, json, os, shutil, subprocess
from pathlib import Path
root=Path(__file__).resolve().parent.parent
parser=argparse.ArgumentParser()
parser.add_argument('--source',default='public/videos/Website_Video.mp4')
parser.add_argument('--ffmpeg')
parser.add_argument('--frames',type=int,default=256,help='Keep only this many frames (default: 256 at 12 fps).')
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
version+='-fast-v1'
base='videos/hero-website-'+version
folders={name:root/'public'/base/name for name in ['desktop','mobile']}
for folder in folders.values():folder.mkdir(parents=True,exist_ok=True)
command=[ffmpeg,'-hide_banner','-loglevel','error','-y','-i',str(source),'-filter_complex',f'[0:v]fps=12,trim=end_frame={args.frames},split=2[wide][small];[wide]scale=1280:-2:flags=lanczos[desktop];[small]scale=-2:1138:flags=lanczos,crop=640:1138[mobile]']
for name,quality in [('desktop',72),('mobile',74)]:
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
manifest={'source':args.source,'version':version,'fps':12,'frameCount':counts[0],'desktop':base+'/desktop/','desktopWidth':1280,'mobile':base+'/mobile/','mobileWidth':640,'sourceBytes':source.stat().st_size,'outputBytes':{name:sum(f.stat().st_size for f in folder.glob('frame_*.webp')) for name,folder in folders.items()}}
# Regenerating fallback frames must retain the matching native desktop video.
previous_path=root/'scripts/hero-sequence.json'
if previous_path.is_file():
 previous=json.loads(previous_path.read_text())
 video=previous.get('desktopVideo','')
 if video.startswith('videos/hero-desktop-'+version.split('-fast-')[0]) and (root/'public'/video).is_file():
  manifest['desktopVideo']=video
  manifest['desktopVideoBytes']=(root/'public'/video).stat().st_size
(root/'scripts/hero-sequence.json').write_text(json.dumps(manifest,indent=2)+'\n',encoding='utf-8')
print(json.dumps(manifest),flush=True)
