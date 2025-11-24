'use client';
import styles from './dca-journal.module.scss';
import DcaTable from '@/components/journal-components/tables/DcaTable';
import JournalHeader from '@/components/journal-components/journalHeader/JournalHeader';
import AddTransactionModal from '@/components/ui/modal/AddTransactionModal';
import useModal from '@/components/ui/modal/useModal';

export default function DCAJournal() {
	const { openModal, closeModal, isModalOpen } = useModal();

	return (
		<section className={styles.journal_page}>
			<JournalHeader openModal={openModal} />
			<DcaTable />

			{isModalOpen && <AddTransactionModal modal={closeModal} />}
		</section>
	);
}
