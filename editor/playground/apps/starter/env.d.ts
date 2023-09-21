import type { TestUtils } from '@notes/blocks';
import type { ContentParser } from '@notes/blocks/content-parser';
import type { EditorContainer } from '@notes/editor';
import type {
    BlockSchema,
    DocProvider,
    Page,
    Workspace,
} from '@notes/store';
import type { Job } from '@notes/store';
import type { z } from 'zod';

declare global {
    interface Window {
        editor: EditorContainer;
        page: Page;
        workspace: Workspace;
        blockSchemas: z.infer<typeof BlockSchema>[];
        ContentParser: typeof ContentParser;
        job: Job;
        Y: typeof Workspace.Y;
        std: typeof std;
        testUtils: TestUtils;

        // TODO: remove this when provider support subdocument
        subdocProviders: Map<string, DocProvider[]>;
    }
}
