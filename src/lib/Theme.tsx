import { Button } from '@/components/ui/button';
import { Moon, SunMedium } from 'lucide-react';
import { useContext, createContext, ReactNode, useEffect, useState } from 'react';

type ThemeContent = { isDark: boolean; setIsDark: React.Dispatch<React.SetStateAction<boolean>>; }
const ThemeContext = createContext<ThemeContent>({
  isDark: false, // set a default value
  setIsDark: () => {},
  });


export function ThemeProvider({children}:{children?:ReactNode}) {
  const systemTheme = localStorage.getItem('Theme');
  let darkThemeEnabled = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (systemTheme) {
    darkThemeEnabled = systemTheme === 'dark';
  }

  const [isDark, setIsDark] = useState(darkThemeEnabled);
  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
    localStorage.setItem('Theme', isDark ? 'dark' : 'light');
  }, [isDark]);
  return (
    <ThemeContext.Provider value={{ isDark:isDark, setIsDark:setIsDark }}>{children}</ThemeContext.Provider>
  );
}

export function ThemeToggle() {
  const {isDark, setIsDark} = useContext(ThemeContext);
  return (
    <Button variant='ghost' onClick={() => setIsDark(!isDark)}>
      <SunMedium className='rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <Moon className='absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
