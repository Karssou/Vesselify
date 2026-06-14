import { useAuthStore } from "~/stores/auth_store";

export const useAuth = () => {
  const { setToken, clearToken, setUser, clearUser, logout } = useAuthStore();

  const toast = useToast();

  const handleBackendError = (backend: any): any => {
    if (backend?.statusCode === 422 && backend?.data) {
      return {
        success: false,
        fieldErrors: Object.entries(backend.data).map(([name, message]) => ({
          name,
          message: String(message),
        })),

        message: backend.data?.message || backend.message,
        statusCode: backend.statusCode,
      };
    }

    return {
      success: false,
      message: backend?.message ?? "Une erreur inattendue est survenue",
      statusCode: backend?.statusCode,
    };
  };

  async function loginUser(payload: any): Promise<any | null> {
    try {
      const response: any = await $fetch("/api/auth/login", {
        method: "POST",
        body: payload,
      });

      if (response.data) {
        setToken(response.data.token);
        setUser(response.data.user);
      } 

      toast.add({
        title: "Login successful !",
        color: "success",
        icon: "material-symbols:check-rounded",
      });

      return { success: true, data: response.data!, message: response.message };
    } catch (error: any) {
      return error;
    }
  }

  async function registerUser(payload: any): Promise<any | null> {
    try {
      const response: any = await $fetch("/api/auth/signup", {
        method: "POST",
        body: payload,
      });

      if (response.data) {
        setToken(response.data.token);
        setUser(response.data.user);
      }

      toast.add({
        title: "Account created !",
        color: "success",
        icon: "material-symbols:check-rounded",
      });

      return { success: true, data: response.data!, message: response.message };
    } catch (error: any) {
      return error;
    }
  }

  async function logoutUser() {
    try {
      // const response = await $fetch<GenericAPIResponse<AuthUserResponse>>(
      //   "api/auth/register",
      //   {
      //     method: "POST",
      //   },
      // );

      logout();

      toast.add({
        title: "Log out successfully !",
        color: "success",
        icon: "material-symbols:check-rounded",
      });
    } catch (error: any) {
      return handleBackendError(error?.data);
    }
  }

  return {
    logoutUser,
    loginUser,
    registerUser,
  };
};
