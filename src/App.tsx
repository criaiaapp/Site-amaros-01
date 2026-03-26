import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ChevronRight, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Clock,
  Instagram,
  Facebook,
  Linkedin
} from 'lucide-react';
import { PRODUCTS, CATEGORIES, CONTACT_INFO, Product } from './data';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(error => {
        console.log("Autoplay was prevented:", error);
      });
    }
  }, []);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).slice(0, 12);
  }, [selectedCategory, searchQuery]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-brand-blue selection:text-white">
      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/55${CONTACT_INFO.phones[0].replace(/\D/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 hover:scale-110 transition-all group"
      >
        <Phone className="w-8 h-8" />
        <span className="absolute right-full mr-4 bg-white text-slate-900 px-4 py-2 rounded-lg text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Falar no WhatsApp
        </span>
      </a>

      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img 
              src="https://i.postimg.cc/kgCPdzyg/Whats-App-Image-2026-03-25-at-16-08-15.jpg" 
              alt="Amaros Importer Logo" 
              className="h-24 md:h-32 w-auto object-contain transition-all"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {['Início', 'Produtos', 'Sobre', 'Contato'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-sm font-medium transition-colors relative group ${
                  scrolled ? 'text-slate-600' : 'text-slate-900'
                }`}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => scrollToSection('produtos')}
              className="bg-brand-blue hover:bg-brand-blue-dark text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-brand-blue/20 active:scale-95"
            >
              Ver Catálogo
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-slate-900' : 'text-slate-900'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-4 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              {['Início', 'Produtos', 'Sobre', 'Contato'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-2xl font-display font-semibold text-slate-900 text-left"
                >
                  {item}
                </button>
              ))}
              <div className="h-px bg-slate-100 my-4"></div>
              <div className="flex flex-col gap-4">
                {CONTACT_INFO.phones.map(phone => (
                  <a key={phone} href={`tel:${phone}`} className="flex items-center gap-3 text-slate-600">
                    <Phone className="w-5 h-5 text-brand-blue" />
                    {phone}
                  </a>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section with Pearl Gradient */}
        <section id="início" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden pearl-gradient">
          {/* Subtle Background Elements */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-blue/5 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-blue/10 rounded-full blur-[120px]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block py-1 px-4 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest mb-6 border border-brand-blue/20 backdrop-blur-sm">
                Importação Direta & Qualidade Premium
              </span>
              <h1 className="text-4xl md:text-7xl font-display font-bold text-slate-900 mb-6 leading-tight">
                Soluções em <span className="text-brand-blue">Descartáveis</span> <br />
                e EPIs de Alta Performance
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                Sua parceira de confiança em importação de produtos para saúde, higiene e segurança. 
                Qualidade internacional com atendimento personalizado.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={() => scrollToSection('produtos')}
                  className="w-full sm:w-auto bg-brand-blue hover:bg-brand-blue-dark text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-brand-blue/30 flex items-center justify-center gap-2 group"
                >
                  Explorar Produtos
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => scrollToSection('sobre')}
                  className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 px-10 py-4 rounded-full font-bold text-lg transition-all shadow-sm"
                >
                  Conheça a Amaros
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Products Section */}
        <section id="produtos" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div>
                <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">Nosso Catálogo</h2>
                <p className="text-slate-500 max-w-lg">
                  Explore nossa linha completa de produtos certificados e de alta performance.
                </p>
              </div>
              
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Buscar produto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all"
                />
              </div>
            </div>

            {/* Categories Filter */}
            <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar mb-12">
              <button
                onClick={() => setSelectedCategory("Todos")}
                className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === "Todos" 
                    ? 'blue-gradient text-white shadow-lg shadow-brand-blue/20' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Todos
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat 
                      ? 'blue-gradient text-white shadow-lg shadow-brand-blue/20' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white rounded-2xl border border-slate-100 p-4 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
                  >
                    <div className="aspect-square rounded-xl bg-slate-50 overflow-hidden mb-4 relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-[10px] font-bold text-brand-blue uppercase tracking-wider shadow-sm">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-slate-900 leading-tight mb-2 group-hover:text-brand-blue transition-colors">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide mb-2">
                        {product.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-auto pt-4">
                      <span className="text-xs font-semibold text-slate-400">Disponível</span>
                      <button className="p-2 rounded-lg bg-slate-50 text-brand-blue hover:bg-brand-blue hover:text-white transition-all">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* View More Button */}
            <div className="mt-16 text-center">
              <a 
                href={`https://wa.me/55${CONTACT_INFO.phones[0].replace(/\D/g, '')}?text=Olá! Gostaria de receber o catálogo completo de produtos.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-brand-blue transition-all shadow-xl hover:shadow-brand-blue/20 group"
              >
                Solicitar Catálogo Completo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="mt-4 text-sm text-slate-500">
                Temos mais de 500 itens disponíveis em nosso estoque.
              </p>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Nenhum produto encontrado</h3>
                <p className="text-slate-500">Tente ajustar sua busca ou filtro de categoria.</p>
              </div>
            )}
          </div>
        </section>

        {/* About Section - Vertical Layout */}
        <section id="sobre" className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex flex-col gap-12 items-center">
              {/* Video Container - Horizontal */}
              <div className="relative w-full">
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-video bg-slate-100 border border-slate-100">
                  <video 
                    ref={videoRef}
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    preload="auto"
                    className="w-full h-full object-cover"
                    poster="https://images.pexels.com/photos/3970333/pexels-photo-3970333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  >
                    <source src="/video.mp4" type="video/mp4" />
                    <source src="https://player.vimeo.com/external/494252666.sd.mp4?s=72ad13895115652904243c03a8995057799539ae&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
                    <source src="https://cdn.coverr.co/videos/preview/720p/coverr-medical-mask-on-blue-background-5544.mp4" type="video/mp4" />
                  </video>
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-blue/5 rounded-full -z-10"></div>
              </div>
              
              {/* Text Content - Below Video */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-6 border border-slate-200">
                  <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse"></span>
                  Sobre a Amaros Importer
                </div>
                
                <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-8 leading-tight">
                  Excelência em cada <br />
                  <span className="text-brand-blue">Detalhe Importado.</span>
                </h2>
                
                <div className="space-y-6 text-slate-600 leading-relaxed text-lg font-light max-w-2xl mx-auto">
                  <p>
                    A <strong className="font-semibold text-slate-900">AMAROS IMPORTER</strong> é especialista em conectar o mercado brasileiro às melhores soluções globais em materiais descartáveis e equipamentos de proteção.
                  </p>
                  <p>
                    Nossa curadoria rigorosa garante que cada item do nosso catálogo atenda às normas técnicas mais exigentes, proporcionando segurança real para profissionais da saúde e indústria.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 text-left">
                  <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-brand-blue/30 transition-colors group">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-6 h-6 text-brand-blue" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2 text-xl">Missão</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">Garantir a proteção da vida através de insumos de altíssima qualidade e procedência garantida.</p>
                  </div>
                  
                  <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-brand-blue/30 transition-colors group">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Truck className="w-6 h-6 text-brand-blue" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2 text-xl">Logística</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">Entrega ágil e estoque estratégico para que sua operação nunca pare por falta de materiais essenciais.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contato" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto glass-card rounded-[2rem] p-8 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 blue-gradient opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="grid md:grid-cols-2 gap-12 relative z-10">
                <div>
                  <h2 className="text-4xl font-display font-bold text-slate-900 mb-6">Entre em Contato</h2>
                  <p className="text-slate-500 mb-10">
                    Nossa equipe está pronta para atender seu pedido ou tirar suas dúvidas.
                  </p>
                  
                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-blue-light flex items-center justify-center text-brand-blue shrink-0">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Telefones</div>
                        {CONTACT_INFO.phones.map(phone => (
                          <div key={phone} className="text-lg font-bold text-slate-900">{phone}</div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-blue-light flex items-center justify-center text-brand-blue shrink-0">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">E-mail</div>
                        <div className="text-lg font-bold text-slate-900">{CONTACT_INFO.email}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-blue-light flex items-center justify-center text-brand-blue shrink-0">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Localização</div>
                        <div className="text-lg font-bold text-slate-900">{CONTACT_INFO.address}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Nome</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-blue outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Empresa</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-blue outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">E-mail</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-blue outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Mensagem</label>
                    <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-blue outline-none transition-all resize-none"></textarea>
                  </div>
                  <button className="w-full py-4 rounded-xl blue-gradient text-white font-bold shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/40 transition-all">
                    Enviar Mensagem
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="mb-6">
                <div className="inline-block bg-white p-3 rounded-2xl shadow-lg">
                  <img 
                    src="https://i.postimg.cc/kgCPdzyg/Whats-App-Image-2026-03-25-at-16-08-15.jpg" 
                    alt="Amaros Importer Logo" 
                    className="h-24 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Sua parceira de confiança em importação de produtos para saúde, higiene e segurança.
              </p>
              <div className="flex gap-4">
                {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-blue hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-display font-bold text-lg mb-6">Links Rápidos</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                {['Início', 'Produtos', 'Sobre', 'Contato'].map(item => (
                  <li key={item}>
                    <button onClick={() => scrollToSection(item.toLowerCase())} className="hover:text-brand-blue transition-colors">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-display font-bold text-lg mb-6">Categorias</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                {CATEGORIES.slice(0, 5).map(cat => (
                  <li key={cat}>
                    <button onClick={() => { setSelectedCategory(cat); scrollToSection('produtos'); }} className="hover:text-brand-blue transition-colors">
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-display font-bold text-lg mb-6">Newsletter</h4>
              <p className="text-slate-400 text-sm mb-4">Receba novidades e ofertas exclusivas.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Seu e-mail" className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-brand-blue w-full" />
                <button className="bg-brand-blue p-2 rounded-lg hover:bg-brand-blue-dark transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-xs">
            <p>© 2026 Amaros Importer. Todos os direitos reservados.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
