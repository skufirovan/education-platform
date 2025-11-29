import type { CourseModule } from '@/shared/types'
import s from './modulesList.module.css'

interface ModulesListProps {
  modules: CourseModule[]
  selectedLessonId: string | null
  onSelectLesson: (lessonId: string) => void
}

export const ModulesList = ({
  modules,
  selectedLessonId,
  onSelectLesson,
}: ModulesListProps) => {
  return (
    <div className={s.modulesList}>
      {modules.map((module, index) => (
        <div key={module.id} className={s.moduleBlock}>
          <div className={s.moduleHeader}>
            <div className={s.moduleIndex}>{index + 1}</div>
            <div className={s.moduleInfo}>
              <p className={s.moduleTitle}>{module.title}</p>
            </div>
          </div>

          <div className={s.lessonsList}>
            {module.lessons.map(lesson => {
              const isActive = lesson.id === selectedLessonId

              return (
                <button
                  key={lesson.id}
                  type='button'
                  className={
                    isActive
                      ? `${s.lessonButton} ${s.lessonButtonActive}`
                      : s.lessonButton
                  }
                  onClick={() => onSelectLesson(lesson.id)}
                >
                  {lesson.title}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
