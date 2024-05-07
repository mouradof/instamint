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
  apiRelation: {
    teabags: {
      userTeabags: idUser => createRouteWithQueryParams(`/teabags/${idUser}`),
      userCreateTeabag: idUser => createRouteWithQueryParams(`teabags/${idUser}/createTeabag`)
    }
  }
}

export default routes
