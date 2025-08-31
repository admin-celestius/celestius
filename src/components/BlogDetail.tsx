import { getBlogById } from "@/services/blogsService";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface BlogDetailPageProps {
  params: {
    id: string;
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { data: blog, error } = await getBlogById(params.id);
  if (error || !blog) {
    return <div className="p-10 text-red-600">Blog not found.</div>;
  }

  return (
    <main className="min-h-screen">
      <article className="max-w-4xl mx-auto">
        {blog.cover_image_url && (
          <div className="relative mb-8 rounded-lg overflow-hidden border-2 border-[#FAD02C]">
            <img
              src={blog.cover_image_url}
              alt={blog.title}
              className="w-full max-h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        )}

        <h1 className="text-4xl font-bold mb-4 text-[#FAD02C]">{blog.title}</h1>
        <p className="text-sm text-gray-400 mb-6">
          By <span className="font-medium text-white">{blog.author_name}</span> •{" "}
          <span className="text-[#FAD02C]">{blog.category}</span>
        </p>

        {blog.summary && (
          <p className="text-lg text-gray-300 mb-6">{blog.summary}</p>
        )}

        <div className="prose prose-lg prose-invert max-w-none mb-10 prose-headings:text-[#FAD02C] prose-a:text-[#FAD02C]">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              a: ({ node, ...props }) => (
                <a {...props} className="text-[#FAD02C] hover:text-[#FAD02C]/80 hover:underline transition-colors" target="_blank" rel="noopener noreferrer" />
              ),
              img: ({ node, ...props }) => (
                <img {...props} className="rounded-lg max-w-full h-auto my-4 border border-zinc-800" loading="lazy" />
              ),
              code: ({ node, ...props }) => (
                <code {...props} className="bg-zinc-900/50 text-[#FAD02C] px-1 py-0.5 rounded" />
              )
            }}
          >
            {blog.content || ''}
          </ReactMarkdown>
        </div>

        {blog.related_links && (
          <section className="mt-10 border-t border-zinc-800 pt-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#FAD02C]">Related Links</h2>
            <ul className="space-y-3 list-none">
              {blog.related_links.map((link: { label: string; url: string }, index: number) => (
                <li key={`${index}`} className="flex items-center">
                  <span className="text-[#FAD02C] mr-2">→</span>
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-[#FAD02C] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </main>
  );
}
