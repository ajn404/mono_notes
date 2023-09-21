import type { Command } from '@notes/block-std';
import type { TextSelection } from '@notes/block-std';

export const getTextSelectionCommand: Command<never, 'textSelection'> = (
    ctx,
    next
) => {
    const textSelection = ctx.std.selection.find('text');
    if (!textSelection) {
        return;
    }

    return next({ textSelection });
};

declare global {
    namespace BlockSuite {
        interface CommandData {
            textSelection: TextSelection;
        }

        interface Commands {
            getTextSelection: typeof getTextSelectionCommand;
        }
    }
}
