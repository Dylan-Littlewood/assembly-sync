import { Button } from '@/components/ui/button';
import { Moon, SunMedium } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
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
    <Button variant='ghost' size='sm' onClick={() => setIsDark(!isDark)}>
      <SunMedium className='rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <Moon className='absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
