/**
 * TokTube - Creator Studio Upload Modal
 * Allows creators to upload local videos or select sample presets,
 * configure formats (Vertical Tok 9:16 vs Horizontal Tube 16:9),
 * add titles/captions/tags, preview in real-time, and publish.
 */

import { storage } from './storage.js';
import { INITIAL_DATA } from './data.js';

export class CreatorStudio {
  constructor(modalBackdrop, onUploadSuccess) {
    this.modal = modalBackdrop;
    this.onUploadSuccess = onUploadSuccess;
    this.selectedType = 'tok'; // default
    this.selectedVideoUrl = '';
    this.selectedPosterUrl = '';

    this.initElements();
    this.bindEvents();
  }

  initElements() {
    this.typeCards = this.modal.querySelectorAll('.type-choice-card');
    this.dropzone = this.modal.querySelector('#upload-dropzone');
    this.fileInput = this.modal.querySelector('#file-upload-input');
    this.previewContainer = this.modal.querySelector('#upload-preview-container');
    this.previewVideo = this.modal.querySelector('#upload-preview-video');
    this.presetsContainer = this.modal.querySelector('#presets-chips-container');
    this.titleInput = this.modal.querySelector('#upload-title-input');
    this.descInput = this.modal.querySelector('#upload-desc-input');
    this.categorySelect = this.modal.querySelector('#upload-category-select');
    this.soundInput = this.modal.querySelector('#upload-sound-input');
    this.publishBtn = this.modal.querySelector('#btn-publish-video');
    this.closeBtn = this.modal.querySelector('.modal-close-btn');
    this.cancelBtn = this.modal.querySelector('#btn-cancel-upload');
  }

  bindEvents() {
    // Format Selection (Vertical Tok vs Horizontal Tube)
    this.typeCards.forEach(card => {
      card.addEventListener('click', () => {
        this.typeCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.selectedType = card.dataset.type;
        this.renderPresets();
      });
    });

    // File Input / Dropzone
    if (this.dropzone && this.fileInput) {
      this.dropzone.addEventListener('click', () => this.fileInput.click());
      this.fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const objectUrl = URL.createObjectURL(file);
          this.setVideoSource(objectUrl, 'Local Video: ' + file.name);
        }
      });

      // Drag & Drop
      this.dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        this.dropzone.style.borderColor = 'var(--tt-pink)';
      });
      this.dropzone.addEventListener('dragleave', () => {
        this.dropzone.style.borderColor = 'var(--border-subtle)';
      });
      this.dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        this.dropzone.style.borderColor = 'var(--border-subtle)';
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          const file = e.dataTransfer.files[0];
          const objectUrl = URL.createObjectURL(file);
          this.setVideoSource(objectUrl, 'Local Video: ' + file.name);
        }
      });
    }

    // Modal Close
    if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());
    if (this.cancelBtn) this.cancelBtn.addEventListener('click', () => this.close());

    // Publish
    if (this.publishBtn) {
      this.publishBtn.addEventListener('click', () => this.handlePublish());
    }

    this.renderPresets();
  }

  renderPresets() {
    if (!this.presetsContainer) return;
    this.presetsContainer.innerHTML = '';

    INITIAL_DATA.samplePresets.forEach((preset, idx) => {
      const chip = document.createElement('button');
      chip.className = `preset-chip ${idx === 0 && !this.selectedVideoUrl ? 'active' : ''}`;
      chip.textContent = `${preset.name} (${preset.type.toUpperCase()})`;
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        this.presetsContainer.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.selectedType = preset.type;
        this.updateTypeCardSelection(preset.type);
        if (this.categorySelect) this.categorySelect.value = preset.category;
        if (this.soundInput) this.soundInput.value = preset.sound;
        this.setVideoSource(preset.url, preset.name);
      });
      this.presetsContainer.appendChild(chip);
    });

    // Default select first preset if empty
    if (!this.selectedVideoUrl && INITIAL_DATA.samplePresets.length > 0) {
      const first = INITIAL_DATA.samplePresets[0];
      this.setVideoSource(first.url, first.name);
    }
  }

  updateTypeCardSelection(type) {
    this.typeCards.forEach(card => {
      card.classList.toggle('selected', card.dataset.type === type);
    });
  }

  setVideoSource(url, label) {
    this.selectedVideoUrl = url;
    if (this.previewContainer && this.previewVideo) {
      this.previewContainer.style.display = 'block';
      this.previewVideo.src = url;
      this.previewVideo.play().catch(() => {});
    }
    if (this.dropzone) {
      const titleSpan = this.dropzone.querySelector('span');
      if (titleSpan) titleSpan.textContent = label || 'Video ready';
    }
  }

  open(preferredType = 'tok') {
    this.selectedType = preferredType;
    this.updateTypeCardSelection(preferredType);
    this.modal.classList.add('open');
  }

  close() {
    this.modal.classList.remove('open');
    if (this.previewVideo) {
      this.previewVideo.pause();
    }
  }

  handlePublish() {
    const title = this.titleInput.value.trim() || 'My New Video';
    const desc = this.descInput.value.trim() || 'Uploaded with TokTube Creator Studio!';
    const user = storage.getCurrentUser();
    const category = this.categorySelect ? this.categorySelect.value : 'Tech';
    const sound = (this.soundInput ? this.soundInput.value.trim() : '') || 'Original Sound - ' + user.name;

    const videoUrl = this.selectedVideoUrl || INITIAL_DATA.samplePresets[0].url;
    const thumbnail = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80";

    const isTok = (this.selectedType === 'tok');
    const newVideoId = (isTok ? 'tok-u-' : 'yt-u-') + Date.now();

    const videoPayload = isTok ? {
      id: newVideoId,
      type: 'tok',
      title: title,
      caption: `${title} - ${desc}`,
      soundTitle: sound,
      videoUrl: videoUrl,
      thumbnail: thumbnail,
      channel: {
        id: user.id,
        name: user.handle,
        avatar: user.avatar,
        verified: true
      },
      likes: 1,
      commentsCount: 0,
      sharesCount: 0,
      bookmarksCount: 0,
      comments: []
    } : {
      id: newVideoId,
      type: 'tube',
      title: title,
      description: desc,
      videoUrl: videoUrl,
      thumbnail: thumbnail,
      duration: "3:45",
      category: category,
      views: "1 view",
      uploadDate: "Just now",
      channel: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        subscribers: "1",
        verified: true
      },
      likes: 1,
      dislikes: 0,
      comments: []
    };

    storage.addVideo(videoPayload);

    // Reset fields
    this.titleInput.value = '';
    this.descInput.value = '';
    this.close();

    window.tokApp.showToast(`Published successfully to ${isTok ? 'Tok Feed' : 'YouTube Grid'}! 🚀`);

    if (this.onUploadSuccess) {
      this.onUploadSuccess(isTok ? 'tok' : 'tube', newVideoId);
    }
  }
}
