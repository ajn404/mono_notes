import { BlockService } from '@notes/block-std';

import type { PageBlockModel } from '../page-model.js';

export class EdgelessPageService extends BlockService<PageBlockModel> {
    override unmounted() {
        super.unmounted();
        this.selectionManager.set([]);
    }
}
