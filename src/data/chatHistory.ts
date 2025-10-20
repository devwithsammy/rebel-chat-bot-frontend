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
export default chatHistory