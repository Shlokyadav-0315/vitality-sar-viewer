import { Canvas } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import { useState, useEffect } from 'react'
import Globe from './components/Globe'
import Moon from './components/Moon'

// ── Scroll Progress ───────────────────────────────────────────────────
function ProgressBar() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const fn = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setPct(total ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 h-px z-50" style={{ background: '#111' }}>
      <div className="h-full transition-all duration-100" style={{ width: `${pct}%`, background: '#00d4ff' }} />
    </div>
  )
}

// ── Section 1: Hero ───────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col justify-end px-8 md:px-16 pb-20">
      {/* Mission tag */}
      <div className="mb-6 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full radar-pulse" style={{ background: '#00d4ff' }} />
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#00d4ff', letterSpacing: '0.15em' }}>
          NASA SPACE APPS 2026 — MISSION ACTIVE
        </span>
      </div>

      {/* Main title */}
      <h1 style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: 'clamp(64px, 10vw, 140px)',
        fontWeight: 700,
        lineHeight: 0.9,
        letterSpacing: '-0.03em',
        color: '#fff',
        marginBottom: '24px'
      }}>
        Vitality
      </h1>

      {/* Subtitle */}
      <p style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: 'clamp(18px, 2.5vw, 28px)',
        fontWeight: 300,
        color: '#00d4ff',
        marginBottom: '16px',
        letterSpacing: '-0.01em'
      }}>
        Dancing with the SARs
      </p>

      <p style={{ fontSize: '16px', color: '#666', maxWidth: '440px', lineHeight: 1.6 }}>
        Witnessing Earth's transformation through satellite radar. Real data. Real change.
      </p>

      {/* Scroll hint */}
      <div className="absolute bottom-8 right-8 flex items-center gap-2" style={{ color: '#555' }}>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.1em' }}>SCROLL</span>
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}

