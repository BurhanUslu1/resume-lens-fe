/**
 * Thin fetch wrapper that detects 401 Unauthorized responses and
 * dispatches a global 'auth:unauthorized' event so the app can
 * automatically log the user out.
 */
export async function apiClient(
  url: string,
  options?: RequestInit
): Promise<Response> {
  const response = await fetch(url, options);

  if (response.status === 401 && typeof window !== 'undefined') {
    window.dispatchEvent(new Event('auth:unauthorized'));
  }

  return response;
}
