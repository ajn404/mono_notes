import { motion, useScroll } from "framer-motion";

export default function App() {
  const { scrollYProgress } = useScroll();
  
  return (
    <>
      <motion.div
        className="progress-bar backdrop-blur-3xl bg-gradient-to-r from-purple-500 to-pink-500 "
        style={{ scaleX: scrollYProgress,position:'fixed' }}
      />
      </>
  );
}
