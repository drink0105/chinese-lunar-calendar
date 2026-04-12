import React from 'react';
import { Link } from 'react-router-dom';
import { articles } from '@/data/articles';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const BlogIndex = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pb-32">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-primary mb-4 tracking-tight">
          Lunar Calendar Insights
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto font-medium">
          Deep dives into the history, traditions, and practical applications of the Chinese Lunar Calendar.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <motion.div
            key={article.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full border-none shadow-xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/20 dark:border-zinc-700/50 rounded-[2rem] overflow-hidden hover:shadow-primary/10 transition-all duration-500 group">
              <CardContent className="p-8 flex flex-col h-full">
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">
                  {new Date(article.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <h2 className="text-2xl font-black text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
                  {article.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-8 line-clamp-3 font-medium leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="mt-auto">
                  <Link 
                    to={`/blog/${article.slug}`}
                    className="inline-flex items-center text-sm font-black text-primary hover:gap-2 transition-all"
                  >
                    Read More <span className="ml-1">→</span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BlogIndex;