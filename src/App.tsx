import { useEffect, useRef, useState } from 'react';

// ─── Simple reveal on scroll ────────────────────────────────────
function useRevealOnScroll() {
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.reveal');
      if (elements.length === 0) return;
      
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.12, rootMargin: '-40px' }
      );
      
      elements.forEach((el) => observer!.observe(el));
    }, 100);
    
    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, []);
}

// ─── Navigation ──────────────────────────────────────────────────
function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 50,
        transition: 'all 0.5s ease',
        padding: scrolled ? '16px 0' : '24px 0',
        backgroundColor: scrolled ? 'rgba(247, 243, 237, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: '#1C1712', textDecoration: 'none', letterSpacing: '0.02em' }}>
          سُكون
        </a>
        <div style={{ display: 'flex', gap: 32, fontSize: 14, fontWeight: 300, color: '#3D3228' }}>
          <a href="#philosophy" className="hover-line" style={{ color: 'inherit', textDecoration: 'none' }}>فلسفتنا</a>
          <a href="#coffee" className="hover-line" style={{ color: 'inherit', textDecoration: 'none' }}>القهوة</a>
          <a href="#visit" className="hover-line" style={{ color: 'inherit', textDecoration: 'none' }}>زُرنا</a>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    const onScroll = () => {
      if (imgRef.current) {
        const y = window.scrollY * 0.15;
        imgRef.current.style.transform = `translateY(${y}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
      <div ref={imgRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <img
          src="https://image.qwenlm.ai/generated-images/dda587cf-7929-4e73-9714-8dccadfbbc45/_result.png"
          alt="أجواء سُكون"
          style={{ width: '100%', height: '120%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,23,18,0.8), rgba(28,23,18,0.3) 50%, rgba(28,23,18,0.1))' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 48px 96px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 32, alignItems: 'flex-end' }}>
          <div style={{ gridColumn: 'span 7' }}>
            <p style={{
              color: '#C4956A', fontSize: 13, letterSpacing: '0.15em', marginBottom: 16,
              opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s ease', transitionDelay: '0.3s',
            }}>
              قهوة تأمّل
            </p>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(48px, 8vw, 104px)',
              fontWeight: 300,
              color: '#F7F3ED',
              lineHeight: 1.1,
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s ease',
              transitionDelay: '0.5s',
            }}>
              في كل رشفة،<br />
              <span style={{ fontStyle: 'italic' }}>لحظة صمت</span>
            </h1>
          </div>
          <div style={{ gridColumn: 'span 3', gridColumnStart: 9 }}>
            <p style={{
              color: 'rgba(247,243,237,0.7)', fontSize: 14, lineHeight: 1.7,
              opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s ease', transitionDelay: '0.8s',
            }}>
              مكانٌ وُلد من فكرة بسيطة: أن القهوة ليست مجرد مشروب، بل طقسٌ يومي يستحق التروي والتأمل.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        opacity: loaded ? 1 : 0, transition: 'opacity 0.7s ease', transitionDelay: '1s',
      }}>
        <div style={{ width: 1, height: 48, backgroundColor: 'rgba(247,243,237,0.3)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ width: '100%', height: '50%', backgroundColor: '#C4956A', position: 'absolute', animation: 'scrollDown 2s ease-in-out infinite' }} />
        </div>
      </div>
    </section>
  );
}

// ─── Divider ─────────────────────────────────────────────────────
function Divider() {
  return (
    <div style={{ padding: '16px 0', backgroundColor: '#F7F3ED' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        <div className="reveal line-grow" style={{ height: 1, backgroundColor: '#E8E0D4' }} />
      </div>
    </div>
  );
}

// ─── Philosophy ──────────────────────────────────────────────────
function Philosophy() {
  return (
    <section id="philosophy" style={{ padding: '96px 0', backgroundColor: '#F7F3ED' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 32 }}>
          <div style={{ gridColumn: 'span 5' }}>
            <div className="reveal">
              <div style={{ width: 48, height: 1, backgroundColor: '#A67C52', marginBottom: 32 }} />
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(36px, 5vw, 72px)',
                fontWeight: 300,
                lineHeight: 1.2,
                color: '#1C1712',
              }}>
                لا نبيع<br />قهوة فحسب،<br />
                <span style={{ color: '#A67C52' }}>بل وقتًا</span><br />
                تستحقّه
              </h2>
            </div>
          </div>

          <div style={{ gridColumn: 'span 5', gridColumnStart: 7, paddingTop: 96 }}>
            <div className="reveal reveal-delay-2">
              <p style={{ color: '#3D3228', fontSize: 17, lineHeight: 1.9, marginBottom: 32 }}>
                في عالمٍ لا يتوقف عن الصراخ، اخترنا أن نكون همسة. سُكون ليس مقهى عابرًا — إنه مساحة صُمّمت بعناية لتعيد لك اتصالك بلحظة الحاضر.
              </p>
              <p style={{ color: '#B8AFA3', fontSize: 15, lineHeight: 1.9, marginBottom: 40 }}>
                نختار حبوبنا من مزارع صغيرة تعرف أسماء مزارعيها. نحمّصها ببطء، ونحضّرها بصبر. كل تفصيل هنا — من صوت الموسيقى الخافتة إلى ملمس الكوب في يدك — مقصود ومدروس.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#E8E0D4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#3D3228', fontSize: 12, fontFamily: "'Cormorant Garamond', serif" }}>س</span>
                </div>
                <span style={{ color: '#B8AFA3', fontSize: 14 }}>تأسس ٢٠٢١</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Coffee ──────────────────────────────────────────────────────
function Coffee() {
  const coffees = [
    { name: 'إثيوبيا يرغاتشيف', notes: 'ياسمين، برغموت، حمضيات', method: 'تقطير بطيء', price: '٢٨' },
    { name: 'كولومبيا هويلا', notes: 'كراميل، تفاح أخضر، شوكولاتة', method: 'V60', price: '٢٥' },
    { name: 'كينيا AA', notes: 'كشمش أسود، طماطم مجففة', method: 'كيمكس', price: '٣٠' },
  ];

  return (
    <section id="coffee" style={{ padding: '96px 0', backgroundColor: '#1C1712', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 32, marginBottom: 80 }}>
          <div style={{ gridColumn: 'span 5' }}>
            <div className="reveal" style={{ aspectRatio: '4/5', overflow: 'hidden' }}>
              <img
                src="https://image.qwenlm.ai/generated-images/b325b5da-ed27-4422-932d-7f05d1320185/_result.png"
                alt="حبوب القهوة"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          <div style={{ gridColumn: 'span 5', gridColumnStart: 7, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="reveal reveal-delay-2">
              <p style={{ color: '#A67C52', fontSize: 13, letterSpacing: '0.15em', marginBottom: 24 }}>اختيارات الموسم</p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(32px, 4vw, 56px)',
                fontWeight: 300,
                color: '#F7F3ED',
                lineHeight: 1.2,
                marginBottom: 24,
              }}>
                حبوبٌ تحكي<br />
                <span style={{ fontStyle: 'italic' }}>قصة أرضها</span>
              </h2>
              <p style={{ color: '#B8AFA3', fontSize: 14, lineHeight: 1.9, maxWidth: 360 }}>
                نختار محاصيل الموسم بعناية من مزارع صغيرة في ثلاث قارات. كل كيس يحمل اسم المزرعة، وارتفاعها، وتاريخ الحصاد.
              </p>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(61,50,40,0.3)' }}>
          {coffees.map((c, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1} coffee-item`} style={{ borderBottom: '1px solid rgba(61,50,40,0.3)', padding: '32px 0', cursor: 'pointer' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16, alignItems: 'center' }}>
                <div style={{ gridColumn: 'span 4' }}>
                  <h3 className="coffee-name" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 300, color: '#F7F3ED' }}>
                    {c.name}
                  </h3>
                </div>
                <div style={{ gridColumn: 'span 3' }}>
                  <p style={{ color: '#B8AFA3', fontSize: 14 }}>{c.notes}</p>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <p style={{ color: 'rgba(184,175,163,0.6)', fontSize: 12, letterSpacing: '0.05em' }}>{c.method}</p>
                </div>
                <div style={{ gridColumn: 'span 2', textAlign: 'left' }}>
                  <p style={{ color: '#C4956A', fontSize: 20, fontFamily: "'Cormorant Garamond', serif" }}>
                    {c.price} <span style={{ fontSize: 12, color: '#B8AFA3' }}>ر.س</span>
                  </p>
                </div>
                <div style={{ gridColumn: 'span 1', display: 'flex', justifyContent: 'flex-end' }}>
                  <div className="coffee-arrow" style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: '#B8AFA3' }}>
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

