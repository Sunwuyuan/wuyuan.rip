import { addComment, getComment, type WalineRootComment } from "@waline/api";
import { useEffect, useState, type FormEvent } from "react";

const SERVER = "https://api.zerocat.dev/comment/6d5bd8fb2ff8150ab175f34ec080a2f9";
const PATH = "/";

function time(value: number) {
  return new Date(value).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function Comment({ comment }: { comment: WalineRootComment }) {
  return (
    <li className="border-b border-hairline py-5">
      <div className="flex items-baseline justify-between gap-4">
        {comment.link ? (
          <a href={comment.link} className="text-[15px] text-paper hover:underline">
            {comment.nick}
          </a>
        ) : (
          <span className="text-[15px] text-paper">{comment.nick}</span>
        )}
        <time className="text-[13px] text-smoke">{time(comment.time)}</time>
      </div>
      <div
        className="mt-2 text-[15px] leading-[1.7] text-stone [&_a]:underline [&_a]:underline-offset-4 [&_p]:my-2"
        dangerouslySetInnerHTML={{ __html: comment.comment }}
      />
      {comment.children.length > 0 && (
        <ul className="mt-4 border-l border-hairline pl-4">
          {comment.children.map((child) => (
            <li key={child.objectId} className="py-3">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[14px] text-mist">
                  {child.nick}
                  {child.reply_user ? (
                    <span className="text-smoke"> → {child.reply_user.nick}</span>
                  ) : null}
                </span>
                <time className="text-[13px] text-smoke">{time(child.time)}</time>
              </div>
              <div
                className="mt-1 text-[14px] leading-[1.7] text-stone [&_a]:underline [&_p]:my-2"
                dangerouslySetInnerHTML={{ __html: child.comment }}
              />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function Comments() {
  const [comments, setComments] = useState<WalineRootComment[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [nick, setNick] = useState("");
  const [mail, setMail] = useState("");
  const [link, setLink] = useState("");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const result = await getComment({
        serverURL: SERVER,
        lang: "zh-CN",
        path: PATH,
        page: 1,
        pageSize: 50,
        sortBy: "insertedAt_desc",
      });
      setComments(result.data);
      setCount(result.count);
    } catch {
      setError("评论暂时无法加载。");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!nick.trim() || !text.trim()) return;
    setSending(true);
    setNotice("");
    setError("");
    try {
      const result = await addComment({
        serverURL: SERVER,
        lang: "zh-CN",
        comment: {
          nick: nick.trim(),
          mail: mail.trim() || undefined,
          link: link.trim() || undefined,
          comment: text.trim(),
          ua: navigator.userAgent,
          url: PATH,
        },
      });
      if (result.errno) {
        setError(result.errmsg || "发送失败。");
      } else {
        setText("");
        setNotice("已发送。");
        await load();
      }
    } catch {
      setError("发送失败。");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="comments" className="border-t border-hairline py-12 pb-24">
      <h2 className="text-[22px] tracking-[-0.6px] text-paper">
        留言{count > 0 ? ` · ${count}` : ""}
      </h2>

      <form onSubmit={submit} className="mt-6 space-y-3">
        <div className="grid gap-3 sm:grid-cols-3">
          <input
            required
            value={nick}
            onChange={(event) => setNick(event.target.value)}
            placeholder="昵称"
            className="h-9 rounded-md bg-transparent px-3 text-sm text-mist shadow-[0_0_0_1px_#2a2a2a] outline-none placeholder:text-smoke focus:shadow-[0_0_0_1px_#6b6b6b]"
          />
          <input
            type="email"
            value={mail}
            onChange={(event) => setMail(event.target.value)}
            placeholder="邮箱，不公开"
            className="h-9 rounded-md bg-transparent px-3 text-sm text-mist shadow-[0_0_0_1px_#2a2a2a] outline-none placeholder:text-smoke focus:shadow-[0_0_0_1px_#6b6b6b]"
          />
          <input
            type="url"
            value={link}
            onChange={(event) => setLink(event.target.value)}
            placeholder="网址，可选"
            className="h-9 rounded-md bg-transparent px-3 text-sm text-mist shadow-[0_0_0_1px_#2a2a2a] outline-none placeholder:text-smoke focus:shadow-[0_0_0_1px_#6b6b6b]"
          />
        </div>
        <textarea
          required
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={4}
          placeholder="写一句。"
          className="w-full resize-y rounded-md bg-transparent px-3 py-2 text-sm leading-[1.7] text-mist shadow-[0_0_0_1px_#2a2a2a] outline-none placeholder:text-smoke focus:shadow-[0_0_0_1px_#6b6b6b]"
        />
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={sending}
            className="h-8 rounded-md bg-mist px-3 text-sm text-canvas disabled:opacity-40"
          >
            {sending ? "发送中" : "发送"}
          </button>
          {notice ? <span className="text-sm text-smoke">{notice}</span> : null}
          {error ? <span className="text-sm text-smoke">{error}</span> : null}
        </div>
      </form>

      {loading ? (
        <p className="mt-8 text-sm text-smoke">加载中</p>
      ) : comments.length === 0 ? (
        <p className="mt-8 text-sm text-smoke">还没有留言。</p>
      ) : (
        <ul className="mt-6">
          {comments.map((comment) => (
            <Comment key={comment.objectId} comment={comment} />
          ))}
        </ul>
      )}
    </section>
  );
}
