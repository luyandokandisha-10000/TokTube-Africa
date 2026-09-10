document.addEventListener('DOMContentLoaded', () => {
  const viewport = document.getElementById('toks-viewport');
  if (!viewport) return;

  const reels = storage.getTiktokReels();
  let currentIndex = 0;
  let activeVideoEl = null;

  function renderReels() {
    viewport.innerHTML = reels.map((reel, idx) => {
      const isLiked = storage.isLiked(reel.id);
      const isFollowed = storage.isSubscribed(reel.creator.id);
      const likesCount = (reel.likes || 0).toLocaleString();
      const commentsCount = reel.commentsCount || reel.comments?.length || 0;
      const safeVideoSrc = reel.videoUrl || "https://vjs.zencdn.net/v/oceans.mp4";

      return `
        <div class="tok-reel" data-index="${idx}" data-id="${reel.id}">
          <div class="tok-stage">
            <video class="tok-video-el" data-reel-id="${reel.id}" poster="${reel.thumbnail || ''}" loop playsinline preload="${idx < 2 ? 'auto' : 'none'}" src="${safeVideoSrc}"></video>

            <!-- Volume Control Overlay for Shorts -->
            <div class="tok-volume-overlay" onclick="event.stopPropagation();" style="position: absolute; top: 16px; left: 16px; z-index: 25; display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.65); backdrop-filter: blur(8px); padding: 6px 12px; border-radius: var(--radius-full); border: 1px solid rgba(255,255,255,0.2);">
              <span class="tok-vol-badge-icon" style="font-size: 15px; cursor: pointer; user-select: none;" onclick="window.toggleTokMute(this)" title="Mute/Unmute">🔊</span>
              <input type="range" class="tok-vol-range" min="0" max="1" step="0.05" value="1" oninput="window.setTokVolume(this)" style="width: 70px; height: 4px; accent-color: var(--tt-pink); cursor: pointer;" title="Adjust Volume">
            </div>

            <div class="tok-play-overlay">
              <div class="tok-play-badge" id="play-badge-${idx}">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>

            <!-- Bottom overlay with Follow button placed on top of creator name -->
            <div class="tok-bottom-overlay">
              <div class="tok-creator-header-block" style="margin-bottom: 8px;">
                <div style="display: inline-block; margin-bottom: 6px;">
                  <button class="tok-follow-btn ${isFollowed ? 'following' : ''}" onclick="event.stopPropagation(); window.toggleFollowCreator('${reel.creator.id}', this)">
                    ${isFollowed ? 'Following ✓' : '+ Follow'}
                  </button>
                </div>
                <div class="tok-creator-row">
                  <span class="tok-creator-name" onclick="window.location.href='channel.html?id=${reel.creator.id}'">${reel.creator.name}</span>
                  <span class="tok-creator-handle">${reel.creator.handle}</span>
                  ${reel.isEducational ? '<span class="badge badge-edu" style="font-size:10px;padding:2px 6px;">EduBoost</span>' : ''}
                </div>
              </div>
              <p class="tok-caption" id="caption-${reel.id}">${reel.title}</p>
              <div class="tok-translate-btn" onclick="event.stopPropagation(); window.translateCaption('${reel.id}', '${reel.title.replace(/'/g, "\\'")}')">
                🌍 Translate caption
              </div>
              <div class="tok-music-row">
                <svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:currentColor;"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                <span>${reel.musicTitle || 'Original Sound'}</span>
              </div>
            </div>

            <div class="tok-action-rail">
              <div class="tok-avatar-wrap" onclick="window.location.href='channel.html?id=${reel.creator.id}'">
                <img class="tok-avatar-img" src="${reel.creator.avatar}" alt="${reel.creator.name}">
                <div class="tok-follow-plus ${isFollowed ? 'followed' : ''}" onclick="event.stopPropagation(); window.toggleFollowCreator('${reel.creator.id}', this)">
                  ${isFollowed ? '✓' : '+'}
                </div>
              </div>

              <div class="tok-action-btn ${isLiked ? 'liked' : ''}" onclick="event.stopPropagation(); window.toggleLikeReel('${reel.id}', this)">
                <div class="tok-action-circle">
                  <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </div>
                <span class="tok-action-text" id="like-count-${reel.id}">${likesCount}</span>
              </div>

              <div class="tok-action-btn" onclick="event.stopPropagation(); window.openCommentsDrawer('${reel.id}')">
                <div class="tok-action-circle">
                  <svg viewBox="0 0 24 24"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
                </div>
                <span class="tok-action-text" id="comment-count-label-${reel.id}">${commentsCount}</span>
              </div>

              <!-- Volume Action Button -->
              <div class="tok-action-btn" onclick="event.stopPropagation(); window.toggleTokMute(this)" title="Mute/Unmute">
                <div class="tok-action-circle">
                  <span class="tok-vol-rail-icon" style="font-size:18px;">🔊</span>
                </div>
                <span class="tok-action-text tok-vol-rail-text">Vol</span>
              </div>

              <div class="tok-action-btn" onclick="event.stopPropagation(); tokShell.openTippingModal('${reel.creator.id}')">
                <div class="tok-action-circle" style="background:rgba(255,184,0,0.2); border:1px solid var(--africa-gold);">
                  <span style="font-size:18px;">☕</span>
                </div>
                <span class="tok-action-text" style="color:var(--africa-gold);">Tip</span>
              </div>

              <div class="tok-action-btn" onclick="event.stopPropagation(); tokShell.openShareModal(window.location.href, '${reel.title}')">
                <div class="tok-action-circle">
                  <svg viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"/></svg>
                </div>
                <span class="tok-action-text">${reel.shares || 120}</span>
              </div>

              <div class="tok-vinyl">
                <img src="${reel.creator.avatar}" alt="${reel.creator.name}">
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Setup video error fallback handlers to reliable public test videos
    const fallbackList = [
      "https://vjs.zencdn.net/v/oceans.mp4",
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      "https://media.w3.org/2010/05/video/movie_300.mp4",
      "https://www.w3schools.com/html/mov_bbb.mp4"
    ];

    viewport.querySelectorAll('video').forEach(async (vid, i) => {
      const reelId = vid.dataset.reelId;
      if (reelId) {
        const userBlobUrl = await storage.getVideoBlob(reelId);
        if (userBlobUrl) {
          vid.src = userBlobUrl;
        }
      }

      vid.onerror = () => {
        vid.src = fallbackList[i % fallbackList.length];
        vid.play().catch(() => {});
      };
    });

    activateReel(0);
  }

  function activateReel(idx) {
    if (idx < 0 || idx >= reels.length) return;
    currentIndex = idx;
    const targetEl = viewport.children[idx];
    if (!targetEl) return;

    viewport.querySelectorAll('video').forEach(v => {
      v.pause();
    });

    targetEl.scrollIntoView({ behavior: 'smooth' });

    const video = targetEl.querySelector('video');
    if (video) {
      activeVideoEl = video;
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }

  viewport.addEventListener('click', (e) => {
    if (e.target.closest('.tok-action-rail') || e.target.closest('.tok-bottom-overlay')) return;
    const reelEl = e.target.closest('.tok-reel');
    if (!reelEl) return;
    const idx = parseInt(reelEl.dataset.index, 10);
    const video = reelEl.querySelector('video');
    const badge = document.getElementById(`play-badge-${idx}`);

    if (video) {
      if (video.paused) {
        video.play().catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
        if (badge) badge.classList.remove('visible');
        tokShell.showToast('Playing ▶️');
      } else {
        video.pause();
        if (badge) {
          badge.classList.add('visible');
          setTimeout(() => badge.classList.remove('visible'), 1500);
        }
        tokShell.showToast('Paused ⏸️');
      }
    }
  });

  window.addEventListener('keydown', (e) => {
    if (document.getElementById('tok-comments-drawer').classList.contains('open')) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activateReel(currentIndex + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activateReel(currentIndex - 1);
    } else if (e.key === ' ') {
      e.preventDefault();
      if (activeVideoEl) {
        activeVideoEl.paused ? activeVideoEl.play() : activeVideoEl.pause();
      }
    } else if (e.key.toLowerCase() === 'm') {
      window.toggleTokMute(activeVideoEl || document);
    }
  });

  window.setTokVolume = function(rangeEl) {
    const val = parseFloat(rangeEl.value);
    const reel = rangeEl.closest('.tok-reel');
    const vid = reel?.querySelector('video') || activeVideoEl;
    if (vid) {
      vid.volume = val;
      vid.muted = val === 0;
    }
    // Synchronize across all videos in toks feed
    viewport.querySelectorAll('video').forEach(v => {
      v.volume = val;
      v.muted = val === 0;
    });
    viewport.querySelectorAll('.tok-vol-range').forEach(r => {
      r.value = val;
    });
    const iconChar = val === 0 ? '🔇' : (val < 0.5 ? '🔉' : '🔊');
    viewport.querySelectorAll('.tok-vol-badge-icon').forEach(icon => {
      icon.textContent = iconChar;
    });
    viewport.querySelectorAll('.tok-vol-rail-icon').forEach(icon => {
      icon.textContent = iconChar;
    });
  };

  window.toggleTokMute = function(target) {
    const reel = target?.closest ? target.closest('.tok-reel') : target;
    const vid = reel?.querySelector ? reel.querySelector('video') : (activeVideoEl || viewport.querySelector('video'));
    if (!vid) return;
    const isMuted = vid.muted || vid.volume === 0;
    const newVol = isMuted ? 0.8 : 0;
    vid.muted = !isMuted;
    vid.volume = newVol;

    viewport.querySelectorAll('video').forEach(v => {
      v.muted = !isMuted;
      v.volume = newVol;
    });
    viewport.querySelectorAll('.tok-vol-range').forEach(r => {
      r.value = newVol;
    });
    const iconChar = isMuted ? '🔊' : '🔇';
    viewport.querySelectorAll('.tok-vol-badge-icon').forEach(icon => {
      icon.textContent = iconChar;
    });
    viewport.querySelectorAll('.tok-vol-rail-icon').forEach(icon => {
      icon.textContent = iconChar;
    });
    tokShell.showToast(isMuted ? 'Volume on 🔊' : 'Muted 🔇');
  };

  document.getElementById('btn-tok-prev')?.addEventListener('click', () => activateReel(currentIndex - 1));
  document.getElementById('btn-tok-next')?.addEventListener('click', () => activateReel(currentIndex + 1));

  window.toggleLikeReel = function(reelId, btn) {
    soundFX.playLikeSound();
    const nowLiked = storage.toggleLike(reelId);
    btn.classList.toggle('liked', nowLiked);
    const countEl = document.getElementById(`like-count-${reelId}`);
    if (countEl) {
      const reel = reels.find(r => r.id === reelId);
      const base = reel ? (reel.likes || 0) : 0;
      countEl.textContent = (nowLiked ? base + 1 : base).toLocaleString();
    }
    tokShell.showToast(nowLiked ? 'Liked Tok! ❤️' : 'Unliked');
  };

  window.toggleFollowCreator = function(creatorId, btn) {
    soundFX.playSubscribeSound();
    const nowFollowing = storage.toggleSubscribe(creatorId);
    
    document.querySelectorAll(`.tok-follow-btn`).forEach(b => {
      const parentReel = b.closest('.tok-reel');
      if (parentReel) {
        const r = reels[parseInt(parentReel.dataset.index, 10)];
        if (r && r.creator.id === creatorId) {
          b.textContent = nowFollowing ? 'Following ✓' : '+ Follow';
          b.classList.toggle('following', nowFollowing);
        }
      }
    });

    document.querySelectorAll(`.tok-follow-plus`).forEach(p => {
      const parentReel = p.closest('.tok-reel');
      if (parentReel) {
        const r = reels[parseInt(parentReel.dataset.index, 10)];
        if (r && r.creator.id === creatorId) {
          p.textContent = nowFollowing ? '✓' : '+';
          p.classList.toggle('followed', nowFollowing);
        }
      }
    });

    tokShell.showToast(nowFollowing ? 'Following creator! 🌟' : 'Unfollowed creator');
  };

  window.translateCaption = function(id, text) {
    const el = document.getElementById(`caption-${id}`);
    if (el) {
      soundFX.playNotificationSound();
      el.textContent = i18n.translateContent(text);
      tokShell.showToast(i18n.t('translated_by'));
    }
  };

  /* ──────────────── TIKTOK-STYLED COMMENTS & THREADED REPLIES ──────────────── */
  const commentsDrawer = document.getElementById('tok-comments-drawer');
  const commentsList = document.getElementById('drawer-comments-list');
  const commentInput = document.getElementById('drawer-comment-input');
  const commentSend = document.getElementById('btn-drawer-send');
  const closeBtn = document.getElementById('btn-close-comments');
  const replyingToBanner = document.getElementById('replying-banner');
  const replyingToText = document.getElementById('replying-to-user');
  const cancelReplyBtn = document.getElementById('btn-cancel-reply');

  let currentCommentReelId = null;
  let activeReplyParentId = null;
  let activeReplyAuthor = null;

  function loadReelComments(reelId) {
    let stored = [];
    try {
      stored = JSON.parse(localStorage.getItem(`toktube_comments_${reelId}`)) || [];
    } catch(e) {
      stored = [];
    }
    const reel = reels.find(r => r.id === reelId);
    const defaults = (reel && reel.comments) ? reel.comments.map(c => ({
      id: c.id,
      author: c.author,
      text: c.text,
      avatar: c.avatar || '',
      likes: c.likes || 12,
      time: c.time || '1d ago',
      replies: c.replies || []
    })) : [
      { id: 'c1', author: 'Kwame_Dev', text: 'Brilliant Tok! Loving TokTube Africa 🇬🇭', likes: 34, time: '2h ago', replies: [
        { id: 'r1', author: 'Amina_Tech', text: 'Thank you Kwame! More STEM drops coming! 🌱', likes: 14, time: '1h ago' }
      ]},
      { id: 'c2', author: 'Zola_Cape', text: 'Awesome engineering breakdown. Clean energy across Africa! ⚡', likes: 19, time: '4h ago', replies: [] }
    ];

    return [...defaults, ...stored];
  }

  function renderCommentsUI() {
    if (!currentCommentReelId) return;
    const comments = loadReelComments(currentCommentReelId);

    commentsList.innerHTML = comments.map(c => `
      <div class="tiktok-comment-node" id="node-${c.id}" style="padding: 12px 0; border-bottom: 1px solid #222;">
        <div style="display:flex; gap:12px; align-items:flex-start;">
          <div class="user-avatar" style="width:34px; height:34px; font-size:13px; flex-shrink:0;">
            ${c.avatar ? `<img src="${c.avatar}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">` : (c.author ? c.author.charAt(0).toUpperCase() : 'U')}
          </div>
          <div style="flex:1;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:13px; font-weight:700; color:#fff;">${c.author}</span>
              <span style="font-size:11px; color:#777;">${c.time || 'Just now'}</span>
            </div>
            <p style="font-size:13px; margin-top:4px; line-height:1.4; color:#eee;">${c.text}</p>
            <div style="display:flex; align-items:center; gap:16px; margin-top:6px; font-size:12px; color:#888;">
              <span style="cursor:pointer; font-weight:700; color:var(--tt-pink);" onclick="window.startReplyTo('${c.id}', '${c.author.replace(/'/g, "\\'")}')">Reply</span>
              <span style="cursor:pointer; display:flex; align-items:center; gap:4px;" onclick="window.likeComment('${c.id}', this)">
                ❤️ <span class="c-like-val">${c.likes || 0}</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Threaded Replies -->
        ${(c.replies && c.replies.length > 0) ? `
          <div class="comment-replies-thread" style="margin-left: 46px; margin-top: 8px; border-left: 2px solid #333; padding-left: 12px; display:flex; flex-direction:column; gap:10px;">
            ${c.replies.map(r => `
              <div style="display:flex; gap:8px; align-items:flex-start;">
                <div class="user-avatar" style="width:26px; height:26px; font-size:11px; flex-shrink:0;">
                  ${r.avatar ? `<img src="${r.avatar}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">` : (r.author ? r.author.charAt(0).toUpperCase() : 'U')}
                </div>
                <div style="flex:1;">
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size:12px; font-weight:700; color:#ddd;">${r.author}</span>
                    <span style="font-size:10px; color:#777;">${r.time || 'Just now'}</span>
                  </div>
                  <p style="font-size:12px; margin-top:2px; color:#ccc; line-height:1.35;">${r.text}</p>
                  <span style="cursor:pointer; font-size:11px; font-weight:700; color:var(--tt-cyan); margin-top:2px; display:inline-block;" onclick="window.startReplyTo('${c.id}', '${r.author.replace(/'/g, "\\'")}')">Reply</span>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `).join('');
  }

  window.openCommentsDrawer = function(reelId) {
    currentCommentReelId = reelId;
    window.cancelReply();
    renderCommentsUI();
    commentsDrawer.classList.add('open');
    soundFX.playSwitchSound();
  };

  closeBtn?.addEventListener('click', () => {
    commentsDrawer.classList.remove('open');
    window.cancelReply();
  });

  window.startReplyTo = function(parentId, author) {
    activeReplyParentId = parentId;
    activeReplyAuthor = author;
    if (replyingToBanner && replyingToText) {
      replyingToText.textContent = `@${author}`;
      replyingToBanner.style.display = 'flex';
    }
    if (commentInput) {
      commentInput.placeholder = `Replying to @${author}...`;
      commentInput.focus();
    }
  };

  window.cancelReply = function() {
    activeReplyParentId = null;
    activeReplyAuthor = null;
    if (replyingToBanner) replyingToBanner.style.display = 'none';
    if (commentInput) commentInput.placeholder = 'Add a TikTok comment...';
  };

  cancelReplyBtn?.addEventListener('click', window.cancelReply);

  window.likeComment = function(commentId, el) {
    soundFX.playLikeSound();
    const valEl = el.querySelector('.c-like-val');
    if (valEl) {
      valEl.textContent = (parseInt(valEl.textContent, 10) || 0) + 1;
    }
  };

  if (commentSend && commentInput) {
    const postCommentOrReply = () => {
      const text = commentInput.value.trim();
      if (!text || !currentCommentReelId) return;
      const user = storage.getUserProfile();

      let stored = [];
      try {
        stored = JSON.parse(localStorage.getItem(`toktube_comments_${currentCommentReelId}`)) || [];
      } catch(e) {
        stored = [];
      }

      if (activeReplyParentId) {
        // Find parent in stored, or create entry in stored
        let parent = stored.find(c => c.id === activeReplyParentId);
        if (!parent) {
          // If parent is a default comment, copy into stored
          const all = loadReelComments(currentCommentReelId);
          const found = all.find(c => c.id === activeReplyParentId);
          if (found) {
            parent = JSON.parse(JSON.stringify(found));
            stored.push(parent);
          }
        }
        if (parent) {
          if (!parent.replies) parent.replies = [];
          parent.replies.push({
            id: 'r_' + Date.now(),
            author: user.name,
            text: `@${activeReplyAuthor} ${text}`,
            avatar: user.avatarUrl || '',
            time: 'Just now'
          });
        }
        tokShell.showToast(`Replied to @${activeReplyAuthor}! 💬`);
      } else {
        // Root comment
        stored.push({
          id: 'c_' + Date.now(),
          author: user.name,
          text: text,
          avatar: user.avatarUrl || '',
          likes: 0,
          time: 'Just now',
          replies: []
        });
        tokShell.showToast('Comment posted! 💬');
      }

      localStorage.setItem(`toktube_comments_${currentCommentReelId}`, JSON.stringify(stored));

      // Update count on action button
      const countEl = document.getElementById(`comment-count-label-${currentCommentReelId}`);
      if (countEl) {
        const cur = parseInt(countEl.textContent, 10) || 0;
        countEl.textContent = cur + 1;
      }

      commentInput.value = '';
      window.cancelReply();
      renderCommentsUI();
      commentsList.scrollTop = commentsList.scrollHeight;
      soundFX.playSubscribeSound();
    };

    commentSend.addEventListener('click', postCommentOrReply);
    commentInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        postCommentOrReply();
      }
    });
  }

  renderReels();
});
