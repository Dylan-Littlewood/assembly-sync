import { Button } from '@/components/ui/button';
import { Moon, SunMedium } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
  }, [isDark]);
  return (
    <Button variant='ghost' size='sm' onClick={() => setIsDark(!isDark)}>
      <SunMedium className='rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <Moon className='absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
