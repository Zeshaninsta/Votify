import { motion } from "framer-motion";
import PropTypes from "prop-types";

const ShinyButton = ({ text }) => {
  const animationProps = {
    initial: { "--x": "100%", scale: 1 },
    animate: { "--x": "-100%" },
    whileTap: { scale: 0.97 },
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 1,
      type: "spring",
      stiffness: 20,
      damping: 15,
      mass: 2,
      scale: {
        type: "spring",
        stiffness: 10,
        damping: 5,
        mass: 0.1,
      },
    },
  };

  return (
    <motion.button
      initial={animationProps.initial}
      animate={animationProps.animate}
      whileTap={animationProps.whileTap}
      transition={animationProps.transition}
      className="border border-slate-700 rounded-full p-2 text-white font-semibold w-[100px] relative"
    >
      <span className="text-neutral-100 tracking-wide font-light h-full w-full block relative linear-mask">
        {text}
      </span>
      <span className="block absolute inset-0 p-px linear-overlay rounded-full" />
    </motion.button>
  );
};

ShinyButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ShinyButton;
