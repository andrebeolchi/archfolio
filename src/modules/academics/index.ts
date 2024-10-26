import { collection, getDocs, orderBy, query } from 'firebase/firestore'

import { db } from '@/interfaces/firebase'

export interface ImagesProps {
  url: string
  title: string
  order: number
  id: string
}
export type InputImage = File & Partial<ImagesProps>

export type InputFile = Omit<InputImage, 'order'>

export interface AcademicDetailsProps {
  title: string
  description: string
}

export interface AcademicItemProps {
  id: string
  title: string
  subtitle: string
  inputedImage?: InputImage
  image: string
  date: string
  category: string
  order: number
}

export interface AcademicProps extends AcademicDetailsProps {
  items: AcademicItemProps[]
}

export const getAcademics = async (): Promise<AcademicItemProps[] | void> => {
  const ref = collection(db, 'data', 'academic-education', 'list')

  const ordered = query(ref, orderBy('order', 'asc'))

  const data = await getDocs(ordered)

  return data.docs.map(doc => doc.data() as AcademicItemProps)
}
