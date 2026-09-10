/**
 * TokTube - Master Application Router & Coordinator
 * Full interactivity: Voice search, notifications dropdown, user profile editor,
 * sound details modal, social sharing, subscribed channel filter, and sound FX.
 */

import { storage } from './storage.js';
import { soundFX } from './sound-effects.js';
import { TikTokFeed } from './tiktok-feed.js';
import { YouTubeFeed } from './youtube-feed.js';
import { VideoPlayer } from './player.js';
import { CreatorStudio } from './upload.js';

class TokTubeApp {
  constructor() {
    this.currentView = 'tube'; // 'tube', 'tok', 'watch', 'library'
    this.activeWatchVideoId = null;

    this.initDOM();
    this.initModules();
    this.bindGlobalEvents();
    this.updateNotificationBadge();
    this.showView('tube');
  }

  initDOM() {
    // Views
    this.views = {
      tube: document.getElementById('view-tube'),
      tok: document.getElementById('view-tok'),
      watch: document.getElementById('view-watch'),
      library: document.getElementById('view-library')
    };

    // Nav elements
    this.modeBtnTube = document.getElementById('mode-btn-tube');
    this.modeBtnTok = document.getElementById('mode-btn-tok');
    this.sidebar = document.getElementById('sidebar');
    this.menuToggle = document.getElementById('menu-toggle');
    this.searchInput = document.getElementById('search-input');
    this.searchBtn = document.getElementById('btn-search');
    this.voiceSearchBtn = document.getElementById('btn-voice-search');
    this.btnUpload = document.getElementById('btn-upload');
    this.btnSoundFx = document.getElementById('btn-sound-fx');
    this.btnNotif = document.getElementById('btn-notif');
    this.notifBadge = document.getElementById('notif-badge');
    this.notifDropdown = document.getElementById('notif-dropdown');
    this.headerUserAvatar = document.getElementById('header-user-avatar');

    // Modals
    this.uploadModalEl = document.getElementById('upload-modal');
    this.shareModalEl = document.getElementById('share-modal');
    this.voiceModalEl = document.getElementById('voice-search-modal');
    this.profileModalEl = document.getElementById('profile-modal');
    this.soundDetailsModalEl = document.getElementById('sound-details-modal');
    this.toastContainer = document.getElementById('toast-container');
  }

