export default defineEventHandler(async (event) => {
  const API_URL = useRuntimeConfig().public.apiBaseUrl;
  const token = getCookie(event, "auth_token");

  console.log("COOKIE:", getCookie(event, "auth_token"));
  console.log("API_URL:", API_URL);

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: "Missing auth token cookie",
    });
  }
  try {
    const data = await $fetch(`${API_URL}/servers/`, {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: any) {
    throw createError({
      statusCode: error?.statusCode || 500,
      statusMessage: error?.message || "API error",
    });
  }
});
