import { motion } from "framer-motion";
import { useEffect } from "react";
import MyGfImg from "../../assets/imgs/my_gf.png";
import Img from "../../components/img";

function MyGf() {
    useEffect(() => {
        document.title = "My GF ❤️ - Puppy_z4nx";
    }, []);

    return (
        <div className="font-bold text-neutral-800 w-full pb-12">
            {/* ===== Title ===== */}
            <div className="mb-6 flex text-3xl gap-2 font-bold">
                <div className="bg-pink-400 h-[36px] w-2"></div>
                <h2 className="text-pink-600">My Girlfriend ❤️</h2>
            </div>

            <div className="mt-8 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative group p-2 bg-white/50 backdrop-blur-md rounded-[2.5rem] shadow-2xl border-4 border-pink-200"
                >
                    <Img
                        src={MyGfImg}
                        alt="My GF"
                        className="w-full max-w-md rounded-[2rem] object-cover"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-pink-500 text-white p-4 rounded-full shadow-lg animate-bounce">
                        ❤️
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-12 text-center max-w-lg"
                >
                    <h3 className="text-2xl text-pink-700 italic mb-4">"A.thw - Haru"</h3>
                    <p className="text-slate-700 leading-relaxed font-normal italic">
                       Supper Lazy,
                       Artis,
                       Love cat
                    </p>

                    <div className="mt-8 flex justify-center gap-4 text-2xl">
                        <span>🌸</span>
                        <span>✨</span>
                        <span>🧸</span>
                        <span>💌</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default MyGf;
