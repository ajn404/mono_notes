import { defineBlockSchema, type SchemaToModel } from '@notes/store';

export const DividerBlockSchema = defineBlockSchema({
    flavour: 'affine:divider',
    metadata: {
        version: 1,
        role: 'content',
        children: [],
    },
});

export type DividerBlockModel = SchemaToModel<typeof DividerBlockSchema>;
