import { getBlogById } from "@/services/blogsService";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  const { data: blog, error } = await getBlogById(params.id);
  if (error || !blog) {
    return <div className="p-10 text-red-600">Blog not found.</div>;
  }

  return (
    <main className="min-h-screen bg-black text-white px-8 py-16">
      <article className="max-w-4xl mx-auto">
        {blog.cover_image_url && (
          <img
            src={blog.cover_image_url}
            alt={blog.title}
            className="rounded-lg mb-8 w-full max-h-[400px] object-cover border-2 border-[#FAD02C]"
          />
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
                <a {...props} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" />
              ),
              img: ({ node, ...props }) => (
                <img {...props} className="rounded-lg max-w-full h-auto my-4" loading="lazy" />
              )
            }}
          >
            {blog.content || ''}
          </ReactMarkdown>
        </div>

        {blog.related_links && (
          <section className="mt-10">
            <h2 className="text-2xl font-semibold mb-3 text-[#FAD02C]">Related Links</h2>
            <ul className="list-disc list-inside text-[#FAD02C]">
              {blog.related_links.map((link: { label: string; url: string }, index: number) => (
                <li key={`${index}`}>
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-[#FAD02C]/80"
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
