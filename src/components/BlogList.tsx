import Link from "next/link";
import { getAllBlogs } from "../services/blogsService";

interface Blog {
    id: string;
    cover_image_url: string;
    title: string;
    author_name: string;
    category: string;
    tags?: string;
    created_at?: string;
}

export default async function BlogList() {
  const { data: blogs, error } = await getAllBlogs() as { data: Blog[] | null; error: Error | null };

  if (error) {
    return <div className="p-10 text-red-600">Failed to load blogs.</div>;
  }
  
  return (
    <div className="grid gap-15 md:grid-cols-2 lg:grid-cols-3">
        {blogs?.map((blog) => (
          <Link
            key={blog.id}
            href={`/blogs/${blog.id}`}
            className="group bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-[#FAD02C] transition-all duration-300 p-5 flex flex-col"
          >
            {blog.cover_image_url && (
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={blog.cover_image_url}
                  alt={blog.title}
                  className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
            )}
            <h2 className="text-xl font-semibold mb-2 text-[#FAD02C] group-hover:text-[#FAD02C]/90">{blog.title}</h2>
            <p className="text-sm text-gray-400 mb-3">
              By <span className="text-white">{blog.author_name}</span> • <span className="text-[#FAD02C]">{blog.category}</span>
            </p>
           <div className="flex flex-wrap gap-2 mt-auto">
            {Array.isArray(blog.tags)
                ? blog.tags.map((tag: string) => (
                    <span
                    key={tag}
                    className="text-xs bg-[#FAD02C]/10 text-[#FAD02C] border border-[#FAD02C]/20 px-2 py-1 rounded"
                    >
                    {tag.trim()}
                    </span>
                ))
                : typeof blog.tags === "string"
                ? blog.tags.split(",").map((tag: string) => (
                    <span
                    key={tag}
                    className="text-xs bg-[#FAD02C]/10 text-[#FAD02C] border border-[#FAD02C]/20 px-2 py-1 rounded"
                    >
                    {tag.trim()}
                    </span>
                ))
                : null}
            </div>
          </Link>
        ))}
      </div>
  );
}
