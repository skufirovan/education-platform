import type { Lesson } from '@/shared/types'
import { LessonMaterials } from '@/components/lessonMaterials/LessonMaterials'
import s from './lessonContent.module.css'

interface LessonContentProps {
  lesson: Lesson | null
}

export const LessonContent = ({ lesson }: LessonContentProps) => {
  if (!lesson) {
    return <p className={s.emptyLesson}>В этом курсе ещё нет уроков.</p>
  }

  // Определяем иконку и название типа урока
  const typeEmoji =
    {
      VIDEO: '🎬',
      ARTICLE: '📄',
      TEST: '✅',
      ASSIGNMENT: '📝',
    }[lesson.type] || '📚'

  const typeName =
    {
      VIDEO: 'Видеоурок',
      ARTICLE: 'Статья',
      TEST: 'Тест',
      ASSIGNMENT: 'Задание',
    }[lesson.type] || 'Урок'

  return (
    <>
      <header className={s.lessonHeader}>
        <h2 className={s.lessonTitle}>{lesson.title}</h2>

        <div className={s.lessonMetaRow}>
          <span className={s.lessonMetaItem}>
            <span className={s.lessonMetaIcon} aria-hidden='true'>
              {typeEmoji}
            </span>
            <span className={s.lessonMetaText}>{typeName}</span>
          </span>

          {lesson.durationMinutes && (
            <span className={s.lessonMetaText}>
              {lesson.durationMinutes} минут
            </span>
          )}
        </div>
      </header>

      <LessonMaterials lesson={lesson} />
    </>
  )
}