  initModules() {
    // YouTube Feed
    this.youtubeFeed = new YouTubeFeed(
      this.views.tube,
      (videoId) => this.navigateToWatch(videoId),
      (reelId) => {
        this.showView('tok');
        if (reelId) {
          setTimeout(() => {
            const target = this.views.tok.querySelector(`.tok-reel[data-id="${reelId}"]`);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    );

    // TikTok Feed
    this.tiktokFeed = new TikTokFeed(
      this.views.tok,
      (ytId) => this.navigateToWatch(ytId)
    );

    // Custom Player (Watch View)
    const playerContainer = document.getElementById('main-player-container');
    const mainVideo = document.getElementById('main-watch-video');
    this.player = new VideoPlayer(mainVideo, playerContainer);

    // Creator Studio Upload
    this.creatorStudio = new CreatorStudio(
      this.uploadModalEl,
      (viewType, videoId) => {
        this.youtubeFeed.render();
        this.tiktokFeed.render();
        if (viewType === 'tok') {
          this.showView('tok');
        } else {
          this.navigateToWatch(videoId);
        }
      }
    );
  }

  bindGlobalEvents() {
    // Mode Switcher (Tube ↔ Tok)
    if (this.modeBtnTube) {
      this.modeBtnTube.addEventListener('click', () => {
        soundFX.playSwitchSound();
        this.showView('tube');
      });
    }
    if (this.modeBtnTok) {
      this.modeBtnTok.addEventListener('click', () => {
        soundFX.playSwitchSound();
        this.showView('tok');
      });
    }

    // Sidebar Toggle
    if (this.menuToggle && this.sidebar) {
      this.menuToggle.addEventListener('click', () => {
        this.sidebar.classList.toggle('collapsed');
      });
    }

    // Sidebar Navigation Links
    document.querySelectorAll('[data-view-nav]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        soundFX.playSwitchSound();
        const targetView = item.dataset.viewNav;
        const category = item.dataset.category;

        if (category && targetView === 'tube') {
          this.showView('tube');
          this.youtubeFeed.setCategory(category);
        } else {
          this.showView(targetView);
        }
      });
    });

    // Mobile Bottom Nav
    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        soundFX.playSwitchSound();
        const view = btn.dataset.view;
        if (view) this.showView(view);
      });
    });

    const mobileUpload = document.getElementById('mobile-nav-upload');
    if (mobileUpload) {
      mobileUpload.addEventListener('click', () => this.openUploadModal('tok'));
    }

    // Header Upload Button
    if (this.btnUpload) {
      this.btnUpload.addEventListener('click', () => this.openUploadModal('tok'));
    }

    // Sound FX Audio Toggle
    if (this.btnSoundFx) {
      this.btnSoundFx.addEventListener('click', () => {
        const isEnabled = soundFX.toggleSound();
        const onIcon = this.btnSoundFx.querySelector('.sound-fx-on');
        const offIcon = this.btnSoundFx.querySelector('.sound-fx-off');
        this.btnSoundFx.classList.toggle('active', isEnabled);
        if (onIcon && offIcon) {
          onIcon.style.display = isEnabled ? 'block' : 'none';
          offIcon.style.display = isEnabled ? 'none' : 'block';
        }
        this.showToast(isEnabled ? 'Sound FX enabled 🔔' : 'Sound FX muted 🔕');
      });
    }

    // Search Bar
    if (this.searchBtn && this.searchInput) {
      const executeSearch = () => {
        const query = this.searchInput.value.trim();
        if (this.currentView !== 'tube') {
          this.showView('tube');
        }
        soundFX.playSwitchSound();
        this.youtubeFeed.render(query);
      };

      this.searchBtn.addEventListener('click', executeSearch);
      this.searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') executeSearch();
      });
    }

    // Voice Search Microphone
    if (this.voiceSearchBtn) {
      this.voiceSearchBtn.addEventListener('click', () => this.openVoiceSearchModal());
    }

    // Notifications Bell Dropdown
    if (this.btnNotif && this.notifDropdown) {
      this.btnNotif.addEventListener('click', (e) => {
        e.stopPropagation();
        this.notifDropdown.classList.toggle('open');
        this.renderNotificationsList();
      });

      window.addEventListener('click', () => {
        this.notifDropdown.classList.remove('open');
      });

      const markReadBtn = document.getElementById('btn-mark-all-read');
      if (markReadBtn) {
        markReadBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          storage.markAllNotificationsRead();
          this.updateNotificationBadge();
          this.renderNotificationsList();
          soundFX.playNotificationSound();
          this.showToast('All notifications marked as read ✓');
        });
      }
    }

    // User Profile Avatar Modal Trigger
    if (this.headerUserAvatar) {
      this.headerUserAvatar.addEventListener('click', () => this.openProfileModal());
    }

    // Enhanced Share Modal Bindings
    if (this.shareModalEl) {
      const closeBtn = this.shareModalEl.querySelector('.modal-close-btn');
      if (closeBtn) closeBtn.addEventListener('click', () => this.closeShareModal());

      const copyBtn = document.getElementById('btn-copy-share-link');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          const urlEl = document.getElementById('share-link-input');
          if (urlEl) {
            navigator.clipboard.writeText(urlEl.value).then(() => {
              soundFX.playNotificationSound();
              this.showToast('Link copied to clipboard! 📋');
              this.closeShareModal();
            }).catch(() => {
              this.showToast('Copied link!');
              this.closeShareModal();
            });
          }
        });
      }

      // Social Share Buttons (Twitter/X, WhatsApp, Embed)
      const twitterBtn = document.getElementById('btn-share-twitter');
      if (twitterBtn) {
        twitterBtn.addEventListener('click', () => {
          const url = encodeURIComponent(window.location.href);
          const text = encodeURIComponent('Check out this video on TokTube!');
          window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
        });
      }

      const whatsappBtn = document.getElementById('btn-share-whatsapp');
      if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
          const url = encodeURIComponent(window.location.href);
          window.open(`https://api.whatsapp.com/send?text=${url}`, '_blank');
        });
      }

      const embedBtn = document.getElementById('btn-share-embed');
      const embedBox = document.getElementById('embed-code-box');
      const embedText = document.getElementById('embed-code-text');
      if (embedBtn && embedBox && embedText) {
        embedBtn.addEventListener('click', () => {
          embedBox.style.display = embedBox.style.display === 'none' ? 'flex' : 'none';
          embedText.value = `<iframe width="560" height="315" src="${window.location.href}" frameborder="0" allowfullscreen></iframe>`;
        });
      }
    }

    // Modal Close Buttons (Generic)
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.classList.remove('open');
        }
      });
      const closeBtn = backdrop.querySelector('.modal-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => backdrop.classList.remove('open'));
      }
    });

    // Profile Editor Save Button
    const saveProfileBtn = document.getElementById('btn-save-profile');
    if (saveProfileBtn) {
      saveProfileBtn.addEventListener('click', () => {
        const name = document.getElementById('input-edit-profile-name').value.trim() || 'PulseCreator';
        const handle = document.getElementById('input-edit-profile-handle').value.trim() || '@pulsecreator';
        const bio = document.getElementById('input-edit-profile-bio').value.trim() || '';

        storage.updateUserProfile({ name, handle, bio });
        this.updateHeaderProfile();
        soundFX.playNotificationSound();
        if (this.profileModalEl) this.profileModalEl.classList.remove('open');
        this.showToast('Profile updated successfully! ✨');
      });
    }

    // "Use This Sound" Button in Sound Modal
    const useSoundBtn = document.getElementById('btn-use-this-sound');
    if (useSoundBtn) {
      useSoundBtn.addEventListener('click', () => {
        if (this.soundDetailsModalEl) this.soundDetailsModalEl.classList.remove('open');
        const soundTitle = useSoundBtn.dataset.soundTitle || 'Original Sound';
        this.openUploadModal('tok');
        const soundInput = document.getElementById('upload-sound-input');
        if (soundInput) soundInput.value = soundTitle;
      });
    }
  }

  showView(viewName) {
    this.currentView = viewName;

    // Pause all TikTok videos if navigating away from Tok
    if (viewName !== 'tok') {
      this.tiktokFeed.pauseAll();
    } else {
      this.tiktokFeed.resumeActive();
    }

    // Pause main watch player if navigating away from Watch
    if (viewName !== 'watch' && this.player && this.player.video) {
      this.player.video.pause();
    }

    // Update view visibility
    Object.keys(this.views).forEach(key => {
      if (this.views[key]) {
        this.views[key].classList.toggle('active', key === viewName);
      }
    });

    // Update navbar mode switch buttons
    if (this.modeBtnTube) this.modeBtnTube.classList.toggle('active', viewName === 'tube');
    if (this.modeBtnTok) this.modeBtnTok.classList.toggle('active', viewName === 'tok');

    // Update sidebar navigation highlights
    document.querySelectorAll('[data-view-nav]').forEach(item => {
      item.classList.toggle('active', item.dataset.viewNav === viewName);
    });

    // Update mobile nav buttons
    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === viewName);
    });

    // Render contents for view
    if (viewName === 'tube') {
      this.youtubeFeed.render();
    } else if (viewName === 'tok') {
      this.tiktokFeed.render();
    } else if (viewName === 'library') {
      this.renderLibraryView();
    }
  }

  navigateToWatch(videoId) {
    this.activeWatchVideoId = videoId;
    const video = storage.getYoutubeVideoById(videoId);
    if (!video) return;

    storage.addToHistory(videoId);
    this.showView('watch');

    // Load video into custom player
    this.player.loadSource(video);

    // Populate Video Details
    const titleEl = document.getElementById('watch-video-title');
    const channelAvatar = document.getElementById('watch-channel-avatar');
    const channelName = document.getElementById('watch-channel-name');
    const subCount = document.getElementById('watch-sub-count');
    const subBtn = document.getElementById('btn-watch-subscribe');
    const likeBtn = document.getElementById('btn-watch-like');
    const likeCount = document.getElementById('watch-like-count');
    const descStats = document.getElementById('watch-desc-stats');
    const descText = document.getElementById('watch-desc-text');

    if (titleEl) titleEl.textContent = video.title;
    if (channelAvatar) channelAvatar.src = video.channel.avatar;
    if (channelName) channelName.textContent = video.channel.name;
    if (subCount) subCount.textContent = `${video.channel.subscribers || '120K'} subscribers`;

    // Subscribe State
    const isSubbed = storage.isSubscribed(video.channel.id);
    this.updateSubscribeButton(subBtn, isSubbed);
    if (subBtn) {
      subBtn.onclick = () => {
        soundFX.playSubscribeSound();
        const nowSubbed = storage.toggleSubscribe(video.channel.id);
        this.updateSubscribeButton(subBtn, nowSubbed);
        this.showToast(nowSubbed ? `Subscribed to ${video.channel.name} 🔔` : `Unsubscribed from ${video.channel.name}`);
      };
    }

    // Like State
    const isLiked = storage.isLiked(video.id);
    if (likeBtn) {
      likeBtn.classList.toggle('active', isLiked);
      if (likeCount) likeCount.textContent = this.formatNumber(video.likes);

      likeBtn.onclick = () => {
        soundFX.playLikeSound();
        const nowLiked = storage.toggleLike(video.id, false);
        likeBtn.classList.toggle('active', nowLiked);
        const updated = storage.getYoutubeVideoById(video.id);
        if (likeCount && updated) likeCount.textContent = this.formatNumber(updated.likes);
      };
    }

    // Bookmark / Save State
    const saveBtn = document.getElementById('btn-watch-save');
    if (saveBtn) {
      const isSaved = storage.isBookmarked(video.id);
      saveBtn.classList.toggle('active', isSaved);
      saveBtn.onclick = () => {
        const nowSaved = storage.toggleBookmark(video.id);
        saveBtn.classList.toggle('active', nowSaved);
        this.showToast(nowSaved ? 'Saved to Watch Later' : 'Removed from Watch Later');
      };
    }

    // Share Button
    const shareBtn = document.getElementById('btn-watch-share');
    if (shareBtn) {
      shareBtn.onclick = () => this.openShareModal(video.id, video.title);
    }

    // Description
    if (descStats) descStats.textContent = `${video.views} • Uploaded ${video.uploadDate}`;
    if (descText) descText.textContent = video.description;

    // Comments Section
    this.renderWatchComments(video);

    // Related Videos Sidebar
    this.renderRelatedVideos(videoId);
  }

  updateSubscribeButton(btn, isSubbed) {
    if (!btn) return;
    btn.classList.toggle('subscribed', isSubbed);
    btn.textContent = isSubbed ? 'Subscribed ✓' : 'Subscribe';
  }

  renderWatchComments(video) {
    const commentsListEl = document.getElementById('watch-comments-list');
    const commentsCountEl = document.getElementById('watch-comments-count');
    const commentInput = document.getElementById('watch-new-comment-input');
    const submitBtn = document.getElementById('btn-submit-watch-comment');
    const cancelBtn = document.getElementById('btn-cancel-watch-comment');

    const comments = video.comments || [];
    if (commentsCountEl) commentsCountEl.textContent = `${comments.length} Comments`;
    if (!commentsListEl) return;

    commentsListEl.innerHTML = '';
    comments.forEach(c => {
      const item = document.createElement('div');
      item.className = 'comment-item';
      item.innerHTML = `
        <img class="channel-avatar" src="${c.avatar}" alt="${c.author}">
        <div class="comment-content">
          <div class="comment-author-row">
            <span class="comment-author">${c.author}</span>
            <span class="comment-timestamp">${c.timestamp || 'Recently'}</span>
          </div>
          <div class="comment-body">${c.text}</div>
          <div class="comment-feedback-row">
            <button class="btn-comment-action btn-like-comment">
              <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: currentColor;"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>
              <span class="comment-like-count">${c.likes || 0}</span>
            </button>
            <button class="btn-comment-action btn-reply-comment" data-id="${c.id}">Reply</button>
          </div>

          <!-- Nested Replies List -->
          ${c.replies && c.replies.length > 0 ? `
            <div style="margin-top: 10px; border-left: 2px solid var(--border-subtle); padding-left: 14px; display: flex; flex-direction: column; gap: 10px;">
              ${c.replies.map(r => `
                <div style="display: flex; gap: 10px;">
                  <img class="channel-avatar" style="width: 28px; height: 28px;" src="${r.avatar}">
                  <div>
                    <div style="font-size: 12px; font-weight: 700;">${r.author} <span style="font-size: 11px; color: var(--text-muted);">${r.timestamp || 'Recently'}</span></div>
                    <div style="font-size: 13px; color: var(--text-primary); margin-top: 2px;">${r.text}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <!-- Inline Reply Input (Hidden by default) -->
          <div class="reply-input-row" id="reply-input-${c.id}" style="display: none; margin-top: 10px; gap: 8px;">
            <input type="text" class="form-input" style="flex: 1; padding: 6px 12px; font-size: 13px;" placeholder="Write a reply...">
            <button class="btn-primary btn-submit-reply" data-id="${c.id}" style="padding: 6px 14px; font-size: 12px;">Reply</button>
          </div>
        </div>
      `;

      // Like comment button
      const likeCommentBtn = item.querySelector('.btn-like-comment');
      if (likeCommentBtn) {
        likeCommentBtn.onclick = () => {
          c.likes = (c.likes || 0) + 1;
          const countSpan = likeCommentBtn.querySelector('.comment-like-count');
          if (countSpan) countSpan.textContent = c.likes;
          soundFX.playLikeSound();
        };
      }

      // Toggle inline reply
      const replyBtn = item.querySelector('.btn-reply-comment');
      const replyRow = item.querySelector(`#reply-input-${c.id}`);
      if (replyBtn && replyRow) {
        replyBtn.onclick = () => {
          replyRow.style.display = replyRow.style.display === 'none' ? 'flex' : 'none';
          if (replyRow.style.display === 'flex') {
            replyRow.querySelector('input').focus();
          }
        };

        const submitReplyBtn = replyRow.querySelector('.btn-submit-reply');
        const replyInput = replyRow.querySelector('input');
        if (submitReplyBtn && replyInput) {
          submitReplyBtn.onclick = () => {
            const replyText = replyInput.value.trim();
            if (!replyText) return;
            storage.addComment(video.id, replyText, false, c.id);
            soundFX.playCommentSound();
            const updated = storage.getYoutubeVideoById(video.id);
            this.renderWatchComments(updated);
            this.showToast('Reply submitted! 💬');
          };
        }
      }

      commentsListEl.appendChild(item);
    });

    // Add top-level comment
    if (submitBtn && commentInput) {
      submitBtn.onclick = () => {
        const text = commentInput.value.trim();
        if (!text) return;
        storage.addComment(video.id, text, false);
        commentInput.value = '';
        soundFX.playCommentSound();
        const updated = storage.getYoutubeVideoById(video.id);
        this.renderWatchComments(updated);
        this.showToast('Comment posted! 💬');
      };
    }
    if (cancelBtn && commentInput) {
      cancelBtn.onclick = () => { commentInput.value = ''; };
    }
  }

  renderRelatedVideos(currentVideoId) {
    const relatedContainer = document.getElementById('watch-related-list');
    if (!relatedContainer) return;

    const allVideos = storage.getYoutubeVideos();
    const related = allVideos.filter(v => v.id !== currentVideoId);

    relatedContainer.innerHTML = related.map(v => `
      <div class="related-card" data-video-id="${v.id}">
        <div class="related-thumbnail-wrapper">
          <img class="related-thumbnail" src="${v.thumbnail}" alt="${v.title}">
          <span class="badge-duration" style="font-size: 10px; padding: 2px 4px;">${v.duration}</span>
        </div>
        <div class="related-info">
          <h4 class="related-title">${v.title}</h4>
          <span class="related-channel">${v.channel.name}</span>
          <span class="related-views">${v.views}</span>
        </div>
      </div>
    `).join('');

    relatedContainer.querySelectorAll('.related-card').forEach(card => {
      card.addEventListener('click', () => {
        soundFX.playSwitchSound();
        this.navigateToWatch(card.dataset.videoId);
      });
    });
  }

  renderLibraryView() {
    const libraryContainer = this.views.library;
    if (!libraryContainer) return;

    const likedIds = storage.getLikedIds();
    const bookmarkIds = storage.getBookmarkedIds();
    const historyIds = storage.getHistoryIds();
    const allVideos = storage.getYoutubeVideos();

    const likedVideos = allVideos.filter(v => likedIds.includes(v.id));
    const bookmarkedVideos = allVideos.filter(v => bookmarkIds.includes(v.id));
    const historyVideos = allVideos.filter(v => historyIds.includes(v.id));

    libraryContainer.innerHTML = `
      <div style="padding: 24px 32px; max-width: 1400px; margin: 0 auto;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px;">
          <h2 style="font-size: 24px; font-weight: 800; display: flex; align-items: center; gap: 10px;">
            <svg viewBox="0 0 24 24" style="width: 28px; height: 28px; fill: var(--tt-pink);">
              <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"/>
            </svg>
            Your Library & Saved Videos
          </h2>

          <button id="btn-clear-history" class="btn-secondary" style="font-size: 13px;">
            🗑️ Clear Watch History
          </button>
        </div>

        <!-- Watch History -->
        <div style="margin-bottom: 36px;">
          <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 16px;">
            🕒 Watch History (${historyVideos.length})
          </h3>
          ${historyVideos.length === 0 ? `
            <p style="color: var(--text-muted);">No watch history yet. Watch some videos to populate!</p>
          ` : `
            <div class="video-grid" style="margin-top: 0;">
              ${historyVideos.map(v => this.youtubeFeed.createVideoCardHTML(v)).join('')}
            </div>
          `}
        </div>

        <!-- Liked Videos -->
        <div style="margin-bottom: 36px;">
          <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 16px;">
            ❤️ Liked Videos (${likedVideos.length})
          </h3>
          ${likedVideos.length === 0 ? `
            <p style="color: var(--text-muted);">You haven't liked any videos yet.</p>
          ` : `
            <div class="video-grid" style="margin-top: 0;">
              ${likedVideos.map(v => this.youtubeFeed.createVideoCardHTML(v)).join('')}
            </div>
          `}
        </div>

        <!-- Watch Later / Saved -->
        <div style="margin-bottom: 36px;">
          <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 16px;">
            ⏱️ Watch Later & Bookmarks (${bookmarkedVideos.length})
          </h3>
          ${bookmarkedVideos.length === 0 ? `
            <p style="color: var(--text-muted);">No videos saved in Watch Later.</p>
          ` : `
            <div class="video-grid" style="margin-top: 0;">
              ${bookmarkedVideos.map(v => this.youtubeFeed.createVideoCardHTML(v)).join('')}
            </div>
          `}
        </div>
      </div>
    `;

    // Bind card clicks in library
    libraryContainer.querySelectorAll('.video-card').forEach(card => {
      card.addEventListener('click', () => {
        soundFX.playSwitchSound();
        this.navigateToWatch(card.dataset.videoId);
      });
    });

    // Clear history button binding
    const clearHistoryBtn = document.getElementById('btn-clear-history');
    if (clearHistoryBtn) {
      clearHistoryBtn.addEventListener('click', () => {
        storage.clearHistory();
        soundFX.playNotificationSound();
        this.renderLibraryView();
        this.showToast('Watch history cleared! 🗑️');
      });
    }
  }

  // Voice Search Listening Simulation / Speech API
  openVoiceSearchModal() {
    if (!this.voiceModalEl) return;
    this.voiceModalEl.classList.add('open');
    soundFX.playNotificationSound();

    const statusText = document.getElementById('voice-status-text');
    if (statusText) statusText.textContent = 'Listening for speech...';

    // Preset quick speech simulation buttons
    this.voiceModalEl.querySelectorAll('.voice-preset-btn').forEach(btn => {
      btn.onclick = () => {
        const query = btn.dataset.query;
        if (statusText) statusText.textContent = `Heard: "${query}"!`;
        soundFX.playLikeSound();
        setTimeout(() => {
          this.voiceModalEl.classList.remove('open');
          if (this.searchInput) this.searchInput.value = query;
          this.showView('tube');
          this.youtubeFeed.render(query);
          this.showToast(`Voice search results for "${query}" 🎙️`);
        }, 600);
      };
    });
  }

  // User Profile Editor Modal
  openProfileModal() {
    if (!this.profileModalEl) return;
    const user = storage.getCurrentUser();
    const ytVideos = storage.getYoutubeVideos();
    const reels = storage.getTiktokReels();
    const totalVids = ytVideos.length + reels.length;

    const nameEl = document.getElementById('profile-modal-name');
    const handleEl = document.getElementById('profile-modal-handle');
    const followersEl = document.getElementById('profile-stat-followers');
    const likesEl = document.getElementById('profile-stat-likes');
    const vidsEl = document.getElementById('profile-stat-videos');

    const inputName = document.getElementById('input-edit-profile-name');
    const inputHandle = document.getElementById('input-edit-profile-handle');
    const inputBio = document.getElementById('input-edit-profile-bio');

    if (nameEl) nameEl.textContent = user.name;
    if (handleEl) handleEl.textContent = user.handle;
    if (followersEl) followersEl.textContent = (user.followers || 1240).toLocaleString();
    if (likesEl) likesEl.textContent = user.totalLikes || "48.5K";
    if (vidsEl) vidsEl.textContent = totalVids;

    if (inputName) inputName.value = user.name;
    if (inputHandle) inputHandle.value = user.handle;
    if (inputBio) inputBio.value = user.bio || '';

    this.profileModalEl.classList.add('open');
  }

  updateHeaderProfile() {
    const user = storage.getCurrentUser();
    if (this.headerUserAvatar) {
      this.headerUserAvatar.textContent = user.name.charAt(0).toUpperCase();
    }
  }

  // Sound Details Modal
  openSoundModal(soundTitle) {
    if (!this.soundDetailsModalEl) return;
    const sound = storage.getSoundByTitle(soundTitle);

    const titleEl = document.getElementById('sound-modal-title');
    const artistEl = document.getElementById('sound-modal-artist');
    const countEl = document.getElementById('sound-modal-count');
    const artEl = document.getElementById('sound-modal-art');
    const useBtn = document.getElementById('btn-use-this-sound');
    const reelsGrid = document.getElementById('sound-modal-reels-grid');

    if (titleEl) titleEl.textContent = sound.title;
    if (artistEl) artistEl.textContent = sound.artist;
    if (countEl) countEl.textContent = `${sound.videosCount || '10K'} videos using this audio`;
    if (artEl && sound.thumbnail) {
      artEl.style.backgroundImage = `url('${sound.thumbnail}')`;
    }
    if (useBtn) useBtn.dataset.soundTitle = sound.title;

    // Show reels using this sound
    const allReels = storage.getTiktokReels();
    if (reelsGrid) {
      reelsGrid.innerHTML = allReels.slice(0, 3).map(r => `
        <div class="short-card" style="cursor: pointer;" onclick="window.tokApp.showView('tok')">
          <div class="short-thumbnail-wrapper" style="aspect-ratio: 9/14;">
            <img class="short-thumbnail" src="${r.thumbnail}">
            <span class="badge badge-tok short-badge" style="font-size: 9px;">TOK</span>
          </div>
          <div style="font-size: 11px; font-weight: 600; margin-top: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${r.title}</div>
        </div>
      `).join('');
    }

    soundFX.playNotificationSound();
    this.soundDetailsModalEl.classList.add('open');
  }

  // Notifications List Dropdown Rendering
  renderNotificationsList() {
    const listEl = document.getElementById('notif-list');
    if (!listEl) return;
    const notifs = storage.getNotifications();

    listEl.innerHTML = notifs.map(n => `
      <div class="notif-item ${n.read ? '' : 'unread'}" data-id="${n.id}" data-video-id="${n.videoId || ''}">
        <img class="notif-avatar" src="${n.avatar}" alt="Notification avatar">
        <div class="notif-content">
          <span class="notif-item-title">${n.title}</span>
          <span class="notif-item-text">${n.text}</span>
          <span class="notif-item-time">${n.time}</span>
        </div>
      </div>
    `).join('');

    listEl.querySelectorAll('.notif-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.id;
        const videoId = item.dataset.videoId;
        storage.markNotificationRead(id);
        this.updateNotificationBadge();
        if (this.notifDropdown) this.notifDropdown.classList.remove('open');
        if (videoId) {
          this.navigateToWatch(videoId);
        }
      });
    });
  }

  updateNotificationBadge() {
    const unread = storage.getUnreadNotificationCount();
    if (this.notifBadge) {
      this.notifBadge.textContent = unread;
      this.notifBadge.style.display = unread > 0 ? 'flex' : 'none';
    }
  }

  openUploadModal(type = 'tok') {
    this.creatorStudio.open(type);
  }

  openShareModal(id, title) {
    if (!this.shareModalEl) return;
    const urlInput = document.getElementById('share-link-input');
    if (urlInput) {
      urlInput.value = `${window.location.origin}${window.location.pathname}#video=${id}`;
    }
    const titleEl = document.getElementById('share-dialog-title');
    if (titleEl) titleEl.textContent = `Share "${title}"`;

    const embedBox = document.getElementById('embed-code-box');
    if (embedBox) embedBox.style.display = 'none';

    this.shareModalEl.classList.add('open');
  }

  closeShareModal() {
    if (this.shareModalEl) {
      this.shareModalEl.classList.remove('open');
    }
  }

  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: var(--tt-pink);"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
      <span>${message}</span>
    `;
    this.toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
  }

  formatNumber(num) {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  }
}

// Global instantiation
window.addEventListener('DOMContentLoaded', () => {
  window.tokApp = new TokTubeApp();
});
