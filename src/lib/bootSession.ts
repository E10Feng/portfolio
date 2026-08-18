const BOOT_KEY = "portfolio:boot-played"

export function hasBootPlayed(): boolean {
  if (typeof window === "undefined" || !window.sessionStorage) return true
  return window.sessionStorage.getItem(BOOT_KEY) === "1"
}

export function markBootPlayed(): void {
  if (typeof window === "undefined" || !window.sessionStorage) return
  window.sessionStorage.setItem(BOOT_KEY, "1")
}