// ── Section 2: What is SAR ────────────────────────────────────────────
function SARSection() {
  return (
    <section style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(20px)', padding: '120px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 64px' }}>
        {/* Section header — left aligned, no ALL CAPS label */}
        <div style={{ borderLeft: '2px solid #00d4ff', paddingLeft: '24px', marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            color: '#fff',
            lineHeight: 1
          }}>
            Synthetic<br />Aperture Radar
          </h2>
          <p style={{ color: '#999', marginTop: '16px', fontSize: '16px', maxWidth: '400px', lineHeight: 1.7 }}>
            A satellite technology that sees through clouds, smoke, and darkness — imaging Earth's surface with radar pulses.
          </p>
        </div>

        {/* Three facts — horizontal rule separators, not cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0' }}>
          {[
            { num: '01', title: 'All-weather vision', body: 'Radar waves penetrate clouds, storms, and night. Unlike optical cameras, SAR never goes blind.' },
            { num: '02', title: 'Surface precision', body: 'Detects millimeter-scale ground deformation — invisible to the human eye, visible to radar.' },
            { num: '03', title: 'Change detection', body: 'Comparing passes over time reveals glacier retreat, floods, earthquakes, and deforestation.' },
          ].map((item, i) => (
            <div key={item.num} style={{
              padding: '40px 40px 40px 0',
              borderTop: '1px solid #1a1a1a',
              borderRight: i < 2 ? '1px solid #1a1a1a' : 'none',
              paddingLeft: i > 0 ? '40px' : '0'
            }}>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#00d4ff', marginBottom: '20px' }}>{item.num}</div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#fff', marginBottom: '12px', letterSpacing: '-0.01em' }}>{item.title}</h3>
              <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.7 }}>{item.body}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: '1px solid #1a1a1a' }}>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#555', letterSpacing: '0.1em' }}>
            SENTINEL-1 · ESA · 6-12 DAY REVISIT · ACTIVE SINCE 2014
          </p>
        </div>
      </div>
    </section>
  )
}

// ── Section 3: Glacier ────────────────────────────────────────────────
function GlacierSection() {
  const [year, setYear] = useState(0)
  const data = [
    { year: '1985', label: 'Baseline — glacier at maximum extent', image: '/sar-data/Jakobshavn_1985.jpg' },
    { year: '2022', label: '37 years later — significant retreat documented', image: '/sar-data/Jakobshavn_2022.jpg' },
  ]

  return (
    <section style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)', padding: '120px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 64px' }}>
        {/* Header */}
        <div style={{ marginBottom: '64px' }}>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#00d4ff', letterSpacing: '0.15em', marginBottom: '16px' }}>
            69.17°N 49.83°W · GREENLAND
          </p>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            color: '#fff'
          }}>
            Jakobshavn<br />Glacier
          </h2>
          <p style={{ color: '#999', marginTop: '16px', fontSize: '16px' }}>37 years of ice loss, captured by satellite radar.</p>
        </div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '48px', alignItems: 'start' }}>
          {/* Image */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid #1a1a1a' }}>
              <img
                src={data[year].image}
                alt={data[year].label}
                style={{ width: '100%', display: 'block', transition: 'opacity 0.4s' }}
              />
              {/* Year overlay */}
              <div style={{
                position: 'absolute', top: '20px', left: '20px',
                background: 'rgba(0,0,0,0.9)',
                border: '1px solid #00d4ff22',
                padding: '8px 16px'
              }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '28px', color: '#00d4ff', fontWeight: 700 }}>
                  {data[year].year}
                </span>
              </div>
              {/* Caption */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                padding: '40px 20px 16px'
              }}>
                <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#888' }}>{data[year].label}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {/* Timeline */}
            <div style={{ padding: '28px', border: '1px solid #1a1a1a', marginBottom: '2px' }}>
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#999', letterSpacing: '0.1em', marginBottom: '20px' }}>
                TIMELINE
              </p>
              <input
                type="range" min="0" max="1" value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer', accentColor: '#00d4ff' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                {['1985', '2022'].map(y => (
                  <span key={y} style={{
                    fontFamily: 'Space Mono, monospace', fontSize: '13px',
                    color: data[year].year === y ? '#00d4ff' : '#555',
                    transition: 'color 0.2s'
                  }}>{y}</span>
                ))}
              </div>
            </div>

            {/* Stats */}
            {[
              { value: '15km+', label: 'terminus retreat' },
              { value: '40m/day', label: 'flow speed' },
              { value: '1mm/yr', label: 'sea level contribution' },
            ].map(s => (
              <div key={s.label} style={{ padding: '20px 28px', border: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', color: '#fff', fontWeight: 700 }}>{s.value}</span>
                <span style={{ fontSize: '12px', color: '#777' }}>{s.label}</span>
              </div>
            ))}

            <div style={{ padding: '20px 28px', border: '1px solid #1a1a1a', marginTop: '2px' }}>
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#555', letterSpacing: '0.08em', lineHeight: 1.6 }}>
                DATA SOURCE<br />
                <span style={{ color: '#999' }}>Sentinel-1 SAR — OPERA RTC<br />Alaska Satellite Facility</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Section 4: Impact ─────────────────────────────────────────────────
function ImpactSection() {
  const impacts = [
    { stat: '3.3mm', unit: 'per year', label: 'Global sea level rise rate', detail: 'Jakobshavn contributes significantly to oceans rising worldwide.' },
    { stat: '15%', unit: 'since 1950', label: 'AMOC current weakening', detail: 'Freshwater influx from melting disrupts Atlantic circulation.' },
    { stat: '7m', unit: 'potential', label: 'Sea rise if Greenland melts', detail: "Greenland's ice sheet holds enough water to reshape every coastline." },
    { stat: '↑2°C', unit: 'Arctic warming', label: 'Faster than global average', detail: 'The Arctic warms 3× faster than the rest of Earth.' },
  ]

  return (
    <section style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(12px)', padding: '120px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 64px' }}>
        <div style={{ borderLeft: '2px solid #00d4ff', paddingLeft: '24px', marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            color: '#fff', lineHeight: 1
          }}>
            Why this<br />matters
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: '#111' }}>
          {impacts.map((item) => (
            <div key={item.label} style={{ background: '#000', padding: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '48px', color: '#fff', fontWeight: 700, letterSpacing: '-0.03em' }}>{item.stat}</span>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', color: '#00d4ff' }}>{item.unit}</span>
              </div>
              <p style={{ fontSize: '15px', fontWeight: 500, color: '#ccc', marginBottom: '8px' }}>{item.label}</p>
              <p style={{ fontSize: '13px', color: '#777', lineHeight: 1.6 }}>{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Section 5: More ───────────────────────────────────────────────────
function MoreSection() {
  const locations = [
    { code: 'AMZ', title: 'Amazon', sub: 'Deforestation tracking' },
    { code: 'EQK', title: 'Earthquakes', sub: 'Ground deformation' },
    { code: 'FLD', title: 'Floods', sub: 'Emergency mapping' },
    { code: 'VLC', title: 'Volcanoes', sub: 'Eruption monitoring' },
    { code: 'URB', title: 'Urban growth', sub: 'Infrastructure change' },
    { code: 'AGR', title: 'Agriculture', sub: 'Crop & soil moisture' },
  ]

  return (
    <section style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)', padding: '120px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 64px' }}>
        <div style={{ marginBottom: '64px' }}>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            color: '#fff', lineHeight: 1
          }}>
            Beyond glaciers
          </h2>
          <p style={{ color: '#777', marginTop: '16px', fontSize: '15px' }}>SAR reveals change across every surface of Earth.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#111' }}>
          {locations.map((loc) => (
            <div key={loc.code} style={{
              background: '#000', padding: '36px',
              transition: 'background 0.2s',
              cursor: 'default'
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#0a0a14'}
              onMouseLeave={e => e.currentTarget.style.background = '#000'}
            >
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#00d4ff', letterSpacing: '0.15em', marginBottom: '16px' }}>{loc.code}</p>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>{loc.title}</h3>
              <p style={{ fontSize: '13px', color: '#777' }}>{loc.sub}</p>
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#222', marginTop: '24px' }}>COMING SOON</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Section 6: Final ──────────────────────────────────────────────────
function FinalSection() {
  return (
    <section style={{ background: '#000', padding: '160px 0 80px', borderTop: '1px solid #111' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'end' }}>
          <div>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#00d4ff', letterSpacing: '0.15em', marginBottom: '24px' }}>
              NASA SPACE APPS CHALLENGE 2026
            </p>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              color: '#fff', lineHeight: 1.05, marginBottom: '24px'
            }}>
              Dancing with<br />the SARs
            </h2>
            <p style={{ fontSize: '15px', color: '#777', lineHeight: 1.7, maxWidth: '380px' }}>
              Visualizing Earth's surface changes using NASA-ISRO NISAR mission data to track climate change in real time.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {[
              { key: 'Stack', val: 'React · Three.js · Tailwind' },
              { key: 'Data', val: 'Sentinel-1 SAR · NASA Earthdata' },
              { key: 'Coverage', val: '1985 – 2024' },
              { key: 'Deadline', val: 'November 15, 2026' },
            ].map(item => (
              <div key={item.key} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '16px 0', borderBottom: '1px solid #111'
              }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#555', letterSpacing: '0.08em' }}>{item.key}</span>
                <span style={{ fontSize: '13px', color: '#888' }}>{item.val}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '80px', paddingTop: '32px', borderTop: '1px solid #0a0a0a' }}>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#222' }}>
            © 2026 VITALITY — BUILT FOR NASA SPACE APPS CHALLENGE
          </p>
        </div>
      </div>
    </section>
  )
}

// ── Main App ──────────────────────────────────────────────────────────
export default function App() {
  const [globeOpen, setGlobeOpen] = useState(false)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setGlobeOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = globeOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [globeOpen])

  return (
    <div style={{ background: '#000', width: '100%' }}>
      <ProgressBar />

      {/* Fullscreen Globe */}
      {globeOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: '#000', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px', borderBottom: '1px solid #111' }}>
            <div>
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', color: '#00d4ff' }}>INTERACTIVE GLOBE</p>
              <p style={{ fontSize: '12px', color: '#555', marginTop: '4px' }}>Drag to rotate · Scroll to zoom</p>
            </div>
            <button
              onClick={() => setGlobeOpen(false)}
              style={{
                fontFamily: 'Space Mono, monospace', fontSize: '11px',
                color: '#888', background: 'none', border: '1px solid #222',
                padding: '8px 20px', cursor: 'pointer', letterSpacing: '0.08em'
              }}
            >
              ESC — CLOSE
            </button>
          </div>
          <div style={{ flex: 1 }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} shadows>
              <ambientLight intensity={2.5} />
              <directionalLight position={[5, 3, 5]} intensity={2.5} castShadow />
              <pointLight position={[-5, -3, -5]} intensity={1} />
              <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade />
              <Globe />
              <Moon />
              <OrbitControls enableZoom enableRotate rotateSpeed={0.5} zoomSpeed={0.6} minDistance={3} maxDistance={12} />
            </Canvas>
          </div>
        </div>
      )}

      {/* Background 3D */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} shadows>
          <ambientLight intensity={2.5} />
          <directionalLight position={[5, 3, 5]} intensity={2.5} castShadow />
          <pointLight position={[-5, -3, -5]} intensity={1} />
          <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade />
          <Globe />
          <Moon />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
        </Canvas>
      </div>

      {/* Explore Globe button */}
      <button
        onClick={() => setGlobeOpen(true)}
        style={{
          position: 'fixed', bottom: '32px', right: '32px', zIndex: 40,
          display: 'flex', alignItems: 'center', gap: '10px',
          background: '#000', border: '1px solid #00d4ff33',
          color: '#00d4ff', padding: '12px 24px', cursor: 'pointer',
          fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.1em',
          transition: 'all 0.2s'
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#00d4ff11'; e.currentTarget.style.borderColor = '#00d4ff' }}
        onMouseLeave={e => { e.currentTarget.style.background = '#000'; e.currentTarget.style.borderColor = '#00d4ff33' }}
      >
        <div className="radar-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00d4ff' }} />
        EXPLORE GLOBE
      </button>

      {/* Scrollable content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <HeroSection />
        <SARSection />
        <GlacierSection />
        <ImpactSection />
        <MoreSection />
        <FinalSection />
      </div>
    </div>
  )
}
