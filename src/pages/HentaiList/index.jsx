import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { hentaiList } from "../../config/hentai";
import Img from "../../components/img";

// Synchronized Heading
const Heading = ({ name, emoji }) => (
    <div className="mb-6 flex text-3xl gap-2 font-bold">
        <div className="bg-neutral-800 h-[36px] w-2"></div>
        <h2 className="text-neutral-800">{name} {emoji}</h2>
    </div>
);

function HentaiListPage() {
    useEffect(() => {
        document.title = "Ecchi - Puppy_z4nx";
    }, []);

    const [currentIndex, setCurrentIndex] = useState(null);
    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate();

    const openModal = (index) => setCurrentIndex(index);
    const closeModal = () => setCurrentIndex(null);

    const goNext = useCallback(() => {
        if (currentIndex !== null) {
            setCurrentIndex((prev) => (prev + 1) % hentaiList.length);
        }
    }, [currentIndex]);

    const goPrev = useCallback(() => {
        if (currentIndex !== null) {
            setCurrentIndex((prev) => (prev - 1 + hentaiList.length) % hentaiList.length);
        }
    }, [currentIndex]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (currentIndex === null) return;
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentIndex, goNext, goPrev]);

    // Age Verification Gate
    if (!isVerified) {
        return createPortal(
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-neutral-800 font-bold">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-md w-full bg-white rounded-2xl p-10 text-center shadow-2xl border border-slate-200"
                >
                    <div className="text-6xl mb-6">🔞</div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Cảnh báo nội dung</h2>
                    <p className="text-sm text-slate-500 mb-8 font-semibold leading-relaxed">
                        Trang web này chứa nội dung dành cho người lớn (18+).<br />
                        Vui lòng xác nhận bạn đã đủ tuổi để tiếp tục.
                    </p>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => setIsVerified(true)}
                            className="w-full py-3 rounded-xl bg-neutral-800 text-white font-bold hover:bg-neutral-700 transition shadow-lg"
                        >
                            Tôi đã đủ 18 tuổi
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="w-full py-3 rounded-xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition"
                        >
                            Quay lại trang chủ
                        </button>
                    </div>
                </motion.div>
            </div>,
            document.body
        );
    }

    const modalData = currentIndex !== null ? hentaiList[currentIndex] : null;

    return (
        <div className="font-bold text-neutral-800 w-full pb-12">
            <Heading name="Bộ sưu tập Hentai" emoji="🔞" />
            <p className="text-slate-800/90 text-pretty mb-8">
                <span>⬤</span> ?? xem cái gì v 
            </p>

            {/* Grid Layout - More columns to make items smaller */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {hentaiList.map(({ rank, name, description, image }, index) => (
                    <div
                        key={rank}
                        onClick={() => openModal(index)}
                        className="relative aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300"
                    >
                        {/* Main Image */}
                        <Img
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />

                        {/* Dark Overlay for Text */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent flex flex-col justify-end p-3 sm:p-4">
                            <h3 className="text-sm sm:text-base font-bold text-white leading-tight mb-0.5 drop-shadow-md line-clamp-2">
                                {name}
                            </h3>
                            <p className="text-pink-400 text-[10px] sm:text-xs font-semibold opacity-90 line-clamp-1">
                                {description}
                            </p>
                        </div>

                        {/* Rank Badge - Top Right */}
                        <div className="absolute top-2 right-2 bg-pink-600 text-white text-[9px] sm:text-xs font-black px-1.5 py-0.5 rounded shadow-lg">
                            #{rank}
                        </div>
                    </div>
                ))}
            </div>

            {/* Preview Modal - Synchronized with About.js Preview Modal Style */}
            <AnimatePresence>
                {modalData && (
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                    >
                        <motion.div
                            className="relative max-w-4xl w-full bg-white p-6 rounded-2xl shadow-2xl border border-slate-200"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-4 right-4 text-slate-800 text-2xl hover:rotate-90 transition-transform"
                                onClick={closeModal}
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </button>

                            <div className="mb-6 pr-10">
                                <p className="text-pink-600 text-xs font-bold uppercase tracking-widest mb-1">Top {modalData.rank}</p>
                                <h3 className="text-2xl font-bold text-slate-800 leading-tight">
                                    {modalData.name}
                                </h3>
                            </div>

                            <div className="relative group overflow-hidden rounded-xl bg-slate-100">
                                <img
                                    src={modalData.image}
                                    alt={modalData.name}
                                    className="w-full max-h-[60vh] object-contain mx-auto"
                                />

                                {/* Modal Navigation Controls */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); goPrev(); }}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white transition-all opacity-0 group-hover:opacity-100"
                                >
                                    ❮
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); goNext(); }}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white transition-all opacity-0 group-hover:opacity-100"
                                >
                                    ❯
                                </button>
                            </div>

                            <div className="mt-6 space-y-4">
                                <p className="text-slate-600 text-lg leading-relaxed italic font-normal">
                                    "{modalData.description}"
                                </p>
                                <div className="flex gap-4">
                                    <a
                                        href={modalData.url || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-neutral-800 text-white font-bold hover:bg-neutral-700 transition shadow-md"
                                    >
                                        Xem nguồn gốc ↗
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default HentaiListPage;
