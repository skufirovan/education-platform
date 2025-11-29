import { useNavigate } from 'react-router-dom'
import { useTeacherCoursesStore } from '@/shared/store/courses'
import { Button } from '@/components/ui/Button/Button'
import { CourseCard } from '@/components/courseCard/CourseCard'
import s from './coursesPage.module.css'

export const CoursesPage = () => {
  const navigate = useNavigate()
  const { courses, isLoading, error } = useTeacherCoursesStore()

  const handleOpenCourse = (courseId: string) => {
    navigate(`/courses/${courseId}`)
  }

  const handleCheckAssignments = (courseId: string) => {
    // TODO: Сделать отдельную страницу
    navigate(`/courses/${courseId}`)
  }

  if (isLoading) {
    return <div className={s.loader}>Загружаем курсы…</div>
  }

  if (error) {
    return <div className={s.error}>Ошибка загрузки курсов: {error}</div>
  }

  return (
    <div className={s.page}>
      <div className={s.headerRow}>
        <h1 className={s.title}>Мои курсы</h1>

        <Button
          variant='primary'
          onClick={() => {
            // TODO: Добавить возмоужность создать курс
            console.log('create course click')
          }}
        >
          Создать курс
        </Button>
      </div>

      {courses.length === 0 ? (
        <p className={s.emptyState}>У вас пока нет курсов.</p>
      ) : (
        <div className={s.coursesGrid}>
          {courses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onOpenCourse={handleOpenCourse}
              onCheckAssignments={handleCheckAssignments}
            />
          ))}
        </div>
      )}
    </div>
  )
}
