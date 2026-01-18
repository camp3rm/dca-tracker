import Link from 'next/link';
import './menu.scss';

export default function Menu() {
	return (
		<div className="header-menu">
			<nav className="menu-nav">
				<ul className="nav-list">
					<li className="nav-list__item">
						<Link href="/">Dashboard</Link>
					</li>
					<li className="nav-list__item">
						<Link href="/dca-journal">DCA Journal</Link>
					</li>
					<li className="nav-list__item">
						<Link href="/analytics">Analytics</Link>
					</li>
					<li className="nav-list__item">
						<Link href="/performance">Performance</Link>
					</li>
					<li className="nav-list__item">
						<Link href="/calculator">Calculator</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}
