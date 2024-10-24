import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { ElementType } from 'react'

import { db } from '@/interfaces/firebase'

export interface ImagesProps {
  url: string
  title: string
  order: number
  id: string
}

export interface BulletProps {
  icon: ElementType
  title: string
  description: string
}

export type InputImage = File & Partial<ImagesProps>

export type InputFile = Omit<InputImage, 'order'>

export interface ProjectsItemProps {
  id: string
  title: string
  subtitle: string
  description: string
  bullets: BulletProps[]
  inputedImages?: InputImage[]
  images: ImagesProps[]
  order: number
}

export type ProjectsDetailsProps = Pick<ProjectsItemProps, 'title' | 'description'>

export interface ProjectsProps extends ProjectsDetailsProps {
  items: ProjectsItemProps[]
}

export const getProjects = async (): Promise<ProjectsItemProps[] | void> => {
  const ref = collection(db, 'data', 'projects', 'list')

  const ordered = query(ref, orderBy('order', 'asc'))

  const data = await getDocs(ordered)

  return data.docs.map(doc => doc.data() as ProjectsItemProps)
}
