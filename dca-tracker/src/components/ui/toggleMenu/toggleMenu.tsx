import './toggleMenu.scss';
export const ToggleMenu = () => {
	return (
		<div className='toggle-menu'>
			<nav className='menu-nav'>
        <ul className='nav-list'>
          <li className='nav-list__item'>Dashboard</li>
          <li className='nav-list__item'>DCA Journal</li>
          <li className='nav-list__item'>Analytics</li>
          <li className='nav-list__item'>Performance</li>
          <li className='nav-list__item'>Notes</li>
          <li className='nav-list__item'>Calculator</li>
        </ul>
      </nav>
		</div>
	)
}
