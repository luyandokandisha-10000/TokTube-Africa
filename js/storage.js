/**
 * TokTube - Storage & Database Manager
 * Bridges instantaneous in-memory caching and LocalStorage
 * with the underlying persistent IndexedDB relational object store.
 */

import { INITIAL_DATA } from './data.js';
import { db } from './db.js';

const STORAGE_KEYS = {
  YT_VIDEOS: 'toktube_yt_videos',
  TOK_REELS: 'toktube_tok_reels',
  LIKED_VIDEOS: 'toktube_liked_video_ids',
  DISLIKED_VIDEOS: 'toktube_disliked_video_ids',
  BOOKMARKED_VIDEOS: 'toktube_bookmarked_ids',
  SUBSCRIBED_CHANNELS: 'toktube_subscribed_channel_ids',
  WATCH_HISTORY: 'toktube_history_video_ids',
  USER_PROFILE: 'toktube_current_user',
  NOTIFICATIONS: 'toktube_notifications'
};

export class TokStorage {
  constructor() {
    this.init();
    this.syncWithIndexedDB();
  }

  init() {
    if (!localStorage.getItem(STORAGE_KEYS.YT_VIDEOS)) {
      localStorage.setItem(STORAGE_KEYS.YT_VIDEOS, JSON.stringify(INITIAL_DATA.youtubeVideos));
    }
    if (!localStorage.getItem(STORAGE_KEYS.TOK_REELS)) {
      localStorage.setItem(STORAGE_KEYS.TOK_REELS, JSON.stringify(INITIAL_DATA.tiktokReels));
    }
    if (!localStorage.getItem(STORAGE_KEYS.LIKED_VIDEOS)) {
      localStorage.setItem(STORAGE_KEYS.LIKED_VIDEOS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.DISLIKED_VIDEOS)) {
      localStorage.setItem(STORAGE_KEYS.DISLIKED_VIDEOS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.BOOKMARKED_VIDEOS)) {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKED_VIDEOS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SUBSCRIBED_CHANNELS)) {
      localStorage.setItem(STORAGE_KEYS.SUBSCRIBED_CHANNELS, JSON.stringify(["ch-techcraft"]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.WATCH_HISTORY)) {
      localStorage.setItem(STORAGE_KEYS.WATCH_HISTORY, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_DATA.notifications || []));
    }
    if (!localStorage.getItem(STORAGE_KEYS.USER_PROFILE)) {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify({
        id: "usr-me",
        name: "PulseCreator",
        handle: "@pulsecreator",
        bio: "Full-stack creator combining TikTok shorts & YouTube deep dives!",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
        followers: 1240,
        following: 18,
        totalLikes: "48.5K"
      }));
    }
    // Friend system storage initialization
    if (!localStorage.getItem('toktube_friend_requests')) {
      localStorage.setItem('toktube_friend_requests', JSON.stringify([]));
    }
    if (!localStorage.getItem('toktube_friends')) {
      localStorage.setItem('toktube_friends', JSON.stringify([]));
    }
  }

  async syncWithIndexedDB() {
    try {
      await db.ready();
      // Ensure all initial videos are indexed in IndexedDB
      const dbVideos = await db.getAll('videos');
      if (dbVideos.length > 0) {
        localStorage.setItem(STORAGE_KEYS.YT_VIDEOS, JSON.stringify(dbVideos));
      }
      const dbReels = await db.getAll('reels');
      if (dbReels.length > 0) {
        localStorage.setItem(STORAGE_KEYS.TOK_REELS, JSON.stringify(dbReels));
      }
    } catch (e) {
      console.warn('IndexedDB sync fallback to LocalStorage:', e);
    }
  }

  getYoutubeVideos() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.YT_VIDEOS)) || INITIAL_DATA.youtubeVideos;
    } catch {
      return INITIAL_DATA.youtubeVideos;
    }
  }

  getYoutubeVideoById(id) {
    const videos = this.getYoutubeVideos();
    return videos.find(v => v.id === id) || null;
  }

  getTiktokReels() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.TOK_REELS)) || INITIAL_DATA.tiktokReels;
    } catch {
      return INITIAL_DATA.tiktokReels;
    }
  }

  getTiktokReelById(id) {
    const reels = this.getTiktokReels();
    return reels.find(r => r.id === id) || null;
  }

  // Add a newly created user video (saves to both LocalStorage and IndexedDB)
  async addVideo(videoData) {
    if (videoData.type === 'tok') {
      const reels = this.getTiktokReels();
      reels.unshift(videoData);
      localStorage.setItem(STORAGE_KEYS.TOK_REELS, JSON.stringify(reels));
      db.put('reels', videoData).catch(console.error);
    } else {
      const videos = this.getYoutubeVideos();
      videos.unshift(videoData);
      localStorage.setItem(STORAGE_KEYS.YT_VIDEOS, JSON.stringify(videos));
      db.put('videos', videoData).catch(console.error);
    }
  }

  // Likes
  getLikedIds() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.LIKED_VIDEOS)) || [];
    } catch {
      return [];
    }
  }

  isLiked(id) {
    return this.getLikedIds().includes(id);
  }

  toggleLike(id, isTok = false) {
    const liked = this.getLikedIds();
    const index = liked.indexOf(id);
    let nowLiked = false;

    if (index > -1) {
      liked.splice(index, 1);
      nowLiked = false;
    } else {
      liked.push(id);
      nowLiked = true;
      // If was disliked, remove dislike
      this.removeDislike(id);
    }
    localStorage.setItem(STORAGE_KEYS.LIKED_VIDEOS, JSON.stringify(liked));

    // Update counts on item
    if (isTok) {
      const reels = this.getTiktokReels();
      const reel = reels.find(r => r.id === id);
      if (reel) {
        reel.likes = Math.max(0, (reel.likes || 0) + (nowLiked ? 1 : -1));
        localStorage.setItem(STORAGE_KEYS.TOK_REELS, JSON.stringify(reels));
        db.put('reels', reel).catch(console.error);
      }
    } else {
      const videos = this.getYoutubeVideos();
      const video = videos.find(v => v.id === id);
      if (video) {
        video.likes = Math.max(0, (video.likes || 0) + (nowLiked ? 1 : -1));
        localStorage.setItem(STORAGE_KEYS.YT_VIDEOS, JSON.stringify(videos));
        db.put('videos', video).catch(console.error);
      }
    }

    return nowLiked;
  }

  // Dislikes (YouTube mode)
  getDislikedIds() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.DISLIKED_VIDEOS)) || [];
    } catch {
      return [];
    }
  }

  isDisliked(id) {
    return this.getDislikedIds().includes(id);
  }

  toggleDislike(id) {
    const disliked = this.getDislikedIds();
    const index = disliked.indexOf(id);
    let nowDisliked = false;

    if (index > -1) {
      disliked.splice(index, 1);
      nowDisliked = false;
    } else {
      disliked.push(id);
      nowDisliked = true;
      // If liked, remove like
      if (this.isLiked(id)) {
        this.toggleLike(id, false);
      }
    }
    localStorage.setItem(STORAGE_KEYS.DISLIKED_VIDEOS, JSON.stringify(disliked));

    const videos = this.getYoutubeVideos();
    const video = videos.find(v => v.id === id);
    if (video) {
      video.dislikes = Math.max(0, (video.dislikes || 0) + (nowDisliked ? 1 : -1));
      localStorage.setItem(STORAGE_KEYS.YT_VIDEOS, JSON.stringify(videos));
      db.put('videos', video).catch(console.error);
    }

    return nowDisliked;
  }

  removeDislike(id) {
    const disliked = this.getDislikedIds();
    const index = disliked.indexOf(id);
    if (index > -1) {
      disliked.splice(index, 1);
      localStorage.setItem(STORAGE_KEYS.DISLIKED_VIDEOS, JSON.stringify(disliked));
    }
  }

  // Bookmarks / Watch Later
  getBookmarkedIds() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARKED_VIDEOS)) || [];
    } catch {
      return [];
    }
  }

  isBookmarked(id) {
    return this.getBookmarkedIds().includes(id);
  }

  toggleBookmark(id) {
    const saved = this.getBookmarkedIds();
    const index = saved.indexOf(id);
    let nowSaved = false;

    if (index > -1) {
      saved.splice(index, 1);
      nowSaved = false;
    } else {
      saved.push(id);
      nowSaved = true;
    }
    localStorage.setItem(STORAGE_KEYS.BOOKMARKED_VIDEOS, JSON.stringify(saved));
    return nowSaved;
  }

  // Channel Subscriptions
  getSubscribedChannelIds() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBSCRIBED_CHANNELS)) || [];
    } catch {
      return [];
    }
  }

  isSubscribed(channelId) {
    return this.getSubscribedChannelIds().includes(channelId);
  }

  toggleSubscribe(channelId) {
    const subs = this.getSubscribedChannelIds();
    const index = subs.indexOf(channelId);
    let nowSubbed = false;

    if (index > -1) {
      subs.splice(index, 1);
      nowSubbed = false;
    } else {
      subs.push(channelId);
      nowSubbed = true;
    }
    localStorage.setItem(STORAGE_KEYS.SUBSCRIBED_CHANNELS, JSON.stringify(subs));
    return nowSubbed;

  // Friend System
  // ------------------------------------------------------------
  // Retrieve pending friend requests
  getFriendRequests() {
    try { return JSON.parse(localStorage.getItem('toktube_friend_requests')) || []; } catch { return []; }
  }

  // Retrieve friends list
  getFriendsList() {
    try { return JSON.parse(localStorage.getItem('toktube_friends')) || []; } catch { return []; }
  }

  // Check friendship between two users
  areFriends(userA, userB) {
    const list = this.getFriendsList();
    return list.some(f => (f.userId === userA && f.friendId === userB) || (f.userId === userB && f.friendId === userA));
  }

  // Send a friend request
  addFriendRequest(senderId, targetId) {
    const requests = this.getFriendRequests();
    if (requests.find(r => r.senderId === senderId && r.targetId === targetId && r.status === 'pending')) { return false; }
    const newReq = { id: 'req-' + Date.now(), senderId, targetId, timestamp: Date.now(), status: 'pending' };
    requests.push(newReq);
    localStorage.setItem('toktube_friend_requests', JSON.stringify(requests));
    return true;
  }

  // Get incoming pending requests for a user
  getPendingRequestsFor(userId) {
    return this.getFriendRequests().filter(r => r.targetId === userId && r.status === 'pending');
  }

  // Get outgoing pending requests for a user
  getOutgoingRequestsFor(userId) {
    return this.getFriendRequests().filter(r => r.senderId === userId && r.status === 'pending');
  }

  // Accept a friend request
  acceptFriendRequest(requestId) {
    const requests = this.getFriendRequests();
    const idx = requests.findIndex(r => r.id === requestId && r.status === 'pending');
    if (idx === -1) return false;
    const req = requests[idx];
    const friends = this.getFriendsList();
    friends.push({ userId: req.senderId, friendId: req.targetId });
    friends.push({ userId: req.targetId, friendId: req.senderId });
    localStorage.setItem('toktube_friends', JSON.stringify(friends));
    requests.splice(idx, 1);
    localStorage.setItem('toktube_friend_requests', JSON.stringify(requests));
    return true;
  }

  // Decline or cancel a friend request
  declineFriendRequest(requestId) {
    const requests = this.getFriendRequests();
    const idx = requests.findIndex(r => r.id === requestId && r.status === 'pending');
    if (idx === -1) return false;
    requests.splice(idx, 1);
    localStorage.setItem('toktube_friend_requests', JSON.stringify(requests));
    return true;
  }
  }

  // Comments & Replies
  addComment(videoId, text, isTok = false, parentCommentId = null) {
    const user = this.getCurrentUser();
    const newComment = {
      id: "cm-" + Date.now(),
      author: user.name,
      avatar: user.avatar,
      timestamp: "Just now",
      timeAgo: "Just now",
      text: text,
      likes: 0,
      replies: []
    };

    if (isTok) {
      const reels = this.getTiktokReels();
      const reel = reels.find(r => r.id === videoId);
      if (reel) {
        reel.comments = reel.comments || [];
        if (parentCommentId) {
          const parent = reel.comments.find(c => c.id === parentCommentId);
          if (parent) {
            parent.replies = parent.replies || [];
            parent.replies.push(newComment);
          }
        } else {
          reel.comments.unshift(newComment);
        }
        reel.commentsCount = (reel.commentsCount || 0) + 1;
        localStorage.setItem(STORAGE_KEYS.TOK_REELS, JSON.stringify(reels));
        db.put('reels', reel).catch(console.error);
      }
    } else {
      const videos = this.getYoutubeVideos();
      const video = videos.find(v => v.id === videoId);
      if (video) {
        video.comments = video.comments || [];
        if (parentCommentId) {
          const parent = video.comments.find(c => c.id === parentCommentId);
          if (parent) {
            parent.replies = parent.replies || [];
            parent.replies.push(newComment);
          }
        } else {
          video.comments.unshift(newComment);
        }
        localStorage.setItem(STORAGE_KEYS.YT_VIDEOS, JSON.stringify(videos));
        db.put('videos', video).catch(console.error);
      }
    }

    return newComment;
  }

  // Watch History
  addToHistory(videoId) {
    try {
      let history = JSON.parse(localStorage.getItem(STORAGE_KEYS.WATCH_HISTORY)) || [];
      history = history.filter(id => id !== videoId);
      history.unshift(videoId);
      if (history.length > 50) history = history.slice(0, 50);
      localStorage.setItem(STORAGE_KEYS.WATCH_HISTORY, JSON.stringify(history));
    } catch {}
  }

  getHistoryIds() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.WATCH_HISTORY)) || [];
    } catch {
      return [];
    }
  }

  clearHistory() {
    localStorage.setItem(STORAGE_KEYS.WATCH_HISTORY, JSON.stringify([]));
  }

  // Notifications
  getNotifications() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) || INITIAL_DATA.notifications || [];
    } catch {
      return INITIAL_DATA.notifications || [];
    }
  }

  markNotificationRead(id) {
    const list = this.getNotifications();
    const item = list.find(n => n.id === id);
    if (item) {
      item.read = true;
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
      db.put('notifications', item).catch(console.error);
    }
  }

  markAllNotificationsRead() {
    const list = this.getNotifications();
    list.forEach(n => n.read = true);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
    list.forEach(n => db.put('notifications', n).catch(console.error));
  }

  getUnreadNotificationCount() {
    return this.getNotifications().filter(n => !n.read).length;
  }

  // User Profile

    // Broadcast State Persistence
    saveBroadcastState(stateObj) {
      try {
        localStorage.setItem('toktube_broadcast_state', JSON.stringify(stateObj));
      } catch (e) { console.error('Failed to save broadcast state', e); }
    }

    getBroadcastState() {
      try {
        return JSON.parse(localStorage.getItem('toktube_broadcast_state')) || { isLive: false, label: 'Go Live' };
      } catch (e) { console.error('Failed to get broadcast state', e); return { isLive: false, label: 'Go Live' }; }
    }

    // Simple Auth Helpers
    addUser(userObj) {
      const users = JSON.parse(localStorage.getItem('toktube_users') || '[]');
      users.push(userObj);
      localStorage.setItem('toktube_users', JSON.stringify(users));
    }

    getUser(username) {
      const users = JSON.parse(localStorage.getItem('toktube_users') || '[]');
      return users.find(u => u.id === username || u.name === username) || null;
    }

    setCurrentUser(username) {
      const user = this.getUser(username);
      if (user) {
        localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(user));
        return true;
      }
      return false;
    }

    isAuthenticated() {
      return !!localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    }
  getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_PROFILE)) || {
        id: "usr-me",
        name: "PulseCreator",
        handle: "@pulsecreator",
        bio: "Full-stack creator combining TikTok shorts & YouTube deep dives!",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
        followers: 1240,
        following: 18,
        totalLikes: "48.5K"
      };
    } catch {
      return {
        id: "usr-me",
        name: "PulseCreator",
        handle: "@pulsecreator",
        bio: "Full-stack creator combining TikTok shorts & YouTube deep dives!",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
        followers: 1240,
        following: 18,
        totalLikes: "48.5K"
      };
    }
  }

  updateUserProfile(updatedData) {
    const current = this.getCurrentUser();
    const merged = { ...current, ...updatedData };
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(merged));
    db.put('userData', { key: 'profile', value: merged }).catch(console.error);
    return merged;
  }

  // Sounds Library
  getSounds() {
    return INITIAL_DATA.sounds || [];
  }

  getSoundByTitle(title) {
    const sounds = this.getSounds();
    return sounds.find(s => s.title.toLowerCase().includes(title.toLowerCase())) || {
      id: "snd-gen",
      title: title,
      artist: "Original Creator",
      duration: "0:30",
      videosCount: "1.2K",
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&auto=format&fit=crop&q=80"
    };
  }
  // Get all videos (YouTube and TikTok) for a specific creator ID
  getVideosByCreatorId(creatorId) {
    const ytVideos = this.getYoutubeVideos().filter(v => v.channel && v.channel.id === creatorId);
    const tkReels = this.getTiktokReels().filter(r => r.channel && r.channel.id === creatorId);
    return [...ytVideos, ...tkReels];
  }
}


export const storage = new TokStorage();
