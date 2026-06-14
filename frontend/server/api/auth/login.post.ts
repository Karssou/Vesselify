export default defineEventHandler(async (event) => {
  const payload = await readBody(event);
  const API_URL = useRuntimeConfig().public.apiBaseUrl;

  try {
    const data = await $fetch(`${API_URL}/auth/login`, {
      method: "POST",
      body: payload,
    });

    return data;
  } catch (error: any) {
    return error;
  }
});
