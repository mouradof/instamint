// errors.js
const HTTP_STATUS_CODES = {
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  OK: 200
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
  LIKE_REMOVED: "Like removed from post"
}

export { HTTP_STATUS_CODES, HTTP_ERRORS }
