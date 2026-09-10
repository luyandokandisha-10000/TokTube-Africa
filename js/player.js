/**
 * TokTube - Upgraded Custom Video Player Controller
 * Features: PiP mode, Real MP4 file downloader, Quality selector popup,
 * Dislike toggle with counter, custom scrubber, speed controls, theater mode.
 */

import { storage } from './storage.js';
import { soundFX } from './sound-effects.js';

export class VideoPlayer {
  constructor(videoElement, containerElement) {
    this.video = videoElement;
    this.container = containerElement;
    this.isPlaying = false;
    this.isMuted = false;
    this.isTheater = false;
    this.currentSpeed = 1;
    this.currentQuality = 'Auto (1080p)';
    this.speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    this.currentVideoData = null;

    this.initElements();
    this.bindEvents();
  }

  initElements() {
    this.playBtn = this.container.querySelector('.btn-play-toggle');
    this.playIcon = this.container.querySelector('.icon-play');
    this.pauseIcon = this.container.querySelector('.icon-pause');
    this.timelineContainer = this.container.querySelector('.timeline-container');
    this.timelineProgress = this.container.querySelector('.timeline-progress');
    this.timeDisplay = this.container.querySelector('.time-display');
    this.volumeBtn = this.container.querySelector('.btn-volume');
    this.volumeSlider = this.container.querySelector('.volume-slider');
    this.speedBtn = this.container.querySelector('.btn-speed');
    this.theaterBtn = this.container.querySelector('.btn-theater');
    this.fullscreenBtn = this.container.querySelector('.btn-fullscreen');

    // New interactive player controls
    this.pipBtn = this.container.querySelector('.btn-pip');
    this.downloadBtn = document.getElementById('btn-watch-download');
    this.qualityBtn = this.container.querySelector('.btn-quality');
    this.qualityMenu = this.container.querySelector('.player-quality-menu');
    this.dislikeBtn = document.getElementById('btn-watch-dislike');
    this.dislikeCount = document.getElementById('watch-dislike-count');
  }

  bindEvents() {
    if (!this.video) return;

    // Play/Pause toggles
    this.video.addEventListener('click', () => this.togglePlay());
    if (this.playBtn) {
      this.playBtn.addEventListener('click', () => this.togglePlay());
    }

    // Time & Progress Updates
    this.video.addEventListener('timeupdate', () => this.updateProgress());
    this.video.addEventListener('loadedmetadata', () => this.updateProgress());
    this.video.addEventListener('ended', () => {
      this.isPlaying = false;
      this.updatePlayState();
    });

    // Timeline Scrubbing
    if (this.timelineContainer) {
      let isDragging = false;
      const handleSeek = (e) => {
        const rect = this.timelineContainer.getBoundingClientRect();
        const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        if (this.video.duration) {
          this.video.currentTime = pos * this.video.duration;
        }
      };

      this.timelineContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        handleSeek(e);
      });

      window.addEventListener('mousemove', (e) => {
        if (isDragging) handleSeek(e);
      });

