import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { server } from "../../components/constants/config.js";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/`,
  }),
  tagTypes: ["Chat", "User", "Message"],
  endpoints: (builder) => ({
    myChats: builder.query({
      query: () => ({
        url: "chat/my",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    searchUser: builder.query({
      query: (name) => ({
        url: `user/search?name=${name}`,
        credentials: "include",
      }),

      providesTags: ["User"],
    }),
    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: `user/sendrequest`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getNotifications: builder.query({
      query: () => ({
        url: `user/notifications`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),
    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: "user/acceptrequest",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),
    chatDetails: builder.query({
      query: ({ chatId, populate = false }) => {
        let url = `chat/${chatId}`;
        if (populate) url += "?populate=true";
        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),
    getMessages: builder.query({
      query: ({ chatId, page }) => ({
        url: `chat/message/${chatId}?page=${page}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),

    sendAttachments: builder.mutation({
      query: (data) => ({
        url: `chat/message`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    myGroups: builder.query({
      query: () => ({
        url: "chat/my/groups",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),

    availableFriends: builder.query({
      query: (chatId) => {
        let url = `user/friends`;
        if (chatId) url += `?chatId=${chatId}`;
        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),
    newGroup: builder.mutation({
      query: ({ name, members }) => ({
        url: `chat/new`,
        method: "POST",
        credentials: "include",
        body: { name, members },
      }),
      invalidatesTags: ["Chat"],
    }),
    renameGroup: builder.mutation({
      query: ({ chatId, name }) => ({
        url: `chat/${chatId}`,
        method: "PUT",
        credentials: "include",
        body: { name },
      }),
      invalidatesTags: ["Chat"],
    }),
    removeGroupmember: builder.mutation({
      query: ({ chatId, userId }) => ({
        url: `chat/removemember`,
        method: "PUT",
        credentials: "include",
        body: { chatId, userId },
      }),
      invalidatesTags: ["Chat"],
    }),
    addGroupmembers: builder.mutation({
      query: ({ members, chatId }) => ({
        url: `chat/addmembers`,
        method: "PUT",
        credentials: "include",
        body: { members, chatId },
      }),
      invalidatesTags: ["Chat"],
    }),
    deleteChat: builder.mutation({
      query: (chatId) => ({
        url: `chat/${chatId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),

    leaveGroup: builder.mutation({
      query: (chatId) => ({
        url: `chat/leave/${chatId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),

    // Admin Endpoints
    adminLogin: builder.mutation({
      query: (secretKey) => ({
        url: "admin/verify",
        method: "POST",
        credentials: "include",
        body: { secretKey },
      }),
      invalidatesTags: ["Chat", "User", "Message"],
    }),

    getAdmin: builder.query({
      query: () => ({
        url: "admin/",
        credentials: "include",
      }),
    }),

    adminLogout: builder.mutation({
      query: () => ({
        url: "admin/logout",
        method: "GET",
        credentials: "include",
      }),
      invalidatesTags: ["Chat", "User", "Message"],
    }),

    getDashboardStats: builder.query({
      query: () => ({
        url: "admin/stats",
        credentials: "include",
      }),
    }),

    getAdminChats: builder.query({
      query: () => ({
        url: "admin/chats",
        credentials: "include",
      }),
    }),

    getAdminUsers: builder.query({
      query: () => ({
        url: "admin/users",
        credentials: "include",
      }),
    }),

    getAdminMessages: builder.query({
      query: () => ({
        url: "admin/messages",
        credentials: "include",
      }),
    }),
  }),
});

export { api };
export default api;
export const {
  useMyChatsQuery,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useGetNotificationsQuery,
  useAcceptFriendRequestMutation,
  useChatDetailsQuery,
  useGetMessagesQuery,
  useSendAttachmentsMutation,
  useMyGroupsQuery,
  useAvailableFriendsQuery,
  useNewGroupMutation,
  useRenameGroupMutation,
  useRemoveGroupmemberMutation,
  useAddGroupmembersMutation,
  useDeleteChatMutation,
  useLeaveGroupMutation,
  useAdminLoginMutation,
  useGetAdminQuery,
  useAdminLogoutMutation,
  useGetDashboardStatsQuery,
  useGetAdminChatsQuery,
  useGetAdminUsersQuery,
  useGetAdminMessagesQuery,
} = api;
