const chatHistory = [
    { query: "What's the weather like today?", timestamp: "2025-10-05T22:45:00Z" }, // Today, 11:45 PM WAT
    { query: "Best coffee shops in Lagos", timestamp: "2025-10-05T07:10:00Z" }, // Today, 8:10 AM WAT
    { query: "How to bake a chocolate cake", timestamp: "2025-10-04T18:12:00Z" }, // Yesterday, 7:12 PM WAT
    { query: "Best sci-fi books 2025", timestamp: "2025-10-04T09:30:00Z" }, // Yesterday, 10:30 AM WAT
    { query: "Python vs JavaScript for web dev", timestamp: "2025-09-28T13:15:00Z" }, // Sep 28, 2:15 PM WAT
    { query: "AI ethics controversies", timestamp: "2025-09-15T08:50:00Z" }, // Sep 15, 9:50 AM WAT
    { query: "What is quantum computing?", timestamp: "2025-08-20T17:25:00Z" }, // Aug 20, 6:25 PM WAT
    { query: "Top hiking spots near me", timestamp: "2025-08-10T10:40:00Z" }, // Aug 10, 11:40 AM WAT
    { query: "How to fix a leaky faucet", timestamp: "2025-07-30T15:05:00Z" }, // Jul 30, 4:05 PM WAT
    { query: "Latest space mission updates", timestamp: "2025-07-12T07:20:00Z" }, // Jul 12, 8:20 AM WAT
    { query: "Best restaurants in Abuja", timestamp: "2025-10-05T15:30:00Z" }, // Today, 4:30 PM WAT
    { query: "How to learn React fast", timestamp: "2025-10-04T14:20:00Z" }, // Yesterday, 3:20 PM WAT
    { query: "Machine learning basics", timestamp: "2025-09-30T11:45:00Z" }, // Sep 30, 12:45 PM WAT
    { query: "Top 10 travel destinations 2025", timestamp: "2025-09-25T09:10:00Z" }, // Sep 25, 10:10 AM WAT
    { query: "What is blockchain technology?", timestamp: "2025-09-20T16:55:00Z" }, // Sep 20, 5:55 PM WAT
    { query: "DIY home decor ideas", timestamp: "2025-09-10T13:25:00Z" }, // Sep 10, 2:25 PM WAT
    { query: "Latest AI trends", timestamp: "2025-08-15T08:30:00Z" }, // Aug 15, 9:30 AM WAT
    { query: "How to start a blog", timestamp: "2025-08-05T19:40:00Z" }, // Aug 5, 8:40 PM WAT
    { query: "Best laptops for coding", timestamp: "2025-07-25T12:15:00Z" }, // Jul 25, 1:15 PM WAT
    { query: "What is the meaning of life?", timestamp: "2025-07-10T10:00:00Z" }, // Jul 10, 11:00 AM WAT
    { query: "How to improve productivity", timestamp: "2025-10-05T20:00:00Z" }, // Today, 9:00 PM WAT
    { query: "Best workout routines", timestamp: "2025-10-04T07:50:00Z" }, // Yesterday, 8:50 AM WAT
    { query: "Node.js vs Django", timestamp: "2025-09-29T15:35:00Z" }, // Sep 29, 4:35 PM WAT
    { query: "How to meditate for beginners", timestamp: "2025-09-22T10:20:00Z" }, // Sep 22, 11:20 AM WAT
    { query: "Top movies to watch in 2025", timestamp: "2025-09-18T18:45:00Z" }, // Sep 18, 7:45 PM WAT
    { query: "What is generative AI?", timestamp: "2025-09-12T09:15:00Z" }, // Sep 12, 10:15 AM WAT
    { query: "Best budget smartphones", timestamp: "2025-08-25T14:30:00Z" }, // Aug 25, 3:30 PM WAT
    { query: "How to grow vegetables at home", timestamp: "2025-08-12T11:10:00Z" }, // Aug 12, 12:10 PM WAT
    { query: "Cybersecurity tips for beginners", timestamp: "2025-07-28T16:25:00Z" }, // Jul 28, 5:25 PM WAT
    { query: "What is the metaverse?", timestamp: "2025-07-15T08:40:00Z" }, // Jul 15, 9:40 AM WAT
    { query: "How to write a resume", timestamp: "2025-10-05T12:20:00Z" }, // Today, 1:20 PM WAT
    { query: "Best podcasts for entrepreneurs", timestamp: "2025-10-04T16:55:00Z" }, // Yesterday, 5:55 PM WAT
    { query: "What is cloud computing?", timestamp: "2025-09-27T10:30:00Z" }, // Sep 27, 11:30 AM WAT
    { query: "How to plan a budget", timestamp: "2025-09-21T14:15:00Z" }, // Sep 21, 3:15 PM WAT
    { query: "Top AI tools for design", timestamp: "2025-09-17T09:00:00Z" }, // Sep 17, 10:00 AM WAT
    { query: "How to learn guitar", timestamp: "2025-09-08T18:20:00Z" }, // Sep 8, 7:20 PM WAT
    { query: "Best online courses for coding", timestamp: "2025-08-30T12:45:00Z" }, // Aug 30, 1:45 PM WAT
    { query: "What is augmented reality?", timestamp: "2025-08-18T15:50:00Z" }, // Aug 18, 4:50 PM WAT
    { query: "How to make sushi at home", timestamp: "2025-08-08T10:25:00Z" }, // Aug 8, 11:25 AM WAT
    { query: "Best productivity apps", timestamp: "2025-07-20T17:30:00Z" }, // Jul 20, 6:30 PM WAT
    { query: "What is 5G technology?", timestamp: "2025-07-05T09:15:00Z" }, // Jul 5, 10:15 AM WAT
    { query: "How to start investing", timestamp: "2025-10-05T17:40:00Z" }, // Today, 6:40 PM WAT
    { query: "Best hiking boots 2025", timestamp: "2025-10-04T12:10:00Z" }, // Yesterday, 1:10 PM WAT
    { query: "What is machine learning?", timestamp: "2025-09-26T16:00:00Z" }, // Sep 26, 5:00 PM WAT
    { query: "How to improve public speaking", timestamp: "2025-09-19T11:30:00Z" }, // Sep 19, 12:30 PM WAT
    { query: "Top video games 2025", timestamp: "2025-09-14T14:45:00Z" }, // Sep 14, 3:45 PM WAT
    { query: "How to create a website", timestamp: "2025-09-07T08:50:00Z" }, // Sep 7, 9:50 AM WAT
    { query: "Best cameras for photography", timestamp: "2025-08-22T13:20:00Z" }, // Aug 22, 2:20 PM WAT
    { query: "What is virtual reality?", timestamp: "2025-08-07T16:10:00Z" }, // Aug 7, 5:10 PM WAT
    { query: "How to learn French fast", timestamp: "2025-07-18T10:00:00Z" } // Jul 18, 11:00 AM WAT
  ];

 const chatHistoryNew= [
    {
        "conversationId": "7e1b07e7-888c-45ba-94cf-d2e7799a9661",
        "lastUserMessage": "teach me to dance",
        "lastAssistantMessage": "Of course! Let's turn two left feet into two graceful ones. Teaching someone to dance is about building confidence and having fun. Here's a step-by-step guide to get you started.\n\n### **1. Start with Your Mindset**\n*   **It's a Skill, Not a Talent:** No one is born knowing how to dance. It's learned, like a language or a sport.\n*   **Embrace the Awkward:** You will feel silly at first. Laugh at yourself, but keep going. The awkward stage is temporary.\n*   **Patience is Key:** You won't be a pro in a day. It's about consistent, small improvements.\n\n### **2. Find Your \"Why\"**\nWhy do you want to learn?\n*   **To feel confident at a wedding?** Focus on basic rhythms and a few simple moves.\n*   **To get fit and have fun?** Focus on freestyling and enjoying the music.\n*   **To learn a specific style like salsa or hip-hop?** You'll need to find resources for that style.\n\nKnowing your goal will keep you motivated.\n\n### **3. The Three Pillars of Dance**\nThink of learning to dance as a stool with three legs. If one is short, the stool falls over.\n\n1.  **Rhythm (The Foundation):** Can you feel the beat? This is the most important part.\n2.  **Technique (The Form):** Are your movements matching the style? Is your posture right?\n3.  **Comfort (The Feels):** Are you letting go and feeling the music? Are you having fun?\n\n### **Let's Start Practicing!**\n\n#### **Step 1: Find Your Rhythm**\nThis is non-negotiable. Before you learn any move, you need to find the beat.\n*   **Listen:** Listen to music constantly. Not just in the background, but actively. Ask yourself: \"What is the tempo? Is it fast or slow? Where is the bass drum hitting?\"\n*   **Clap or Tap:** Try to clap along to the beat of any song on the radio.\n*   **Count:** Most popular music is in 4/4 time. That means you can count `1, 2, 3, 4, 1, 2, 3, 4...` over and over. Try counting along to a song. Can you find the \"1\"?\n\n#### **Step 2: Warm Up Your Body**\nDancing is physical. Warm up for 5-10 minutes to prevent injury and get comfortable in your body.\n*   **Roll your shoulders, hips, and ankles.**\n*   **Do some neck rolls carefully.**\n*   **Do a few squats or lunges.**\n*   **Just jog in place to the beat of a song.**\n\n#### **Step 3: Learn a Basic Move**\nStart with something universal.\n*   **The Two-Step:** It's called that for a reason! It's to the beat of `1, 2, 3, 4`.\n    *   **Beat 1:** Step to the side with your left foot.\n    *   **Beat 2:** Bring your right foot to meet your left foot.\n    *   **Beat 3:** Step to the side with your right foot.\n    *   **Beat 4:** Bring your left foot to meet your right foot.\n*   **That's it!** Now you're dancing. Practice this to different songs until it feels natural.\n\n#### **Step 4: Practice with Intent**\nDon't just repeat. Be smart about it.\n*   **Slow it Down:** If you mess up a move, do it in slow motion until your body understands the path.\n*   **Use a Mirror:** If you have one, use it! It's the best way to see what you're actually doing vs. what you *think* you're doing.\n*   **Record Yourself:** Use your phone. It's cringey but incredibly helpful. You'll see what you need to fix.\n\n#### **Step 5: Expand Your Horizons**\nOnce you're comfortable with one move, add another.\n*   **Add a new move:** Try a hip swing or a shoulder shimmy on beat two of your two-step.\n*   **Change levels:** Do your two-step but sink down a little on `1` and `3`, and rise up on `2` and `4`.\n*   **Change direction:** Instead of side to side, go forward and back.\n\n### **Sample Practice Session (15-20 mins)**\n1.  **Warm-up:** (3 mins) - Jog in place, roll shoulders, do some stretches.\n2.  **Drill the Basics:** (5 mins) - Practice your two-step to a song with a strong beat. Focus on staying on rhythm.\n3.  **Add Variety:** (5 mins) - Try changing direction or adding a simple arm movement.\n4.  **Freestyle:** (3 mins) - Just let go and move to the music without thinking. This is where the magic happens!\n5.  **Cool Down:** (2 mins) - Stretch a little. Appreciate the work you just did.\n\n### **How to Learn a Specific Style**\nIf you want to learn salsa, hip-hop, or swing, the fundamentals are the same but the style is different.\n*   **YouTube is your best friend.** Search for \"beginner [dance style] basic step.\"\n    *   *Example:* \"Beginner Salsa basic step\" or \"Hip-hop dance for beginners\"\n*   **Look for teachers who explain the *why*,** not just the *what*. You want someone who explains the rhythm and the weight shifts.\n*   **Learn the basic step** of that style until you can do it without thinking. It's the foundation for everything else.\n\n### **Final Tips**\n*   **It's okay to look silly:** In your room, no one is watching. Give yourself permission to be bad at it.\n*   **Start slow:** To build confidence, practice to slower songs first. A song with 120 BPM (beats per minute) is easier than one with 140 BPM.\n*   **Feel the music:** Don't just count. Close your eyes. What does the music want your body to do? Does it want a sharp move or a smooth one?\n*   **Practice consistently:** 15-20 minutes every day is better than 2 hours once a month.\n*   **Consider a class:** If you can, a beginner's class is the best way to start. The teacher gives you feedback, and you're with people at your level. It's a blast!\n\nYou are now ready to begin your journey. Put on a song you love. Start slow. And remember...\n\n**The goal is not to be perfect. The goal is to feel the joy of moving to the music.**\nLet's dance",
        "createdAt": "2025-10-26T21:39:27.179Z",
        "updatedAt": "2025-10-26T21:40:13.536Z"
    }
]
export default chatHistoryNew