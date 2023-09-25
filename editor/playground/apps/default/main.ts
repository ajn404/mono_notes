// /// <reference types="../starter/env" />
// import '@notes/blocks';
// import '@notes/editor';
// // eslint-disable-next-line @typescript-eslint/no-restricted-imports
// import '@notes/editor/themes/affine.css';

// import { ContentParser } from '@notes/blocks/content-parser';
// import { AffineSchemas } from '@notes/blocks/models';
// import type { BlockSuiteRoot } from '@notes/lit';
// import type { DocProviderCreator, Page } from '@notes/store';
// import { Job, Workspace } from '@notes/store';

// import { QuickEdgelessMenu } from './components/quick-edgeless-menu.js';
// import { INDEXED_DB_NAME } from './providers/indexeddb-provider.js';
// import { initCollaborationSocket } from './providers/websocket-channel.js';
// import {
//     createEditor,
//     createWorkspaceOptions,
//     defaultMode,
//     initDebugConfig,
//     params,
//     testIDBExistence,
// } from './utils.js';
// import { loadPresets } from './utils/preset.js';
// import { getProviderCreators } from './utils/providers.js';

// const options = createWorkspaceOptions();
// initDebugConfig();

// // Subscribe for page update and create editor after page loaded.
// function subscribePage(workspace: Workspace) {
//     workspace.slots.pageAdded.once(pageId => {
//         if (typeof globalThis.targetPageId === 'string') {
//             if (pageId !== globalThis.targetPageId) {
//                 // if there's `targetPageId` which not same as the `pageId`
//                 return;
//             }
//         }
//         const app = document.getElementById('app');
//         if (!app) {
//             return;
//         }
//         const page = workspace.getPage(pageId) as Page;

//         const editor = createEditor(page, app);
//         const contentParser = new ContentParser(page);
//         const quickEdgelessMenu = new QuickEdgelessMenu();
//         quickEdgelessMenu.workspace = workspace;
//         quickEdgelessMenu.editor = editor;
//         quickEdgelessMenu.mode = defaultMode;
//         quickEdgelessMenu.contentParser = contentParser;
//         document.body.appendChild(quickEdgelessMenu);

//         window.editor = editor;
//         window.page = page;
//     });
// }

// async function initContentByInitParam(
//     workspace: Workspace,
//     param: string,
//     pageId: string
// ) {
//     const presetsMap = await loadPresets();

//     if (!presetsMap.has(param)) param = 'empty';

//     // Load built-in init function when `?init=heavy` param provided
//     if (presetsMap.has(param)) {
//         presetsMap.get(param)?.(workspace, pageId);
//         const page = workspace.getPage(pageId);
//         await page?.waitForLoaded();
//         page?.resetHistory();
//     }
// }

// const syncProviders = async (
//     workspace: Workspace,
//     providerCreators: DocProviderCreator[]
// ) => {
//     if (params.get('room')) {
//         await initCollaborationSocket(workspace, params.get('room') as string);
//     }

//     providerCreators.forEach(fn => workspace.registerProvider(fn));
//     const providers = workspace.providers;

//     for (const provider of providers) {
//         if ('active' in provider) {
//             provider.sync();
//             await provider.whenReady;
//         } else if ('passive' in provider) {
//             provider.connect();
//         }
//     }

//     const oldMeta = localStorage.getItem('meta');
//     const oldVersions = oldMeta ? { ...JSON.parse(oldMeta).blockVersions } : {};

//     let run = true;
//     const runWorkspaceMigration = () => {
//         if (run) {
//             workspace.schema.upgradeWorkspace(workspace.doc);
//             const meta = workspace.doc.toJSON().meta;
//             localStorage.setItem('meta', JSON.stringify(meta));
//             run = false;
//         }
//     };

//     workspace.slots.pageAdded.on(async pageId => {
//         const page = workspace.getPage(pageId) as Page;
//         await page.waitForLoaded().catch(e => {
//             const isValidateError =
//                 e instanceof Error && e.message.includes('outdated');
//             if (isValidateError) {
//                 page.spaceDoc.once('update', () => {
//                     workspace.schema.upgradePage(oldVersions, page.spaceDoc);
//                     workspace.meta.updateVersion(workspace);
//                     page.trySyncFromExistingDoc();
//                 });
//                 return;
//             }
//             throw e;
//         });
//         page.spaceDoc.once('update', () => {
//             runWorkspaceMigration();
//         });
//     });
// };

// async function initWorkspace(workspace: Workspace) {
//     const databaseExists = await testIDBExistence();

//     const shouldInit =
//         (!databaseExists && !params.get('room')) || params.get('init');

//     if (shouldInit) {
//         const deleteResult = await new Promise(resovle => {
//             const req = indexedDB.deleteDatabase(INDEXED_DB_NAME);
//             req.onerror = resovle;
//             req.onblocked = resovle;
//             req.onsuccess = resovle;
//         });

//         console.info('Delete database: ', deleteResult);

//         await syncProviders(workspace, getProviderCreators());
//         await initContentByInitParam(
//             workspace,
//             params.get('init') ?? 'empty',
//             'page:home'
//         );
//     } else {
//         await syncProviders(workspace, getProviderCreators());
//     }
// }

// async function main() {
//     if (window.workspace) {
//         return;
//     }

//     const workspace = new Workspace(options);
//     window.workspace = workspace;
//     window.blockSchemas = AffineSchemas;
//     window.job = new Job({ workspace });
//     window.Y = Workspace.Y;
//     window.ContentParser = ContentParser;
//     Object.defineProperty(globalThis, 'root', {
//         get() {
//             return document.querySelector('block-suite-root') as BlockSuiteRoot;
//         },
//     });

//     subscribePage(workspace);
//     await initWorkspace(workspace);
// }

// main();

import {
    renderWithQiankun,
    qiankunWindow,
} from 'vite-plugin-qiankun/dist/helper'


renderWithQiankun({
    mount() {
        console.log('viteapp mount')
    },
    bootstrap() {
        console.log('bootstrap')
    },
    unmount() {
        console.log('vite被卸载了')
    },
    update() {

    }
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    console.log(1);

}