import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Settings, Terminal as TerminalIcon, Search, ChevronRight, Copy, Check, Hash, Zap } from 'lucide-react';

const CodeBlock = ({ code, language = 'bash' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-8">
      {/* Animated glowing border */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/30 via-accent1/30 to-accent2/30 rounded-2xl blur-sm opacity-50 group-hover:opacity-100 transition duration-500"></div>
      
      <div className="relative rounded-xl overflow-hidden bg-[#0d0d12] border border-white/10 shadow-2xl backdrop-blur-sm">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-2.5 bg-[#16161e]/80 border-b border-white/5">
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono font-medium text-gray-500 uppercase tracking-wider">{language}</span>
            <button 
              onClick={handleCopy}
              className="text-gray-500 hover:text-white transition-all bg-white/5 hover:bg-white/10 p-1.5 rounded-md"
              title="Copy code"
            >
              {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
            </button>
          </div>
        </div>
        {/* Code Content */}
        <div className="p-5 overflow-x-auto custom-scrollbar">
          <pre className="font-mono text-[13px] leading-[1.6] text-[#a6accd] m-0">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

const PageHeader = ({ title, description }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-14"
  >
    <h1 className="text-4xl md:text-[2.75rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400 mb-4 tracking-tight">
      {title}
    </h1>
    <p className="text-lg text-gray-400 leading-relaxed max-w-2xl font-light">
      {description}
    </p>
  </motion.div>
);

const Section = ({ title, children, id }) => (
  <motion.section 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    id={id} 
    className="mb-16 scroll-mt-28 group"
  >
    {title && (
      <div className="flex items-center gap-2 mt-12 mb-6 border-b border-white/5 pb-3">
        <h2 className="text-2xl font-bold text-gray-100 tracking-tight">
          {title}
        </h2>
        <a href={`#${id}`} className="opacity-0 group-hover:opacity-100 text-primary transition-opacity">
          <Hash size={20} />
        </a>
      </div>
    )}
    <div className="text-gray-400 space-y-4 leading-relaxed text-[1.05rem]">
      {children}
    </div>
  </motion.section>
);

const Installation = () => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }} 
    animate={{ opacity: 1, x: 0 }} 
    exit={{ opacity: 0, x: 10 }}
    transition={{ duration: 0.3 }}
  >
    <PageHeader 
      title="Installation" 
      description="Get up and running with Locci in seconds. Learn how to install the CLI and configure it for your environment."
    />

    <Section id="prerequisites" title="Prerequisites">
      <p>Before installing Locci, ensure you have the following installed on your system:</p>
      <ul className="list-none space-y-3 mt-4">
        <li className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
          <span><strong className="text-gray-200 font-medium">Node.js</strong> (version 18.0.0 or higher)</span>
        </li>
        <li className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-accent1"></div>
          <span><strong className="text-gray-200 font-medium">Git</strong> installed and in your PATH</span>
        </li>
        <li className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-accent2"></div>
          <span><strong className="text-gray-200 font-medium">Docker</strong> (optional, for containerized pipelines)</span>
        </li>
      </ul>
    </Section>

    <Section id="installing-cli" title="Installing the CLI">
      <p className="text-gray-400 mb-6 leading-relaxed">
        Locci is distributed as a Python package. You can install it using pip.
      </p>
      <CodeBlock code="pip install locci" />
    </Section>
    
    <Section id="verify" title="Verify Installation">
      <p>
        Once installed, verify that the CLI is accessible by checking its version.
      </p>
      <div className="bg-gradient-to-r from-primary/10 to-transparent border-l-2 border-primary rounded-r-xl p-5 mt-8 shadow-lg">
        <div className="flex gap-4">
          <TerminalIcon size={20} className="text-primary shrink-0 mt-1" />
          <div>
            <h4 className="text-white font-semibold mb-2">Check Installation</h4>
            <CodeBlock code="locci --version" />
            <span className="text-sm text-gray-400">If you receive a "command not found" error, ensure that your Python Scripts directory is added to your system's PATH.</span>
          </div>
        </div>
      </div>
    </Section>
  </motion.div>
);

const Configuration = () => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }} 
    animate={{ opacity: 1, x: 0 }} 
    exit={{ opacity: 0, x: 10 }}
    transition={{ duration: 0.3 }}
  >
    <PageHeader 
      title="Configuration" 
      description="Learn how to structure your locci.yaml file to define powerful, reproducible CI/CD pipelines."
    />

    <Section id="init" title="Initialization">
      <p>
        To get started quickly in a new repository, run the init command. This will generate a scaffolded 
        <code className="bg-[#1e1e28] text-primary px-1.5 py-0.5 rounded-md text-[0.9em] mx-1 border border-white/5 shadow-inner">locci.yaml</code> 
        file tailored to your detected language environment.
      </p>
      <CodeBlock code="locci init" />
    </Section>

    <Section id="structure" title="File Structure">
      <p>
        The configuration file uses standard YAML syntax. It is declarative and consists of environments, global variables, and a series of pipeline steps.
      </p>
      <CodeBlock language="yaml" code={`version: 1.0
name: my-awesome-project

env:
  NODE_ENV: test
  CI: true

pipeline:
  setup:
    run: npm ci
  lint:
    run: npm run lint
    depends_on: [setup]
  test:
    run: npm run test
    depends_on: [setup]
  build:
    run: npm run build
    depends_on: [lint, test]`} />
    </Section>
  </motion.div>
);

