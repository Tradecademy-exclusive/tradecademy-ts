import {
  Course,
  FocusPoint,
  Plan,
  PreviousPlan,
  User,
  Lesson,
  Chapter,
  Note,
  Enroll,
  Group,
  Analysis,
  followupAnalysis,
} from '@prisma/client'
import { JwtPayload } from 'jsonwebtoken'

export interface UserType extends User {
  courses: CourseType[]
  plan: Plan
  previousPlans: PreviousPlan[]
  focusPoint: FocusPoint
  completed: LessonType[]
}

export interface GroupType extends Group {
  students: UserType[]
}

export interface SessionType {
  user: UserType
  token: string
}

export interface LessonType extends Lesson {
  completed: User[]
  chapter: Chapter
  note: Note
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

export interface EnrollType extends Enroll {
  course: CourseType
  user: User
}

export interface followupAnalysisType extends followupAnalysis {
  mentor: User
}

export interface AnalysisType extends Analysis {
  followupAnalysis: followupAnalysisType[]
  mentor: User
}

export interface MulterRequest extends Request {
  file: Express.Multer.File
}
