import { SealCard } from '../global';
import styles from '../../pages/AllSealsPage.module.css';

export default function SealsGrid({ seals, isSorting, isFlipped }) {
  return (
    <div className={styles.gridContainer}>
      <div
        className={`${styles.sealsGrid} ${isSorting ? styles.sorting : ''} ${
          seals.length > 9 ? styles.expandedGrid : ''
        }`}
      >
        {seals.map((seal) => (
          <SealCard
            key={seal.id}
            seal={seal}
            isFlipped={isFlipped}
            isSorting={isSorting}
            size="small"
          />
        ))}
      </div>
    </div>
  );
}
