function adviceApi(query) {
  return fetch(`https://api.adviceslip.com/advice/search/${query}`).then(
    (res) => res.json()
  )
}

export default adviceApi
