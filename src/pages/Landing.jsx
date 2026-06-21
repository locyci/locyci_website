import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Copy, Check, Zap, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    id: 'install',
    title: '1. Install Locci',
    description: 'Get started by installing Locci globally on your machine.',
    command: 'pip install locci',
    output: [
      { type: 'info', text: 'added 1 package, and audited 2 packages in 1s' },
      { type: 'success', text: 'Locci installed successfully! Run locci --help to get started.' }
    ]
  },
  {
    id: 'init',
    title: '2. Initialize Project',
    description: 'Create a default locci.yaml configuration file in your repository.',
    command: 'locci init',
    output: [
      { type: 'info', text: 'Initializing Locci project...' },
      { type: 'success', text: 'Created locci.yaml. Please configure your pipelines.' }
    ]
  },
  {
    id: 'run',
    title: '3. Run Pipeline',
    description: 'Execute your continuous integration pipelines locally, with cloud parity.',
    command: 'locci run build',
    output: [
      { type: 'info', text: 'Starting pipeline for project "locyci"...' },
      { type: 'success', text: '✓ [Setup] Environment prepared in 0.4s' },
      { type: 'success', text: '✓ [Lint] ESLint passed in 1.2s' },
      { type: 'success', text: '✓ [Build] Assets bundled in 2.1s' },
      { type: 'success', text: '✨ Pipeline completed successfully in 3.7s!' }
    ]
  }
];

// --- Custom Interactive Components ---

