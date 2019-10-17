export const base64Encode = (data: string) => {
  if (process.env.SSR) {
    return Buffer.from(data, "binary").toString("base64")
  }

  const encoded = encodeURIComponent(data)

  const escaped = encoded.replace(/%([0-9A-F]{2})/g, (_, hex) => {
    return String.fromCharCode(parseInt(hex, 16))
  })

  return btoa(escaped)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "")
}

export const base64Decode = (base64: string) => {
  const b64 = base64.replace(/-/g, "+").replace(/_/g, "/")

  if (process.env.SSR) {
    return Buffer.from(b64, "base64").toString("binary")
  }

  try {
    const encoded = atob(b64)
      .split("")
      .map(char => char.charCodeAt(0).toString(16))
      .map(hex => `%${hex.padStart(2, "0").slice(-2)}`)
      .join("")

    return decodeURIComponent(encoded)
  } catch {
    // do nothing
  }
}
