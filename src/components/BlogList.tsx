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
    <main className="min-h-screen bg-[#f9f5ef] text-gray-900 px-8 py-16">
      <h1 className="text-4xl font-bold mb-10 text-center">Our Blogs</h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs?.map((blog) => (
          <Link
            key={blog.id}
            href={`/blogs/${blog.id}`}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 flex flex-col"
          >
            {blog.cover_image_url && (
              <img
                src={blog.cover_image_url}
                alt={blog.title}
                className="rounded-lg mb-4 w-full h-48 object-cover"
              />
            )}
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-sm text-gray-600 mb-3">
              By {blog.author_name} • {blog.category}
            </p>
           <div className="flex flex-wrap gap-2 mt-auto">
            {Array.isArray(blog.tags)
                ? blog.tags.map((tag: string) => (
                    <span
                    key={tag}
                    className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded"
                    >
                    {tag.trim()}
                    </span>
                ))
                : typeof blog.tags === "string"
                ? blog.tags.split(",").map((tag: string) => (
                    <span
                    key={tag}
                    className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded"
                    >
                    {tag.trim()}
                    </span>
                ))
                : null}
            </div>

          </Link>
        ))}
      </div>
    </main>
  );
}
