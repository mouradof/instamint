const HTTP_STATUS_CODES = {
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  OK: 200,
  CREATED: 201
}

const HTTP_ERRORS = {
  MISSING_AUTH_HEADER: "Missing authorization header",
  INVALID_PAGE_NUMBER: "Invalid page number",
  NO_FOLLOWED_USERS: "No followed users",
  NO_FOLLOWED_IDS: "No followed ids",
  NO_FOLLOWED_POSTS: "No followed posts",
  FETCH_POSTS_FAILED: "Failed to fetch posts",
  ALREADY_LIKED: "You have already liked this post",
  NOT_LIKED: "You have not liked this post",
  LIKE_STATUS_ERROR: "Error checking like status for post",
  RETRIEVE_LIKE_COUNT_ERROR: "Error retrieving like count for post",
  LIKE_ADDED: "Like added to post",
  LIKE_REMOVED: "Like removed from post",
  NOT_AUTHORIZED_OR_NOT_FOUND: "Not authorized to delete this post or post not found",
  POST_DELETED: "Post successfully deleted",
  DELETE_POST_FAILED: "Failed to delete post",
  CREATE_POST_FAILED: "Failed to create post",
  UNSUPPORTED_FILE_FORMAT: "Unsupported file format or missing path.",
  POST_CREATED_SUCCESS: "Post created successfully!"
}

export { HTTP_STATUS_CODES, HTTP_ERRORS }
