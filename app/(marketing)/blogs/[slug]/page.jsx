/* File: app/blogs/[slug]/page.jsx */

import { allBlogs } from "@/blogsdata"; // Adjust path as needed
import { notFound } from "next/navigation";
import Link from "next/link";
import { RiArrowLeftLine, RiPriceTag3Line } from "react-icons/ri";

// --- Function to get the blog data ---
function getBlogBySlug(slug) {
  const blog = allBlogs.find((b) => b.slug === slug);
  return blog;
}

// --- Generate static pages for all blogs at build time ---
export async function generateStaticParams() {
  return allBlogs.map((blog) => ({
    slug: blog.slug,
  }));
}

// --- Generate dynamic metadata for SEO ---
export async function generateMetadata({ params }) {
  const blog = getBlogBySlug(params.slug);
  if (!blog) {
    return { title: "Not Found" };
  }
  return {
    title: `${blog.title} | SmoothLedger`,
    description: blog.description,
  };
}

// --- The Blog Post Page Component ---
export default function BlogPostPage({ params }) {
  const blog = getBlogBySlug(params.slug);

  if (!blog) {
    notFound(); // Redirect to 404 if blog not found
  }
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.description,
    datePublished: new Date(blog.date).toISOString(),
    author: {
      "@type": "Organization",
      name: "SmoothLedger",
    },
    publisher: {
      "@type": "Organization",
      name: "SmoothLedger",
      logo: {
        "@type": "ImageObject",
        // IMPORTANT: Change this to your actual logo URL
        url: "https://smoothledger.com/SLlogo1.png",
      },
    },
  };

  return (
    <div className="bg-white dark:bg-slate-950 py-24 sm:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-500"
          >
            <RiArrowLeftLine className="h-4 w-4" />
            Back to all blogs
          </Link>
        </div>

        {/* --- Post Header --- */}
        <header className="mb-12">
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <RiPriceTag3Line className="h-5 w-5 text-slate-400" />
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-slate-100 dark:bg-slate-800 rounded-full px-3 py-1 text-sm font-medium text-slate-600 dark:text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            {blog.title}
          </h1>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
            Published on{" "}
            {new Date(blog.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>

        {/* --- Post Content --- */}
        <article
          className="prose prose-lg lg:prose-xl dark:prose-invert prose-blue max-w-none
                          prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:underline
                          prose-blockquote:border-blue-500 prose-blockquote:text-slate-600 dark:prose-blockquote:text-slate-300"
        >
          {blog.content}
        </article>
      </div>
    </div>
  );
}
