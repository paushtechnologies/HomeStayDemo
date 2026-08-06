export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Provide a placeholder so it compiles, but alert the user if missing
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder-project-id'

export const useCdn = false
