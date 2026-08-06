import { type SchemaTypeDefinition } from 'sanity'
import { roomType } from './roomType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [roomType],
}
