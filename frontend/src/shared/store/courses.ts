import { create } from 'zustand'
import type { Course } from '../types'

interface TeacherCoursesState {
  courses: Course[]
  isLoading: boolean
  error: string | null
  fetchCourses: (teacherId: string) => Promise<void>
}

export const useTeacherCoursesStore = create<TeacherCoursesState>(set => ({
  courses: [],
  isLoading: false,
  error: null,

  fetchCourses: async teacherId => {
    set({ isLoading: true, error: null })

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/teachers/${teacherId}/courses`
      )

      if (!res.ok) {
        throw new Error('Failed to load courses')
      }

      const data = (await res.json()) as Course[]

      set({ courses: data, isLoading: false })
    } catch (e) {
      set({
        error: e instanceof Error ? e.message : 'Unknown error',
        isLoading: false,
      })
    }
  },
}))
