import Header from '../components/header/Header';
import RegionSelector from '../components/sealTour/RegionSelector';
import { 
  SavedCourseGuide, 
  SavedCourseList 
} from '../components/savedCourse';
import styles from './SavedCoursePage.module.css';

export default function SavedCoursePage() {
  return (
    <div className={styles.savedCourseContainer}>
      <Header title="저장된 코스" isDark={true} />
      
      <div className={styles.content}>
        <SavedCourseGuide />
        <RegionSelector showTitle={false} />
        <SavedCourseList />
      </div>
    </div>
  );
}