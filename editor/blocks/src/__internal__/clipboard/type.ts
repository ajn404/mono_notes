import type { Page } from '@notes/store';

export interface Clipboard {
    init(page: Page): void;
    dispose(): void;
}
