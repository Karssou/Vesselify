export default defineEventHandler(async (event) => {
  const payload = await readBody(event);
  const API_URL = useRuntimeConfig().public.apiBaseUrl;
  const token = getCookie(event, "auth_token");
  try {
    const data = await $fetch(`${API_URL}/servers/create`, {
      method: "POST",
      body: payload,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: any) {
    return error;
  }
});
