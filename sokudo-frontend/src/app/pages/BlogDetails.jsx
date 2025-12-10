import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBlogs } from "../features/blogs/BlogSlice";


const slugify = (str = "") =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");


const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items: blogs = [], status } = useSelector((state) => state.blogs);

  useEffect(() => {
    if (status === "idle") dispatch(fetchAllBlogs());
    window.scrollTo(0, 0);
  }, [dispatch, status]);

  const blog = blogs.find(
  (b) => slugify(b.title) === slug
);


  if (status === "loading") {
    return <div className="text-center py-20 text-lg">Loading...</div>;
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-gray-700 text-lg mb-4">Blog not found!</p>
        <button
          onClick={() => navigate("/blog")}
          className="bg-[#ffb200] text-black px-5 py-2 rounded-lg font-medium"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  const relatedBlogs = blogs
  .filter((b) => slugify(b.title) !== slug)
  .slice(0, 3);


  return (
    <div className="bg-gray-50 mt-[69px] md:mt-[47px] text-neutral-900 min-h-screen">
      {/* Banner */}
     

      <section
        className="relative isolate h-[420px] flex flex-col justify-center items-center text-center transition-all duration-300"
        style={{
          marginTop: "calc(var(--announcement-offset) ",
        }}
      >
              <div
                className="absolute inset-0 -z-10 bg-center bg-cover"
                style={{ backgroundImage: `url(${blog.images})` }}
              />
              <div className="absolute inset-0 -z-10 bg-black/40" />
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.20),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.12),transparent_40%)]" />
      
              <div className="page-width mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <h1 className="heading !text-white">{blog.title}</h1>
                <p className="text-gray-200 text-sm sm:text-base">
            By <span className="font-semibold">{blog.author?.name || "Admin"}</span>{" "}
            • {blog.date || ""} • {blog.readTime || "5 min read"}
          </p>
              </div>
            </section>

      {/* Blog Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="bg-white rounded-xl shadow-xl p-6 sm:p-10 -mt-20">
          
          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">

            {/* excerpt */}
            {blog.excerpt && (
              <div
                className="text-lg"
                dangerouslySetInnerHTML={{ __html: blog.excerpt }}
              />
            )}

            {/* content */}
            {blog.content && (
              <div
                className="mt-6"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            )}

            {/* inline content image */}
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="rounded-xl my-8 mx-auto w-2xl shadow-md"
              />
            )}

            {/* second content */}
            {blog.contentSecond && (
              <div
                className="mt-4"
                dangerouslySetInnerHTML={{ __html: blog.contentSecond }}
              />
            )}
          </div>

          

          {/* Related Blogs */}
          <div className="mt-20 border-t pt-12">
            <h2 className="text-2xl font-semibold mb-8">Related Blogs</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBlogs.map((b) => (
                <div key={b._id} className="bg-white border rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                  <img src={b.images} alt={b.title} className="h-48 w-full object-cover" />
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{b.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{b.excerpt}</p>
                    <button
                      onClick={() => navigate(`/blog/${b._id}`)}
                      className="btn justify-end text-[#ffb200] font-medium "
                    >
                      Read More 
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => navigate("/blog")}
              className="btn bg-[#ffb200] text-black px-6 py-2.5 rounded-lg font-medium"
            >
              ← Back to Blogs
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
