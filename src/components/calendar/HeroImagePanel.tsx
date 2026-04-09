import { motion, AnimatePresence } from 'framer-motion';
import { MONTH_NAMES, MONTH_IMAGES } from '@/lib/calendar-utils';

interface HeroImagePanelProps {
  month: number;
  year: number;
}

export function HeroImagePanel({ month, year }: HeroImagePanelProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none aspect-[16/10] lg:aspect-auto lg:h-full">
      <AnimatePresence mode="wait">
        <motion.img
          key={`${month}-${year}`}
          src={MONTH_IMAGES[month]}
          alt={`${MONTH_NAMES[month]} ${year}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
        <motion.h2
          key={`title-${month}-${year}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="font-display text-4xl lg:text-5xl font-semibold tracking-tight"
          style={{ color: 'rgba(255,255,255,0.95)' }}
        >
          {MONTH_NAMES[month]}
        </motion.h2>
        <motion.p
          key={`year-${month}-${year}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="font-body text-lg mt-1"
          style={{ color: 'rgba(255,255,255,0.7)' }}
        >
          {year}
        </motion.p>
      </div>
    </div>
  );
}
