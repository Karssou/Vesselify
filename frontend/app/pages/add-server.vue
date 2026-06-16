<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const step = ref(1);
const serverName = computed(() => state.description);
const copied = ref(false);
const serverToken = ref<string | null>(null);

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

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const response: any = await $fetch("/api/servers/add", {
      method: "POST",
      body: event.data,
    });
    nextStep();
    serverToken.value = response;
  } catch (error) {
    console.error("Erreur création serveur:", error);
  }
}
const command = computed(
  () =>
    `curl -sSL https://get.vesselify.com/agent.sh | sh -s -- --token XYZ123`,
);

async function copyCommand() {
  await navigator.clipboard.writeText(command.value);
  copied.value = true;

  setTimeout(() => {
    copied.value = false;
  }, 2000);
}

function nextStep() {
  step.value++;
}

async function startWaiting() {
  step.value = 3;

  await new Promise((resolve) => setTimeout(resolve, 3500));

  step.value = 4;
}
</script>

<template>
  <UContainer class="max-w-2xl py-12">
    <UStepper
      :items="[
        { title: 'Serveur' },
        { title: 'Installation' },
        { title: 'Connexion' },
        { title: 'Terminé' },
      ]"
      :model-value="step - 1"
      :disabled="true"
    />

    <UCard class="mt-8">
      <Transition name="step-fade" mode="out-in">
        <div :key="step">
          <template v-if="step === 1">
            <h1 class="text-3xl font-semibold mb-5">Ajouter un serveur</h1>

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
                class="space-y-2"
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
                class="space-y-2"
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
                class="space-y-2"
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
                class="flex justify-end gap-3 pt-4 border-t border-neutral-800"
              >
                <UButton
                  label="Passer"
                  loading-auto
                  variant="outline"
                  @click="nextStep"
                  color="secondary"
                />
                <UButton
                  type="submit"
                  label="Générer l'agent"
                  loading-auto
                  color="primary"
                />
              </div>
            </UForm>
          </template>

          <template v-else-if="step === 2">
            <h2 class="text-xl font-semibold">Installer l'agent</h2>

            <UAlert class="mt-6" color="neutral" variant="subtle">
              <template #leading>
                <UIcon name="i-lucide-info" class="size-6" />
              </template>
              <template #title>
                <span class="font-light"
                  >L'installation nécessite des privilèges
                  <strong class="text-primary font-bold">sudo</strong>
                  Assurez-vous que votre serveur est connecté à Internet.</span
                >
              </template>
            </UAlert>

            <div
              class="mt-6 rounded-lg border border-default bg-muted p-4 font-mono text-sm"
            >
              {{ command }}
            </div>

            <div class="mt-4 flex gap-2">
              <UButton @click="nextStep"> J'ai lancé la commande </UButton>
              <UButton variant="subtle" @click="copyCommand">
                J'ai besoin d'aide
              </UButton>
            </div>
          </template>

          <template v-else-if="step === 3">
            <div
              class="flex flex-col items-center justify-center text-center p-8"
            >
              <div
                class="relative flex items-center justify-center w-24 h-24 mb-6"
              >
                <div
                  class="absolute inset-0 rounded-full border-2 border-primary/10 border-t-primary animate-spin"
                ></div>

                <div
                  class="absolute w-24 h-24 bg-primary/10 rounded-full blur-md animate-pulse"
                ></div>

                <UIcon
                  name="material-symbols:sensors-rounded"
                  class="text-primary text-3xl relative z-10 animate-pulse"
                />
              </div>

              <h3 class="text-lg font-semibold tracking-tight">
                Liaison en cours...
              </h3>

              <p class="text-sm text-muted mt-2 max-w-70 leading-relaxed">
                En attente du premier ping de
                <UBadge class="ml-1" variant="subtle">
                  <button @click="nextStep">VPS CACA</button>
                </UBadge>
              </p>
            </div>
          </template>

          <template v-else>
            <div class="py-10 text-center">
              <div
                class="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-secondary/20 shadow-[0_0_50px_rgba(78,223,159,0.15)]"
              >
                <UIcon
                  name="material-symbols:check-circle-rounded"
                  class="mx-auto size-14 text-success"
                />
              </div>

              <h2 class="mt-6 text-2xl font-semibold">Serveur connecté</h2>

              <p class="text-muted mt-2">Votre agent Vesselify est actif.</p>

              <div class="grid grid-cols-2 gap-4 mt-8">
                <UCard>
                  <div class="text-xs text-muted">Status</div>

                  <UBadge color="success" variant="subtle"> Online </UBadge>
                </UCard>

                <UCard>
                  <div class="text-xs text-muted">Latency</div>

                  <div class="font-mono">12ms</div>
                </UCard>
              </div>

              <UButton
                class="mt-8 font-bold flex items-center justify-center gap-2 text-sm uppercase tracking-wide py-2 shadow-[0px_0px_20px_10px] shadow-primary/10"
                block
              >
                Accéder au dashboard
                <UIcon
                  class="size-6 ml-1"
                  name="material-symbols:dashboard-outline-rounded"
                />
              </UButton>
            </div>
          </template>
        </div>
      </Transition>
    </UCard>
  </UContainer>
</template>

<style scoped>
/* Classes de transition Vue 3 */
.step-fade-enter-active,
.step-fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.step-fade-enter-from {
  opacity: 0;
  transform: translateX(15px);
}

.step-fade-leave-to {
  opacity: 0;
  transform: translateX(-15px);
}
</style>
