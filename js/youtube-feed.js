/**
 * TokTube - YouTube Feed Controller
 * Features: Category filtering, Subscribed-only channel feed filtering,
 * hover preview video player, and Shorts/Toks cross-pollination shelf.
 */

import { storage } from './storage.js';
import { soundFX } from './sound-effects.js';

export class YouTubeFeed {
  constructor(container, onNavigateToWatch, onNavigateToTok) {
    this.container = container;
    this.onNavigateToWatch = onNavigateToWatch;
    this.onNavigateToTok = onNavigateToTok;
    this.currentCategory = 'All';
    this.categories = ['All', 'Tech', 'Nature', 'Music', 'Gaming', 'Food', 'Subscribed'];
    this.searchQuery = '';
  }

  render(filterQuery = '') {
    this.searchQuery = filterQuery;
    const allVideos = storage.getYoutubeVideos();
    const reels = storage.getTiktokReels();
    const subbedChannelIds = storage.getSubscribedChannelIds();

    // Filter videos based on category and search
    const filteredVideos = allVideos.filter(video => {
      let matchesCategory = true;
      if (this.currentCategory === 'Subscribed') {
        matchesCategory = subbedChannelIds.includes(video.channel.id);
      } else if (this.currentCategory !== 'All') {
        matchesCategory = (video.category === this.currentCategory);
      }

      const matchesSearch = !this.searchQuery || 
        video.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        video.channel.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        (video.category && video.category.toLowerCase().includes(this.searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });

    this.container.innerHTML = `
      <!-- Category Filter Chips Bar -->
      <div class="category-chips-bar">
        ${this.categories.map(cat => `
          <button class="category-chip ${this.currentCategory === cat ? 'active' : ''}" data-category="${cat}">
            ${cat === 'Subscribed' ? '★ Subscribed' : cat}
          </button>
        `).join('')}
      </div>

      <!-- Main Video Grid -->
      <div class="video-grid">
        ${filteredVideos.length === 0 ? `
          <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-secondary);">
            <p style="font-size: 18px; margin-bottom: 8px;">No videos found for "${this.currentCategory}"</p>
            <p style="font-size: 13px; color: var(--text-muted);">Try selecting "All" or searching for another keyword.</p>
          </div>
        ` : `
          ${filteredVideos.slice(0, 3).map(video => this.createVideoCardHTML(video)).join('')}

          <!-- Integrated Toks/Shorts Shelf (Hybrid Bridge) -->
          ${reels.length > 0 && !this.searchQuery && this.currentCategory === 'All' ? this.createShortsShelfHTML(reels) : ''}

          <!-- Remaining Videos -->
          ${filteredVideos.slice(3).map(video => this.createVideoCardHTML(video)).join('')}
        `}
      </div>
    `;

    this.bindEvents();
  }

  createVideoCardHTML(video) {
    return `
      <div class="video-card" data-video-id="${video.id}">
        <div class="video-thumbnail-wrapper">
          <img class="video-thumbnail" src="${video.thumbnail}" alt="${video.title}" loading="lazy">
          <video class="video-preview-player" src="${video.videoUrl}" muted loop preload="none"></video>
          <span class="badge-duration">${video.duration}</span>
        </div>
        <div class="video-info-row">
          <img class="channel-avatar" src="${video.channel.avatar}" alt="${video.channel.name}" style="cursor: pointer;" onclick="event.stopPropagation(); window.location.href='channel.html?id=${video.channel.id}'">
          <div class="video-meta">
            <h3 class="video-title" title="${video.title}">${video.title}</h3>
            <div class="channel-name-row" style="cursor: pointer;" onclick="event.stopPropagation(); window.location.href='channel.html?id=${video.channel.id}'">
              <span>${video.channel.name}</span>
              ${video.channel.verified ? `
                <svg class="verified-icon" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              ` : ''}
            </div>
            <div class="video-stats">
              <span>${video.views}</span>
              <span>•</span>
              <span>${video.uploadDate}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  createShortsShelfHTML(reels) {
    return `
      <div class="shorts-shelf-container">
        <div class="shorts-shelf-header">
          <div class="shorts-shelf-title">
            <svg viewBox="0 0 24 24">
              <path d="M17.77 10.32l-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zM10 14.5v-5l4.5 2.5-4.5 2.5z"/>
            </svg>
            <span>Trending Toks</span>
          </div>
          <button class="btn-secondary" id="btn-view-all-toks" style="font-size: 13px; padding: 6px 14px;">
            Open Tok Feed →
          </button>
        </div>
        <div class="shorts-shelf-grid">
          ${reels.slice(0, 5).map(reel => `
            <div class="short-card" data-reel-id="${reel.id}">
              <div class="short-thumbnail-wrapper">
                <img class="short-thumbnail" src="${reel.thumbnail}" alt="${reel.title}">
                <span class="badge badge-tok short-badge">TOK</span>
              </div>
              <div class="short-meta">
                <h4 class="short-title">${reel.title}</h4>
                <div class="short-views">${this.formatNumber(reel.likes)} likes</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Category Chips
    const chips = this.container.querySelectorAll('.category-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        soundFX.playSwitchSound();
        this.currentCategory = chip.dataset.category;
        this.render(this.searchQuery);
      });
    });

    // Video Card Clicks -> Open YouTube Watch Page
    const videoCards = this.container.querySelectorAll('.video-card');
    videoCards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.videoId;
        if (this.onNavigateToWatch) {
          this.onNavigateToWatch(id);
        }
      });

      // Hover live preview video player
      const previewVideo = card.querySelector('.video-preview-player');
      if (previewVideo) {
        let hoverTimeout;
        card.addEventListener('mouseenter', () => {
          hoverTimeout = setTimeout(() => {
            previewVideo.play().catch(() => {});
          }, 350);
        });

        card.addEventListener('mouseleave', () => {
          clearTimeout(hoverTimeout);
          previewVideo.pause();
          previewVideo.currentTime = 0;
        });
      }
    });

    // Shorts Shelf Items
    const shortCards = this.container.querySelectorAll('.short-card');
    shortCards.forEach(card => {
      card.addEventListener('click', () => {
        const reelId = card.dataset.reelId;
        if (this.onNavigateToTok) {
          this.onNavigateToTok(reelId);
        }
      });
    });

    const viewAllBtn = this.container.querySelector('#btn-view-all-toks');
    if (viewAllBtn) {
      viewAllBtn.addEventListener('click', () => {
        if (this.onNavigateToTok) {
          this.onNavigateToTok();
        }
      });
    }
  }

  setCategory(category) {
    this.currentCategory = category;
    this.render(this.searchQuery);
  }

  formatNumber(num) {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  }
}
