const createRouteWithQueryParams = (route, query) => {
  if (!query) {
    return route
  }

  const qs = new URLSearchParams(query).toString()

  return `${route}?${qs}`
}

const routes = {
  home: () => "/",
  login: () => "/login",
  register: () => "/register",
  profile: userId => `/profile/${userId}`,
  apiRelation: {
    teabags: {
      userTeabags: idUser => createRouteWithQueryParams(`/teabags/${idUser}`),
      userCreateTeabag: idUser => createRouteWithQueryParams(`teabags/${idUser}/createTeabag`)
    }
  },
  apiUser: {
    profile: userId => `/api/user/${userId}`,
    updateProfile: userId => `/api/user/${userId}/update`,
    search: search => createRouteWithQueryParams(`/api/user/search/${search}`)
  },
  apiPost: {
    post: {
      forYou: (idUser, page) => createRouteWithQueryParams(`/post/for-you/${idUser}?page=${page}`),
      subscribed: (idUser, page) => createRouteWithQueryParams(`/post/subscribed/${idUser}?page=${page}`),
      deletePost: (postId, idUser) => createRouteWithQueryParams(`/post/${postId}/${idUser}`)
    },
    like: {
      likes: (postId, idUser) => createRouteWithQueryParams(`/post/likes/${postId}/${idUser}`),
      like: (postId, idUser) => createRouteWithQueryParams(`/post/like/${postId}/${idUser}`),
      liked: (postId, idUser) => createRouteWithQueryParams(`/post/liked/${postId}/${idUser}`)
    },
    report: {
      report: (postId, idUser) => createRouteWithQueryParams(`/post/report/${postId}/${idUser}`)
    }
  }
}

export default routes
