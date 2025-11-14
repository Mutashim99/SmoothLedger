import BlogListingClient from "@/app/components/BlogListingClient"; // We will create this
import { allBlogs } from "../../blogsdata"; // We need this here for the sitemap/metadata logic

// 1. Your SEO Metadata lives here, on the server.
export const metadata = {
  title: "Blogs",
  description:
    "Our blog for freelancers and small businesses. Find tips on invoicing, payslips, loans, and financial management.",
};

// 2. This Server Component renders your Client Component
export default function BlogListingPage() {
  // We pass the blog data as a prop to the client component
  return <BlogListingClient blogs={allBlogs} />;
}