import { useEffect } from 'react'
import { Header } from '@/component/header/Header'
import { useTeacherCoursesStore } from '@/shared/store/courses'
import { useCurrentUserStore } from '@/shared/store/currentUser'
// import s from './appLayout.module.css'

export const AppLayout = () => {
  const { user, isLoading, error, fetchMe } = useCurrentUserStore()
  const { fetchCourses } = useTeacherCoursesStore()

  useEffect(() => {
    const init = async () => {
      await fetchMe()
      const userId = useCurrentUserStore.getState().user?.id
      if (userId) {
        await fetchCourses(userId)
      }
    }

    init()
  }, [])

  if (isLoading) return <p>Загружаем профиль препода...</p>
  if (error) return <p>Ошибка загрузки /me: {error}</p>
  if (!user) return <p>Пользователь не найден</p>

  return <Header />
}
