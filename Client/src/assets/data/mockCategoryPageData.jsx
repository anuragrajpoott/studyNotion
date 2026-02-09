 const mockCategoryPageData = {
  selectedCategory: {
    _id: "698767d1cda4c5ce5cf35fa1",
    name: "Web Development",
    description: "All web development courses from beginner to advanced",
    createdAt: "2026-02-07T16:26:57.312Z",
    updatedAt: "2026-02-07T16:26:57.312Z",
  },

  selectedCategoryCourses: [
    {
      _id: "701a1b2c3d4e5f0011223344",
      courseName: "Full Stack Web Development",
      courseDescription:
        "Learn HTML, CSS, JavaScript, Node.js, Express, MongoDB and build real projects.",
      instructor: {
        _id: "701b2c3d4e5f0011223345",
        name: "Rahul Sharma",
      },
      whatYouWillLearn:
        "Frontend, backend, REST APIs, authentication, and deployment.",
      price: 2999,
      thumbnail:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      tag: ["web", "fullstack", "mern"],
      category: "698767d1cda4c5ce5cf35fa1",
      instructions: [
        "Basic computer knowledge",
        "Willingness to learn",
      ],
      status: "Published",
      createdAt: "2026-02-01T10:00:00.000Z",
      updatedAt: "2026-02-01T10:00:00.000Z",
    },
    {
      _id: "701a1b2c3d4e5f0099887766",
      courseName: "Frontend Development with React",
      courseDescription:
        "Build responsive, modern UIs using React and Tailwind CSS.",
      instructor: {
        _id: "701b2c3d4e5f0099887767",
        name: "Anjali Verma",
      },
      whatYouWillLearn:
        "React hooks, routing, state management, and best practices.",
      price: 2499,
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      tag: ["react", "frontend", "javascript"],
      category: "698767d1cda4c5ce5cf35fa1",
      instructions: [
        "Basic JavaScript knowledge required",
      ],
      status: "Published",
      createdAt: "2026-02-02T12:00:00.000Z",
      updatedAt: "2026-02-02T12:00:00.000Z",
    },
  ],

  differentCategory: {
    _id: "698767d1cda4c5ce5cf99aaa",
    name: "Mobile Development",
    description: "Learn to build Android and iOS apps",
    createdAt: "2026-01-20T10:00:00.000Z",
    updatedAt: "2026-01-20T10:00:00.000Z",
  },

  differentCategoryCourses: [
    {
      _id: "702a9b8c7d6e5f4433221100",
      courseName: "React Native Bootcamp",
      courseDescription:
        "Build cross-platform mobile apps using React Native.",
      instructor: {
        _id: "702b9c8d7e6f554433221101",
        name: "Vikram Singh",
      },
      whatYouWillLearn:
        "React Native components, navigation, APIs, and publishing apps.",
      price: 2799,
      thumbnail:
        "https://images.unsplash.com/photo-1518770660439-4636190af475",
      tag: ["react native", "mobile", "ios", "android"],
      category: "698767d1cda4c5ce5cf99aaa",
      instructions: [
        "JavaScript basics required",
      ],
      status: "Published",
      createdAt: "2026-01-25T09:00:00.000Z",
      updatedAt: "2026-01-25T09:00:00.000Z",
    },
  ],

  mostSellingCourses: [
    {
      _id: "703a1a2b3c4d5e999888777",
      courseName: "JavaScript Zero to Hero",
      courseDescription:
        "Master JavaScript from scratch with real-world projects.",
      instructor: {
        _id: "703b1a2b3c4d5e999888778",
        name: "Amit Patel",
      },
      whatYouWillLearn:
        "Core JS, ES6+, async programming, and problem solving.",
      price: 1999,
      thumbnail:
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
      tag: ["javascript", "programming"],
      category: "698767d1cda4c5ce5cf35fa1",
      instructions: [
        "No prior programming experience required",
      ],
      status: "Published",
      createdAt: "2026-01-10T08:00:00.000Z",
      updatedAt: "2026-01-10T08:00:00.000Z",
    },
  ],
};

export default mockCategoryPageData;