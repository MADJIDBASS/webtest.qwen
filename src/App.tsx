import { useEffect, useRef, useState } from 'react';

// ─── Intersection Observer Hook ──────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '-60px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function useRevealMultiple() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-40px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return containerRef;
}

// ─── Parallax Hook ───────────────────────────────────────────────
function useParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.bottom > 0 && rect.top < windowHeight) {
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        setOffset(progress * 15);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, offset };
}

// ─── Navigation ──────────────────────────────────────────────────
function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#F7F3ED]/90 backdrop-blur-sm py-4 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <a
          href="#"
          className="text-2xl md:text-3xl font-light tracking-wide text-[#1C1712]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          سُكون
        </a>
        <div className="flex items-center gap-8 text-sm font-light text-[#3D3228]">
          <a href="#philosophy" className="hover-line hidden md:block">فلسفتنا</a>
          <a href="#coffee" className="hover-line hidden md:block">القهوة</a>
          <a href="#visit" className="hover-line hidden md:block">زُرنا</a>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero Section ────────────────────────────────────────────────
function HeroSection() {
  const { ref, offset } = useParallax();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ transform: `translateY(${offset}%)` }}
      >
        <img
          src="https://image.qwenlm.ai/generated-images/dda587cf-7929-4e73-9714-8dccadfbbc45/_result.png"
          alt="أجواء سُكون"
          className="w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1712]/80 via-[#1C1712]/30 to-[#1C1712]/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7 md:col-start-1">
            <p
              className={`text-[#C4956A] text-sm tracking-widest mb-4 transition-all duration-700 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              قهوة تأمّل
            </p>
            <h1
              className={`text-5xl md:text-7xl lg:text-8xl text-[#F7F3ED] font-light leading-[1.1] transition-all duration-700 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                transitionDelay: '500ms',
              }}
            >
              في كل رشفة،<br />
              <span className="italic">لحظة صمت</span>
            </h1>
          </div>
          <div className="md:col-span-3 md:col-start-9">
            <p
              className={`text-[#F7F3ED]/70 text-sm leading-relaxed transition-all duration-700 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              مكانٌ وُلد من فكرة بسيطة: أن القهوة ليست مجرد مشروب، بل طقسٌ يومي يستحق التروي والتأمل.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '1000ms' }}
      >
        <div className="w-px h-12 bg-[#F7F3ED]/30 relative overflow-hidden">
          <div
            className="w-full h-1/2 bg-[#C4956A] absolute"
            style={{ animation: 'scrollDown 2s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  );
}

// ─── Divider ─────────────────────────────────────────────────────
function Divider() {
  const ref = useReveal();

  return (
    <div className="py-4 bg-[#F7F3ED]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={ref} className="h-px bg-[#E8E0D4] line-grow" />
      </div>
    </div>
  );
}

// ─── Philosophy Section ──────────────────────────────────────────
function PhilosophySection() {
  const ref = useRevealMultiple();

  return (
    <section id="philosophy" className="py-24 md:py-40 bg-[#F7F3ED]">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Right column - large statement */}
          <div className="md:col-span-5 md:col-start-1">
            <div className="reveal">
              <div className="w-12 h-px bg-[#A67C52] mb-8" />
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.2] text-[#1C1712]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                لا نبيع<br />قهوة فحسب،<br />
                <span className="text-[#A67C52]">بل وقتًا</span><br />
                تستحقّه
              </h2>
            </div>
          </div>

          {/* Left column - philosophy text */}
          <div className="md:col-span-5 md:col-start-7 md:pt-24">
            <div className="reveal reveal-delay-2">
              <p className="text-[#3D3228] text-base md:text-lg leading-[1.9] mb-8">
                في عالمٍ لا يتوقف عن الصراخ، اخترنا أن نكون همسة. سُكون ليس مقهى عابرًا — إنه مساحة صُمّمت بعناية لتعيد لك اتصالك بلحظة الحاضر.
              </p>
              <p className="text-[#B8AFA3] text-sm md:text-base leading-[1.9] mb-10">
                نختار حبوبنا من مزارع صغيرة تعرف أسماء مزارعيها. نحمّصها ببطء، ونحضّرها بصبر. كل تفصيل هنا — من صوت الموسيقى الخافتة إلى ملمس الكوب في يدك — مقصود ومدروس.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E8E0D4] flex items-center justify-center">
                  <span className="text-[#3D3228] text-xs" style={{ fontFamily: "'Cormorant Garamond', serif" }}>س</span>
                </div>
                <span className="text-[#B8AFA3] text-sm">تأسس ٢٠٢١</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Coffee Section ──────────────────────────────────────────────
function CoffeeSection() {
  const sectionRef = useRevealMultiple();

  const coffees = [
    {
      name: 'إثيوبيا يرغاتشيف',
      notes: 'ياسمين، برغموت، حمضيات',
      method: 'تقطير بطيء',
      price: '٢٨',
    },
    {
      name: 'كولومبيا هويلا',
      notes: 'كراميل، تفاح أخضر، شوكولاتة',
      method: 'V60',
      price: '٢٥',
    },
    {
      name: 'كينيا AA',
      notes: 'كشمش أسود، طماطم مجففة',
      method: 'كيمكس',
      price: '٣٠',
    },
  ];

  return (
    <section id="coffee" className="py-24 md:py-40 bg-[#1C1712] relative overflow-hidden">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
          {/* Image */}
          <div className="md:col-span-5 md:col-start-1">
            <div className="reveal aspect-[4/5] overflow-hidden">
              <img
                src="https://image.qwenlm.ai/generated-images/b325b5da-ed27-4422-932d-7f05d1320185/_result.png"
                alt="حبوب القهوة"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Header */}
          <div className="md:col-span-5 md:col-start-7 flex flex-col justify-center">
            <div className="reveal reveal-delay-2">
              <p className="text-[#A67C52] text-sm tracking-widest mb-6">اختيارات الموسم</p>
              <h2
                className="text-4xl md:text-5xl font-light text-[#F7F3ED] leading-[1.2] mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                حبوبٌ تحكي<br />
                <span className="italic">قصة أرضها</span>
              </h2>
              <p className="text-[#B8AFA3] text-sm leading-[1.9] max-w-sm">
                نختار محاصيل الموسم بعناية من مزارع صغيرة في ثلاث قارات. كل كيس يحمل اسم المزرعة، وارتفاعها، وتاريخ الحصاد.
              </p>
            </div>
          </div>
        </div>

        {/* Coffee list */}
        <div className="border-t border-[#3D3228]/30">
          {coffees.map((coffee, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} coffee-item border-b border-[#3D3228]/30 py-8 md:py-10 cursor-pointer`}
            >
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-12 md:col-span-4">
                  <h3
                    className="coffee-name text-2xl md:text-3xl font-light text-[#F7F3ED]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {coffee.name}
                  </h3>
                </div>
                <div className="col-span-6 md:col-span-3">
                  <p className="text-[#B8AFA3] text-sm">{coffee.notes}</p>
                </div>
                <div className="col-span-3 md:col-span-2">
                  <p className="text-[#B8AFA3]/60 text-xs tracking-wider">{coffee.method}</p>
                </div>
                <div className="col-span-3 md:col-span-2 text-left">
                  <p className="text-[#C4956A] text-xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {coffee.price} <span className="text-xs text-[#B8AFA3]">ر.س</span>
                  </p>
                </div>
                <div className="col-span-12 md:col-span-1 flex justify-start md:justify-end">
                  <div className="coffee-arrow w-6 h-6 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#B8AFA3]">
                      <path d="M12 4L4 12M4 4H12V12" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Experience Section ──────────────────────────────────────────
function ExperienceSection() {
  const ref = useRevealMultiple();

  const rituals = [
    { num: '٠١', title: 'سكون', desc: 'صمت تام. لا موسيقى، لا محادثات. فقط أنت وقهوتك وأفكارك.' },
    { num: '٠٢', title: 'همس', desc: 'موسيقى هادئة جدًا — بيانو أو عود — وصوت خافت للمحادثة.' },
    { num: '٠٣', title: 'لقاء', desc: 'مساحة مفتوحة للحوار. نوصي به للأصدقاء والقراءات الجماعية.' },
  ];

  return (
    <section className="py-24 md:py-40 bg-[#EDE6DA]">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-6 md:col-start-1">
            <div className="reveal">
              <p className="text-[#A67C52] text-sm tracking-widest mb-6">التجربة</p>
              <h2
                className="text-3xl md:text-4xl font-light text-[#1C1712] leading-[1.3] mb-8"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                ثلاثة طقوس،<br />
                كلٌّ منها عالم
              </h2>
              <p className="text-[#3D3228] text-sm leading-[1.9] max-w-md">
                صمّمنا ثلاثة أوضاع مختلفة تناسب حالتك المزاجية. اختر ما يناسبك عند الدخول، ودعنا نتولى الباقي.
              </p>
            </div>
          </div>

          <div className="md:col-span-5 md:col-start-8 space-y-12">
            {rituals.map((item, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1} ritual-item flex gap-6 group`}
              >
                <span
                  className="ritual-num text-3xl text-[#A67C52]/40"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {item.num}
                </span>
                <div>
                  <h3
                    className="text-xl text-[#1C1712] mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[#B8AFA3] text-sm leading-[1.8]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Visit Section ───────────────────────────────────────────────
function VisitSection() {
  const ref = useRevealMultiple();

  return (
    <section id="visit" className="py-24 md:py-40 bg-[#1C1712] relative">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
          <div className="md:col-span-6 md:col-start-1">
            <div className="reveal">
              <p className="text-[#A67C52] text-sm tracking-widest mb-6">زُرنا</p>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-light text-[#F7F3ED] leading-[1.2]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                بابنا<br />مفتوح لك
              </h2>
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-8 flex flex-col justify-end">
            <div className="reveal reveal-delay-2 space-y-8">
              <div>
                <p className="text-[#B8AFA3] text-xs tracking-widest mb-2">العنوان</p>
                <p className="text-[#F7F3ED] text-base">حي الملقا، شارع الأمير تركي</p>
                <p className="text-[#F7F3ED]/60 text-sm mt-1">الرياض، المملكة العربية السعودية</p>
              </div>
              <div>
                <p className="text-[#B8AFA3] text-xs tracking-widest mb-2">ساعات العمل</p>
                <p className="text-[#F7F3ED] text-sm">الأحد – الخميس: ٧ ص — ١١ م</p>
                <p className="text-[#F7F3ED] text-sm">الجمعة – السبت: ٢ م — ١٢ ص</p>
              </div>
              <div>
                <p className="text-[#B8AFA3] text-xs tracking-widest mb-2">تواصل</p>
                <a href="mailto:info@sukoon.coffee" className="text-[#A67C52] hover-line text-sm">
                  info@sukoon.coffee
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="reveal reveal-delay-3 w-full h-48 md:h-64 bg-[#2A2320] border border-[#3D3228]/20 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#B8AFA3" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <div className="text-center z-10">
            <div className="w-3 h-3 bg-[#A67C52] rounded-full mx-auto mb-3 animate-pulse" />
            <p className="text-[#B8AFA3] text-sm">حي الملقا، الرياض</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#1C1712] border-t border-[#3D3228]/20 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div
            className="text-2xl text-[#F7F3ED]/80"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            سُكون
          </div>
          <p className="text-[#B8AFA3]/50 text-xs text-center md:text-right">
            © ٢٠٢٤ سُكون. صُمّم بعناية في الرياض.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Main App ────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-[#F7F3ED]">
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
