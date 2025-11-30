import type { Course } from '@/shared/types'
import { Button } from '@/components/ui/Button/Button'
import s from './courseCard.module.css'

interface CourseCardProps {
  course: Course
  onOpenCourse?: (courseId: string) => void
  onCheckAssignments?: (courseId: string) => void
}

export const CourseCard = ({
  course,
  onOpenCourse,
  onCheckAssignments,
}: CourseCardProps) => {
  const studentsCount = course.enrollments.length

  const progressPercent = 75
  const nearestDeadlineLabel = 'Ближайший дедлайн: 15 декабря'

  return (
    <article className={s.card}>
      <header className={s.header}>
        <h2 className={s.title}>{course.title}</h2>
        <span className={s.dot} aria-hidden='true' />
      </header>

      {course.description && (
        <p className={s.description}>{course.description}</p>
      )}

      <div className={s.metaRow}>
        <div className={s.metaItem}>
          <span className={s.metaIcon} aria-hidden='true'>
            👥
          </span>
          <span className={s.metaText}>{studentsCount} студентов</span>
        </div>
      </div>

      <div className={s.progressBlock}>
        <div className={s.progressHeader}>
          <span className={s.progressLabel}>Прогресс курса</span>
          <span className={s.progressValue}>{progressPercent}%</span>
        </div>
        <div className={s.progressBar}>
          <div
            className={s.progressFill}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className={s.deadlineRow}>
        <span className={s.deadlineIcon} aria-hidden='true'>
          ⏰
        </span>
        <span className={s.deadlineText}>
          {nearestDeadlineLabel.split(':')[0]}:{' '}
          <span className={s.deadlineDate}>
            {nearestDeadlineLabel.split(':')[1]?.trim()}
          </span>
        </span>
      </div>

      <div className={s.actions}>
        <Button
          variant='primary'
          className={s.fullWidthButton}
          onClick={() => onOpenCourse?.(course.id)}
        >
          Открыть курс
        </Button>
        <Button
          variant='secondary'
          className={s.fullWidthButton}
          onClick={() => onCheckAssignments?.(course.id)}
        >
          Редактировать
        </Button>
      </div>
    </article>
  )
}
