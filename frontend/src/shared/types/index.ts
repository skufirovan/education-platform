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
  enrollments: CourseEnrollment[]
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
  moduleId: string
  title: string
  type: 'VIDEO' | 'ARTICLE' | 'TEST' | 'ASSIGNMENT'
  orderIndex: number
  durationMinutes?: number
  materials: LessonMaterial[]
}

export interface LessonMaterial {
  id: string
  lessonId: string
  title: string
  type: 'FILE' | 'LINK'
  attachment: Attachment | null
}

export interface Attachment {
  id: string
  url: string
  filename: string
  mimeType?: string | null
}

interface CourseEnrollment {
  courseId: string
  studentId: string
  enrolledAt: string
}
