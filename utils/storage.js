const storagePrefix = 'sandbox_'

const storage = {
  getAccessToken: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}token`))
  },
  setAccessToken: (token) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token))
  },
  clearAccessToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`)
  },
}

export default storage