const Commands = () => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }} 
    animate={{ opacity: 1, x: 0 }} 
    exit={{ opacity: 0, x: 10 }}
    transition={{ duration: 0.3 }}
  >
    <PageHeader 
      title="CLI Commands" 
      description="A complete reference guide to the Locci Command Line Interface and its various capabilities."
    />

    <Section id="run" title="locci run">
      <p>
        Executes your pipeline locally. By default, it runs all steps defined in your configuration file, respecting their dependencies.
      </p>
      <CodeBlock code="locci run" />
      <p className="mt-4">You can also specify a target step to run only that step and its prerequisites.</p>
      <CodeBlock code="locci run build" />
    </Section>

    <Section id="validate" title="locci validate">
      <p>
        Validates the syntax and structural integrity of your configuration file without executing any commands.
        Useful for pre-commit hooks.
      </p>
      <CodeBlock code="locci validate" />
    </Section>

    <Section id="logs" title="locci logs">
      <p>
        Retrieves and formats the logs of previous pipeline executions.
      </p>
      <CodeBlock code="locci logs --last" />
    </Section>
  </motion.div>
);

const RightSidebar = ({ activePath }) => {
  const [activeHash, setActiveHash] = useState('');
  
  const toc = {
    installation: [
      { id: 'prerequisites', label: 'Prerequisites' },
      { id: 'installing-cli', label: 'Installing the CLI' },
      { id: 'verify', label: 'Verify Installation' },
    ],
    configuration: [
      { id: 'init', label: 'Initialization' },
      { id: 'structure', label: 'File Structure' },
    ],
    commands: [
      { id: 'run', label: 'locci run' },
      { id: 'validate', label: 'locci validate' },
      { id: 'logs', label: 'locci logs' },
    ]
  };

  const currentToc = toc[activePath] || [];

  useEffect(() => {
    const handleScroll = () => {
      const headings = currentToc.map(t => document.getElementById(t.id)).filter(Boolean);
      let current = '';
      for (const heading of headings) {
        if (window.scrollY >= heading.offsetTop - 150) {
          current = heading.id;
        }
      }
      setActiveHash(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentToc]);

  if (currentToc.length === 0) return null;

  return (
    <div className="hidden xl:block w-[240px] shrink-0 pl-10 pt-14 sticky top-[80px] h-[calc(100vh-80px)]">
      <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-4">On this page</div>
      <ul className="space-y-3 text-sm text-gray-400 relative border-l border-white/5 pl-4">
        {currentToc.map(item => {
          const isActive = activeHash === item.id || (!activeHash && currentToc[0].id === item.id);
          return (
            <li key={item.id} className="relative">
              {isActive && (
                <motion.div 
                  layoutId="activeHashIndicator"
                  className="absolute -left-[17px] top-1.5 w-0.5 h-3 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <a 
                href={`#${item.id}`} 
                className={`transition-colors block ${isActive ? 'text-primary font-medium' : 'hover:text-white'}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(item.id);
                  if (el) {
                    window.scrollTo({
                      top: el.offsetTop - 100,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Documentation = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop() === 'docs' ? 'installation' : location.pathname.split('/').pop();

  const navItems = [
    { id: 'installation', label: 'Installation', icon: <Book size={16} /> },
    { id: 'configuration', label: 'Configuration', icon: <Settings size={16} /> },
    { id: 'commands', label: 'CLI Commands', icon: <TerminalIcon size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-[#00041a] pt-[80px]">
      <Container fluid className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="flex">
          {/* Left Sidebar */}
          <div className="hidden lg:block w-[260px] shrink-0 pr-6 py-12 h-[calc(100vh-80px)] sticky top-[80px] overflow-y-auto border-r border-white/5 bg-[#000318]">
            <div className="mb-8 relative group px-3">
              <Search size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search docs..." 
                className="w-full bg-[#000836] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-1">
                <kbd className="hidden md:flex items-center justify-center px-1.5 py-0.5 text-[10px] font-sans font-medium text-gray-500 bg-white/5 border border-white/10 rounded">⌘K</kbd>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3 px-6">Getting Started</h3>
              <nav className="space-y-1 relative px-3">
                {navItems.map(item => {
                  const isActive = currentPath === item.id;
                  return (
                    <Link 
                      key={item.id}
                      to={`/docs/${item.id}`} 
                      className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors z-10 ${
                        isActive 
                          ? 'text-white' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="activeNavBackground"
                          className="absolute inset-0 bg-[#000a36]/80 border border-white/5 rounded-xl -z-10"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className={`${isActive ? 'text-primary' : 'text-gray-500 group-hover:text-gray-400'} transition-colors`}>
                        {item.icon}
                      </span>
                      {item.label}
                      {isActive && <ChevronRight size={14} className="ml-auto opacity-50" />}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1 min-w-0 py-12 lg:px-16 flex justify-center relative">
            {/* Ambient Background Glow */}
            <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
            
            <div className="w-full max-w-[700px] relative z-10">
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Navigate to="installation" replace />} />
                  <Route path="installation" element={<Installation />} />
                  <Route path="configuration" element={<Configuration />} />
                  <Route path="commands" element={<Commands />} />
                </Routes>
              </AnimatePresence>
              
            </div>
          </div>

          {/* Right Sidebar (Table of Contents) */}
          <RightSidebar activePath={currentPath} />
        </div>
      </Container>
    </div>
  );
};

export default Documentation;
