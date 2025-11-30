import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CourseHeader } from '@/components/courseHeader/CourseHeader'
import { ModulesList } from '@/components/modulesList/ModulesList'
import { LessonContent } from '@/components/lessonContent/LessonContent'
import type { Course, Lesson } from '@/shared/types'
import s from './coursePage.module.css'

export const CoursePage = () => {
  const { id } = useParams<{ id: string }>()

  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null)

  // загружаем курс при монтировании компонента
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/courses/${id}`
        )
        if (!res.ok) throw new Error('Курс не найден')
        const data = await res.json()
        setCourse(data)
      } catch (e) {
        console.error('Ошибка загрузки курса:', e)
        setCourse(null)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchCourse()
    }
  }, [id])

  // при заходе на курс выбираем первый урок первого модуля
  useEffect(() => {
    if (!course || course.modules.length === 0) return

    const firstModuleWithLessons = course.modules.find(
      m => m.lessons.length > 0
    )
    const firstLesson = firstModuleWithLessons?.lessons[0]

    setSelectedLessonId(firstLesson ? firstLesson.id : null)
  }, [course])

  if (loading) {
    return <div className={s.page}>Загрузка курса...</div>
  }

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
          <LessonContent lesson={currentLesson} courseId={id} />
        </section>
      </div>
    </div>
  )
}
