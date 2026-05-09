const TEST_URL = 'http://test-api.example.com';

describe('API client', () => {
  let get: typeof import('@/shared/api/client').get;
  let del: typeof import('@/shared/api/client').del;
  let ApiError: typeof import('@/shared/api/client').ApiError;

  beforeAll(() => {
    process.env.SHOWROOM_API_URL = TEST_URL;
  });

  beforeEach(async () => {
    jest.resetModules();
    const mod = await import('@/shared/api/client');
    get = mod.get;
    del = mod.del;
    ApiError = mod.ApiError;
  });

  describe('get', () => {
    it('выполняет GET-запрос и возвращает JSON', async () => {
      const mockResponse = { results: [{ id: '1' }], count: 1 };
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await get('/meters/');

      expect(global.fetch).toHaveBeenCalledWith(`${TEST_URL}/meters/`, {
        method: 'GET',
      });
      expect(result).toEqual(mockResponse);
    });

    it('добавляет query-параметры к URL', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({}),
      });

      await get('/meters/', { limit: '20', offset: '0' });

      const url = (global.fetch as jest.Mock).mock.calls[0][0];
      expect(url).toContain(`${TEST_URL}/meters/?`);
      expect(url).toContain('limit=20');
      expect(url).toContain('offset=0');
    });

    it('выбрасывает ApiError при HTTP-ошибке', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      await expect(get('/meters/999/')).rejects.toThrow(ApiError);
      await expect(get('/meters/999/')).rejects.toMatchObject({
        status: 404,
        message: 'Ошибка 404: Not Found',
      });
    });

    it('выбрасывает ошибку при сетевом сбое', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

      await expect(get('/meters/')).rejects.toThrow('Network error');
    });
  });

  describe('del', () => {
    it('выполняет DELETE-запрос', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(null),
      });

      await del('/meters/123/');

      expect(global.fetch).toHaveBeenCalledWith(`${TEST_URL}/meters/123/`, {
        method: 'DELETE',
      });
    });

    it('выбрасывает ApiError при HTTP-ошибке DELETE', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      await expect(del('/meters/123/')).rejects.toThrow(ApiError);
    });
  });
});
