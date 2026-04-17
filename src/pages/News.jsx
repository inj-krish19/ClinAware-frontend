import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineExternalLink, HiOutlineNewspaper, HiChevronDown, HiLink } from 'react-icons/hi';
import { SiLinkedin } from 'react-icons/si';
import { BACKEND_URL } from '../context/constants';
import Loading from '../components/Loading';

const getPlatformInfo = (url) => {
    if (url?.includes('linkedin.com')) {
        return { label: 'LinkedIn', icon: <SiLinkedin size={14} className="text-[#0A66C2]" /> };
    }
    return { label: 'Source', icon: <HiLink size={14} className="text-slate-400" /> };
};

export default function News() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNews = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/post/`, {
                method: 'GET',
                headers: { "content-type": "application/json" }
            });
            const response = await res.json();
            setPosts(response?.data || []);
        } catch (err) {
            console.error("News Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchNews(); }, []);

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] pt-28 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 bg-emerald-500/10 rounded-xl">
                            <HiOutlineNewspaper className="text-emerald-500 text-xl" />
                        </div>
                        <span className="text-xs font-semibold uppercase text-emerald-600/80 dark:text-emerald-400/80">
                            Clinical Intelligence
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-poppins text-slate-900 dark:text-white tracking-tight">
                        Health <span className="text-emerald-500">Insights</span>
                    </h1>
                    <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-2xl text-lg">
                        Curated updates and breakthroughs in healthcare technology and clinical awareness.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-start">
                    {posts.map((post, idx) => (
                        <NewsCard key={post.id || idx} post={post} idx={idx} />
                    ))}
                </div>
            </div>
        </div>
    );
}

const NewsCard = ({ post, idx }) => {
    const [imgError, setImgError] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const platform = useMemo(() => getPlatformInfo(post.source || post.platform_url), [post]);

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group flex flex-col h-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-500"
        >
            {/* Visual Header */}
            <div className="relative h-56 overflow-hidden">
                {!imgError ? (
                    <img
                        src={post.image || 'https://images.unsplash.com/photo-1505751172107-573225a91200?q=80&w=800'}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <HiOutlineNewspaper size={40} className="text-slate-300 dark:text-slate-600" />
                    </div>
                )}

                {/* Source Badge */}
                <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full border border-white/20 shadow-sm">
                        {platform.icon}
                        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">
                            {post.source || platform.label}
                        </span>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="p-8 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-snug mb-4 group-hover:text-emerald-500 transition-colors duration-300">
                    {post.title}
                </h2>

                <div className="flex-grow">
                    <p className={`text-slate-500 dark:text-slate-400 text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
                        {isExpanded ? (post.description || post.content) : post.content}
                    </p>

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-4 flex items-center gap-1 text-xs font-bold text-emerald-500 hover:text-emerald-600 transition-colors"
                    >
                        {isExpanded ? 'Collapse' : 'Full Summary'}
                        <HiChevronDown className={`text-sm transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 mt-8">
                    <a
                        href={post.url || post.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 text-[11px] font-bold hover:bg-emerald-500 hover:text-white transition-all"
                    >
                        Article <HiOutlineExternalLink size={14} />
                    </a>
                    <a
                        href={post.platform_url || post.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 text-[11px] font-bold hover:bg-sky-600 hover:text-white transition-all"
                    >
                        LinkedIn <SiLinkedin size={12} />
                    </a>
                </div>
            </div>
        </motion.article>
    );
};