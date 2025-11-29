import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTeacherCoursesStore } from '@/shared/store/courses'
import { CourseHeader } from '@/components/courseHeader/CourseHeader'
import { ModulesList } from '@/components/modulesList/ModulesList'
import { LessonContent } from '@/components/lessonContent/LessonContent'
import type { Lesson } from '@/shared/types'
import s from './coursePage.module.css'

export const CoursePage = () => {
  const { id } = useParams<{ id: string }>()
  const { courses } = useTeacherCoursesStore()

  const course = useMemo(() => courses.find(c => c.id === id), [courses, id])

  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null)

  // при заходе на курс выбираем первый урок первого модуля
  useEffect(() => {
    if (!course) return

    const firstModuleWithLessons = course.modules.find(
      m => m.lessons.length > 0
    )
    const firstLesson = firstModuleWithLessons?.lessons[0]

    setSelectedLessonId(firstLesson ? firstLesson.id : null)
  }, [course])

  if (!course) {
    return <div className={s.page}>Курс не найден</div>
  }

  const allLessons: Lesson[] = course.modules.flatMap(m => m.lessons)
  const currentLesson =
    allLessons.find(l => l.id === selectedLessonId) ?? allLessons[0] ?? null

  return (
    <div className={s.page}>
      <div className={s.layout}>
        {/* ЛЕВАЯ КОЛОНКА: курс + модули + уроки */}
        <aside className={s.sidebarCard}>
          <CourseHeader course={course} />
          <ModulesList
            modules={course.modules}
            selectedLessonId={selectedLessonId}
            onSelectLesson={setSelectedLessonId}
          />
        </aside>

        {/* ПРАВАЯ КОЛОНКА: текущий урок */}
        <section className={s.contentCard}>
          <LessonContent lesson={currentLesson} />
        </section>
      </div>
    </div>
  )
}
