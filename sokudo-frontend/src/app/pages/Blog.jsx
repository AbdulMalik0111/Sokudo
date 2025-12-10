import { useMemo, useState, useEffect } from "react";
import Banner from "/bb3.webp";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBlogs } from "../features/blogs/BlogSlice";

const classNames = (...classes) => classes.filter(Boolean).join(" ");

const slugify = (str = "") =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const BlogSkeleton = () => (
  <div className="animate-pulse space-y-6">
    {/* Featured Skeleton */}
    <div className="h-80 w-full bg-gray-200 rounded-3xl"></div>

    {/* Blog cards */}
    <div className="grid sm:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="border rounded-2xl p-5 bg-white shadow-sm space-y-4"
        >
          <div className="h-40 w-full bg-gray-200 rounded-xl"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/4"></div>
        </div>
      ))}
    </div>
  </div>
);

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    items: blogs = [],
    status,
    error,
  } = useSelector((state) => state.blogs);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [tag, setTag] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  const categories = useMemo(() => {
    const all = blogs.flatMap((b) => b.categories || []);
    return ["All", ...Array.from(new Set(all))];
  }, [blogs]);

  const tags = useMemo(() => {
    const all = blogs.flatMap((b) => b.tags || []);
    return ["All", ...Array.from(new Set(all))];
  }, [blogs]);

  useEffect(() => {
    setPage(1);
  }, [query, category, tag]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogs.filter((p) => {
      const matchesCategory =
        category === "All" || (p.categories || []).includes(category);

      const matchesTag = tag === "All" || (p.tags || []).includes(tag);

      const matchesQuery =
        !q ||
        p.title?.toLowerCase().includes(q) ||
        p.excerpt?.toLowerCase().includes(q);

      return matchesCategory && matchesTag && matchesQuery;
    });
  }, [blogs, query, category, tag]);

  const featured = filtered.find((b) => b.featured) || filtered[0];
  const others = filtered.filter((b) => b?._id !== featured?._id);

  const totalPages = Math.max(1, Math.ceil(others.length / pageSize));
  const current = useMemo(() => {
    const start = (page - 1) * pageSize;
    return others.slice(start, start + pageSize);
  }, [others, page]);

  // ✅ Loader & error

  if (status === "failed")
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load blogs: {error}
      </div>
    );

  return (
    <div className="min-h-screen mb-6 bg-white  text-neutral-900">
      {/* Hero */}
     <section
        className="relative isolate h-[420px] flex flex-col justify-center items-center text-center transition-all duration-300"
        style={{
          marginTop: "calc(var(--announcement-offset) ",
        }}
      >
             <div
               className="absolute inset-0 -z-10 bg-center bg-cover"
               style={{ backgroundImage: `url(${Banner})` }}
             />
             <div className="absolute inset-0 -z-10 bg-black/40" />
             <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.20),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.12),transparent_40%)]" />
     
             <div className="page-width mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
               <h1 className="heading !text-white">Blog</h1>
             </div>
           </section>

      {/* Main */}
      <div className="page-width mx-auto px-4 sm:px-6 lg:px-8 !mt-10 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-5 h-fit">
            {/* Search */}
            <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full rounded-xl bg-white border border-gray-300 pl-3 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#ffb200] focus:border-[#ffb200]"
              />
            </div>

            {/* Categories */}
            <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-800">
                  Categories
                </h3>
                <button
                  onClick={() => setCategory("All")}
                  className="text-xs text-gray-600 hover:text-black"
                >
                  Reset
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 6).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    aria-label='Close announcement'
                    className={classNames(
                      "px-3 py-1.5 rounded-full text-sm transition-colors border",
                      c === category
                        ? "bg-[#ffb200] text-black border-[#ffb200]"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200"
                    )}
                  >
                    {c}
                  </button>
                ))}

                {categories.length > 6 && (
                  <button
                    onClick={() => alert(categories.join(", "))}
                    className="px-3 py-1.5 rounded-full text-sm bg-gray-200 text-gray-700 border border-gray-300"
                  >
                    +{categories.length - 6} More
                  </button>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-800">Tags</h3>
                <button
                  onClick={() => setTag("All")}
                  className="text-xs text-gray-600 hover:text-black"
                >
                  Reset
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 8).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTag(t)}
                    aria-label='Close'
                    className={classNames(
                      "px-3 py-1.5 rounded-full text-sm transition-colors border",
                      t === tag
                        ? "bg-[#ffb200] text-black border-[#ffb200]"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200"
                    )}
                  >
                    {t}
                  </button>
                ))}

                {tags.length > 8 && (
                  <button
                    onClick={() => alert(tags.join(", "))}
                    className="px-3 py-1.5 rounded-full text-sm bg-gray-200 text-gray-700 border border-gray-300"
                  >
                    +{tags.length - 8} More
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Blog List */}
          {/* Blog List */}
          <main className="lg:col-span-8">
            {status === "loading" ? (
              <BlogSkeleton />
            ) : (
              <>
                {/* Featured */}
                {featured && (
                  <article className="relative overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-sm mb-8">
                    <div className="grid lg:grid-cols-2 gap-0">
                      <img
                        src={featured.images}
                        alt={featured.title}
                        className="h-72 sm:h-80 lg:h-full w-full object-cover"
                      />

                      <div className="p-6 sm:p-8 flex flex-col">
                        <h2 className="text-2xl sm:text-3xl font-semibold">
                          {featured.title}
                        </h2>
                        <div
                          className="mt-2 text-gray-700"
                          dangerouslySetInnerHTML={{ __html: featured.excerpt }}
                        />

                        <div className="mt-auto pt-4">
                          <button
                            onClick={() => navigate(`/blog/${slugify(featured.title)}`)}
                            className="btn inline-flex justify-center items-center px-5 py-2.5 text-sm font-semibold rounded-xl bg-[#ffb200] hover:bg-black text-white transition"
                          >
                            Read More
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                )}

                {/* Blog Grid */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {current.map((b) => (
                    <div
                      key={b._id}
                      className="group rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
                    >
                      <img
                        src={b.images}
                        alt={b.title}
                        className="h-48 w-full object-cover group-hover:scale-105 transition"
                      />

                      <div className="p-5">
                        <h3 className="font-semibold text-lg">{b.title}</h3>
                        <div
                          className="mt-2 text-gray-600 line-clamp-2 prose prose-sm prose-img:hidden"
                          dangerouslySetInnerHTML={{ __html: b.excerpt }}
                        />

                        <button
                          onClick={() => navigate(`/blog/${slugify(b.title)}`)}
                          className=" btn mt-4 inline-flex text-sm font-medium text-[#ffb200] hover:text-black"
                        >
                          Read More 
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-10 gap-3">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 rounded-lg border disabled:opacity-50"
                    >
                      Prev
                    </button>

                    <span className="px-4 py-2 border rounded-lg bg-gray-50">
                      {page}/{totalPages}
                    </span>

                    <button
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={page === totalPages}
                      className="px-4 py-2 rounded-lg border disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Blog;
