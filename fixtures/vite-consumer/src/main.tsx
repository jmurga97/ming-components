import { Button } from '@ming/components';
import { Select } from '@ming/components/select';
import '@ming/components/styles.css';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';

function Fixture(): React.JSX.Element {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  function toggleTheme(): void {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(nextTheme);
    setTheme(nextTheme);
  }

  return (
    <main>
      <Button onClick={toggleTheme}>Use {theme === 'light' ? 'dark' : 'light'} mode</Button>
      <Select
        ariaLabel="Fixture language"
        defaultOpen
        options={[
          { id: 'en', label: 'English' },
          { id: 'es', label: 'Español' },
        ]}
      />
    </main>
  );
}

const root = document.querySelector('#root');
if (!root) throw new Error('Missing fixture root.');

createRoot(root).render(<Fixture />);
