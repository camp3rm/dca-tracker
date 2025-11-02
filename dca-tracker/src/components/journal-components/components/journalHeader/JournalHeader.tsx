import './journalHeader.scss';

export default function JournalHeader({openModal}: {openModal: () => void}) {
	return (
		<section className='journal-header'>
			<h1 className='journal-header__title'>DCA Journal</h1>
			<button onClick={openModal} className='journal-header__button'>Add Transaction</button>
		</section>
	)
}
