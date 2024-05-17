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
    profile: userId => `/api/user/${userId}`, // Utilisez "/api" comme base
    updateProfile: userId => `/api/user/${userId}/update`
  }
}

export default routes
