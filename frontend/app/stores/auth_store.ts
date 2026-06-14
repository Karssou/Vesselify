import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const token = useCookie("auth_token", {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: false,
  });

  const userCookie = useCookie("user_data", {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
    secure: true,
  });

  const user = ref(userCookie.value ?? null);
  const avatarNonce = ref<number>(0);

  // Computed
  const isAuthenticated = computed(() => !!token.value);
  const userId = computed(() => user.value?.id ?? null);
  const profilePictureUrl = computed(() => {
    if (!isAuthenticated.value) return null;
    const nonce = avatarNonce.value || 0;
    return `/api/users/me/profile-picture?v=${nonce}`;
  });

  // Actions
  function setToken(newToken: string) {
    token.value = newToken;
  }

  function clearToken() {
    token.value = null;
  }

  function setUser(userData: any) {
    user.value = userData;
    userCookie.value = userData;
  }

  function clearUser() {
    user.value = null;
    userCookie.value = null;
  }

  function logout() {
    clearToken();
    clearUser();
    avatarNonce.value = 0;
  }

  function bumpAvatar() {
    avatarNonce.value = Date.now();
  }

  if (!user.value && userCookie.value) {
    user.value = userCookie.value;
  }

  return {
    token,
    user,
    isAuthenticated,
    userId,
    profilePictureUrl,
    bumpAvatar,
    setToken,
    clearToken,
    setUser,
    clearUser,
    logout,
  };
});
