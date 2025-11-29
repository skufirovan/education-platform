import type { Course } from '@/shared/types'
import s from './courseHeader.module.css'

interface CourseHeaderProps {
  course: Course
}

export const CourseHeader = ({ course }: CourseHeaderProps) => {
  const studentsCount = course.enrollments?.length ?? 0

  return (
    <header className={s.courseHeader}>
      <h1 className={s.courseTitle}>{course.title}</h1>

      <div className={s.studentsRow}>
        <span className={s.studentsIcon} aria-hidden='true'>
          👥
        </span>
        <span className={s.studentsText}>{studentsCount} студентов</span>
      </div>
    </header>
  )
}
