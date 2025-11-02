'use client';
import { useState } from 'react';
import styles from './dca-journal.module.scss';
import DcaTable from '@/components/tables/DcaTable';
import JournalHeader from '@/components/journal-components/components/journalHeader/JournalHeader';
import AddTransaction from '@/components/ui/modal/addTransactionModal';
import UseModal from '@/components/ui/modal/useModal';

export default function DCAJournal() {
	const { openModal, closeModal, isModalOpen } = UseModal();

	return (
		<section className={styles.journal_page}>
			<JournalHeader openModal={openModal} />
			<DcaTable />
			{isModalOpen ? <AddTransaction modal={closeModal} /> : null}
		</section>
	);
}
