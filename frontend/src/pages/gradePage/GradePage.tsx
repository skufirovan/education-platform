import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import type { Assignment, AssignmentSubmission } from '@/shared/types'
import s from './gradePage.module.css'

export const GradePage = () => {
  const { courseId, assignmentId, submissionId } = useParams<{
    courseId: string
    assignmentId: string
    submissionId: string
  }>()
  const navigate = useNavigate()
  const location = useLocation()

  const [score, setScore] = useState<number | ''>('')
  const [feedback, setFeedback] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // TODO: загрузить данные submission из API
  const assignment = location.state?.assignment as Assignment | undefined
  const submission = assignment?.submissions?.find(
    s => s.id === submissionId
  ) as AssignmentSubmission | undefined

  // Инициализация формы с данными если они уже есть
  useEffect(() => {
    if (submission?.score !== null && submission?.score !== undefined) {
      setScore(submission.score)
      setFeedback(submission.feedback || '')
    }
  }, [submission])

  if (!assignment || !submission) {
    return (
      <div className={s.page}>
        <button onClick={() => navigate(-1)} className={s.backButton}>
          ← Назад
        </button>
        <div style={{ padding: '20px', color: '#6b7280' }}>
          Данные не загружены. Пожалуйста, перейдите с раздела домашки.
        </div>
      </div>
    )
  }

  const handleSubmitGrade = async () => {
    if (score === '') {
      setError('Пожалуйста, укажите количество баллов')
      return
    }

    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/submissions/${submissionId}/grade`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            score: typeof score === 'number' ? score : parseInt(score),
            feedback,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Ошибка при выставлении оценки')
      }

      setSuccess(true)
      setTimeout(() => {
        navigate(-1)
      }, 1500)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Ошибка при выставлении оценки'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={s.page}>
      <button onClick={() => navigate(-1)} className={s.backButton}>
        ← Назад
      </button>

      <div className={s.layout}>
        {/* ЛЕВАЯ КОЛОНКА */}
        <div className={s.leftColumn}>
          {/* Название задания */}
          <div className={s.assignmentBlock}>
            <div className={s.assignmentHeader}>
              <span className={s.badge}>ДЗ</span>
              <span className={s.deadline}>
                Дедлайн:{' '}
                {assignment.dueAt
                  ? new Date(assignment.dueAt).toLocaleDateString('ru-RU')
                  : 'Не указан'}
              </span>
            </div>
            <h1 className={s.assignmentTitle}>{assignment.title}</h1>
          </div>

          {/* Описание задания */}
          <div className={s.descriptionBlock}>
            <h2 className={s.blockTitle}>Описание задания</h2>

            <div className={s.assignmentDescription}>
              <p>{assignment.description}</p>

              <h3 className={s.requirements}>Требования к выполнению:</h3>
              <ul className={s.requirementsList}>
                <li>Максимум баллов: {assignment.maxScore}</li>
                <li>Статус задания: {assignment.status}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ПРАВАЯ КОЛОНКА */}
        <div className={s.rightColumn}>
          {/* Информация о студенте */}
          <div className={s.card}>
            <h2 className={s.cardTitle}>Информация о студенте</h2>

            <div className={s.studentInfo}>
              <div className={s.studentAvatar}>
                {submission.student?.fullName?.[0] || '?'}
              </div>
              <div className={s.studentDetails}>
                <h3 className={s.studentName}>
                  {submission.student?.fullName || 'Неизвестный студент'}
                </h3>
                <p className={s.studentGroup}>Группа не указана</p>
              </div>
            </div>

            <div className={s.submissionInfo}>
              <div className={s.infoRow}>
                <span className={s.infoLabel}>Дата сдачи:</span>
                <span className={s.infoValue}>
                  {new Date(submission.submittedAt).toLocaleDateString('ru-RU')}
                </span>
              </div>
              <div className={s.infoRow}>
                <span className={s.infoLabel}>Прикреплённый файл:</span>
                <a href='#' className={s.fileLink}>
                  Скачать
                </a>
              </div>
            </div>
          </div>

          {/* Оценивание работы */}
          <div className={s.card}>
            <h2 className={s.cardTitle}>
              {submission.status === 'PENDING'
                ? 'Оценивание работы'
                : 'Оценка и комментарии'}
            </h2>

            <div className={s.gradeForm}>
              <div className={s.formGroup}>
                <label htmlFor='score' className={s.label}>
                  Количество баллов:
                </label>
                <div className={s.scoreInput}>
                  <input
                    id='score'
                    type='number'
                    min='0'
                    max={assignment.maxScore}
                    value={score}
                    onChange={e =>
                      setScore(
                        e.target.value === '' ? '' : parseInt(e.target.value)
                      )
                    }
                    placeholder='0'
                    className={s.input}
                    disabled={false}
                  />
                  <span className={s.maxScore}>/ {assignment.maxScore}</span>
                </div>
              </div>

              <div className={s.formGroup}>
                <label htmlFor='feedback' className={s.label}>
                  Комментарий к работе
                </label>
                <textarea
                  id='feedback'
                  value={feedback}
                  onChange={e => setFeedback(e.target.value)}
                  className={s.textarea}
                  rows={8}
                  disabled={false}
                />
              </div>

              <div className={s.formActions}>
                <button className={s.saveDraftButton} disabled={loading}>
                  Сохранить черновик
                </button>
                <button
                  onClick={handleSubmitGrade}
                  className={s.submitButton}
                  disabled={score === '' || loading}
                >
                  {loading ? 'Отправляю...' : 'Выставить оценку'}
                </button>
              </div>

              {error && (
                <div
                  style={{
                    color: '#dc2626',
                    fontSize: '13px',
                    marginTop: '8px',
                  }}
                >
                  {error}
                </div>
              )}

              {success && (
                <div
                  style={{
                    color: '#059669',
                    fontFamily: 'Inter',
                    fontSize: '13px',
                    marginTop: '8px',
                  }}
                >
                  ✓ Оценка выставлена успешно!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
