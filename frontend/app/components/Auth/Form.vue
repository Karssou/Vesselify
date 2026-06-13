<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent, AuthFormField } from "@nuxt/ui";

const isLogin = ref(true);

const fields = computed<AuthFormField[]>(() => {
  const baseFields: AuthFormField[] = [
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      required: true,
    },
  ];

  if (isLogin.value) return baseFields;

  return [
    {
      name: "fullName",
      type: "text",
      label: "Full Name",
      placeholder: "Enter your full name",
      required: true,
    },
    ...baseFields,
    {
      name: "passwordConfirmation",
      label: "Password confirmation",
      type: "password",
      placeholder: "Confirm your password",
      required: true,
    },
  ];
});

const schema = computed(() => {
  const baseSchema = {
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Must be at least 8 characters"),
  };

  if (isLogin.value) {
    return z.object(baseSchema);
  }

  return z
    .object({
      ...baseSchema,
      fullName: z.string().min(2, "Full name is required"),
      passwordConfirmation: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Passwords do not match",
      path: ["passwordConfirmation"],
    });
});

type Schema = z.infer<typeof schema.value>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const endpoint = isLogin.value ? "/auth/login" : "/auth/signup";

  try {
    const response = await $fetch(`http://localhost:3333${endpoint}`, {
      method: "POST",
      body: payload.data,
    });

    console.log("Success:", response);
    // TODO: Stocker le token d'authentification (session/cookie) et rediriger
  } catch (error) {
    console.error("Authentication error:", error);
  }
}
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center gap-4 p-4 bg-gray-50 dark:bg-gray-900"
  >
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        :title="isLogin ? 'Welcome Back' : 'Create an Account'"
        :description="
          isLogin
            ? 'Enter your credentials to access Vesselify.'
            : 'Sign up to start managing your servers.'
        "
        icon="i-lucide-user"
        :fields="fields"
        :submit-button="{ label: isLogin ? 'Sign In' : 'Register' }"
        @submit="onSubmit"
      />

      <div
        class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-center"
      >
        <button
          type="button"
          class="text-sm text-primary hover:underline"
          @click="isLogin = !isLogin"
        >
          {{
            isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Log in"
          }}
        </button>
      </div>
    </UPageCard>
  </div>
</template>
