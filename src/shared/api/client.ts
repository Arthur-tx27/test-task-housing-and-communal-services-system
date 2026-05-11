const BASE_URL = process.env.VITE_API_BASE_URL ?? '';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<T>(
  method: string,
  path: string,
  params?: Record<string, string | string[]>
): Promise<T> {
  const fullPath = `${BASE_URL}${path}`;
  const url = new URL(fullPath, location.origin);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => url.searchParams.append(key, v));
      } else {
        url.searchParams.append(key, value);
      }
    });
  }

  const response = await fetch(url.toString(), { method });

  if (!response.ok) {
    throw new ApiError(
      `Ошибка ${response.status}: ${response.statusText}`,
      response.status
    );
  }

  const text = await response.text();
  return text ? JSON.parse(text) : (undefined as T);
}

export async function get<T>(
  path: string,
  params?: Record<string, string | string[]>
): Promise<T> {
  return request<T>('GET', path, params);
}

export async function del(path: string): Promise<void> {
  await request<unknown>('DELETE', path);
}
