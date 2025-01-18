import {
  Course,
  FocusPoint,
  Plan,
  PreviousPlan,
  User,
  Lesson,
  Chapter,
} from '@prisma/client'
import { JwtPayload } from 'jsonwebtoken'

interface UserType extends User {
  courses: Course[]
  plan: Plan
  previousPlans: PreviousPlan[]
  focusPoint: FocusPoint
}

export interface SessionType {
  user: UserType
  token: string
}

export interface LessonType extends Lesson {
  completed: true
}

export interface ChapterType extends Chapter {
  lessons: LessonType[]
}

export interface CourseType extends Course {
  chapters: ChapterType[]
}

export interface CustomJwtPayload extends JwtPayload {
  email: string
  id: string
}

export interface MulterRequest extends Request {
  file: Express.Multer.File
}
