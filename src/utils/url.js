/** "https://www.ornek.com/yol" → "ornek.com" (geçersiz adreste girdiyi olduğu gibi döner). */
export function hostOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}
