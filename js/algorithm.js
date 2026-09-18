/**
 * wave.africa — Personalised Recommendation Engine & Feed Algorithm
 * Ranks Toks tailored to:
 *  1. User Location (country, city, Pan-African priority)
 *  2. User Attention & Intent (likes, bookmarks, reposts, watch history, subscriptions)
 *  3. Trending velocity & Content freshness
 */

function scoreReel(reel, userProfile, context, allReels) {
  let score = 0;
  const { likedIds = [], watchedIds = [], bookmarkedIds = [], repostedIds = [] } = context;

  // ── 1. Location Matching (Primary geo-boost) ───────────────────────────
  const userCountry = (userProfile?.country || '').toLowerCase().trim();
  const userCity    = (userProfile?.city    || '').toLowerCase().trim();
  const reelCountry = (reel.country || '').toLowerCase().trim();
  const reelRegion  = (reel.region  || '').toLowerCase().trim();

  if (userCountry && reelCountry && (userCountry === reelCountry || reelCountry.includes(userCountry))) {
    score += 35; // Direct national match (e.g. Zambia for Zambian user)
  } else if (userCountry && reelRegion && reelRegion.includes(userCountry)) {
    score += 20; // Regional neighborhood match (e.g. Southern Africa)
  }

  if (userCity && (reel.caption?.toLowerCase().includes(userCity) || reel.title?.toLowerCase().includes(userCity))) {
    score += 15; // City-level hyper-local relevance (e.g. Lusaka, Ndola)
  }

  // Pan-African content bonus
  if ((reel.continent || '').toLowerCase() === 'africa') {
    score += 8;
  }

  // ── 2. User Attention: Creators & Subscriptions ─────────────────────────
  const subscribed = userProfile?.subscribedChannels || [];
  if (reel.creator?.id && subscribed.includes(reel.creator.id)) {
    score += 25; // Directly followed creators get prime placement
  }

  // ── 3. User Attention: What Attracts Their Interest ─────────────────────
  // High-intent interactions (Bookmarks = 1.5x, Reposts = 2x, Likes = 1x)
  const likedReels      = allReels.filter(r => likedIds.includes(r.id));
  const bookmarkedReels = allReels.filter(r => bookmarkedIds.includes(r.id));
  const repostedReels   = allReels.filter(r => repostedIds.includes(r.id));

  // Build weighted tag affinity map
  const tagWeights = {};
  const addTags = (reelsArr, weight) => {
    reelsArr.forEach(r => {
      (r.tags || []).forEach(tag => {
        const t = tag.toLowerCase().replace('#', '');
        tagWeights[t] = (tagWeights[t] || 0) + weight;
      });
    });
  };

  addTags(likedReels, 1.0);
  addTags(bookmarkedReels, 1.5);
  addTags(repostedReels, 2.0);

  // Match reel tags against user's interest profile
  let reelTagMatches = 0;
  (reel.tags || []).forEach(tag => {
    const t = tag.toLowerCase().replace('#', '');
    if (tagWeights[t]) {
      score += Math.min(tagWeights[t] * 6, 24); // Cap per tag
      reelTagMatches++;
    }
  });

  // Category affinity (Tech, Food, Music, Travel, Gaming, etc.)
  const categoryWeights = {};
  const addCategories = (reelsArr, weight) => {
    reelsArr.forEach(r => {
      if (r.category) {
        categoryWeights[r.category] = (categoryWeights[r.category] || 0) + weight;
      }
    });
  };

  addCategories(likedReels, 1.0);
  addCategories(bookmarkedReels, 1.5);
  addCategories(repostedReels, 2.0);

  if (reel.category && categoryWeights[reel.category]) {
    score += Math.min(categoryWeights[reel.category] * 8, 25);
  }

  // ── 4. Recency & Freshness ─────────────────────────────────────────────
  if (reel.postedAt) {
    const hoursSince = (Date.now() - new Date(reel.postedAt).getTime()) / 3600000;
    if (hoursSince <= 12) score += 12; // Fresh drop (<12 hours)
    else if (hoursSince <= 48) score += 8; // Past 2 days
    else if (hoursSince <= 168) score += 4; // Past week
  }

  // ── 5. Discovery & Social Proof (Popularity) ───────────────────────────
  const likes = reel.likes || 0;
  if (likes > 500000) score += 8;
  else if (likes > 100000) score += 5;
  else if (likes > 10000) score += 3;

  // Repost volume signal
  if ((reel.shares || reel.sharesCount || 0) > 10000) score += 4;

  // ── 6. Fatigue reduction (Already watched penalty) ─────────────────────
  if (watchedIds.includes(reel.id)) {
    score -= 8; // Reduce repetition so new content surfaces
  }

  // ── 7. Freshness Noise (±3) — avoids rigid filter bubbles ──────────────
  score += (Math.random() * 6) - 3;

  return score;
}

function rankReels(reels, userProfile, likedIdsOrContext = [], watchedIds = [], bookmarkedIds = [], repostedIds = []) {
  if (!reels || reels.length === 0) return reels;

  let context = {};
  if (Array.isArray(likedIdsOrContext)) {
    context = {
      likedIds: likedIdsOrContext,
      watchedIds: watchedIds || [],
      bookmarkedIds: bookmarkedIds || [],
      repostedIds: repostedIds || []
    };
  } else if (likedIdsOrContext && typeof likedIdsOrContext === 'object') {
    context = likedIdsOrContext;
  }

  const scored = reels.map(reel => ({
    reel,
    score: scoreReel(reel, userProfile, context, reels)
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored.map(s => s.reel);
}

// Global exposure for non-module script tag compatibility
if (typeof window !== 'undefined') {
  window.rankReels = rankReels;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { rankReels };
}
