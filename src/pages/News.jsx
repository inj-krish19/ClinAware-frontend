import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineExternalLink, HiOutlineNewspaper, HiChevronDown, HiLink } from 'react-icons/hi';
import { SiLinkedin } from 'react-icons/si';
import { BACKEND_URL } from '../context/constants';
import Loading from '../components/Loading';

const getPlatformInfo = (url) => {
    if (url?.includes('linkedin.com')) {
        return { label: 'LinkedIn', icon: <SiLinkedin size={12} className="text-[#0A66C2]" /> };
    }
    return { label: 'Journal Source', icon: <HiLink size={12} className="text-slate-400" /> };
};

export default function News() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNews = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/post/`);
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
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] pt-32 pb-20 px-6 font-inter">
            <div className="max-w-7xl mx-auto">
                <header className="mb-20 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                        <HiOutlineNewspaper className="text-emerald-500 text-sm" />
                        <span className="text-[10px] font-black uppercase   text-emerald-600 dark:text-emerald-400">
                            Clinical Intelligence Feed
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white   mb-6 font-jakarta">
                        Health <span className="text-emerald-500">Insights.</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-lg font-medium leading-relaxed">
                        The latest breakthroughs in clinical risk assessment, medical technology, and global healthcare trends.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, idx) => (
                        <NewsCard key={post.id || idx} post={post} idx={idx} />
                    ))}
                </div>
            </div>
        </div>
    );
}

const NewsCard = ({ post, idx }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const platform = useMemo(() => getPlatformInfo(post.source || post.platform_url), [post]);

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="group flex flex-col bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200/60 dark:border-slate-800/60 overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500"
        >
            <div className="relative h-60 overflow-hidden">
                <img
                    src={post.image || 'https://images.unsplash.com/photo-1505751172107-573225a91200?q=80&w=800'}
                    alt={post.title}
                    className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-xl shadow-sm border border-white/20">
                        {platform.icon}
                        <span className="text-[10px] font-black uppercase   text-slate-700 dark:text-slate-200">
                            {post.source || platform.label}
                        </span>
                    </div>
                </div>
            </div>

            <div className="p-8 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight mb-4 line-clamp-2">
                    {post.title}
                </h2>

                <div className="flex-grow">
                    <p className={`text-slate-500 dark:text-slate-400 text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
                        {isExpanded ? (post.description || post.content) : post.content}
                    </p>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-3 text-[10px] font-black uppercase   text-emerald-500 hover:text-emerald-600 transition-colors"
                    >
                        {isExpanded ? 'Show Less' : 'Read Abstract'}
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-8">
                    <a href={post.url || post.source} target="_blank" rel="noreferrer"
                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-[10px] font-black uppercase   hover:bg-emerald-500 transition-all">
                        Source <HiOutlineExternalLink size={14} />
                    </a>
                    <a href={post.platform_url || post.source} target="_blank" rel="noreferrer"
                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300 text-[10px] font-black uppercase   hover:bg-[#0A66C2] hover:text-white transition-all">
                        LinkedIn <SiLinkedin size={12} />
                    </a>
                </div>
            </div>
        </motion.article>
    );
};