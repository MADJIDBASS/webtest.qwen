import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

// ─── Intersection Observer Hook ────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return { ref, isInView };
}

// ─── Navigation ────────────────────────────────────────────────────
function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/90 backdrop-blur-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#" className="font-serif text-2xl md:text-3xl font-medium text-warm-black tracking-wide">
          سُكون
        </a>
        <div className="flex items-center gap-8 text-sm font-light text-warm-brown">
          <a href="#philosophy" className="hover-line hidden md:block">فلسفتنا</a>
          <a href="#coffee" className="hover-line hidden md:block">القهوة</a>
          <a href="#visit" className="hover-line hidden md:block">زُرنا</a>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero Section ──────────────────────────────────────────────────
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-end overflow-hidden grain">
      {/* Background image */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="https://image.qwenlm.ai/generated-images/dda587cf-7929-4e73-9714-8dccadfbbc45/_result.png"
          alt="أجواء سُكون"
          className="w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black/80 via-warm-black/30 to-warm-black/10" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7 md:col-start-1">
            <p className="text-copper-light text-sm tracking-widest mb-4 animate-fade-up opacity-0 delay-300" style={{ animationFillMode: 'forwards' }}>
              قهوة تأمّل
            </p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream font-light leading-[1.1] animate-fade-up opacity-0 delay-500" style={{ animationFillMode: 'forwards' }}>
              في كل رشفة،<br />
              <span className="italic font-light">لحظة صمت</span>
            </h1>
          </div>
          <div className="md:col-span-3 md:col-start-9">
            <p className="text-cream/70 text-sm leading-relaxed animate-fade-up opacity-0 delay-800" style={{ animationFillMode: 'forwards' }}>
              مكانٌ وُلد من فكرة بسيطة: أن القهوة ليست مجرد مشروب، بل طقسٌ يومي يستحق التروي والتأمل.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in opacity-0 delay-1000" style={{ animationFillMode: 'forwards' }}>
        <div className="w-px h-12 bg-cream/30 relative overflow-hidden">
          <div className="w-full h-1/2 bg-copper-light absolute top-0 animate-[scrollDown_2s_ease-in-out_infinite]" />
        </div>
      </div>

      <style>{`
        @keyframes scrollDown {
          0% { top: -50%; }
          100% { top: 100%; }
        }
      `}</style>
    </section>
  );
}

