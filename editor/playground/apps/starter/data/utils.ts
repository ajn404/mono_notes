import { type Workspace } from '@notes/store';

export interface InitFn {
    (workspace: Workspace, pageId: string): void;
    id: string;
    displayName: string;
    description: string;
}
