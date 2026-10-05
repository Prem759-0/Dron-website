"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollSequence from "@/components/ScrollSequence";
import { Camera, Battery, Wind, Shield, Zap, ChevronDown, CheckCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const specsRef = useRef<HTMLDivElement>(null);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    // Navbar scroll effect
    const handleScroll = () => setNavScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);

    // Number counter animation for specs
    const counters = document.querySelectorAll(".spec-counter");
    counters.forEach((counter) => {
      const target = parseFloat(counter.getAttribute("data-target") || "0");
      const isDecimal = target % 1 !== 0;
      
      ScrollTrigger.create({
        trigger: counter,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            innerHTML: target,
            duration: 2.5,
            ease: "power3.out",
            snap: { innerHTML: isDecimal ? 0.1 : 1 },
            onUpdate: function () {
              if (isDecimal) {
                counter.innerHTML = Number(this.targets()[0].innerHTML).toFixed(1);
              }
            }
          });
        }
      });
    });

    // Staggered Fade-up elements
    const fadeEls = document.querySelectorAll(".fade-up");
    fadeEls.forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.fromTo(el, 
            { opacity: 0, y: 40 }, 
            { opacity: 1, y: 0, duration: 1.2, ease: "expo.out" }
          );
        }
      });
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-astro-base selection:bg-astro-orange selection:text-white">
      {/* Global Film Grain */}
      <div className="film-grain" />

      {/* Floating Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navScrolled ? 'py-4 glass-panel border-b-0' : 'py-8 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-extrabold tracking-widest text-white drop-shadow-md">
            ASTRO<span className="text-astro-cyan">DRONE</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-semibold tracking-wide text-astro-text/80 uppercase">
            <a href="#specs" className="hover:text-white transition-colors">Specs</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#compare" className="hover:text-white transition-colors">Compare</a>
          </nav>
          <button className="bg-white/10 hover:bg-white text-white hover:text-black transition-all duration-300 font-bold py-2 px-6 rounded-full border border-white/20 hover:border-transparent backdrop-blur-md">
            Pre-order
          </button>
        </div>
      </header>

      {/* 1. HERO SCROLL SEQUENCE */}
      <ScrollSequence
        startFrame={1}
        endFrame={120}
        scrollHeight="400vh"
        priorityLoad={true}
        overlays={[
          {
            id: "hero-title",
            startProgress: 0.0,
            endProgress: 0.25,
            content: (
              <div className="text-center px-4 flex flex-col items-center">
                <h1 className="text-7xl md:text-[8rem] font-black tracking-tighter mb-6 leading-none drop-shadow-2xl">
                  ASTRO<span className="text-gradient-accent">DRONE</span>
                </h1>
                <p className="text-xl md:text-3xl font-light text-astro-text/80 max-w-3xl mx-auto drop-shadow-md">
                  The world's most cinematic hyper-realistic consumer drone.
                </p>
                <div className="mt-16 animate-bounce">
                  <ChevronDown className="w-10 h-10 mx-auto text-white drop-shadow-lg" />
                </div>
              </div>
            ),
          },
          {
            id: "obstacle-avoidance",
            startProgress: 0.32,
            endProgress: 0.58,
            className: "items-end pb-24 md:pb-0 md:items-center md:justify-start md:pl-24 lg:pl-32",
            content: (
              <div className="glass-panel p-10 rounded-[2rem] max-w-md">
                <Shield className="w-12 h-12 text-astro-cyan mb-6 drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Omnidirectional Obstacle Avoidance</h2>
                <p className="text-astro-muted leading-relaxed text-lg">
                  Thread the needle through dense redwood forests with 360-degree millimeter-wave radar and binocular vision sensors.
                </p>
              </div>
            ),
          },
          {
            id: "weather-sealed",
            startProgress: 0.68,
            endProgress: 0.95,
            className: "items-end pb-24 md:pb-0 md:items-center md:justify-end md:pr-24 lg:pr-32",
            content: (
              <div className="glass-panel p-10 rounded-[2rem] max-w-md">
                <Wind className="w-12 h-12 text-astro-cyan mb-6 drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">IP55 Weather Sealed</h2>
                <p className="text-astro-muted leading-relaxed text-lg">
                  Push through waterfall mist and light rain. The matte titanium-gray body and carbon props are built for the harshest elements.
                </p>
              </div>
            ),
          }
        ]}
      />

      {/* 2. FEATURE SECTIONS */}
      <section className="py-32 bg-astro-base relative z-10" id="specs">
        
        {/* Animated Specs Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-40" ref={specsRef}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-12 border-y border-white/5 py-16 bg-astro-surface-light/30 backdrop-blur-xl rounded-3xl">
            <div className="text-center fade-up">
              <div className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter">
                <span className="spec-counter text-gradient" data-target="45">0</span><span className="text-2xl text-astro-orange ml-1">m</span>
              </div>
              <div className="text-sm tracking-[0.2em] font-semibold text-astro-muted uppercase">Flight Time</div>
            </div>
            <div className="text-center fade-up" style={{transitionDelay: '100ms'}}>
              <div className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter">
                <span className="spec-counter text-gradient" data-target="15">0</span><span className="text-2xl text-astro-orange ml-1">km</span>
              </div>
              <div className="text-sm tracking-[0.2em] font-semibold text-astro-muted uppercase">Range</div>
            </div>
            <div className="text-center fade-up" style={{transitionDelay: '200ms'}}>
              <div className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter">
                <span className="spec-counter text-gradient" data-target="21">0</span><span className="text-2xl text-astro-orange ml-1">m/s</span>
              </div>
              <div className="text-sm tracking-[0.2em] font-semibold text-astro-muted uppercase">Top Speed</div>
            </div>
            <div className="text-center fade-up" style={{transitionDelay: '300ms'}}>
              <div className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter">
                <span className="spec-counter text-gradient" data-target="6000">0</span><span className="text-2xl text-astro-orange ml-1">m</span>
              </div>
              <div className="text-sm tracking-[0.2em] font-semibold text-astro-muted uppercase">Max Altitude</div>
            </div>
            <div className="text-center fade-up" style={{transitionDelay: '400ms'}}>
              <div className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter">
                <span className="spec-counter text-gradient" data-target="895">0</span><span className="text-2xl text-astro-orange ml-1">g</span>
              </div>
              <div className="text-sm tracking-[0.2em] font-semibold text-astro-muted uppercase">Weight</div>
            </div>
          </div>
        </div>

        {/* Camera Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-40" id="features">
          <div className="bg-astro-surface rounded-[3rem] overflow-hidden flex flex-col md:flex-row items-center fade-up glow-card border border-white/5">
            <div className="p-12 md:p-20 flex-1 relative z-10">
              <Camera className="w-16 h-16 text-astro-orange mb-8 drop-shadow-[0_0_20px_rgba(255,90,0,0.4)]" />
              <h3 className="text-5xl md:text-6xl font-black mb-8 tracking-tight text-white">Cinematic <br/><span className="text-gradient">8K Sensor</span></h3>
              <p className="text-xl text-astro-muted mb-10 leading-relaxed font-light">
                Capture the world in breathtaking detail. The custom-designed 1-inch CMOS sensor with a 3-axis mechanical gimbal ensures butter-smooth footage even in high winds and low-light conditions.
              </p>
              <ul className="space-y-5 text-lg font-medium">
                <li className="flex items-center text-white">
                  <CheckCircle className="w-6 h-6 text-astro-cyan mr-4" /> 8K/60fps & 4K/120fps Video
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="w-6 h-6 text-astro-cyan mr-4" /> 10-bit D-Log Color Profile
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="w-6 h-6 text-astro-cyan mr-4" /> Dual Native ISO
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 h-[500px] md:h-[700px] relative">
              <img src="/Drone-frames/frame-0050.jpg" alt="Drone camera close up" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-astro-surface via-transparent to-transparent md:block hidden"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-astro-surface via-transparent to-transparent md:hidden block"></div>
            </div>
          </div>
        </div>

        {/* Intelligent Flight Modes */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-40">
          <div className="text-center mb-20 fade-up">
            <h3 className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-white">Intelligent Flight Modes</h3>
            <p className="text-xl text-astro-muted max-w-2xl mx-auto font-light">Advanced neural networks power automated cinematic maneuvers, allowing you to focus purely on the shot.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-astro-surface-light p-12 rounded-[2.5rem] glow-card border border-white/5 fade-up flex flex-col items-start h-full">
              <div className="w-16 h-16 rounded-2xl bg-astro-base flex items-center justify-center mb-8 border border-white/5">
                <svg className="w-8 h-8 text-astro-cyan drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-3xl font-bold mb-4 text-white">Cinematic Tracking</h4>
              <p className="text-astro-muted text-lg leading-relaxed font-light">Select a subject and let Astro Drone handle the rest. It keeps the subject centered perfectly while navigating obstacles automatically.</p>
            </div>
            <div className="bg-astro-surface-light p-12 rounded-[2.5rem] glow-card border border-white/5 fade-up flex flex-col items-start h-full" style={{ transitionDelay: '100ms' }}>
              <div className="w-16 h-16 rounded-2xl bg-astro-base flex items-center justify-center mb-8 border border-white/5">
                <svg className="w-8 h-8 text-astro-orange drop-shadow-[0_0_10px_rgba(255,90,0,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-3xl font-bold mb-4 text-white">Hyperlapse</h4>
              <p className="text-astro-muted text-lg leading-relaxed font-light">Create stunning time-lapse videos with complex flight paths. The drone stabilizes the footage natively, saving hours of post-processing.</p>
            </div>
            <div className="bg-astro-surface-light p-12 rounded-[2.5rem] glow-card border border-white/5 fade-up flex flex-col items-start h-full" style={{ transitionDelay: '200ms' }}>
              <div className="w-16 h-16 rounded-2xl bg-astro-base flex items-center justify-center mb-8 border border-white/5">
                <svg className="w-8 h-8 text-astro-cyan drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
              </div>
              <h4 className="text-3xl font-bold mb-4 text-white">Waypoint Pro</h4>
              <p className="text-astro-muted text-lg leading-relaxed font-light">Plan exact flight routes, camera angles, and speeds on the map. Save and repeat missions perfectly for seasonal transition shots.</p>
            </div>
          </div>
        </div>

        {/* Portability Split Screen */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-6 fade-up">
              <img src="/Drone-frames/frame-0010.jpg" alt="Drone arm folded" className="rounded-[2.5rem] w-full h-[400px] object-cover shadow-2xl border border-white/10" />
              <img src="/Drone-frames/frame-0020.jpg" alt="Drone top view" className="rounded-[2.5rem] w-full h-[400px] object-cover translate-y-12 shadow-2xl border border-white/10" />
            </div>
            <div className="order-1 lg:order-2 fade-up pl-0 lg:pl-12">
              <h3 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-none text-white">Foldable & <br/><span className="text-gradient">Packable</span></h3>
              <p className="text-xl text-astro-muted mb-10 leading-relaxed font-light">
                Despite its professional-grade capabilities, Astro Drone folds down to the size of a water bottle. The matte titanium-gray body ensures durability on the trail, while safety-orange accents make it easy to spot during setup and recovery.
              </p>
              <button className="bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:bg-astro-orange hover:text-white transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-[0_10px_30px_rgba(255,90,0,0.4)]">
                Explore Design Specs
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* 3. SECOND SCROLL SEQUENCE */}
      <ScrollSequence
        startFrame={121}
        endFrame={240}
        scrollHeight="300vh"
        priorityLoad={false}
        overlays={[
          {
            id: "water-stability",
            startProgress: 0.08,
            endProgress: 0.35,
            className: "items-end pb-24 md:pb-0 md:items-center md:justify-start md:pl-24 lg:pl-32",
            content: (
              <div className="glass-panel p-10 rounded-[2rem] max-w-md">
                <Battery className="w-12 h-12 text-astro-orange mb-6 drop-shadow-[0_0_15px_rgba(255,90,0,0.5)]" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Stable at 1m Above Water</h2>
                <p className="text-astro-muted leading-relaxed text-lg">
                  Advanced downward vision sensors keep altitude locked with pinpoint precision over reflective surfaces.
                </p>
              </div>
            ),
          },
          {
            id: "climb-speed",
            startProgress: 0.42,
            endProgress: 0.75,
            className: "items-end pb-24 md:pb-0 md:items-center md:justify-end md:pr-24 lg:pr-32",
            content: (
              <div className="glass-panel p-10 rounded-[2rem] max-w-md">
                <Zap className="w-12 h-12 text-astro-orange mb-6 drop-shadow-[0_0_15px_rgba(255,90,0,0.5)]" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Climbs 10 m/s</h2>
                <p className="text-astro-muted leading-relaxed text-lg">
                  Scale granite cliffs effortlessly. Redesigned motors provide a 30% increase in vertical thrust.
                </p>
              </div>
            ),
          },
          {
            id: "horizon",
            startProgress: 0.85,
            endProgress: 1.0,
            className: "items-center justify-center",
            content: (
              <div className="text-center">
                <h2 className="text-6xl md:text-[7rem] font-black mb-6 tracking-tighter drop-shadow-2xl">
                  BEYOND THE <br className="md:hidden"/><span className="text-gradient-accent">HORIZON</span>
                </h2>
                <p className="text-2xl md:text-4xl text-white/90 drop-shadow-lg font-light tracking-wide">Witness sunrise above the clouds.</p>
              </div>
            ),
          }
        ]}
      />

      {/* 4. MORE RICHLY DESIGNED SECTIONS */}
      <section className="py-40 bg-astro-base relative z-10" id="compare">
        
        {/* Comparison Table */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-40 fade-up">
          <div className="text-center mb-16">
            <h3 className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-white">Generational Leap</h3>
            <p className="text-xl text-astro-muted font-light">Performance multiplied across the board.</p>
          </div>
          <div className="overflow-x-auto rounded-[2rem] border border-white/10 glass-panel">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-8 font-semibold text-astro-muted tracking-widest uppercase text-sm">Feature</th>
                  <th className="p-8 font-bold text-2xl text-white/50">Astro 1</th>
                  <th className="p-8 font-bold text-2xl text-white bg-white/5 shadow-inner">Astro Drone <span className="text-astro-cyan text-sm align-top ml-2 tracking-widest uppercase">New</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-lg">
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-8 text-astro-muted font-medium">Sensor Size</td>
                  <td className="p-8 text-white/70">1/2-inch CMOS</td>
                  <td className="p-8 font-bold text-white bg-white/5">1-inch CMOS</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-8 text-astro-muted font-medium">Video Resolution</td>
                  <td className="p-8 text-white/70">4K/60fps</td>
                  <td className="p-8 font-bold text-white bg-white/5">8K/60fps</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-8 text-astro-muted font-medium">Flight Time</td>
                  <td className="p-8 text-white/70">34 mins</td>
                  <td className="p-8 font-bold text-white bg-white/5">45 mins</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-8 text-astro-muted font-medium">Obstacle Avoidance</td>
                  <td className="p-8 text-white/70">Forward / Backward</td>
                  <td className="p-8 font-bold text-white bg-white/5">Omnidirectional</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-8 text-astro-muted font-medium">Transmission Range</td>
                  <td className="p-8 text-white/70">10 km</td>
                  <td className="p-8 font-bold text-white bg-white/5">15 km <span className="text-sm font-normal text-astro-cyan ml-2">(OcuSync 4.0)</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-astro-surface-light rounded-[3rem] p-12 lg:p-16 border border-white/5 flex flex-col fade-up glow-card">
              <h4 className="text-3xl font-black mb-3 text-white">Astro Drone</h4>
              <p className="text-astro-muted text-lg mb-10 font-light">The essential kit for aerial creators.</p>
              <div className="text-6xl md:text-7xl font-black mb-12 text-white">$1,299</div>
              <ul className="space-y-6 mb-16 flex-1 text-lg">
                <li className="flex items-center text-white/90"><CheckCircle className="w-6 h-6 text-astro-cyan mr-4" /> Astro Drone</li>
                <li className="flex items-center text-white/90"><CheckCircle className="w-6 h-6 text-astro-cyan mr-4" /> Standard Remote Controller</li>
                <li className="flex items-center text-white/90"><CheckCircle className="w-6 h-6 text-astro-cyan mr-4" /> 1x Intelligent Flight Battery</li>
                <li className="flex items-center text-white/90"><CheckCircle className="w-6 h-6 text-astro-cyan mr-4" /> 3x Pairs of Carbon Props</li>
              </ul>
              <button className="w-full py-5 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors font-bold text-lg">
                Order Now
              </button>
            </div>
            
            <div className="ambient-glow fade-up" style={{ transitionDelay: '100ms' }}>
              <div className="bg-gradient-to-br from-[#1a0f0a] to-[#0a0a0a] rounded-[3rem] p-12 lg:p-16 border border-astro-orange/40 flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-gradient-to-r from-astro-orange to-astro-cyan text-white text-sm font-bold px-8 py-3 rounded-bl-3xl uppercase tracking-[0.2em] shadow-lg">
                  Most Popular
                </div>
                <h4 className="text-3xl font-black mb-3 text-white">Cinematic Combo</h4>
                <p className="text-astro-orange/80 text-lg mb-10 font-light">Everything you need for full-day shoots.</p>
                <div className="text-6xl md:text-7xl font-black mb-12 text-white">$1,899</div>
                <ul className="space-y-6 mb-16 flex-1 text-lg">
                  <li className="flex items-center text-white/90"><CheckCircle className="w-6 h-6 text-astro-orange mr-4" /> Astro Drone</li>
                  <li className="flex items-center text-white/90"><CheckCircle className="w-6 h-6 text-astro-orange mr-4" /> Pro Controller with Built-in Screen</li>
                  <li className="flex items-center text-white/90"><CheckCircle className="w-6 h-6 text-astro-orange mr-4" /> 3x Intelligent Flight Batteries</li>
                  <li className="flex items-center text-white/90"><CheckCircle className="w-6 h-6 text-astro-orange mr-4" /> ND Filter Set (ND4/8/16/32)</li>
                  <li className="flex items-center text-white/90"><CheckCircle className="w-6 h-6 text-astro-orange mr-4" /> Premium Hard Case</li>
                </ul>
                <button className="w-full py-5 rounded-full bg-gradient-to-r from-astro-orange to-[#ff3300] text-white hover:scale-[1.02] transition-transform font-bold text-lg shadow-[0_10px_30px_rgba(255,90,0,0.4)]">
                  Pre-order Cinematic Combo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 fade-up">
          <h3 className="text-4xl md:text-5xl font-black text-center mb-16 text-white tracking-tight">Frequently Asked Questions</h3>
          <div className="space-y-6">
            {[
              { q: "Is the Astro Drone waterproof?", a: "It is IP55 rated, meaning it is protected against dust and can withstand low-pressure water jets from any direction. You can fly in light rain or waterfall mist, but do not submerge it." },
              { q: "Do I need a license to fly this drone?", a: "Weighing 895g, the Astro Drone requires registration in most jurisdictions (like the FAA in the US). Check your local aviation authority regulations before flying." },
              { q: "Can I use third-party controllers?", a: "Astro Drone uses our proprietary OcuSync 4.0 protocol and is only compatible with the included Standard Controller or the Pro Controller." },
              { q: "How long does the battery take to charge?", a: "Using the included 65W fast charger, a single battery charges from 10% to 100% in approximately 55 minutes." },
            ].map((faq, i) => (
              <details key={i} className="group bg-astro-surface-light rounded-3xl border border-white/5 [&_summary::-webkit-details-marker]:hidden transition-colors hover:border-white/20">
                <summary className="flex cursor-pointer items-center justify-between p-8 font-bold text-xl text-white">
                  {faq.q}
                  <ChevronDown className="w-6 h-6 transition-transform duration-300 group-open:-rotate-180 text-astro-orange" />
                </summary>
                <div className="px-8 pb-8 text-astro-muted leading-relaxed text-lg font-light">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>

      </section>

      {/* Footer */}
      <footer className="bg-black py-16 border-t border-white/10 text-center md:text-left relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h2 className="text-3xl font-black tracking-widest mb-3 text-white">ASTRO<span className="text-astro-cyan">DRONE</span></h2>
            <p className="text-astro-muted text-sm font-medium tracking-wide">© 2026 Astro Technologies. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-astro-muted text-sm font-semibold uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Specs</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
