import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const components: Components = {
  h1: ({ children }) => (
    <h2 className="text-[22px] leading-[1.15] font-normal tracking-[-0.6px] text-paper">
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h3 className="mt-8 mb-3 text-[18px] font-normal tracking-[-0.4px] text-mist">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-3 text-[15px] leading-[1.7] text-stone">{children}</p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-mist underline decoration-ash underline-offset-4 hover:text-paper"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => <ul className="my-3 space-y-1">{children}</ul>,
  li: ({ children }) => (
    <li className="text-[15px] leading-[1.7] text-stone">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l border-hairline pl-4 text-graphite">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="font-mono text-[13px] text-mist">{children}</code>
  ),
};

export function Readme({ source }: { source: string }) {
  return (
    <article>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {source}
      </ReactMarkdown>
    </article>
  );
}
