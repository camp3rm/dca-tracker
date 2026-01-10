import './menu.scss';
export default function Menu() {
	return (
		<div className="header-menu">
			<nav className="menu-nav">
				<ul className="nav-list">
					<li className="nav-list__item">Dashboard</li>
					<li className="nav-list__item">DCA Journal</li>
					<li className="nav-list__item">Analytics</li>
					<li className="nav-list__item">Performance</li>
					<li className="nav-list__item">Calculator</li>
				</ul>
			</nav>
		</div>
	);
}
