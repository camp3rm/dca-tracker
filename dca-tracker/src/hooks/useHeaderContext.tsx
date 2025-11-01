'use client';
import { createContext } from 'react';

type HeaderContextType = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

export const HeaderContext = createContext<HeaderContextType>({
  isMenuOpen: false,
  toggleMenu: () => {},
});
