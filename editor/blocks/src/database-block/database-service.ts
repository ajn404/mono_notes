import { BlockService } from '@notes/block-std';

import { DatabaseSelection } from './common/selection.js';
import type { DatabaseBlockModel } from './database-model.js';

export class DatabaseService extends BlockService<DatabaseBlockModel> {
    override mounted(): void {
        super.mounted();
        this.selectionManager.register(DatabaseSelection);

        this.handleEvent('selectionChange', () => true);
    }
}
