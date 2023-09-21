import { Workspace } from '@notes/store';

import type { IElementDefaultProps } from '../index.js';

export const FrameElementDefaultProps: IElementDefaultProps<'frame'> = {
    type: 'frame',
    xywh: '[0,0,0,0]',
    title: new Workspace.Y.Text('frame'),
};
