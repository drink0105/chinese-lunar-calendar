import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BlogNav = () => {
  const { t } = useTranslation();

  return (
    <div className="block">
      <Link 
        to="/blog" 
        className="text-xs md:text-sm font-black uppercase tracking-widest text-gray-500 hover:text-primary transition-colors px-2 md:px-4 py-2"
      >
        {t('nav.blog', 'Blog')}
      </Link>
    </div>
  );
};

export default BlogNav;