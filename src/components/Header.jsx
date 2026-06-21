import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Terminal } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: targetId } });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
      // Clear state after scrolling
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <Navbar 
      fixed="top" 
      expand="lg"
      className={`transition-all duration-300 ${scrolled ? 'bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/50' : 'bg-transparent py-4'}`}
      variant="dark"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 font-bold text-xl">
          <div className="w-9 h-9 rounded-lg bg-[#000836] flex items-center justify-center shadow-lg border border-white/5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 4 12 12 4 20"></polyline>
              <line x1="12" y1="20" x2="22" y2="20"></line>
            </svg>
          </div>
          <span className="text-white">Locci</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-4">
            <Nav.Link as={Link} to="/" className={location.pathname === '/' && !location.hash ? 'text-white' : 'text-gray-400 hover:text-white transition-colors'}>Home</Nav.Link>
            <Nav.Link href="#features" onClick={(e) => handleNavClick(e, 'features')} className="text-gray-400 hover:text-white transition-colors">Features</Nav.Link>
            <Nav.Link href="#how-it-works" onClick={(e) => handleNavClick(e, 'how-it-works')} className="text-gray-400 hover:text-white transition-colors">How it works</Nav.Link>
            <Nav.Link as={Link} to="/docs" className={location.pathname.startsWith('/docs') ? 'text-white' : 'text-gray-400 hover:text-white transition-colors'}>Documentation</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
