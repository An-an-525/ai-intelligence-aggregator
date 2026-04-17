import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, Globe, Search, Bell, User, ChevronRight, ChevronDown } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { cn } from '../lib/utils';

const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: '首页', path: '/' },
    { name: '热门趋势', path: '/trending' },
    { name: 'GitHub 榜单', path: '/github' },
    { name: '模型榜单', path: '/models' },
    { name: 'Agent 专题', path: '/agents' },
    { name: '教育科技', path: '/education' },
  ];

  return (
    <div className={cn(
      'flex min-h-screen flex-col',
      'bg-gradient-to-br from-background via-background to-muted/30',
      'dark:from-background dark:via-background dark:to-muted/20',
      'antialiased'
    )}>
      {/* Header */}
      <header className={cn(
        'sticky top-0 z-50',
        'bg-background/80 backdrop-blur-md border-b border-border/50',
        'transition-all duration-300 ease-in-out',
        isScrolled && 'shadow-sm'
      )}>
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                AI
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI 情报中心
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'text-sm font-medium transition-colors duration-200',
                    location.pathname === item.path
                      ? 'text-primary font-semibold'
                      : 'text-foreground/70 hover:text-foreground'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Language Switch */}
              <div className="relative">
                <button
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-1.5 rounded-lg',
                    'border border-border/50 hover:border-border',
                    'text-sm font-medium transition-colors duration-200',
                    'bg-background/50 hover:bg-muted/50'
                  )}
                >
                  <Globe className="w-4 h-4" />
                  <span>中文</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                {isLanguageMenuOpen && (
                  <div className="absolute right-0 mt-1 w-32 rounded-lg border border-border bg-background shadow-lg">
                    <button className="w-full px-3 py-2 text-sm font-medium hover:bg-muted transition-colors">
                      中文
                    </button>
                    <button className="w-full px-3 py-2 text-sm font-medium hover:bg-muted transition-colors">
                      English
                    </button>
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={cn(
                  'p-2 rounded-lg',
                  'border border-border/50 hover:border-border',
                  'transition-colors duration-200',
                  'bg-background/50 hover:bg-muted/50'
                )}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>

              {/* Search */}
              <Link
                to="/search"
                className={cn(
                  'p-2 rounded-lg',
                  'border border-border/50 hover:border-border',
                  'transition-colors duration-200',
                  'bg-background/50 hover:bg-muted/50'
                )}
              >
                <Search className="w-4 h-4" />
              </Link>

              {/* Notification */}
              <button className={cn(
                'p-2 rounded-lg',
                'border border-border/50 hover:border-border',
                'transition-colors duration-200',
                'bg-background/50 hover:bg-muted/50'
              )}>
                <Bell className="w-4 h-4" />
              </button>

              {/* User */}
              <button className={cn(
                'p-2 rounded-lg',
                'border border-border/50 hover:border-border',
                'transition-colors duration-200',
                'bg-background/50 hover:bg-muted/50'
              )}>
                <User className="w-4 h-4" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg border border-border/50 hover:border-border transition-colors duration-200"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-b border-border bg-background">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'flex items-center justify-between px-3 py-2 rounded-lg',
                    'text-sm font-medium transition-colors duration-200',
                    location.pathname === item.path
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'hover:bg-muted/50'
                  )}
                >
                  <span>{item.name}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background/50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                  AI
                </div>
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI 情报中心
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                提供最新、最广、最有深度、最高质量的 AI 与技术前沿资讯
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">快速链接</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="hover:text-foreground transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">关于我们</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>联系方式</li>
                <li>隐私政策</li>
                <li>使用条款</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border/50 text-sm text-muted-foreground text-center">
            © 2026 AI 情报中心. 保留所有权利.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
