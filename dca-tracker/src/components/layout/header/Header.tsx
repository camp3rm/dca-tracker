'use client';
import './header.scss';
import Image from 'next/image';
import { useResize } from '@hooks/useResize';
import Menu from '@/components/layout/header-menu/menu';
import { useContext } from 'react';
import { HeaderContext } from '@/hooks/useHeaderContext';

export default function Header() {
	const { windowWidth } = useResize();
const { isMenuOpen, toggleMenu } = useContext(HeaderContext);
	return (
		<header className="layout-header">
			<div className="logo">
				{windowWidth < 992 ? (
					<Image
						className="mobile-logo"
						src="/logo/mobile-logo.png"
						alt="DCA Tracker Logo"
						width={40}
						height={40}
					/>
				) : (
					<Image
						className="desktop-logo"
						src="/logo/desktop-logo.png"
						alt="DCA Tracker Logo"
						width={76}
						height={76}
					/>
				)}
			</div>
			{windowWidth >= 992 ? (
				<Menu />
			) : (
				<div
					className="hamburger-menu"
					onClick={toggleMenu}>
					<span className="hamburger-bar"></span>
					<span className="hamburger-bar"></span>
					<span className="hamburger-bar"></span>
				</div>
			)}
		</header>
	);
}
