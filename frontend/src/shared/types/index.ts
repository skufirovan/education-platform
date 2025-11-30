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
  assignment?: Assignment | null
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

export interface Assignment {
  id: string
  lessonId: string
  title: string
  description: string
  maxScore: number
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  dueAt?: string | null
  allowMultipleSubmissions: boolean
  submissions?: AssignmentSubmission[]
  createdAt: string
  updatedAt: string
}

export interface AssignmentSubmission {
  id: string
  assignmentId: string
  studentId: string
  submittedAt: string
  status: 'PENDING' | 'GRADED' | 'NEEDS_REVISION'
  score?: number | null
  feedback?: string | null
  gradedAt?: string | null
  student?: Student
}

export interface Student {
  id: string
  fullName: string
  email: string
}

interface CourseEnrollment {
  courseId: string
  studentId: string
  enrolledAt: string
}
