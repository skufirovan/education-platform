import type { Assignment } from '@/shared/types'
import s from './assignmentPanel.module.css'
import { Link } from 'react-router-dom'

interface AssignmentPanelProps {
  assignment: Assignment
  courseId?: string
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'PENDING':
      return { text: 'Не сдано', color: s.statusPending }
    case 'GRADED':
      return { text: 'Проверено', color: s.statusGraded }
    case 'NEEDS_REVISION':
      return { text: 'На доработку', color: s.statusRevision }
    default:
      return { text: 'Неизвестно', color: s.statusPending }
  }
}

export const AssignmentPanel = ({
  assignment,
  courseId,
}: AssignmentPanelProps) => {
  const submissions = assignment.submissions || []
  const hasSubmissions = submissions.length > 0

  return (
    <section className={s.assignmentPanel}>
      {/* Описание задания */}
      <div className={s.assignmentInfo}>
        <h3 className={s.sectionTitle}>Описание задания</h3>

        <div className={s.infoBlock}>
          <p className={s.assignmentDescription}>{assignment.description}</p>

          <div className={s.assignmentMeta}>
            <div className={s.metaItem}>
              <span className={s.metaLabel}>Максимум баллов:</span>
              <span className={s.metaValue}>{assignment.maxScore}</span>
            </div>

            {assignment.dueAt && (
              <div className={s.metaItem}>
                <span className={s.metaLabel}>Срок сдачи:</span>
                <span className={s.metaValue}>
                  {new Date(assignment.dueAt).toLocaleDateString('ru-RU')}
                </span>
              </div>
            )}

            <div className={s.metaItem}>
              <span className={s.metaLabel}>Статус:</span>
              <span
                className={`${s.metaValue} ${s[assignment.status.toLowerCase()]}`}
              >
                {assignment.status === 'DRAFT'
                  ? 'Черновик'
                  : assignment.status === 'PUBLISHED'
                    ? 'Опубликовано'
                    : 'Архивировано'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Работы студентов */}
      <div className={s.submissionsSection}>
        <h3 className={s.sectionTitle}>Работы студентов</h3>

        {!hasSubmissions ? (
          <p className={s.noSubmissions}>
            На это задание пока нет отправленных работ
          </p>
        ) : (
          <div className={s.submissionsList}>
            {submissions.map(submission => {
              const statusInfo = getStatusBadge(submission.status)

              return (
                <div key={submission.id} className={s.submissionRow}>
                  <div className={s.studentInfo}>
                    <span className={s.studentName}>
                      {submission.student?.fullName || 'Неизвестный студент'}
                    </span>
                    <span className={s.submittedAt}>
                      Отправлено:{' '}
                      {new Date(submission.submittedAt).toLocaleDateString(
                        'ru-RU'
                      )}
                    </span>
                  </div>

                  <div className={s.submissionStatus}>
                    <span className={`${s.statusBadge} ${statusInfo.color}`}>
                      {statusInfo.text}
                    </span>

                    {submission.status === 'GRADED' &&
                      submission.score !== null && (
                        <span className={s.scoreText}>
                          {submission.score}/{assignment.maxScore}
                        </span>
                      )}
                  </div>

                  {submission.status === 'PENDING' && (
                    <Link
                      to={`/courses/${courseId}/assignments/${assignment.id}/submissions/${submission.id}/grade`}
                      state={{ assignment }}
                      className={s.reviewButton}
                    >
                      Оценить
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
