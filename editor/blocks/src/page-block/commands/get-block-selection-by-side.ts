import type { Command } from '@notes/block-std';
import type { BlockSelection } from '@notes/block-std';

export const getBlockSelectionsCommand: Command<never, 'blockSelections'> = (
    ctx,
    next
) => {
    const blockSelections = ctx.std.selection.filter('block');

    return next({ blockSelections });
};

declare global {
    namespace BlockSuite {
        interface CommandData {
            blockSelections: BlockSelection[];
        }

        interface Commands {
            getBlockSelections: typeof getBlockSelectionsCommand;
        }
    }
}
