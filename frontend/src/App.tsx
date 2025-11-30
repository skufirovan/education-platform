import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useTeacherCoursesStore } from '@/shared/store/courses'
import { useCurrentUserStore } from '@/shared/store/currentUser'
import { RootLayout } from './layouts/rootLayout/RootLayout'
import { CoursesPage } from './pages/coursesPage/CoursesPage'
import { CoursePage } from './pages/coursePage/CoursePage'
import { GradePage } from './pages/gradePage/GradePage'

export const App = () => {
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

  return (
    <Routes>
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Navigate to='/courses' />} />
        <Route path='/courses' element={<CoursesPage />} />
        <Route path='/courses/:id' element={<CoursePage />} />
        <Route
          path='/courses/:courseId/assignments/:assignmentId/submissions/:submissionId/grade'
          element={<GradePage />}
        />
      </Route>
    </Routes>
  )
}
