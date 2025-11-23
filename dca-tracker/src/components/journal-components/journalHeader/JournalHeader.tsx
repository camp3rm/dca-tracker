import './journalHeader.scss';

interface JournalHeaderProps {
	openModal: () => void;
}

export default function JournalHeader({ openModal }: JournalHeaderProps) {
	return (
		<section className="journal-header">
			<h1 className="journal-header__title">DCA Journal</h1>
			<button
				onClick={openModal}
				className="journal-header__button">
				Add Transaction
			</button>
		</section>
	);
}
