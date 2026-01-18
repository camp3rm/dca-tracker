type ButtonProps = {
	title: string;
	isActive: boolean;
	onClick: () => void
};

export const  TabButton = ({ title, isActive, onClick }: ButtonProps) => {
	return (
		<>
			<button className={isActive ? 'tab-button active' : 'tab-button'} onClick={onClick}>{title}</button>
		</>
	);
}
