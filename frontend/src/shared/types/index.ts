export interface Teacher {
  id: string
  fullName: string
  email: string
}

export interface Course {
  id: string
  title: string
  description?: string | null
  createdAt: string
  updatedAt: string
  modules: CourseModule[]
}

export interface CourseModule {
  id: string
  title: string
  description?: string | null
  orderIndex: number
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  type: 'video' | 'article' | 'test' | 'assignment'
  orderIndex: number
}