// ─── Transition Divider ───────────────────────────────────────────
function Divider({ dark = false }: { dark?: boolean }) {
  const { ref, isInView } = useReveal();
  return (
    <div ref={ref} className={`py-4 ${dark ? 'bg-warm-black' : 'bg-cream'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`h-px origin-right ${dark ? 'bg-warm-brown/30' : 'bg-warm-gray-light'}`}
        />
      </div>
    </div>
  );
}

// ─── Philosophy Section ────────────────────────────────────────────
function PhilosophySection() {
  const { ref, isInView } = useReveal();

  return (
    <section id="philosophy" className="py-24 md:py-40 bg-cream">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Right column - large statement */}
          <div className="md:col-span-5 md:col-start-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="w-12 h-px bg-copper mb-8" />
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.2] text-warm-black">
                لا نبيع<br />قهوة فحسب،<br />
                <span className="text-copper">بل وقتًا</span><br />
                تستحقّه
              </h2>
            </motion.div>
          </div>

          {/* Left column - philosophy text */}
          <div className="md:col-span-5 md:col-start-7 md:pt-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="text-warm-brown text-base md:text-lg leading-[1.9] mb-8">
                في عالمٍ لا يتوقف عن الصراخ، اخترنا أن نكون همسة. سُكون ليس مقهى عابرًا — إنه مساحة صُمّمت بعناية لتعيد لك اتصالك بلحظة الحاضر.
              </p>
              <p className="text-warm-gray text-sm md:text-base leading-[1.9] mb-10">
                نختار حبوبنا من مزارع صغيرة تعرف أسماء مزارعيها. نحمّصها ببطء، ونحضّرها بصبر. كل تفصيل هنا — من صوت الموسيقى الخافتة إلى ملمس الكوب في يدك — مقصود ومدروس.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-warm-gray-light flex items-center justify-center">
                  <span className="text-warm-brown text-xs font-serif">س</span>
                </div>
                <span className="text-warm-gray text-sm">تأسس ٢٠٢١</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Coffee Section ────────────────────────────────────────────────
function CoffeeSection() {
  const { ref, isInView } = useReveal();

  const coffees = [
    {
      name: 'إثيوبيا يرغاتشيف',
      origin: 'إثيوبيا',
      notes: 'ياسمين، برغموت، حمضيات',
      method: 'تقطير بطيء',
      price: '٢٨',
    },
    {
      name: 'كولومبيا هويلا',
      origin: 'كولومبيا',
      notes: 'كراميل، تفاح أخضر، شوكولاتة',
      method: 'V60',
      price: '٢٥',
    },
    {
      name: 'كينيا AA',
      origin: 'كينيا',
      notes: 'كشمش أسود، طماطم مجففة',
      method: 'كيمكس',
      price: '٣٠',
    },
  ];

  return (
    <section id="coffee" className="py-24 md:py-40 bg-warm-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
          {/* Image */}
          <div className="md:col-span-5 md:col-start-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="aspect-[4/5] overflow-hidden"
            >
              <img
                src="https://image.qwenlm.ai/generated-images/b325b5da-ed27-4422-932d-7f05d1320185/_result.png"
                alt="حبوب القهوة"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Header */}
          <div className="md:col-span-5 md:col-start-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="text-copper text-sm tracking-widest mb-6">اختيارات الموسم</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-cream leading-[1.2] mb-6">
                حبوبٌ تحكي<br />
                <span className="italic">قصة أرضها</span>
              </h2>
              <p className="text-warm-gray text-sm leading-[1.9] max-w-sm">
                نختار محاصيل الموسم بعناية من مزارع صغيرة في ثلاث قارات. كل كيس يحمل اسم المزرعة، وارتفاعها، وتاريخ الحصاد.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Coffee list */}
        <div ref={ref} className="border-t border-warm-brown/30">
          {coffees.map((coffee, i) => (
            <CoffeeItem key={i} coffee={coffee} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CoffeeItem({ coffee, index }: { coffee: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="border-b border-warm-brown/30 py-8 md:py-10 cursor-pointer group"
    >
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-12 md:col-span-4">
          <h3 className={`font-serif text-2xl md:text-3xl font-light transition-colors duration-300 ${isHovered ? 'text-copper' : 'text-cream'}`}>
            {coffee.name}
          </h3>
        </div>
        <div className="col-span-6 md:col-span-3">
          <p className="text-warm-gray text-sm">{coffee.notes}</p>
        </div>
        <div className="col-span-3 md:col-span-2">
          <p className="text-warm-gray/60 text-xs tracking-wider">{coffee.method}</p>
        </div>
        <div className="col-span-3 md:col-span-2 text-left">
          <p className="text-copper-light font-serif text-xl">{coffee.price} <span className="text-xs text-warm-gray">ر.س</span></p>
        </div>
        <div className="col-span-12 md:col-span-1 flex justify-start md:justify-end">
          <motion.div
            animate={{ rotate: isHovered ? -45 : 0, x: isHovered ? -4 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-6 h-6 flex items-center justify-center"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-warm-gray group-hover:text-copper transition-colors duration-300">
              <path d="M12 4L4 12M4 4H12V12" stroke="currentColor" strokeWidth="1" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Experience Section ────────────────────────────────────────────
function ExperienceSection() {
  const { ref, isInView } = useReveal();

  return (
    <section className="py-24 md:py-40 bg-cream-dark">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="md:col-span-6 md:col-start-1"
          >
            <p className="text-copper text-sm tracking-widest mb-6">التجربة</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-warm-black leading-[1.3] mb-8">
              ثلاثة طقوس،<br />
              كلٌّ منها عالم
            </h2>
            <p className="text-warm-brown text-sm leading-[1.9] max-w-md">
              صمّمنا ثلاثة أوضاع مختلفة تناسب حالتك المزاجية. اختر ما يناسبك عند الدخول، ودعنا نتولى الباقي.
            </p>
          </motion.div>

          <div className="md:col-span-5 md:col-start-8 space-y-12">
            {[
              { num: '٠١', title: 'سكون', desc: 'صمت تام. لا موسيقى، لا محادثات. فقط أنت وقهوتك وأفكارك.' },
              { num: '٠٢', title: 'همس', desc: 'موسيقى هادئة جدًا — بيانو أو عود — وصوت خافت للمحادثة.' },
              { num: '٠٣', title: 'لقاء', desc: 'مساحة مفتوحة للحوار. نوصي به للأصدقاء والقراءات الجماعية.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="flex gap-6 group"
              >
                <span className="font-serif text-3xl text-copper/40 group-hover:text-copper transition-colors duration-500">
                  {item.num}
                </span>
                <div>
                  <h3 className="font-serif text-xl text-warm-black mb-2">{item.title}</h3>
                  <p className="text-warm-gray text-sm leading-[1.8]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Visit Section ─────────────────────────────────────────────────
function VisitSection() {
  const { ref, isInView } = useReveal();

  return (
    <section id="visit" className="py-24 md:py-40 bg-warm-black relative">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="md:col-span-6 md:col-start-1"
          >
            <p className="text-copper text-sm tracking-widest mb-6">زُرنا</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-cream leading-[1.2]">
              بابنا<br />مفتوح لك
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-4 md:col-start-8 flex flex-col justify-end"
          >
            <div className="space-y-8">
              <div>
                <p className="text-warm-gray text-xs tracking-widest mb-2">العنوان</p>
                <p className="text-cream text-base">حي الملقا، شارع الأمير تركي</p>
                <p className="text-cream/60 text-sm mt-1">الرياض، المملكة العربية السعودية</p>
              </div>
              <div>
                <p className="text-warm-gray text-xs tracking-widest mb-2">ساعات العمل</p>
                <p className="text-cream text-sm">الأحد – الخميس: ٧ ص — ١١ م</p>
                <p className="text-cream text-sm">الجمعة – السبت: ٢ م — ١٢ ص</p>
              </div>
              <div>
                <p className="text-warm-gray text-xs tracking-widest mb-2">تواصل</p>
                <a href="#" className="text-copper hover-line text-sm">info@sukoon.coffee</a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full h-48 md:h-64 bg-warm-dark border border-warm-brown/20 flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-warm-gray" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <div className="text-center z-10">
            <div className="w-3 h-3 bg-copper rounded-full mx-auto mb-3 animate-pulse" />
            <p className="text-warm-gray text-sm">حي الملقا، الرياض</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-warm-black border-t border-warm-brown/20 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-serif text-2xl text-cream/80">سُكون</div>
          <p className="text-warm-gray/50 text-xs text-center md:text-right">
            © ٢٠٢٤ سُكون. صُمّم بعناية في الرياض.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Main App ──────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      <HeroSection />
      <Divider />
      <PhilosophySection />
      <Divider />
      <CoffeeSection />
      <ExperienceSection />
      <VisitSection />
      <Footer />
    </div>
  );
}
