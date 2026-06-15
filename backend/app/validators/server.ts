import vine, { ValidationError } from '@vinejs/vine'

/**
 * Regex pour valider un nom de domaine (ex: api.vesselify.com, localhost)
 */
const domainRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i

export const createServerValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(100),

    ipAddress: vine
      .string()
      .trim()
      .transform((value, field) => {
        const isIp = vine.helpers.isIP(value)
        const isDomain = domainRegex.test(value)

        if (!isIp && !isDomain) {
          // On lève l'erreur native de VineJS pour que Nuxt reçoive le bon format 422
          throw new ValidationError([
            {
              message: "L'adresse doit être une IP valide ou un nom de domaine",
              rule: 'ip_or_domain',
              field: field.wildCardPath,
            },
          ])
        }

        return value
      }),

    description: vine.string().trim().maxLength(500).optional(),
  })
)
