import { useState } from 'react'
import { Button } from '@/components/ui/Button/Button'
import type { Lesson, LessonMaterial } from '@/shared/types'
import s from './lessonMaterials.module.css'

interface LessonMaterialsProps {
  lesson: Lesson
}

export const LessonMaterials = ({ lesson }: LessonMaterialsProps) => {
  const [showModal, setShowModal] = useState(false)
  const [materialTitle, setMaterialTitle] = useState('')
  const [materialUrl, setMaterialUrl] = useState('')
  const [materialType, setMaterialType] = useState<'FILE' | 'LINK'>('LINK')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [materials, setMaterials] = useState<LessonMaterial[]>(lesson.materials)

  const hasMaterials = materials.length > 0

  const handleAddMaterial = async () => {
    if (!materialTitle.trim() || !materialUrl.trim()) {
      setError('Пожалуйста, заполните все поля')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/lessons/${lesson.id}/materials`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: materialTitle,
            type: materialType,
            url: materialUrl,
            filename: materialTitle,
          }),
        }
      )

      if (!response.ok) {
        throw new Error(
          `Ошибка при добавлении материала ${response.statusText}`
        )
      }

      const newMaterial = (await response.json()) as LessonMaterial
      setMaterials([...materials, newMaterial])
      setMaterialTitle('')
      setMaterialUrl('')
      setMaterialType('LINK')
      setShowModal(false)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Ошибка при добавлении материала'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteMaterial = async (materialId: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот материал?')) {
      return
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/materials/${materialId}`,
        {
          method: 'DELETE',
        }
      )

      if (!response.ok) {
        throw new Error('Ошибка при удалении материала')
      }

      setMaterials(materials.filter(m => m.id !== materialId))
    } catch (err) {
      alert(
        err instanceof Error ? err.message : 'Ошибка при удалении материала'
      )
    }
  }

  if (!hasMaterials) {
    return (
      <section className={s.materialsSection}>
        <h3 className={s.materialsTitle}>Материалы урока</h3>
        <p className={s.noMaterials}>Материалы будут добавлены позже</p>

        <div className={s.materialRow}>
          <h4 className={s.uploadTitle}>Добавить материалы</h4>
          <Button variant='primary' onClick={() => setShowModal(true)}>
            Загрузить файл
          </Button>
        </div>

        {showModal && (
          <div className={s.modalOverlay} onClick={() => setShowModal(false)}>
            <div className={s.modal} onClick={e => e.stopPropagation()}>
              <h3 className={s.modalTitle}>Добавить материал</h3>

              <div className={s.formGroup}>
                <label className={s.label}>Название материала</label>
                <input
                  type='text'
                  value={materialTitle}
                  onChange={e => setMaterialTitle(e.target.value)}
                  placeholder='Например: Конспект лекции'
                  className={s.input}
                />
              </div>

              <div className={s.formGroup}>
                <label className={s.label}>Тип материала</label>
                <select
                  value={materialType}
                  onChange={e =>
                    setMaterialType(e.target.value as 'FILE' | 'LINK')
                  }
                  className={s.input}
                >
                  <option value='LINK'>Ссылка</option>
                  <option value='FILE'>Файл</option>
                </select>
              </div>

              <div className={s.formGroup}>
                <label className={s.label}>
                  {materialType === 'LINK' ? 'URL ссылки' : 'URL файла'}
                </label>
                <input
                  type='text'
                  value={materialUrl}
                  onChange={e => setMaterialUrl(e.target.value)}
                  placeholder='https://...'
                  className={s.input}
                />
              </div>

              {error && <div className={s.error}>{error}</div>}

              <div className={s.modalActions}>
                <button
                  onClick={() => setShowModal(false)}
                  className={s.cancelButton}
                  disabled={loading}
                >
                  Отменить
                </button>
                <button
                  onClick={handleAddMaterial}
                  className={s.addButton}
                  disabled={loading}
                >
                  {loading ? 'Добавляю...' : 'Добавить'}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    )
  }

  return (
    <section className={s.materialsSection}>
      <h3 className={s.materialsTitle}>Материалы урока</h3>

      <div className={s.materialsList}>
        {materials.map(material => {
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

              <div className={s.materialActions}>
                <a
                  href={material.attachment.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={s.linkButton}
                >
                  Открыть
                </a>
                <button
                  onClick={() => handleDeleteMaterial(material.id)}
                  className={s.deleteButton}
                  title='Удалить материал'
                >
                  Удалить
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className={s.materialRow}>
        <h4 className={s.uploadTitle}>Добавить материалы</h4>
        <Button variant='primary' onClick={() => setShowModal(true)}>
          Загрузить файл
        </Button>
      </div>

      {showModal && (
        <div className={s.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={s.modal} onClick={e => e.stopPropagation()}>
            <h3 className={s.modalTitle}>Добавить материал</h3>

            <div className={s.formGroup}>
              <label className={s.label}>Название материала</label>
              <input
                type='text'
                value={materialTitle}
                onChange={e => setMaterialTitle(e.target.value)}
                placeholder='Например: Конспект лекции'
                className={s.input}
              />
            </div>

            <div className={s.formGroup}>
              <label className={s.label}>Тип материала</label>
              <select
                value={materialType}
                onChange={e =>
                  setMaterialType(e.target.value as 'FILE' | 'LINK')
                }
                className={s.input}
              >
                <option value='LINK'>Ссылка</option>
                <option value='FILE'>Файл</option>
              </select>
            </div>

            <div className={s.formGroup}>
              <label className={s.label}>
                {materialType === 'LINK' ? 'URL ссылки' : 'URL файла'}
              </label>
              <input
                type='text'
                value={materialUrl}
                onChange={e => setMaterialUrl(e.target.value)}
                placeholder='https://...'
                className={s.input}
              />
            </div>

            {error && <div className={s.error}>{error}</div>}

            <div className={s.modalActions}>
              <button
                onClick={() => setShowModal(false)}
                className={s.cancelButton}
                disabled={loading}
              >
                Отменить
              </button>
              <button
                onClick={handleAddMaterial}
                className={s.addButton}
                disabled={loading}
              >
                {loading ? 'Добавляю...' : 'Добавить'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
