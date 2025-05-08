import remarkGfm from 'remark-gfm';

import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

interface MarkdownViewerProps {
  text: string;
}

export default function MarkdownViewer({ text }: MarkdownViewerProps) {
  return (
    <div className="text-black text-sm/6">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props) => <h1 className="text-2xl font-bold mt-6 pb-2 mb-2 border-b-1 border-gray-300" {...props} />,
          h2: (props) => <h2 className="text-xl font-bold mt-5 pb-2 mb-2 border-b-1 border-gray-300" {...props} />,
          h3: (props) => <h3 className="text-lg font-semibold mt-4 mb-2" {...props} />,
          p: (props) => <p className="text-sm leading-6 text-gray-800 mb-2" {...props} />,
          ul: (props) => <ul className="list-disc list-outside ml-5 mb-2" {...props} />,
          ol: (props) => <ol className="list-decimal list-outside ml-5 mb-2" {...props} />,
          li: (props) => <li className="ml-2" {...props} />,
          a: (props) => (
            <a
              className="text-blue-600 underline hover:text-blue-800 break-words max-w-full inline-block"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          strong: (props) => <strong className="font-semibold text-black" {...props} />,
          blockquote: (props) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4" {...props} />
          ),
          table: (props) => <table className="table-auto border border-gray-600 border-collapse w-full" {...props} />,
          th: (props) => <th className="border border-gray-600 px-2 py-1 bg-gray-100 text-left" {...props} />,
          td: (props) => <td className="border border-gray-600 px-2 py-1" {...props} />,
          aside: (props) => <aside {...props} />,
          tr: (props) => <tr className="even:bg-gray-50" {...props} />,
          code: ({ children, className }) => {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');

            if (match) {
              return (
                <SyntaxHighlighter language={match[1]} PreTag="div">
                  {codeString}
                </SyntaxHighlighter>
              );
            }

            return (
              <code className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono text-primary-700">{codeString}</code>
            );
          },
        }}
      >
        {text}
      </Markdown>
    </div>
  );
}
