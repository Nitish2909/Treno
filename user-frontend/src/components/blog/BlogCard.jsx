import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate, calculateReadTime } from '../../utils/helpers.js';

// ── Helpers ────────────────────────────────────────────────────────────────────

const fmtDate = (d) => {
  if (typeof formatDate === 'function') return formatDate(d);
  if (!d) return '';
  try {
    return new Date(d).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return String(d);
  }
};

const readTime = (post) => {
  if (post.readTime) return `${post.readTime} min read`;
  if (typeof calculateReadTime === 'function' && post.content)
    return `${calculateReadTime(post.content)} min read`;
  return null;
};

// ── Category badge ─────────────────────────────────────────────────────────────

function CategoryBadge({ category }) {
  if (!category) return null;
  return (
    <span className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide">
      {category}
    </span>
  );
}

// ── Author row ─────────────────────────────────────────────────────────────────

function AuthorRow({ author, publishedAt, readTime: rt, compact }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {author?.avatar ? (
        <img
          src={author.avatar}
          alt={author.name || 'Author'}
          className={`rounded-full object-cover flex-shrink-0 ${compact ? 'w-6 h-6' : 'w-8 h-8'}`}
        />
      ) : (
        <div
          className={`rounded-full bg-amber-200 flex items-center justify-center font-bold text-amber-700 flex-shrink-0 ${compact ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'}`}
        >
          {author?.name ? author.name[0].toUpperCase() : 'A'}
        </div>
      )}
      <span className={`font-medium text-slate-700 ${compact ? 'text-xs' : 'text-sm'}`}>
        {author?.name || 'Anonymous'}
      </span>
      {publishedAt && (
        <span className={`text-slate-400 ${compact ? 'text-xs' : 'text-xs'}`}>
          · {fmtDate(publishedAt)}
        </span>
      )}
      {rt && (
        <span className={`text-slate-400 ${compact ? 'text-xs' : 'text-xs'}`}>
          · {rt}
        </span>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// REGULAR CARD
// ═══════════════════════════════════════════════════════════════════════════════

function RegularCard({ post }) {
  const rt = readTime(post);

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {/* Image */}
      <div className="aspect-video overflow-hidden bg-slate-100 relative">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
        )}
        {/* Views overlay */}
        {post.views > 0 && (
          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {post.views >= 1000 ? `${(post.views / 1000).toFixed(1)}k` : post.views}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">
        {/* Category */}
        <CategoryBadge category={post.category} />

        {/* Title */}
        <h3 className="font-bold text-slate-800 text-base leading-snug line-clamp-2 group-hover:text-amber-600 transition-colors">
          {post.title}
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{post.excerpt}</p>
        )}

        {/* Tags */}
        {Array.isArray(post.tags) && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author + Read More */}
        <div className="flex items-center justify-between mt-1 gap-2">
          <AuthorRow author={post.author} publishedAt={post.publishedAt} readTime={rt} compact />
          <span className="flex items-center gap-1 text-amber-500 text-xs font-semibold flex-shrink-0 group-hover:gap-2 transition-all">
            Read More
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FEATURED CARD
// ═══════════════════════════════════════════════════════════════════════════════

function FeaturedCard({ post }) {
  const rt = readTime(post);

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image — left 40% on desktop */}
        <div className="md:w-[40%] aspect-video md:aspect-auto overflow-hidden bg-slate-100 relative flex-shrink-0">
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
              <svg className="w-16 h-16 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          )}
          {/* Featured badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Featured
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col gap-4">
          {/* Category */}
          <CategoryBadge category={post.category} />

          {/* Title */}
          <h2 className="font-extrabold text-slate-800 text-xl md:text-2xl leading-snug line-clamp-3 group-hover:text-amber-600 transition-colors">
            {post.title}
          </h2>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-sm text-slate-500 leading-relaxed line-clamp-4">{post.excerpt}</p>
          )}

          {/* Tags */}
          {Array.isArray(post.tags) && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 4).map((tag, i) => (
                <span key={i} className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Author + CTA */}
          <div className="mt-auto flex items-center justify-between gap-3 flex-wrap">
            <AuthorRow author={post.author} publishedAt={post.publishedAt} readTime={rt} />
            <span className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold px-4 py-2 rounded-xl shadow-sm group-hover:shadow-md transition-all">
              Read More
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export default function BlogCard({ post, featured = false }) {
  if (!post) return null;
  return featured ? <FeaturedCard post={post} /> : <RegularCard post={post} />;
}
