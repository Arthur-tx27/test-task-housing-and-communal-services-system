const BASE_URL = process.env.SHOWROOM_API_URL ?? '';

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
  params?: Record<string, string>
): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const response = await fetch(url.toString(), { method });

  if (!response.ok) {
    throw new ApiError(
      `Ошибка ${response.status}: ${response.statusText}`,
      response.status
    );
  }

  return response.json();
}

export async function get<T>(
  path: string,
  params?: Record<string, string>
): Promise<T> {
  return request<T>('GET', path, params);
}

export async function del(path: string): Promise<void> {
  await request<unknown>('DELETE', path);
}
