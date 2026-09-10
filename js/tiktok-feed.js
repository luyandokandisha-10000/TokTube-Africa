/**
 * TokTube - TikTok Feed Controller
 * Features: Vertical snap scrolling, IntersectionObserver autoplay,
 * Mute/Unmute audio toggle button, Interactive scrubber timeline on reels,
 * Clickable spinning vinyl sound details, double-tap heart burst with audio pop,
 * and nested comment replies in the sliding drawer.
 */

import { storage } from './storage.js';
import { soundFX } from './sound-effects.js';

export class TikTokFeed {
  constructor(feedContainer, onNavigateToWatch) {
    this.container = feedContainer;
    this.onNavigateToWatch = onNavigateToWatch;
    this.activeReelIndex = 0;
    this.reels = [];
    this.observer = null;
    this.currentDrawerReelId = null;
    this.activeReplyParentId = null;
    this.isMutedGlobal = false;

    this.initDrawer();
    this.bindKeyboardNav();
  }

  render() {
    this.reels = storage.getTiktokReels();
    this.container.innerHTML = '';

    if (this.reels.length === 0) {
      this.container.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: var(--text-secondary);">
          <p style="font-size: 18px; margin-bottom: 12px;">No Toks available yet!</p>
          <button class="btn-primary" onclick="window.tokApp.openUploadModal('tok')">Upload First Tok</button>
        </div>
      `;
      return;
    }

    this.reels.forEach((reel, index) => {
      const reelEl = document.createElement('div');
      reelEl.className = 'tok-reel';
      reelEl.dataset.index = index;
      reelEl.dataset.id = reel.id;

      const isLiked = storage.isLiked(reel.id);
      const isBookmarked = storage.isBookmarked(reel.id);
      const isSubbed = storage.isSubscribed(reel.channel.id);

      // Render reel markup
      reelEl.innerHTML = `
        <div class="tok-ambient-glow" style="background-image: url('${reel.thumbnail}');"></div>
        <div class="tok-stage">
          <video class="tok-video" src="${reel.videoUrl}" loop playsinline preload="metadata"></video>
          
          <!-- Tap to Pause / Play Center Indicator -->
          <div class="tok-play-pause-badge">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>

          <!-- Mute / Unmute Audio Toggle Overlay -->
          <button class="tok-sound-toggle-btn" title="Toggle Mute / Unmute">
            <svg class="icon-unmuted" viewBox="0 0 24 24" style="${this.isMutedGlobal ? 'display:none;' : ''}">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
            <svg class="icon-muted" viewBox="0 0 24 24" style="${this.isMutedGlobal ? '' : 'display:none;'}">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          </button>

          <!-- Interactive Scrubber Timeline at Reel Bottom -->
          <div class="tok-timeline-container" title="Seek video">
            <div class="tok-timeline-bar">
              <div class="tok-timeline-progress"></div>
            </div>
          </div>

          <!-- Bottom Metadata Overlay -->
          <div class="tok-meta-overlay">
            <div class="tok-author-row" style="cursor: pointer;" onclick="window.location.href='channel.html?id=${reel.channel.id}'">
              <span class="tok-author-name">${reel.channel.name}</span>
              ${reel.channel.verified ? `
                <svg viewBox="0 0 24 24" style="width: 14px; height: 14px; fill: var(--tt-cyan);">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              ` : ''}
            </div>

            <div class="tok-caption">
              ${this.formatCaption(reel.caption)}
            </div>

            ${reel.ytEquivalentId ? `
              <button class="tok-yt-teaser-btn" data-yt-id="${reel.ytEquivalentId}">
                <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: #fff;"><path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 3c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/></svg>
                Watch Long Version on YouTube
              </button>
            ` : ''}

            <div class="tok-sound-marquee" data-sound="${reel.soundTitle || 'Original Audio'}">
              <svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
              <span>${reel.soundTitle || 'Original Audio'}</span>
            </div>
          </div>

          <!-- Floating Right Action Rail -->
          <div class="tok-action-rail">
            <div class="tok-creator-bubble">
              <img class="tok-creator-avatar" src="${reel.channel.avatar}" alt="${reel.channel.name}" style="cursor: pointer;" onclick="window.location.href='channel.html?id=${reel.channel.id}'">
              <div class="tok-follow-plus ${isSubbed ? 'followed' : ''}" data-channel-id="${reel.channel.id}" title="${isSubbed ? 'Followed' : 'Follow'}">
                ${isSubbed ? '✓' : '+'}
              </div>
            </div>

            <!-- Like Button -->
            <div class="tok-action-btn btn-like-tok ${isLiked ? 'liked' : ''}" data-id="${reel.id}">
              <div class="tok-action-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <span class="tok-action-count like-count">${this.formatNumber(reel.likes)}</span>
            </div>

            <!-- Comment Drawer Button -->
            <div class="tok-action-btn btn-comment-tok" data-id="${reel.id}">
              <div class="tok-action-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                </svg>
              </div>
              <span class="tok-action-count comment-count">${this.formatNumber(reel.commentsCount || (reel.comments ? reel.comments.length : 0))}</span>
            </div>

            <!-- Bookmark Button -->
            <div class="tok-action-btn btn-bookmark-tok ${isBookmarked ? 'bookmarked' : ''}" data-id="${reel.id}">
              <div class="tok-action-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                </svg>
              </div>
              <span class="tok-action-count">${this.formatNumber(reel.bookmarksCount || 420)}</span>
            </div>

            <!-- Share Button -->
            <div class="tok-action-btn btn-share-tok" data-id="${reel.id}">
              <div class="tok-action-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"/>
                </svg>
              </div>
              <span class="tok-action-count">${this.formatNumber(reel.sharesCount || 150)}</span>
            </div>

            <!-- Spinning Vinyl Record (Clickable) -->
            <div class="tok-vinyl-container" title="Click to view Sound Details" data-sound="${reel.soundTitle || 'Original Audio'}">
              <div class="tok-vinyl-disc">
                <div class="tok-vinyl-art" style="background-image: url('${reel.thumbnail}'); background-size: cover;"></div>
              </div>
              <span class="floating-note">🎵</span>
              <span class="floating-note">🎶</span>
            </div>
          </div>
        </div>
      `;

      this.bindReelInteractions(reelEl, reel);
      this.container.appendChild(reelEl);
    });

    this.setupIntersectionObserver();
  }

  bindReelInteractions(reelEl, reel) {
    const video = reelEl.querySelector('.tok-video');
    const playBadge = reelEl.querySelector('.tok-play-pause-badge');
    const stage = reelEl.querySelector('.tok-stage');
    const timelineBar = reelEl.querySelector('.tok-timeline-container');
    const timelineProgress = reelEl.querySelector('.tok-timeline-progress');
    const soundToggleBtn = reelEl.querySelector('.tok-sound-toggle-btn');
    const vinylContainer = reelEl.querySelector('.tok-vinyl-container');
    const soundMarquee = reelEl.querySelector('.tok-sound-marquee');

    // Sync initial video volume
    video.muted = this.isMutedGlobal;

    // Time update for bottom scrubber
    video.addEventListener('timeupdate', () => {
      if (video.duration && timelineProgress) {
        const pct = (video.currentTime / video.duration) * 100;
        timelineProgress.style.width = `${pct}%`;
      }
    });

    // Scrubber click to seek
    if (timelineBar) {
      timelineBar.addEventListener('click', (e) => {
        e.stopPropagation();
        const rect = timelineBar.getBoundingClientRect();
        const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        if (video.duration) {
          video.currentTime = pos * video.duration;
        }
      });
    }

    // Sound Toggle Overlay
    if (soundToggleBtn) {
      soundToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.isMutedGlobal = !this.isMutedGlobal;
        this.updateAllAudioMute();
        window.tokApp.showToast(this.isMutedGlobal ? 'Audio muted 🔇' : 'Audio unmuted 🔊');
      });
    }

    // Spinning Vinyl & Marquee click -> Open Sound Details Modal
    const openSound = (e) => {
      e.stopPropagation();
      window.tokApp.openSoundModal(reel.soundTitle || 'Original Audio');
    };
    if (vinylContainer) vinylContainer.addEventListener('click', openSound);
    if (soundMarquee) soundMarquee.addEventListener('click', openSound);

    // Tap to pause/play and double-tap heart
    let lastTapTime = 0;
    stage.addEventListener('click', (e) => {
      if (e.target.closest('.tok-action-rail') || e.target.closest('.tok-yt-teaser-btn') || 
          e.target.closest('.tok-comments-drawer') || e.target.closest('.tok-sound-toggle-btn') ||
          e.target.closest('.tok-timeline-container')) {
        return;
      }

      const currentTime = new Date().getTime();
      const tapInterval = currentTime - lastTapTime;

      if (tapInterval < 300 && tapInterval > 0) {
        // Double-tap -> Trigger Heart Explosion & Pop Sound!
        this.createHeartBurst(e, stage);
        soundFX.playLikeSound();
        const likeBtn = reelEl.querySelector('.btn-like-tok');
        if (!likeBtn.classList.contains('liked')) {
          this.handleLikeClick(likeBtn, reel.id);
        }
      } else {
        // Single tap -> Play / Pause
        setTimeout(() => {
          if (new Date().getTime() - lastTapTime >= 300) {
            if (video.paused) {
              video.play();
              playBadge.classList.remove('visible');
            } else {
              video.pause();
              playBadge.classList.add('visible');
            }
          }
        }, 220);
      }
      lastTapTime = currentTime;
    });

    // Like button
    const likeBtn = reelEl.querySelector('.btn-like-tok');
    likeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      soundFX.playLikeSound();
      this.handleLikeClick(likeBtn, reel.id);
    });

    // Follow / Subscribe button
    const followBtn = reelEl.querySelector('.tok-follow-plus');
    followBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      soundFX.playSubscribeSound();
      const isSubbed = storage.toggleSubscribe(reel.channel.id);
      followBtn.classList.toggle('followed', isSubbed);
      followBtn.textContent = isSubbed ? '✓' : '+';
      window.tokApp.showToast(isSubbed ? `Followed ${reel.channel.name}` : `Unfollowed ${reel.channel.name}`);
    });

    // Comment drawer button
    const commentBtn = reelEl.querySelector('.btn-comment-tok');
    commentBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.openCommentDrawer(reel.id);
    });

    // Bookmark button
    const bookmarkBtn = reelEl.querySelector('.btn-bookmark-tok');
    bookmarkBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isSaved = storage.toggleBookmark(reel.id);
      bookmarkBtn.classList.toggle('bookmarked', isSaved);
      window.tokApp.showToast(isSaved ? 'Saved to Bookmarks' : 'Removed from Bookmarks');
    });

    // Share button
    const shareBtn = reelEl.querySelector('.btn-share-tok');
    shareBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.tokApp.openShareModal(reel.id, reel.title);
    });

    // Hybrid YouTube Teaser Button
    const ytTeaserBtn = reelEl.querySelector('.tok-yt-teaser-btn');
    if (ytTeaserBtn) {
      ytTeaserBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        soundFX.playSwitchSound();
        const ytId = ytTeaserBtn.dataset.ytId;
        this.pauseAll();
        if (this.onNavigateToWatch) {
          this.onNavigateToWatch(ytId);
        }
      });
    }
  }

  updateAllAudioMute() {
    const videos = this.container.querySelectorAll('.tok-video');
    videos.forEach(v => v.muted = this.isMutedGlobal);

    const toggles = this.container.querySelectorAll('.tok-sound-toggle-btn');
    toggles.forEach(btn => {
      const iconUnmuted = btn.querySelector('.icon-unmuted');
      const iconMuted = btn.querySelector('.icon-muted');
      if (iconUnmuted && iconMuted) {
        iconUnmuted.style.display = this.isMutedGlobal ? 'none' : 'block';
        iconMuted.style.display = this.isMutedGlobal ? 'block' : 'none';
      }
    });
  }

  handleLikeClick(likeBtn, reelId) {
    const isNowLiked = storage.toggleLike(reelId, true);
    likeBtn.classList.toggle('liked', isNowLiked);
    const countEl = likeBtn.querySelector('.like-count');
    const reel = storage.getTiktokReelById(reelId);
    if (reel && countEl) {
      countEl.textContent = this.formatNumber(reel.likes);
    }
  }

  createHeartBurst(event, stage) {
    const rect = stage.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const burst = document.createElement('div');
    burst.className = 'heart-burst';
    burst.style.left = `${x}px`;
    burst.style.top = `${y}px`;
    burst.innerHTML = `
      <svg viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    `;
    stage.appendChild(burst);

    setTimeout(() => {
      burst.remove();
    }, 850);
  }

  setupIntersectionObserver() {
    if (this.observer) {
      this.observer.disconnect();
    }

    const options = {
      root: this.container,
      threshold: 0.7
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target.querySelector('.tok-video');
        const playBadge = entry.target.querySelector('.tok-play-pause-badge');
        if (entry.isIntersecting) {
          this.activeReelIndex = parseInt(entry.target.dataset.index, 10);
          if (video) {
            video.currentTime = 0;
            video.muted = this.isMutedGlobal;
            video.play().catch(() => {});
            if (playBadge) playBadge.classList.remove('visible');
          }
        } else {
          if (video) {
            video.pause();
          }
        }
      });
    }, options);

    const reelElements = this.container.querySelectorAll('.tok-reel');
    reelElements.forEach(el => this.observer.observe(el));
  }

  pauseAll() {
    const videos = this.container.querySelectorAll('.tok-video');
    videos.forEach(v => v.pause());
  }

  resumeActive() {
    const activeReel = this.container.querySelectorAll('.tok-reel')[this.activeReelIndex];
    if (activeReel) {
      const video = activeReel.querySelector('.tok-video');
      if (video) {
        video.muted = this.isMutedGlobal;
        video.play().catch(() => {});
      }
    }
  }

  bindKeyboardNav() {
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (!this.container.offsetParent) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.scrollToNext();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.scrollToPrev();
      }
    });
  }

  scrollToNext() {
    const reels = this.container.querySelectorAll('.tok-reel');
    if (this.activeReelIndex < reels.length - 1) {
      reels[this.activeReelIndex + 1].scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToPrev() {
    const reels = this.container.querySelectorAll('.tok-reel');
    if (this.activeReelIndex > 0) {
      reels[this.activeReelIndex - 1].scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Sliding Comment Drawer with Nested Replies
  initDrawer() {
    this.drawer = document.getElementById('tok-comments-drawer');
    if (!this.drawer) return;

    const closeBtn = this.drawer.querySelector('.drawer-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeCommentDrawer());
    }

    const sendBtn = this.drawer.querySelector('.btn-drawer-send');
    const input = this.drawer.querySelector('.drawer-input');
    const replyBanner = this.drawer.querySelector('.drawer-reply-banner');
    const cancelReplyBtn = this.drawer.querySelector('.btn-cancel-drawer-reply');

    if (cancelReplyBtn) {
      cancelReplyBtn.addEventListener('click', () => {
        this.activeReplyParentId = null;
        if (replyBanner) replyBanner.style.display = 'none';
        if (input) input.placeholder = 'Add comment...';
      });
    }

    const submitComment = () => {
      const text = input.value.trim();
      if (!text || !this.currentDrawerReelId) return;

      const newComment = storage.addComment(this.currentDrawerReelId, text, true, this.activeReplyParentId);
      input.value = '';
      soundFX.playCommentSound();

      // Reset reply state
      this.activeReplyParentId = null;
      if (replyBanner) replyBanner.style.display = 'none';
      if (input) input.placeholder = 'Add comment...';

      // Refresh comments
      const reel = storage.getTiktokReelById(this.currentDrawerReelId);
      this.renderDrawerComments(reel);

      // Update badge count on active reel
      const activeReel = this.container.querySelector(`.tok-reel[data-id="${this.currentDrawerReelId}"]`);
      if (activeReel) {
        const countEl = activeReel.querySelector('.comment-count');
        if (countEl && reel) {
          countEl.textContent = this.formatNumber(reel.commentsCount);
        }
      }
    };

    if (sendBtn) sendBtn.addEventListener('click', submitComment);
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') submitComment();
      });
    }
  }

  openCommentDrawer(reelId) {
    this.currentDrawerReelId = reelId;
    this.activeReplyParentId = null;
    const reel = storage.getTiktokReelById(reelId);
    if (!reel || !this.drawer) return;

    this.renderDrawerComments(reel);
    this.drawer.classList.add('open');
  }

  renderDrawerComments(reel) {
    const titleEl = this.drawer.querySelector('.drawer-title');
    const bodyEl = this.drawer.querySelector('.drawer-body');

    const comments = reel.comments || [];
    titleEl.textContent = `${comments.length} Comments`;
    bodyEl.innerHTML = '';

    if (comments.length === 0) {
      bodyEl.innerHTML = `<p style="color: var(--text-muted); text-align: center; margin-top: 40px;">No comments yet. Be the first to comment!</p>`;
    } else {
      comments.forEach(c => {
        const commentEl = document.createElement('div');
        commentEl.className = 'comment-item';
        commentEl.innerHTML = `
          <img src="${c.avatar}" class="channel-avatar" style="width: 32px; height: 32px;" alt="${c.author}">
          <div class="comment-content">
            <div class="comment-author-row">
              <span class="comment-author">${c.author}</span>
              <span class="comment-timestamp">${c.timeAgo || c.timestamp || 'Just now'}</span>
            </div>
            <div class="comment-body">${c.text}</div>
            <div class="comment-feedback-row">
              <button class="btn-comment-action btn-like-c" style="font-size: 11px;">❤️ ${c.likes || 0}</button>
              <button class="btn-comment-action btn-reply-c" data-comment-id="${c.id}" data-author="${c.author}" style="font-size: 11px;">Reply</button>
            </div>

            <!-- Nested Replies -->
            ${c.replies && c.replies.length > 0 ? `
              <div class="nested-replies-list" style="margin-top: 8px; border-left: 2px solid var(--border-subtle); padding-left: 12px; display: flex; flex-direction: column; gap: 8px;">
                ${c.replies.map(r => `
                  <div style="display: flex; gap: 8px;">
                    <img src="${r.avatar}" style="width: 24px; height: 24px; border-radius: 50%;">
                    <div>
                      <span style="font-size: 12px; font-weight: 700;">${r.author}</span>
                      <p style="font-size: 13px; color: var(--text-primary); margin-top: 2px;">${r.text}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        `;

        // Reply button binding
        const replyBtn = commentEl.querySelector('.btn-reply-c');
        if (replyBtn) {
          replyBtn.addEventListener('click', () => {
            this.activeReplyParentId = c.id;
            const banner = this.drawer.querySelector('.drawer-reply-banner');
            const bannerText = this.drawer.querySelector('.reply-banner-text');
            const input = this.drawer.querySelector('.drawer-input');
            if (banner && bannerText) {
              bannerText.textContent = `Replying to @${c.author}`;
              banner.style.display = 'flex';
            }
            if (input) {
              input.placeholder = `Reply to @${c.author}...`;
              input.focus();
            }
          });
        }

        bodyEl.appendChild(commentEl);
      });
    }
  }

  closeCommentDrawer() {
    if (this.drawer) {
      this.drawer.classList.remove('open');
    }
  }

  formatCaption(caption) {
    if (!caption) return '';
    return caption.replace(/(#\w+)/g, '<span class="tok-hashtags">$1</span>');
  }

  formatNumber(num) {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  }
}
