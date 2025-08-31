"use client";
import { useParams } from 'next/navigation';
import BlogDetail from "@/components/BlogDetail";

export default function BlogDetailPage() {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : '';

  return (
    <main className="min-h-screen bg-black text-white px-8 py-16">
      <article className="max-w-4xl mx-auto">
        <BlogDetail params={{ id }} />
      </article>
    </main>
  );
}
