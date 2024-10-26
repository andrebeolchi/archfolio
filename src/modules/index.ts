export interface ImagesProps {
  url: string
  title: string
  order: number
  id: string
}
export type InputImage = File & Partial<ImagesProps>

export type InputFile = Omit<InputImage, 'order'>
