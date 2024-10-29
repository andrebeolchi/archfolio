import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore'
import { ElementType } from 'react'

import { db } from '@/interfaces/firebase'
import { ImagesProps, InputImage } from '@/modules'

export interface BulletProps {
  icon: ElementType
  title: string
  description: string
}

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

export const getProjectList = async (): Promise<ProjectsItemProps[]> => {
  const ref = collection(db, 'data', 'projects', 'list')

  const ordered = query(ref, orderBy('order', 'asc'))

  const data = await getDocs(ordered)

  return data.docs.map(doc => doc.data() as ProjectsItemProps)
}

export const getProjectDetails = async (): Promise<ProjectsDetailsProps | void> => {
  const detailsRef = doc(db, 'data', 'projects')

  const docSnap = await getDoc(detailsRef)

  return docSnap.data() as ProjectsDetailsProps
}

export const getProject = async (id: string): Promise<ProjectsItemProps> => {
  const detailsRef = doc(db, 'data', 'projects', 'list', id)

  const docSnap = await getDoc(detailsRef)

  return docSnap.data() as ProjectsItemProps
}
