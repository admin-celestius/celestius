import { getBlogById } from "@/services/blogsService";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import BlogDetail from "@/components/BlogDetail";

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
    <main className="min-h-screen bg-black text-white px-8 py-16">
      <article className="max-w-4xl mx-auto">
        <BlogDetail params={{
          id: params.id
        }}/>
      </article>
    </main>
  );
}
