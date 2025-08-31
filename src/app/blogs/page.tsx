"use client";
import BlogList from "../../components/BlogList"
export default function Blogs() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-[#FAD02C] mb-6">Celestius Blogs</h1>
      <div className="h-full overflow-y-auto">
        <BlogList />
      </div>
    </main>
  );
}
