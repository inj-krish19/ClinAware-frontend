import React from 'react';
import { LuShieldCheck, LuExternalLink, LuHospital, LuActivity, LuInfo } from 'react-icons/lu';

export default function InsuranceMarket({ aiPredictedMonthly }) {
    const rawData = [
        { id: 1, name: "Super Star Value", company: "Star Health", hospitals: 149, room: "Single Private AC", premium: 810, url: "https://www.policybazaar.com/health-insurance/star-health-insurance/" },
        { id: 2, name: "Ultimate Care (Direct)", company: "Care Health", hospitals: 160, room: "No Room Rent Limit", premium: 675, url: "https://www.policybazaar.com/health-insurance/care-health-insurance/" },
        { id: 3, name: "ReAssure 3.0 Elite", company: "Niva Bupa", hospitals: 224, room: "Single Private AC", premium: 1122, url: "https://www.policybazaar.com/health-insurance/niva-bupa-health-insurance/" },
        { id: 4, name: "Optima Select", company: "HDFC ERGO", hospitals: 218, room: "Single Pvt AC", premium: 978, url: "https://www.hdfcergo.com/health-insurance" },
        { id: 5, name: "Elevate", company: "ICICI Lombard", hospitals: 137, room: "Single Pvt AC", premium: 1003, url: "https://www.icicilombard.com/health-insurance" },
        { id: 6, name: "ActivOne Smart", company: "Aditya Birla", hospitals: 202, room: "Shared Room", premium: 544, url: "https://www.adityabirlacapital.com/healthinsurance" },
        { id: 7, name: "Medicare Select", company: "Tata AIG", hospitals: 225, room: "Single Pvt AC", premium: 857, url: "https://www.tataaig.com/health-insurance" },
        { id: 8, name: "My Health Care", company: "Tata AIG", hospitals: 170, room: "Single Pvt AC", premium: 670, url: "https://www.tataaig.com/health-insurance" },
        { id: 9, name: "Sarvah - Uttam", company: "ManipalCigna", hospitals: 174, room: "Single Pvt AC", premium: 935, url: "https://www.manipalcigna.com/" },
        { id: 10, name: "Flexi Health", company: "Universal Sompo", hospitals: 260, room: "No Room Rent Limit", premium: 1119, url: "https://www.universalsompo.com/" }
    ];

    const processedPlans = rawData
        .map(plan => ({ ...plan, diff: Math.abs(plan.premium - aiPredictedMonthly) }))
        .sort((a, b) => a.diff - b.diff)
        .map((plan, index) => ({ ...plan, isRecommended: index < 3 }));

    const externalLinks = [
        { name: "Policy Bazaar", url: "https://www.policybazaar.com" },
        { name: "Ditto Insurance", url: "https://www.joinditto.com" },
        { name: "HDFC ERGO", url: "https://www.hdfcergo.com" },
        { name: "Niva Bupa", url: "https://www.nivabupa.com" },
    ];

    return (
        <div className="mt-32 pb-32 grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3 space-y-10">
                <div className="flex items-center gap-4 mb-12">
                    <div className="w-2 h-10 bg-purple-600 rounded-full" />
                    <h2 className="text-4xl font-black   uppercase dark:text-white">
                        Market <span className="text-purple-600">Cross-Reference</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {processedPlans.map((plan) => (
                        <div key={plan.id} className={`relative p-10 rounded-[3.5rem] border-2 transition-all duration-500 ${plan.isRecommended ? 'border-purple-500 bg-purple-500/5 shadow-2xl shadow-purple-500/10 scale-[1.03]' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 opacity-60 hover:opacity-100'}`}>
                            {plan.isRecommended && (
                                <div className="absolute -top-4 left-10 bg-purple-600 text-white text-[10px] font-black px-6 py-2 rounded-full flex items-center gap-2 shadow-xl z-10  ">
                                    <LuShieldCheck size={16} /> CLINAWARE PREFERRED
                                </div>
                            )}

                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase   mb-1">{plan.company}</p>
                                    <h4 className="text-2xl font-black dark:text-white   leading-none">{plan.name}</h4>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-black text-purple-600 tabular-nums">₹{plan.premium}</p>
                                    <p className="text-[9px] font-black text-slate-400 uppercase">Per Month</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-10">
                                <div className="flex items-center gap-4 text-[12px] font-bold text-slate-600 dark:text-slate-400">
                                    <LuHospital className="text-purple-500" size={18} /> {plan.hospitals} Network Centers
                                </div>
                                <div className="flex items-center gap-4 text-[12px] font-bold text-slate-600 dark:text-slate-400">
                                    <LuActivity className="text-fuchsia-500" size={18} /> {plan.room}
                                </div>
                            </div>

                            <a href={plan.url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 w-full py-5 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-[1.5rem] font-black text-[11px] uppercase   hover:bg-purple-600 hover:text-white transition-all shadow-lg">
                                Market Checkout <LuExternalLink size={16} />
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-1">
                <div className="sticky top-32 p-10 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
                    <h3 className="text-xs font-black uppercase   mb-8 flex items-center gap-3 dark:text-white">
                        <LuInfo className="text-purple-500" size={20} /> Portals
                    </h3>
                    <div className="space-y-5">
                        {externalLinks.map((link, i) => (
                            <a key={i} href={link.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/50 rounded-[1.5rem] border border-transparent hover:border-purple-500 hover:bg-white transition-all group">
                                <span className="text-[11px] font-black dark:text-white uppercase  ">{link.name}</span>
                                <LuExternalLink size={16} className="text-slate-400 group-hover:text-purple-500" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}