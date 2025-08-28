// ✅ set token
export const setCookie = (
  name: string,
  value: string,
  maxAge?: number,
  options: { path?: string; secure?: boolean; sameSite?: "Strict" | "Lax" | "None" } = {}
) => {
    // enCodeURLComponent() methode make prosissing on names and values that contains spaces or spicial charactars
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};`

  if (options.path) {
    cookie += ` path=${options.path};`
  } else {
    cookie += ` path=/;`
  }

  if (maxAge) {
    cookie += ` max-age=${maxAge};`
  }

  if (options.secure) {
    cookie += ` secure;`
  }

  if (options.sameSite) {
    cookie += ` samesite=${options.sameSite};`
  }

  document.cookie = cookie
}



// ✅ get cookie
export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${encodeURIComponent(name)}=`)
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()!.split(";").shift() || "")
  }
  return null
}

// ✅ remove cookie
export const removeCookie = (name: string, path: string = "/") => {
  document.cookie = `${encodeURIComponent(name)}=; path=${path}; max-age=0`
}
