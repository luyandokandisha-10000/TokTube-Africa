/**
 * TokTube - Initial Mock Dataset & Database Seed Fixtures
 * Long-form (YouTube 16:9) and vertical reels (TikTok 9:16)
 * with working video streams, notifications, sounds, and comments.
 */

export const INITIAL_DATA = {
  // Notifications Feed
  notifications: [
    {
      id: "notif-1",
      title: "TechCraft Studios uploaded a new video",
      text: "Building the Next Generation Web App in 2026: Architecture & Speed",
      time: "20m ago",
      read: false,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      videoId: "yt-1"
    },
    {
      id: "notif-2",
      title: "Elena Coding liked your comment",
      text: '"Love how clean the custom player controls are..."',
      time: "2h ago",
      read: false,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      videoId: "yt-1"
    },
    {
      id: "notif-3",
      title: "EarthLens 4K is trending #1 in Nature",
      text: "Cinematic Drone Expedition: Untouched Wilds of Iceland in 4K",
      time: "1d ago",
      read: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      videoId: "yt-2"
    }
  ],

  // Audio Tracks (Sounds Library)
  sounds: [
    {
      id: "snd-1",
      title: "Original Sound - DevHacks Beats 🎵",
      artist: "DevHacks",
      duration: "0:30",
      videosCount: "14.2K",
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&auto=format&fit=crop&q=80"
    },
    {
      id: "snd-2",
      title: "Hans Zimmer - Cinematic Pulse (Remix)",
      artist: "Hans Zimmer",
      duration: "0:45",
      videosCount: "89.4K",
      thumbnail: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=200&auto=format&fit=crop&q=80"
    },
    {
      id: "snd-3",
      title: "Celebration Horns - Party Anthem",
      artist: "DJ Brass",
      duration: "0:25",
      videosCount: "120K",
      thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&auto=format&fit=crop&q=80"
    }
  ],

  // 16:9 Long-Form YouTube Videos
  youtubeVideos: [
    {
      id: "yt-1",
      title: "Building the Next Generation Web App in 2026: Architecture & Speed",
      description: `In this comprehensive masterclass, we explore modern reactive architectures, client-side caching, and ultra-smooth animations without heavy frameworks.\n\n0:00 - Introduction\n1:45 - Architecture Overview\n5:20 - Real-time Performance Benchmarks\n10:15 - CSS Hardware Acceleration\n14:00 - Conclusion & Next Steps`,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
      duration: "15:24",
      category: "Tech",
      views: "1.2M views",
      uploadDate: "3 days ago",
      channel: {
        id: "ch-techcraft",
        name: "TechCraft Studios",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
        subscribers: "840K",
        verified: true,
      },
      likes: 84200,
      dislikes: 120,
      comments: [
        {
          id: "c-1",
          author: "DevAlex",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
          timestamp: "2 days ago",
          text: "The combination of the TikTok swipe feed with YouTube's deep dive watch view is genuinely the holy grail of video platforms!",
          likes: 312,
          replies: [
            {
              id: "r-1",
              author: "TechCraft Studios",
              avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
              timestamp: "1 day ago",
              text: "Appreciate the feedback Alex! Glad you are enjoying the smooth performance."
            }
          ]
        },
        {
          id: "c-2",
          author: "Elena Coding",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
          timestamp: "1 day ago",
          text: "Love how clean the custom player controls are. Super responsive and keyboard friendly!",
          likes: 95,
          replies: []
        }
      ]
    },
    {
      id: "yt-2",
      title: "Cinematic Drone Expedition: Untouched Wilds of Iceland in 4K",
      description: `Fly through volcanic canyons, cascading glaciers, and black sand beaches captured using custom FPV cinematic drones.\n\nCamera: Red Komodo 6K\nDrone: Custom Cinelifter 8-inch\nLocation: Highlands of Iceland`,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      thumbnail: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80",
      duration: "11:45",
      category: "Nature",
      views: "2.8M views",
      uploadDate: "1 week ago",
      channel: {
        id: "ch-earthlens",
        name: "EarthLens 4K",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
        subscribers: "1.6M",
        verified: true,
      },
      likes: 145000,
      dislikes: 310,
      comments: [
        {
          id: "c-3",
          author: "NordicWanderer",
          avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
          timestamp: "4 days ago",
          text: "The drone maneuver through that narrow volcanic fissure at 4:30 gave me chills! Incredible piloting.",
          likes: 840,
          replies: []
        }
      ]
    },
    {
      id: "yt-3",
      title: "Lo-Fi Beats to Code / Relax To [Cyberpunk Midnight Edition]",
      description: `Chill hip-hop beats, ambient synths, and cozy raindrops designed for late-night programming sessions and study marathons.\n\nTracklist:\n0:00 Neon Reflections\n3:20 Terminal Glow\n7:15 Midnight Coffee\n10:45 Endless Loop`,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
      duration: "24:10",
      category: "Music",
      views: "5.4M views",
      uploadDate: "2 weeks ago",
      channel: {
        id: "ch-lofiradio",
        name: "CyberLoFi Station",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
        subscribers: "3.2M",
        verified: true,
      },
      likes: 320000,
      dislikes: 80,
      comments: [
        {
          id: "c-4",
          author: "AsyncAwait",
          avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
          timestamp: "5 days ago",
          text: "Listening to this while squashing bugs at 2 AM. Pure focus vibes.",
          likes: 410,
          replies: []
        }
      ]
    },
    {
      id: "yt-4",
      title: "I Built an AI Game Engine from Scratch in 7 Days",
      description: `Can modern neural models generate full 3D environments, physics interactions, and NPC behaviors in real time? Let's find out by building an engine entirely from scratch.\n\nCode repository is linked below!`,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
      duration: "18:32",
      category: "Gaming",
      views: "980K views",
      uploadDate: "4 days ago",
      channel: {
        id: "ch-gamedev",
        name: "GameDev Frontier",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
        subscribers: "420K",
        verified: true,
      },
      likes: 67000,
      dislikes: 110,
      comments: [
        {
          id: "c-5",
          author: "ShaderGuru",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
          timestamp: "3 days ago",
          text: "The collision handling trick at 11:20 is pure genius. Implementing this into my custom engine today!",
          likes: 240,
          replies: []
        }
      ]
    },
    {
      id: "yt-5",
      title: "Master Chef Secret: How Michelin Restaurants Perfect Crispy Duck",
      description: `Chef Marco breaks down the five critical techniques to achieve paper-crisp skin and melt-in-your-mouth duck breast at home.\n\nIngredients:\n- Moulard duck breast\n- Sichuan peppercorn & sea salt\n- Orange blossom glaze`,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      thumbnail: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
      duration: "13:12",
      category: "Food",
      views: "1.9M views",
      uploadDate: "5 days ago",
      channel: {
        id: "ch-culinary",
        name: "Artisan Kitchen",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&auto=format&fit=crop&q=80",
        subscribers: "1.1M",
        verified: true,
      },
      likes: 98000,
      dislikes: 420,
      comments: [
        {
          id: "c-6",
          author: "FoodieSam",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
          timestamp: "2 days ago",
          text: "Tried this technique yesterday and my family was blown away. The skin score crosshatch technique makes all the difference!",
          likes: 512,
          replies: []
        }
      ]
    },
    {
      id: "yt-6",
      title: "Cybersecurity Breakdown: The Zero-Day Exploit That Shook The Cloud",
      description: `An in-depth forensic investigation into the recently patched protocol vulnerability. How it worked, how it was discovered, and lessons for distributed software architecture.`,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
      duration: "16:04",
      category: "Tech",
      views: "740K views",
      uploadDate: "6 days ago",
      channel: {
        id: "ch-cyberpulse",
        name: "CyberPulse Deep Dive",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
        subscribers: "510K",
        verified: false,
      },
      likes: 48000,
      dislikes: 95,
      comments: []
    }
  ],

  // 9:16 Vertical TikTok Reels
  tiktokReels: [
    {
      id: "tok-1",
      title: "Fastest way to center anything in modern CSS ✨ #css #webdev #frontend #toktube",
      caption: "Stop using margins in 2026! Just use display: grid and place-content: center. Clean, bulletproof, and 100% responsive.",
      soundTitle: "Original Sound - DevHacks Beats 🎵",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
      channel: {
        id: "ch-techcraft",
        name: "@techcraft",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
        verified: true,
      },
      likes: 124500,
      commentsCount: 1420,
      sharesCount: 8900,
      bookmarksCount: 31200,
      ytEquivalentId: "yt-1",
      comments: [
        {
          id: "tc-1",
          author: "WebNinja",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
          timeAgo: "2h ago",
          text: "Wait place-content: center works with grid without needing rows/cols definition? My mind is blown 🔥",
          likes: 412,
          replies: [
            {
              id: "tr-1",
              author: "TechCraft Studios",
              avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
              timeAgo: "1h ago",
              text: "Yep! It combines align-content and justify-content in one shorthand."
            }
          ]
        },
        {
          id: "tc-2",
          author: "CSS_Queen",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
          timeAgo: "5h ago",
          text: "Can confirm, been using this for 6 months and never looked back!",
          likes: 189,
          replies: []
        }
      ]
    },
    {
      id: "tok-2",
      title: "Wait till the drop! Incredible FPV dive into Icelandic canyon 🏔️ #drone #travel #iceland #cinematic",
      caption: "Never been so scared for my drone propellers! Full dive down the canyon at 90mph.",
      soundTitle: "Hans Zimmer - Cinematic Pulse (Remix)",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      thumbnail: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&auto=format&fit=crop&q=80",
      channel: {
        id: "ch-earthlens",
        name: "@earthlens",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
        verified: true,
      },
      likes: 389000,
      commentsCount: 4890,
      sharesCount: 42100,
      bookmarksCount: 98400,
      ytEquivalentId: "yt-2",
      comments: [
        {
          id: "tc-3",
          author: "FlightPro",
          avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
          timeAgo: "1h ago",
          text: "The signal through that basalt wall must have been terrifying. Props to the pilot!",
          likes: 1205,
          replies: []
        }
      ]
    },
    {
      id: "tok-3",
      title: "POV: You finally fixed the bug that took 3 days 💻🎉 #coding #programmerhumor #developer #relatable",
      caption: "It was a missing comma. It is ALWAYS the missing comma or typo in the environment variable.",
      soundTitle: "Celebration Horns - Party Anthem",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
      channel: {
        id: "ch-lofiradio",
        name: "@cyberlofi",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
        verified: true,
      },
      likes: 540200,
      commentsCount: 7200,
      sharesCount: 88000,
      bookmarksCount: 45000,
      ytEquivalentId: "yt-3",
      comments: []
    },
    {
      id: "tok-4",
      title: "Satisfying 3D Physics simulation rendered in real-time 🎮 #gamedev #satisfying #blender #gaming",
      caption: "10,000 domino blocks colliding with zero lag. Check the YouTube video for how the physics solver works!",
      soundTitle: "Satisfying ASMR Click Beats",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
      channel: {
        id: "ch-gamedev",
        name: "@gamedevfrontier",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
        verified: true,
      },
      likes: 210400,
      commentsCount: 2310,
      sharesCount: 14000,
      bookmarksCount: 52000,
      ytEquivalentId: "yt-4",
      comments: []
    },
    {
      id: "tok-5",
      title: "Listen to this CRUNCH! Duck skin crispy test 🦆🤤 #foodie #cooking #chef #michelin",
      caption: "The sound you have been waiting for. Crispy duck breast resting after high heat rendering.",
      soundTitle: "Chef ASMR Sounds - Pure Sizzle",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      thumbnail: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
      channel: {
        id: "ch-culinary",
        name: "@artisankitchen",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&auto=format&fit=crop&q=80",
        verified: true,
      },
      likes: 672000,
      commentsCount: 9100,
      sharesCount: 63000,
      bookmarksCount: 180000,
      ytEquivalentId: "yt-5",
      comments: []
    }
  ],

  // Sample presets for Creator Studio upload modal
  samplePresets: [
    {
      name: "Cyber Neon Code",
      type: "tube",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      category: "Tech",
      sound: "Original Sound - DevHacks Beats 🎵"
    },
    {
      name: "Iceland Canyon Dive",
      type: "tok",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      category: "Nature",
      sound: "Hans Zimmer - Cinematic Pulse (Remix)"
    },
    {
      name: "Night Ride Drift",
      type: "tube",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      category: "Gaming",
      sound: "Celebration Horns - Party Anthem"
    },
    {
      name: "Cartoon Rabbit Adventure",
      type: "tok",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      category: "Comedy",
      sound: "Bouncy Bass Cartoon"
    }
  ]
};
