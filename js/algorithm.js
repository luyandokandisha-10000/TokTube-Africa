/**
 * TokTube Africa — Personalised Feed Algorithm
 * Ranks Toks by location, engagement history, and content affinity.
 */

function scoreReel(reel, userProfile, likedIds, watchedIds, allReels) {
  let score = 0;

  // Location affinity
  const userCountry = (userProfile?.country || '').toLowerCase();
  const reelCountry = (reel.country || '').toLowerCase();
  const reelRegion  = (reel.region  || '').toLowerCase();
  if (userCountry && reelCountry && userCountry === reelCountry) score += 30;
  else if (userCountry && reelRegion && reelRegion.includes(userCountry)) score += 15;
  if ((reel.continent || '').toLowerCase() === 'africa') score += 8;

  // Followed creator
  const subscribed = userProfile?.subscribedChannels || [];
  if (reel.creator?.id && subscribed.includes(reel.creator.id)) score += 20;

  // Category / tag affinity from liked reels
  const likedReels = allReels.filter(r => likedIds.includes(r.id));
  const likedTags  = new Set(likedReels.flatMap(r => r.tags || []));
  const reelTags   = reel.tags || [];
  const tagOverlap = reelTags.filter(t => likedTags.has(t)).length;
  score += tagOverlap * 10;

  const likedCategories = likedReels.map(r => r.category).filter(Boolean);
  const catFreq = {};
  likedCategories.forEach(c => { catFreq[c] = (catFreq[c] || 0) + 1; });
  if (reel.category && catFreq[reel.category]) {
    score += Math.min(catFreq[reel.category] * 5, 15);
  }

  // Recency bonus
  if (reel.postedAt) {
    const daysSince = (Date.now() - new Date(reel.postedAt).getTime()) / 86400000;
    if (daysSince <= 1) score += 10;
    else if (daysSince <= 7) score += 5;
    else if (daysSince <= 30) score += 2;
  }

  // Already watched penalty
  if (watchedIds.includes(reel.id)) score -= 5;

  // Popularity signal
  const likes = reel.likes || 0;
  if (likes > 500000) score += 8;
  else if (likes > 100000) score += 5;
  else if (likes > 10000) score += 2;

  // Random freshness noise (+-3) prevents filter bubble
  score += (Math.random() * 6) - 3;

  return score;
}

export function rankReels(reels, userProfile, likedIds = [], watchedIds = []) {
  if (!reels || reels.length === 0) return reels;
  const scored = reels.map(reel => ({
    reel,
    score: scoreReel(reel, userProfile, likedIds, watchedIds, reels)
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.map(s => s.reel);
}

window.rankReels = rankReels;
