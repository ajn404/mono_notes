import type { BlockElement } from '@notes/lit';

import type { PageBlockComponent } from '../types.js';

export function isPageComponent(
    blockElement: BlockElement
): blockElement is PageBlockComponent {
    return (
        blockElement.tagName === 'AFFINE-DOC-PAGE' ||
        blockElement.tagName === 'AFFINE-EDGELESS-PAGE'
    );
}
