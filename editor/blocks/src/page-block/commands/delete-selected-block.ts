import type { Command } from '@notes/block-std';
import { assertExists } from '@notes/global/utils';

export const deleteSelectedBlockCommand: Command<'selectedModels'> = (
    ctx,
    next
) => {
    try {
        const models = ctx.selectedModels;
        assertExists(models);

        models.forEach(model => {
            ctx.std.page.deleteBlock(model);
        });

        return next();
    } catch {
        return;
    }
};

declare global {
    namespace BlockSuite {
        interface Commands {
            deleteSelectedBlock: typeof deleteSelectedBlockCommand;
        }
    }
}