      window.addEventListener('mouseup', () => {
        isDragging = false;
      });
    }

    // Volume & Mute
    if (this.volumeBtn) {
      this.volumeBtn.addEventListener('click', () => this.toggleMute());
    }
    if (this.volumeSlider) {
      this.volumeSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        this.video.volume = val;
        this.video.muted = (val === 0);
        this.isMuted = (val === 0);
      });
    }

    // Playback Speed
    if (this.speedBtn) {
      this.speedBtn.addEventListener('click', () => this.cycleSpeed());
    }

    // Theater Mode
    if (this.theaterBtn) {
      this.theaterBtn.addEventListener('click', () => this.toggleTheater());
    }

    // Fullscreen
    if (this.fullscreenBtn) {
      this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
    }

    // Picture-in-Picture (PiP)
    if (this.pipBtn) {
      this.pipBtn.addEventListener('click', () => this.togglePiP());
    }

    // Real Video File Downloader
    if (this.downloadBtn) {
      this.downloadBtn.addEventListener('click', () => this.triggerDownload());
    }

    // Quality Settings Dropdown
    if (this.qualityBtn && this.qualityMenu) {
      this.qualityBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.qualityMenu.classList.toggle('open');
      });

      this.qualityMenu.querySelectorAll('.quality-option').forEach(opt => {
        opt.addEventListener('click', (e) => {
          e.stopPropagation();
          this.qualityMenu.querySelectorAll('.quality-option').forEach(o => o.classList.remove('active'));
          opt.classList.add('active');
          this.currentQuality = opt.dataset.quality;
          this.qualityBtn.textContent = opt.dataset.label;
          this.qualityMenu.classList.remove('open');
          window.tokApp.showToast(`Streaming quality set to ${opt.dataset.label} ⚙️`);
        });
      });

      window.addEventListener('click', () => {
        this.qualityMenu.classList.remove('open');
      });
    }

    // Dislike Button Binding
    if (this.dislikeBtn) {
      this.dislikeBtn.addEventListener('click', () => {
        if (!this.currentVideoData) return;
        const nowDisliked = storage.toggleDislike(this.currentVideoData.id);
        this.dislikeBtn.classList.toggle('active', nowDisliked);
        const updated = storage.getYoutubeVideoById(this.currentVideoData.id);
        if (this.dislikeCount && updated) {
          this.dislikeCount.textContent = updated.dislikes || 0;
        }
        // Sync like button if dislike cancelled it
        const likeBtn = document.getElementById('btn-watch-like');
        const likeCount = document.getElementById('watch-like-count');
        if (likeBtn && updated) {
          likeBtn.classList.toggle('active', storage.isLiked(updated.id));
          if (likeCount) likeCount.textContent = this.formatNumber(updated.likes);
        }
        window.tokApp.showToast(nowDisliked ? 'Disliked video' : 'Removed dislike');
      });
    }

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (!this.container.offsetParent) return;

      switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault();
          this.togglePlay();
          break;
        case 'j':
          this.video.currentTime = Math.max(0, this.video.currentTime - 10);
          break;
        case 'l':
          this.video.currentTime = Math.min(this.video.duration || 0, this.video.currentTime + 10);
          break;
        case 'm':
          this.toggleMute();
          break;
        case 'f':
          this.toggleFullscreen();
          break;
        case 't':
          this.toggleTheater();
          break;
        case 'p':
          this.togglePiP();
          break;
      }
    });
  }

  loadSource(videoData) {
    this.currentVideoData = videoData;
    this.video.src = videoData.videoUrl;
    if (videoData.thumbnail) this.video.poster = videoData.thumbnail;
    this.video.load();
    this.video.play().then(() => {
      this.isPlaying = true;
      this.updatePlayState();
    }).catch(() => {
      this.isPlaying = false;
      this.updatePlayState();
    });

    // Update Dislike initial state
    if (this.dislikeBtn) {
      this.dislikeBtn.classList.toggle('active', storage.isDisliked(videoData.id));
    }
    if (this.dislikeCount) {
      this.dislikeCount.textContent = videoData.dislikes || 0;
    }
  }

  togglePlay() {
    if (this.video.paused) {
      this.video.play();
      this.isPlaying = true;
    } else {
      this.video.pause();
      this.isPlaying = false;
    }
    this.updatePlayState();
  }

  updatePlayState() {
    if (this.playIcon && this.pauseIcon) {
      this.playIcon.style.display = this.isPlaying ? 'none' : 'block';
      this.pauseIcon.style.display = this.isPlaying ? 'block' : 'none';
    }
  }

  updateProgress() {
    if (!this.video.duration) return;
    const percent = (this.video.currentTime / this.video.duration) * 100;
    if (this.timelineProgress) {
      this.timelineProgress.style.width = `${percent}%`;
    }
    if (this.timeDisplay) {
      const cur = this.formatTime(this.video.currentTime);
      const dur = this.formatTime(this.video.duration);
      this.timeDisplay.textContent = `${cur} / ${dur}`;
    }
  }

  formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  toggleMute() {
    this.video.muted = !this.video.muted;
    this.isMuted = this.video.muted;
    if (this.volumeSlider) {
      this.volumeSlider.value = this.isMuted ? 0 : this.video.volume;
    }
  }

  cycleSpeed() {
    const nextIdx = (this.speeds.indexOf(this.currentSpeed) + 1) % this.speeds.length;
    this.currentSpeed = this.speeds[nextIdx];
    this.video.playbackRate = this.currentSpeed;
    if (this.speedBtn) {
      this.speedBtn.textContent = `${this.currentSpeed}x`;
    }
    window.tokApp.showToast(`Speed set to ${this.currentSpeed}x`);
  }

  toggleTheater() {
    this.isTheater = !this.isTheater;
    this.container.classList.toggle('theater-mode', this.isTheater);
    soundFX.playSwitchSound();
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      if (this.container.requestFullscreen) {
        this.container.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  async togglePiP() {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        window.tokApp.showToast('Exited Picture-in-Picture');
      } else if (document.pictureInPictureEnabled && this.video) {
        await this.video.requestPictureInPicture();
        window.tokApp.showToast('Entered Picture-in-Picture 🔲');
      }
    } catch (err) {
      console.warn('PiP error:', err);
      window.tokApp.showToast('Picture-in-Picture not supported on this browser');
    }
  }

  triggerDownload() {
    if (!this.currentVideoData) return;
    const link = document.createElement('a');
    link.href = this.currentVideoData.videoUrl;
    link.target = '_blank';
    link.download = `TokTube-${this.currentVideoData.title.replace(/[^a-zA-Z0-9]/g, '_')}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    soundFX.playNotificationSound();
    window.tokApp.showToast(`Starting download: "${this.currentVideoData.title}" 📥`);
  }

  formatNumber(num) {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  }
}
