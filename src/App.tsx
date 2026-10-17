import readme from "../README.md?raw";
import { Comments } from "@/components/comments";
import { Readme } from "@/components/readme";

const facts = [
  ["昵称", "孙悟元"],
  ["出生", "2009.04.13"],
  ["逝世", "2027.04.13"],
  ["地区", "湖南长沙"],
];

const links = [
  ["博客", "https://wuyuan.dev"],
  ["GitHub", "https://github.com/Sunwuyuan"],
  ["Twitter", "https://twitter.com/WuyuanNeko"],
  ["Bluesky", "https://bsky.app/profile/wuyuan.dev"],
  ["Bilibili", "https://space.bilibili.com/661404066"],
  ["Telegram", "https://t.me/wuyuandev"],
];

export default function App() {
  return (
    <div className="min-h-screen bg-canvas text-mist">
      <header className="border-b border-hairline">
        <div className="mx-auto flex h-14 max-w-[720px] items-center justify-between px-6 text-sm">
          <a href="#top" className="text-paper">
            孙悟元
          </a>
          <nav className="flex gap-5 text-graphite">
            <a href="#readme" className="hover:text-mist">
              记录
            </a>
            <a href="#traces" className="hover:text-mist">
              地址
            </a>
            <a href="#comments" className="hover:text-mist">
              留言
            </a>
          </nav>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-[720px] px-6">
        <section className="py-24 sm:py-32">
          <h1 className="text-[40px] leading-[1.05] font-normal tracking-[-1.6px] sm:text-[64px] sm:tracking-[-2.8px]">
            <span className="text-paper">孙悟元</span>
            <span className="text-graphite">已逝</span>
            <br />
            <span className="text-graphite">请节哀</span>
          </h1>
          <p className="mt-8 text-[15px] text-stone">
            2009.04.13 — 2027.04.13 · 湖南长沙
          </p>
        </section>

        <section className="border-t border-hairline py-12">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt className="text-[13px] text-smoke">{label}</dt>
                <dd className="mt-1 text-[15px] text-paper">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="readme" className="border-t border-hairline py-12">
          <Readme source={readme} />
        </section>

        <section id="traces" className="border-t border-hairline py-12">
          <h2 className="text-[22px] tracking-[-0.6px] text-paper">地址</h2>
          <ul className="mt-6">
            {links.map(([label, href]) => (
              <li key={href} className="border-b border-hairline">
                <a
                  href={href}
                  className="flex items-baseline justify-between gap-6 py-3 text-[15px] hover:text-paper"
                >
                  <span className="text-mist">{label}</span>
                  <span className="truncate text-smoke">
                    {href.replace(/^https?:\/\//, "")}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <Comments />
      </main>
    </div>
  );
}
