'use client'
import Image from 'next/image'
import { useEffect, useState, useMemo } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

import { Dialog, DialogContent, DialogTitle } from './ui/dialog'

interface GalleryProps {
  images: {
    url: string
    title: string
  }[]
}

const Gallery = ({ images }: GalleryProps) => {
  const [mainApi, setMainApi] = useState<CarouselApi>()
  const [thumbnailApi, setThumbnailApi] = useState<CarouselApi>()
  const [dialogApi, setDialogApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [open, setOpen] = useState<boolean>(false)

  const handleClick = useMemo(
    () => (index: number) => {
      if (!mainApi || !thumbnailApi) return

      thumbnailApi.scrollTo(index)
      mainApi.scrollTo(index)
      dialogApi?.scrollTo(index)
      setCurrent(index)
    },
    [mainApi, thumbnailApi, dialogApi]
  )

  const mainImage = useMemo(
    () =>
      images.map((image, index) => (
        <CarouselItem key={index} className="relative aspect-square w-full">
          <div className="border border-border rounded-lg bg-background shadow-sm p-2 group">
            <img src={image?.url} alt={image?.title} className="w-full h-[32rem] object-contain" />
            <div
              className="absolute inset-0 bg-black/80 opacity-0 transition-opacity duration-300 hover:opacity-100 flex items-center justify-center cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <h3 className="text-white text-lg font-semibold p-4">Visualizar em tela cheia</h3>
            </div>
          </div>
        </CarouselItem>
      )),
    [images]
  )

  const thumbnailImages = useMemo(
    () =>
      images.map((image, index) => (
        <CarouselItem
          key={index}
          className="relative aspect-square w-full basis-1/4"
          onClick={() => handleClick(index)}
        >
          <Image
            className={cn(['p-2 rounded-lg', index === current && 'border-muted border-2'])}
            src={image.url}
            fill
            alt={`Carousel Thumbnail Imagem ${index + 1}`}
          />
        </CarouselItem>
      )),
    [images, current, handleClick]
  )

  const dialogImages = useMemo(
    () =>
      images.map((image, index) => (
        <CarouselItem key={index} className="flex w-full basis-auto sm:basis-full md:basis-1/2">
          <div className="flex flex-1 border border-border rounded-lg bg-background shadow-sm p-2">
            <img src={image?.url} alt={image?.title} className="flex flex-1 object-cover" />
          </div>
        </CarouselItem>
      )),
    [images]
  )

  useEffect(() => {
    if (!mainApi || !thumbnailApi) return

    const handleTopSelect = () => {
      const selected = mainApi.selectedScrollSnap()
      setCurrent(selected)
      thumbnailApi.scrollTo(selected)
    }

    const handleBottomSelect = () => {
      const selected = thumbnailApi.selectedScrollSnap()
      setCurrent(selected)
      mainApi.scrollTo(selected)
    }

    const handleDialogSelect = () => {
      const selected = dialogApi?.selectedScrollSnap()

      if (!selected) return

      setCurrent(selected)

      dialogApi?.scrollTo(selected)
    }

    mainApi.on('select', handleTopSelect)
    thumbnailApi.on('select', handleBottomSelect)
    dialogApi?.on('select', handleDialogSelect)

    return () => {
      mainApi.off('select', handleTopSelect)
      thumbnailApi.off('select', handleBottomSelect)
      dialogApi?.off('select', handleDialogSelect)
    }
  }, [mainApi, thumbnailApi, dialogApi])

  return (
    <div>
      <Carousel setApi={setMainApi}>
        <CarouselContent>{mainImage}</CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>
      <Carousel setApi={setThumbnailApi}>
        <CarouselContent>{thumbnailImages}</CarouselContent>
      </Carousel>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-full w-dvw h-dvh">
          <DialogTitle>
            <h2 className="text-2xl font-bold">{images[current].title}</h2>
          </DialogTitle>
          <Carousel setApi={setDialogApi}>
            <CarouselContent>{dialogImages}</CarouselContent>
          </Carousel>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Gallery