const SpotlightCard = ({ children, className = "" }) => {
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`relative group overflow-hidden bg-[#000836] border border-white/10 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 ${className}`}
    >
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-500 z-10"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(56, 189, 248, 0.15), transparent 40%)`
        }}
      />
      {/* Glossy top highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
      
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};

const AmbientGlow = ({ color, size, top, left, right, bottom, delay, duration }) => (
  <motion.div
    animate={{ 
      y: [0, 40, 0], 
      x: [0, -30, 0],
      scale: [1, 1.2, 1],
      opacity: [0.15, 0.3, 0.15]
    }}
    transition={{ repeat: Infinity, duration, delay, ease: "easeInOut" }}
    className="absolute rounded-full blur-[100px] pointer-events-none -z-10"
    style={{ 
      backgroundColor: color, 
      width: size, 
      height: size, 
      ...(top !== undefined && { top }), 
      ...(left !== undefined && { left }),
      ...(right !== undefined && { right }),
      ...(bottom !== undefined && { bottom }),
    }}
  />
);

const TypewriterCommand = ({ command, onComplete }) => {
  const [text, setText] = useState('');
  
  useEffect(() => {
    let i = 0;
    setText('');
    const timer = setInterval(() => {
      setText(command.substring(0, i + 1));
      i++;
      if (i === command.length) {
        clearInterval(timer);
        setTimeout(() => onComplete(), 400);
      }
    }, 40);
    
    return () => clearInterval(timer);
  }, [command]);

  return <span>{text}</span>;
};

const TerminalDisplay = ({ activeStepIndex }) => {
  const [typedCommands, setTypedCommands] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOutputForStep, setShowOutputForStep] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    setTypedCommands(steps.slice(0, activeStepIndex + 1).map(s => s.command));
    setShowOutputForStep(null);
    setIsTyping(true);
  }, [activeStepIndex]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [typedCommands, showOutputForStep]);

  const handleTypingComplete = (index) => {
    if (index === activeStepIndex) {
      setIsTyping(false);
      setShowOutputForStep(index);
      // Ensure scroll happens after output is revealed
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 100);
    }
  };

  return (
    <div className="bg-[#000624]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] h-[350px] lg:h-[450px] flex flex-col relative group">
      {/* Terminal Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent2/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      <div className="bg-[#000a36] px-4 py-3 flex items-center border-b border-white/5 shrink-0 z-10 relative">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_10px_rgba(255,95,86,0.5)]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_10px_rgba(255,189,46,0.5)]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_10px_rgba(39,201,63,0.5)]"></div>
        </div>
        <div className="mx-auto text-xs font-mono text-gray-500 tracking-wider">locci ~ bash</div>
      </div>
      
      <div ref={scrollRef} className="p-4 lg:p-6 font-mono text-sm overflow-y-auto flex-grow space-y-4 z-10 relative custom-scrollbar scroll-smooth">
        {typedCommands.map((command, idx) => {
          const isActive = idx === activeStepIndex;
          const showOutput = idx < activeStepIndex || (isActive && showOutputForStep === idx);
          
          return (
            <div key={idx} className="space-y-2">
              <div className="flex gap-3 text-gray-300">
                <span className="text-[#f7768e] font-bold">❯</span> 
                {isActive ? (
                  <TypewriterCommand 
                    command={command} 
                    onComplete={() => handleTypingComplete(idx)} 
                  />
                ) : (
                  <span>{command}</span>
                )}
              </div>
              
              <AnimatePresence>
                {showOutput && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-1.5 overflow-hidden"
                  >
                    {steps[idx].output.map((out, outIdx) => (
                      <motion.div 
                        key={outIdx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: outIdx * 0.1 }}
                        className={`pl-5 ${out.type === 'success' ? 'text-[#73daca]' : 'text-[#a9b1d6]'}`}
                      >
                        {out.text}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
        <div className="mt-4"><span className="inline-block w-2.5 h-4 bg-[#a9b1d6] animate-pulse"></span></div>
      </div>
    </div>
  );
};

// --- Main Component ---

const Landing = () => {
  const [copied, setCopied] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const stepElements = stepRefs.current;
      if (!stepElements.length) return;

      let closestIndex = 0;
      let minDistance = Infinity;
      // We check what is closest to the middle of the screen
      const triggerY = window.innerHeight * 0.4;

      stepElements.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Calculate distance from the top of the element to the trigger point
        const distance = Math.abs(rect.top - triggerY);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      // Update state only if it changed to avoid re-renders
      setActiveStep((prev) => (prev !== closestIndex ? closestIndex : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to set initial state
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('pip install locci');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="pt-[140px] relative">
      {/* Ambient background particles for the entire page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <AmbientGlow color="#38bdf8" size="50vw" top="-10%" right="-10%" delay={0} duration={15} />
        <AmbientGlow color="#818cf8" size="40vw" bottom="20%" left="-10%" delay={2} duration={18} />
        <AmbientGlow color="#2dd4bf" size="45vw" top="40%" right="10%" delay={5} duration={20} />
      </div>

      {/* Hero Section */}
      <Container className="mb-[120px] relative z-10">
        <Row className="align-items-center gx-5">
          <Col lg={6} className="mb-5 mb-lg-0 text-center text-lg-start relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-6 shadow-[0_0_20px_rgba(99,102,241,0.2)] backdrop-blur-md"
            >
              v1.0.0 Now Available
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-[3.5rem] md:text-[4.5rem] font-extrabold tracking-tight mb-6 leading-[1.1]"
            >
              Continuous<br/>Integration,<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent1 to-accent2 drop-shadow-lg">
                Redefined.
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xl md:text-2xl text-gray-400 mb-10 max-w-[480px] mx-auto mx-lg-0 font-light"
            >
              Locci brings the sheer power of cloud-scale CI/CD straight to your local terminal. Build faster, test instantly.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="d-flex flex-wrap gap-4 justify-content-center justify-content-lg-start"
            >
              <Link to="/docs" className="relative group bg-white text-black px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105 text-decoration-none shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl -z-10"></div>
                <span className="absolute inset-0 group-hover:text-white transition-colors duration-300 flex items-center justify-center font-bold">Get Started</span>
              </Link>
              <button 
                onClick={handleCopy}
                className={`d-flex align-items-center gap-3 bg-[#000836]/80 backdrop-blur-md border ${copied ? 'border-green-500 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.2)]' : 'border-white/10 text-gray-300'} px-6 py-4 rounded-2xl hover:border-white/30 transition-all hover:-translate-y-1`}
              >
                <span className="font-mono text-sm tracking-wide">$ pip install locci</span>
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </motion.div>
          </Col>
          <Col lg={6}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, y: [0, -15, 0] }}
              transition={{ 
                scale: { duration: 0.5 },
                opacity: { duration: 0.5 },
                y: { repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 } 
              }}
              className="position-relative perspective-1000"
            >
              <div className="absolute -inset-10 bg-gradient-to-r from-primary via-accent1 to-accent2 blur-[80px] opacity-30 rounded-[40px] -z-10"></div>
              
              <div className="bg-[#000624]/90 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] transform rotate-x-2 rotate-y-[-5deg]">
                <div className="bg-[#000a36] px-5 py-4 flex items-center border-b border-white/5">
                  <div className="flex gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] shadow-[0_0_10px_rgba(255,95,86,0.6)]"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] shadow-[0_0_10px_rgba(255,189,46,0.6)]"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] shadow-[0_0_10px_rgba(39,201,63,0.6)]"></div>
                  </div>
                  <div className="mx-auto text-xs font-mono text-gray-500 uppercase tracking-widest font-semibold">locci-pipeline ~ bash</div>
                </div>
                <div className="p-8 font-mono text-[15px] space-y-3 leading-relaxed">
                  <div className="flex gap-3 text-gray-200">
                    <span className="text-[#f7768e] font-bold">❯</span> locci run build
                  </div>
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="text-[#a9b1d6] pl-6">Starting pipeline for project 'locyci'...</motion.div>
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }} className="text-[#73daca] pl-6 flex items-center gap-2"><span>✓</span> [Setup] Environment prepared in 0.4s</motion.div>
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.6 }} className="text-[#73daca] pl-6 flex items-center gap-2"><span>✓</span> [Lint] ESLint passed in 1.2s</motion.div>
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.0 }} className="text-[#73daca] pl-6 flex items-center gap-2"><span>✓</span> [Build] Assets bundled in 2.1s</motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.4 }} className="text-[#7aa2f7] pl-6 mt-4 font-bold">✨ Pipeline completed successfully in 3.7s!</motion.div>
                  <div className="mt-6"><span className="inline-block w-2.5 h-5 bg-[#a9b1d6] animate-pulse"></span></div>
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Features Grid */}
      <div id="features" className="py-32 border-y border-white/5 relative z-10 bg-[#00041a]/80 backdrop-blur-lg">
        <Container>
          <div className="text-center mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-white"
            >
              Why choose Locci?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto font-light"
            >
              Engineered from the ground up to prioritize developer velocity, uncompromising security, and raw performance.
            </motion.p>
          </div>
          
          <Row className="g-5">
            <Col md={4}>
              <SpotlightCard className="p-10 h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-red-600 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                  <Zap size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Blazing Fast</h3>
                <p className="text-gray-400 leading-relaxed text-lg font-light">
                  Highly optimized dependency caching and parallel task execution shaves critical minutes off your build times.
                </p>
              </SpotlightCard>
            </Col>
            <Col md={4}>
              <SpotlightCard className="p-10 h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-blue-600 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <Globe size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Run Anywhere</h3>
                <p className="text-gray-400 leading-relaxed text-lg font-light">
                  Execute CI pipelines with exact cloud parity directly from your local terminal. Eliminate the "push and pray" loop.
                </p>
              </SpotlightCard>
            </Col>
            <Col md={4}>
              <SpotlightCard className="p-10 h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                  <Shield size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Zero Trust</h3>
                <p className="text-gray-400 leading-relaxed text-lg font-light">
                  Built on ephemeral, isolated environments. Your secrets and source code never leave your machine inadvertently.
                </p>
              </SpotlightCard>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Interactive Walkthrough */}
      <div id="how-it-works" className="py-32 relative z-10 bg-[#000212]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <Container className="relative">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-white"
            >
              See Locci in action
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto font-light"
            >
              Scroll down to witness how effortlessly Locci integrates into your existing workflow.
            </motion.p>
          </div>

          <Row className="position-relative gx-5 align-items-stretch">
            <Col lg={5} className="mb-5 mb-lg-0 order-2 order-lg-1">
              <div className="py-10">
                {steps.map((step, index) => (
                  <div 
                    key={step.id} 
                    ref={el => stepRefs.current[index] = el}
                    data-index={index}
                    className={`min-h-[50vh] transition-all duration-700 flex flex-col justify-center ${activeStep === index ? 'opacity-100 scale-100 translate-x-0' : 'opacity-30 scale-95 -translate-x-4'}`}
                  >
                    <motion.div layout>
                      <h3 className="text-2xl lg:text-[2rem] font-bold mb-3 lg:mb-4 text-white tracking-tight">{step.title}</h3>
                      <p className="text-lg lg:text-xl text-gray-400 font-light leading-relaxed">{step.description}</p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </Col>
            <Col lg={7} className="order-1 order-lg-2 mb-10 mb-lg-0 relative">
              <div style={{ position: 'sticky', top: '120px', zIndex: 20 }}>
                <TerminalDisplay activeStepIndex={activeStep} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </main>
  );
};

export default Landing;
