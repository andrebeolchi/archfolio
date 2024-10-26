import { doc, getDoc } from 'firebase/firestore'

import { db } from '@/interfaces/firebase'
import { InputFile, InputImage } from '@/modules'
import { FooterSocial } from '@/modules/footer'

export interface HeroProps {
  title: string
  subtitle: string
  inputedImage?: InputImage
  image: string
  inputedCurriculum?: InputFile
  curriculum: string

  whatsapp: string
}

export async function getHero() {
  const detailsRef = doc(db, 'data', 'hero-section')

  const docSnap = await getDoc(detailsRef)

  const socialRef = doc(db, 'data/footer')

  const socialDocSnap = await getDoc(socialRef)

  return {
    ...(docSnap.data() as HeroProps),
    ...(socialDocSnap.data() as FooterSocial),
  }
}
