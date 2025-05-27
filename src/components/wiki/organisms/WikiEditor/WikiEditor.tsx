'use client';

import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';

import * as React from 'react';
import { useMemo } from 'react';
import Collaboration from '@tiptap/extension-collaboration';
import { Image } from '@tiptap/extension-image';
import { TaskItem } from '@tiptap/extension-task-item';
import { TaskList } from '@tiptap/extension-task-list';
import { TextAlign } from '@tiptap/extension-text-align';
import { Typography } from '@tiptap/extension-typography';
import { Underline } from '@tiptap/extension-underline';
import { EditorContent, EditorContext, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';

import { Link } from '@/components/tiptap-editor/tiptap-extension/link-extension';
import { Selection } from '@/components/tiptap-editor/tiptap-extension/selection-extension';
import { ImageUploadNode } from '@/components/tiptap-editor/tiptap-node/image-upload-node/image-upload-node-extension';
import { BlockQuoteButton } from '@/components/tiptap-editor/tiptap-ui/blockquote-button';
import { CodeBlockButton } from '@/components/tiptap-editor/tiptap-ui/code-block-button';
import { HeadingDropdownMenu } from '@/components/tiptap-editor/tiptap-ui/heading-dropdown-menu';
import { ImageUploadButton } from '@/components/tiptap-editor/tiptap-ui/image-upload-button';
import { LinkPopover } from '@/components/tiptap-editor/tiptap-ui/link-popover';
import { ListDropdownMenu } from '@/components/tiptap-editor/tiptap-ui/list-dropdown-menu';
import { MarkButton } from '@/components/tiptap-editor/tiptap-ui/mark-button';
import { Spacer } from '@/components/tiptap-editor/tiptap-ui-primitive/spacer';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from '@/components/tiptap-editor/tiptap-ui-primitive/toolbar';
import { handleImageUpload, MAX_FILE_SIZE } from '@/utils/tiptap';

import '@/components/tiptap-editor/tiptap-node/code-block-node/code-block-node.scss';
import '@/components/tiptap-editor/tiptap-node/list-node/list-node.scss';
import '@/components/tiptap-editor/tiptap-node/image-node/image-node.scss';
import '@/components/tiptap-editor/tiptap-node/paragraph-node/paragraph-node.scss';
import '@/components/wiki/organisms/WikiEditor/WikiEditor.scss';

const MainToolbarContent = () => {
  return (
    <>
      <Spacer />

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} />
        <ListDropdownMenu types={['bulletList', 'orderedList', 'taskList']} />
        <BlockQuoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        <LinkPopover />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text="Add" />
      </ToolbarGroup>

      <Spacer />
    </>
  );
};

export function WikiEditor({ title }: { title: string }) {
  const toolbarRef = React.useRef<HTMLDivElement>(null);

  const doc = useMemo(() => new Y.Doc(), []);
  useMemo(() => new WebsocketProvider('ws://localhost:1234', title, doc), [doc, title]);

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        'aria-label': 'Main content area, start typing to enter text.',
      },
    },
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Image,
      Typography,
      Collaboration.configure({
        document: doc,
      }),

      Selection,
      ImageUploadNode.configure({
        accept: 'image/*',
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error('Upload failed:', error),
      }),
      Link.configure({
        openOnClick: true,
      }),
    ],
  });

  return (
    <EditorContext.Provider value={{ editor }}>
      <Toolbar ref={toolbarRef}>
        <MainToolbarContent />
      </Toolbar>

      <div className="content-wrapper">
        <EditorContent editor={editor} role="presentation" className="simple-editor-content" />
      </div>
    </EditorContext.Provider>
  );
}
