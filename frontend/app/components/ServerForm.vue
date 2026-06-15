<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const isOpen = ref(false);
const isLoading = ref(false);
const serverToken = ref<string | null>(null);
const isCopied = ref(false);

// Regex pour valider un nom de domaine ou un hôte (sans http/https)
const domainRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i;

// 1. Schéma de validation corrigé et robuste
const schema = z.object({
  name: z.string().min(3, "Le nom doit faire au moins 3 caractères"),
  ipAddress: z.ipv4("Adresse IP invalide"),
  description: z.string().optional(),
});

type Schema = z.infer<typeof schema>;

const state = reactive({
  name: undefined,
  ipAddress: undefined,
  description: undefined,
});

// 2. Soumission vers ton API AdonisJS
async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true;
  try {
    const response: any = await $fetch("/api/servers/add", {
      method: "POST",
      body: event.data,
    });

    serverToken.value = response;
  } catch (error) {
    console.error("Erreur création serveur:", error);
  } finally {
    isLoading.value = false;
  }
}

async function copyToken() {
  if (!serverToken.value) return;
  try {
    await navigator.clipboard.writeText(serverToken.value);
    isCopied.value = true;
    setTimeout(() => (isCopied.value = false), 2000);
  } catch (err) {
    console.error("Impossible de copier le texte : ", err);
  }
}
const resetForm = () => {
  serverToken.value = null;
  isCopied.value = false;
  state.name = undefined;
  state.ipAddress = undefined;
  state.description = undefined;
};
</script>

<template>
  <UModal
    :title="
      serverToken ? 'Serveur enregistré !' : 'Connecter un nouveau serveur'
    "
    :description="
      serverToken
        ? 'Votre agent est prêt.'
        : 'Remplissez les informations pour générer l\'agent.'
    "
    :dismissible="!serverToken"
    @close="resetForm"
  >
    <UButton icon="i-lucide-plus" label="Ajouter un serveur" color="primary" />

    <template #body>
      <div v-if="serverToken" class="space-y-4 py-2">
        <div class="flex flex-col items-center text-center">
          <UIcon
            name="i-lucide-shield-check"
            class="w-12 h-12 text-green-500 mb-2"
          />
          <p class="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
            Copie ce token secret. Tu en as besoin pour configurer l'agent
            Vesselify sur ton VPS. Pour des raisons de sécurité, il ne sera plus
            jamais réaffiché.
          </p>
        </div>

        <div
          class="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-800 flex items-center justify-between gap-2"
        >
          <code
            class="text-xs font-mono text-primary break-all select-all mr-2"
          >
            {{ serverToken }}
          </code>
          <UButton
            :icon="isCopied ? 'i-lucide-check' : 'i-lucide-copy'"
            :color="isCopied ? 'success' : 'neutral'"
            variant="ghost"
            @click="copyToken"
          />
        </div>
      </div>

      <div v-else class="py-2">
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField
            label="Nom du serveur"
            name="name"
            required
            description="Un nom clair pour t'y retrouver (ex: VPS-Prod-Hetzner)"
          >
            <UInput
              v-model="state.name"
              placeholder="Mon super serveur Linux"
              icon="i-lucide-server"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Adresse IP ou Domaine"
            name="ipAddress"
            required
            description="L'IP publique ou le sous-domaine pointant vers la machine"
          >
            <UInput
              v-model="state.ipAddress"
              placeholder="192.168.1.50 ou api.vesselify.com"
              icon="i-lucide-globe"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Description (Optionnel)"
            name="description"
            description="Détails sur l'usage de cette machine"
          >
            <UTextarea
              v-model="state.description"
              placeholder="Serveur dédié à l'hébergement des outils internes et apps de test..."
              class="w-full"
              :rows="3"
              :autoresize="false"
            />
          </UFormField>

          <div
            class="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800"
          >
            <UButton
              type="submit"
              label="Générer l'agent"
              :loading="isLoading"
              color="primary"
            />
          </div>
        </UForm>
      </div>
    </template>
  </UModal>
</template>
