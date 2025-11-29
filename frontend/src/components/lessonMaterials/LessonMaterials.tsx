import { Button } from '@/components/ui/Button/Button'
import type { Lesson } from '@/shared/types'
import s from './lessonMaterials.module.css'

interface LessonMaterialsProps {
  lesson: Lesson
}

export const LessonMaterials = ({ lesson }: LessonMaterialsProps) => {
  const hasMaterials = lesson.materials.length > 0

  if (!hasMaterials) {
    return (
      <section className={s.materialsSection}>
        <h3 className={s.materialsTitle}>Материалы урока</h3>
        <p className={s.noMaterials}>Материалы будут добавлены позже</p>
      </section>
    )
  }

  return (
    <section className={s.materialsSection}>
      <h3 className={s.materialsTitle}>Материалы урока</h3>

      <div className={s.materialsList}>
        {lesson.materials.map(material => {
          if (!material.attachment) return null

          return (
            <div key={material.id} className={s.materialRow}>
              <div className={s.materialLeft}>
                <span className={s.materialIcon} aria-hidden='true'>
                  {material.type === 'LINK' ? '🔗' : '📄'}
                </span>
                <div className={s.materialInfo}>
                  <span className={s.materialTitle}>{material.title}</span>
                </div>
              </div>

              <a
                href={material.attachment.url}
                target='_blank'
                rel='noopener noreferrer'
                className={s.linkButton}
              >
                Открыть
              </a>
            </div>
          )
        })}
      </div>

      <div className={s.materialRow}>
        <h4 className={s.uploadTitle}>Добавить материалы</h4>
        <Button
          variant='primary'
          onClick={() => console.log('upload new material')}
        >
          Загрузить файл
        </Button>
      </div>
    </section>
  )
}
