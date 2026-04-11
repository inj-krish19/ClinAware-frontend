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
        { id: 10, name: "Flexi Health", company: "Universal Sompo", hospitals: 260, room: "No Room Rent Limit", premium: 1119, url: "https://www.universalsompo.com/" },
        { id: 11, name: "Health Gain 3.0", company: "IndusInd (RGI)", hospitals: 173, room: "Single Private AC", premium: 948, url: "https://www.reliancegeneral.co.in/" },
        { id: 12, name: "Family Health Protector", company: "IFFCO Tokio", hospitals: 87, room: "No Room Rent Limit", premium: 974, url: "https://www.iffcotokio.co.in/" },
        { id: 13, name: "A Plus Silver", company: "Universal Sompo", hospitals: 260, room: "No Room Rent Limit", premium: 835, url: "https://www.universalsompo.com/" },
        { id: 14, name: "LiveWise", company: "Liberty General", hospitals: 135, room: "No Room Rent Limit", premium: 742, url: "https://www.libertyinsurance.in/" },
        { id: 15, name: "Bharat X", company: "Acko", hospitals: 149, room: "Single Private AC", premium: 732, url: "https://www.acko.com/" },
        { id: 16, name: "OneHealth Support Plus", company: "Magma HDI", hospitals: 151, room: "No Room Rent Limit", premium: 894, url: "https://www.magma-hdi.co.in/" },
        { id: 17, name: "Marvel", company: "Zuno General", hospitals: 60, room: "Any Room", premium: 1006, url: "https://www.zunogi.com/" },
        { id: 18, name: "Health Infinity", company: "IndusInd (RGI)", hospitals: 173, room: "No Room Rent Limit", premium: 1293, url: "https://www.reliancegeneral.co.in/" },
        { id: 19, name: "Individual Health Protector", company: "IFFCO Tokio", hospitals: 87, room: "Single Pvt AC", premium: 1667, url: "https://www.iffcotokio.co.in/" }
    ];

    // LOGIC: Find top 3 closest matches to the Regressor result
    const processedPlans = rawData
        .map(plan => ({
            ...plan,
            diff: Math.abs(plan.premium - aiPredictedMonthly)
        }))
        .sort((a, b) => a.diff - b.diff) // Sort by closest price
        .map((plan, index) => ({
            ...plan,
            isRecommended: index < 3 // Only Top 3 get the badge
        }));

    const externalLinks = [
        { name: "Policy Bazaar", url: "https://www.policybazaar.com" },
        { name: "ICICI Lombard", url: "https://www.icicilombard.com" },
        { name: "Ditto Insurance", url: "https://www.joinditto.com" },
        { name: "Niva Bupa", url: "https://www.nivabupa.com" },
        { name: "National Insurance", url: "https://nationalinsurance.nic.co.in" },
        { name: "Star Health", url: "https://www.starhealth.in" },
        { name: "HDFC ERGO", url: "https://www.hdfcergo.com" },
    ];

    return (
        <div className="mt-16 pb-20 grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-6">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-1.5 h-8 bg-sky-500 rounded-full" />
                    <h2 className="text-3xl font-black tracking-tighter uppercase dark:text-white">
                        Market <span className="text-sky-500">Selection</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {processedPlans.map((plan) => (
                        <div key={plan.id} className={`relative p-6 rounded-[2.5rem] border-2 transition-all duration-500 ${plan.isRecommended ? 'border-sky-500 bg-sky-500/5 shadow-xl shadow-sky-500/10 scale-[1.02]' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 opacity-80'}`}>
                            {plan.isRecommended && (
                                <div className="absolute -top-3 left-8 bg-sky-500 text-white text-[9px] font-black px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg z-10">
                                    <LuShieldCheck size={14} /> CLINAWARE RECOMMENDED
                                </div>
                            )}

                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{plan.company}</p>
                                    <h4 className="text-xl font-black dark:text-white tracking-tight">{plan.name}</h4>
                                </div>
                                <p className="text-2xl font-black text-slate-900 dark:text-white">₹{plan.premium}<span className="text-[10px] text-slate-400">/mo</span></p>
                            </div>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                                    <LuHospital className="text-sky-500" size={14} /> {plan.hospitals} Cashless Hospitals
                                </div>
                                <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                                    <LuActivity className="text-sky-500" size={14} /> {plan.room}
                                </div>
                            </div>

                            <a href={plan.url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-sky-500 hover:text-white transition-all">
                                Checkout on PolicyBazaar <LuExternalLink size={14} />
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sidebar with direct links */}
            <div className="lg:col-span-1">
                <div className="sticky top-28 p-8 rounded-[2.5rem] bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2 dark:text-white">
                        <LuInfo className="text-sky-500" /> Insurer Portals
                    </h3>
                    <div className="space-y-4">
                        {externalLinks.map((link, i) => (
                            <a key={i} href={link.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-sky-500 transition-all group">
                                <span className="text-xs font-black dark:text-white">{link.name}</span>
                                <LuExternalLink size={14} className="text-slate-400 group-hover:text-sky-500" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
