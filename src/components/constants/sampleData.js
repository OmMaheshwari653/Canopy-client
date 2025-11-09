export const sampleChats = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John Doe",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: [
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
    ],
    name: "Johnny Sins",
    _id: "2",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John Doe",
    _id: "3",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: [
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
    ],
    name: "Johnny Sins",
    _id: "4",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John Doe",
    _id: "5",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: [
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
    ],
    name: "Johnny Sins",
    _id: "6",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John Doe",
    _id: "7",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: [
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
    ],
    name: "Johnny Sins",
    _id: "8",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John Doe",
    _id: "9",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: [
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
    ],
    name: "Johnny Sins",
    _id: "10",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John Doe",
    _id: "11",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: [
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
    ],
    name: "Johnny Sins",
    _id: "12",
    groupChat: true,
    members: ["1", "2"],
  },
];

export const sampleUsers = [
  {
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
    name: "John Doe",
    _id: "1",
  },
  {
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
    name: "Johnny Sins",
    _id: "2",
  },
];

export const sampleNotifications = [
  {
    sender: {
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      name: "John Doe",
    },
    _id: "1",
  },
  {
    sender: {
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      name: "Johnny Sins",
    },
    _id: "2",
  },
];

export const sampleMessages = [
  {
    attachments: [],
    content: "Hello! How are you?",
    _id: "1",
    sender: {
      _id: "user._id",
      name: "Dev",
    },
    chat: "chatId",
    createdAt: "2025-08-08T18:30:00.000Z",
  },
  {
    attachments: [
      {
        public_id: "adsadd2",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    content: "",
    _id: "2",
    sender: {
      _id: "sdcckdk",
      name: "Dev 2",
    },
    chat: "chatId",
    createdAt: "2025-08-08T18:30:00.000Z",
  },
];

export const dashboardData = {
  users: [
    {
      name: "John Doe",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      _id: 1,
      username: "john_doe",
      friends: 20,
      groups: 5,
    },
    {
      name: "Johnny Sins",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      _id: 2,
      username: "johnny_sins",
      friends: 30,
      groups: 10,
    },
  ],
  chats: [
    {
      name: "Chat 1",
      avatar: [
        "https://www.w3schools.com/howto/img_avatar.png",
        "https://www.w3schools.com/howto/img_avatar.png",
        "https://www.w3schools.com/howto/img_avatar.png",
        "https://www.w3schools.com/howto/img_avatar.png",
      ],
      _id: "1",
      groupChat: false,
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 2,
      totalMessages: 5,
      creator: {
        name: "John Doe",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
    {
      name: "Chat 2",
      avatar: [
        "https://www.w3schools.com/howto/img_avatar.png",
        "https://www.w3schools.com/howto/img_avatar.png",
        "https://www.w3schools.com/howto/img_avatar.png",
        "https://www.w3schools.com/howto/img_avatar.png",
      ],
      _id: "2",
      groupChat: false,
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 2,
      totalMessages: 5,
      creator: {
        name: "John Doe",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
  ],
  messages: [
    {
      attachments: [
        {
          public_id: "adsadd1",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "Hello! How are you?",
      _id: "1",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Dev",
      },
      chat: "chatId",
      groupChat: false,
      createdAt: "2025-08-08T18:30:00.000Z",
    },
    {
      attachments: [
        {
          public_id: "adsadd2",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "",
      _id: "2",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Dev 2",
      },
      chat: "chatId",
      groupChat: true,
      createdAt: "2025-08-08T18:30:00.000Z",
    },
  ],
};
