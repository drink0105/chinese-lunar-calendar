import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { articles } from '@/data/articles';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find(a => a.slug === slug);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | LunarDays`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', article.excerpt);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = article.excerpt;
        document.head.appendChild(meta);
      }
    }
  }, [article]);

  if (!article) {
    return <Navigate to="/404" replace />;
  }

  const wordCount = article.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 pb-32">
      <Link 
        to="/blog" 
        className="inline-flex items-center gap-2 text-sm font-black text-muted-foreground hover:text-primary transition-colors mb-12 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Blog
      </Link>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl rounded-[3rem] p-8 md:p-16 shadow-2xl border border-white/20 dark:border-zinc-800/50"
      >
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-foreground mb-8 leading-tight tracking-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-sm font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-primary" />
              {new Date(article.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-primary" />
              {readTime} min read
            </div>
          </div>
        </header>

        <div 
          className="prose prose-lg dark:prose-invert max-w-none 
            prose-headings:text-primary prose-headings:font-black prose-headings:tracking-tight
            prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:font-medium
            prose-li:text-foreground/80 prose-li:font-medium
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </motion.article>
    </div>
  );
};

export default ArticlePage;