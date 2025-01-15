import {
  Course,
  FocusPoint,
  Plan,
  PreviousPlan,
  User,
  Video,
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

interface ChapterType extends Chapter {
  videos: Video[]
}

export interface CourseType extends Course {
  chapters: ChapterType[]
}

export interface CustomJwtPayload extends JwtPayload {
  email: string
  id: string
}
