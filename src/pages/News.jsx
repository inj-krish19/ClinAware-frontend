import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineExternalLink, HiOutlineNewspaper, HiChevronDown, HiLink } from 'react-icons/hi';
import { SiLinkedin } from 'react-icons/si'; // Install react-icons if not present
import { BACKEND_URL } from '../context/constants';
import Loading from '../components/Loading';

export default function News() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);

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

    // Helper to detect platform
    const getPlatformInfo = (url) => {
        if (url?.includes('linkedin.com')) {
            return { label: 'LinkedIn', icon: <SiLinkedin size={14} className="text-[#0A66C2]" /> };
        }
        return { label: 'Source', icon: <HiLink size={14} /> };
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] pt-28 pb-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">

                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                            <HiOutlineNewspaper className="text-emerald-500 text-xl" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Intelligence</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
                        Health <span className="text-emerald-500">Insights</span>
                    </h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                    {posts.map((post, idx) => (
                        <NewsCard key={post.id || idx} post={post} idx={idx} />
                    ))}
                </div>
            </div>
        </div>
    );
}


const ImagePlaceholder = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-full bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center p-6 text-center"
    >
        {/* Animated Pulse Icon */}
        <motion.div
            animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 1, 0.5]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mb-3 text-slate-300 dark:text-slate-600"
        >
            <HiOutlineNewspaper size={48} />
        </motion.div>

        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Visual Asset Unavailable
        </span>

        {/* Shimmer Effect */}
        <div className="absolute inset-0 overflow-hidden">
            <motion.div
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
            />
        </div>
    </motion.div>
);


const NewsCard = ({ post, idx }) => {
    const [imgError, setImgError] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const getPlatformInfo = (url) => {
        if (url?.includes('linkedin.com')) {
            return { label: 'LinkedIn', icon: <SiLinkedin size={14} className="text-[#0A66C2]" /> };
        }
        return { label: 'Source', icon: <HiLink size={14} /> };
    };

    const platform = getPlatformInfo(post.platform_url || post.url);

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
        >
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                {!imgError ? (
                    <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        src={post.image || 'https://images.unsplash.com/photo-1505751172107-573225a91200?q=80&w=800'}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }}>
                            <HiOutlineNewspaper size={40} className="text-slate-300 dark:text-slate-600 mb-2" />
                        </motion.div>
                        <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Visual Unavailable</span>
                    </div>
                )}

                <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-full border border-slate-200 dark:border-slate-700">
                        {platform.icon}
                        <span className="text-[9px] font-black uppercase tracking-tighter text-slate-600 dark:text-slate-300">
                            {post.source || platform.label}
                        </span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-7">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight mb-4 line-clamp-2">
                    {post.title}
                </h2>

                <div className="relative">
                    <p className={`text-slate-500 dark:text-slate-400 text-sm leading-relaxed transition-all ${isExpanded ? '' : 'line-clamp-3'}`}>
                        {post.content.split('...')[0] + '...'}
                    </p>

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-3 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-600 transition-colors"
                    >
                        {isExpanded ? 'Show Less' : 'Read Full Summary'}
                        <HiChevronDown className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <a
                        href={post.platform_url || post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300"
                    >
                        View on {platform.label} <HiOutlineExternalLink size={16} />
                    </a>
                </div>
            </div>
        </motion.article>
    );
};