// ─── Experience ──────────────────────────────────────────────────
function Experience() {
  const rituals = [
    { num: '٠١', title: 'سكون', desc: 'صمت تام. لا موسيقى، لا محادثات. فقط أنت وقهوتك وأفكارك.' },
    { num: '٠٢', title: 'همس', desc: 'موسيقى هادئة جدًا — بيانو أو عود — وصوت خافت للمحادثة.' },
    { num: '٠٣', title: 'لقاء', desc: 'مساحة مفتوحة للحوار. نوصي به للأصدقاء والقراءات الجماعية.' },
  ];

  return (
    <section style={{ padding: '96px 0', backgroundColor: '#EDE6DA' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 64 }}>
          <div style={{ gridColumn: 'span 6' }}>
            <div className="reveal">
              <p style={{ color: '#A67C52', fontSize: 13, letterSpacing: '0.15em', marginBottom: 24 }}>التجربة</p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 300,
                color: '#1C1712',
                lineHeight: 1.3,
                marginBottom: 32,
              }}>
                ثلاثة طقوس،<br />
                كلٌّ منها عالم
              </h2>
              <p style={{ color: '#3D3228', fontSize: 14, lineHeight: 1.9, maxWidth: 400 }}>
                صمّمنا ثلاثة أوضاع مختلفة تناسب حالتك المزاجية. اختر ما يناسبك عند الدخول، ودعنا نتولى الباقي.
              </p>
            </div>
          </div>

          <div style={{ gridColumn: 'span 5', gridColumnStart: 8 }}>
            {rituals.map((r, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} ritual-item`} style={{ display: 'flex', gap: 24, marginBottom: i < rituals.length - 1 ? 48 : 0 }}>
                <span className="ritual-num" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, color: 'rgba(166,124,82,0.4)' }}>
                  {r.num}
                </span>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: '#1C1712', marginBottom: 8 }}>{r.title}</h3>
                  <p style={{ color: '#B8AFA3', fontSize: 14, lineHeight: 1.8 }}>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Visit ───────────────────────────────────────────────────────
function Visit() {
  return (
    <section id="visit" style={{ padding: '96px 0', backgroundColor: '#1C1712' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 32, marginBottom: 80 }}>
          <div style={{ gridColumn: 'span 6' }}>
            <div className="reveal">
              <p style={{ color: '#A67C52', fontSize: 13, letterSpacing: '0.15em', marginBottom: 24 }}>زُرنا</p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(36px, 5vw, 72px)',
                fontWeight: 300,
                color: '#F7F3ED',
                lineHeight: 1.2,
              }}>
                بابنا<br />مفتوح لك
              </h2>
            </div>
          </div>

          <div style={{ gridColumn: 'span 4', gridColumnStart: 8, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div className="reveal reveal-delay-2" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div>
                <p style={{ color: '#B8AFA3', fontSize: 11, letterSpacing: '0.15em', marginBottom: 8 }}>العنوان</p>
                <p style={{ color: '#F7F3ED', fontSize: 16 }}>حي الملقا، شارع الأمير تركي</p>
                <p style={{ color: 'rgba(247,243,237,0.6)', fontSize: 14, marginTop: 4 }}>الرياض، المملكة العربية السعودية</p>
              </div>
              <div>
                <p style={{ color: '#B8AFA3', fontSize: 11, letterSpacing: '0.15em', marginBottom: 8 }}>ساعات العمل</p>
                <p style={{ color: '#F7F3ED', fontSize: 14 }}>الأحد – الخميس: ٧ ص — ١١ م</p>
                <p style={{ color: '#F7F3ED', fontSize: 14 }}>الجمعة – السبت: ٢ م — ١٢ ص</p>
              </div>
              <div>
                <p style={{ color: '#B8AFA3', fontSize: 11, letterSpacing: '0.15em', marginBottom: 8 }}>تواصل</p>
                <a href="mailto:info@sukoon.coffee" className="hover-line" style={{ color: '#A67C52', fontSize: 14, textDecoration: 'none' }}>
                  info@sukoon.coffee
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal reveal-delay-3" style={{
          width: '100%', height: 220, backgroundColor: '#2A2320',
          border: '1px solid rgba(61,50,40,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#B8AFA3" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <div style={{ textAlign: 'center', zIndex: 10 }}>
            <div style={{ width: 12, height: 12, backgroundColor: '#A67C52', borderRadius: '50%', margin: '0 auto 12px', animation: 'pulse 2s ease-in-out infinite' }} />
            <p style={{ color: '#B8AFA3', fontSize: 14 }}>حي الملقا، الرياض</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ backgroundColor: '#1C1712', borderTop: '1px solid rgba(61,50,40,0.2)', padding: '48px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: 'rgba(247,243,237,0.8)' }}>سُكون</div>
        <p style={{ color: 'rgba(184,175,163,0.5)', fontSize: 12 }}>© ٢٠٢٤ سُكون. صُمّم بعناية في الرياض.</p>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────
export default function App() {
  useRevealOnScroll();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F3ED' }}>
      <Navigation />
      <Hero />
      <Divider />
      <Philosophy />
      <Divider />
      <Coffee />
      <Experience />
      <Visit />
      <Footer />
    </div>
  );
}
