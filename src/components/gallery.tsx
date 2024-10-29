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


interface GalleryProps {
  images: {
    url: string
    title: string
  }[]
}

const Gallery = ({ images }: GalleryProps) => {
  const [mainApi, setMainApi] = useState<CarouselApi>()
  const [thumbnailApi, setThumbnailApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const mainImage = useMemo(
    () =>
      images.map((image, index) => (
        <CarouselItem key={index} className="relative aspect-square w-full">
          <div className="border border-border rounded-lg bg-background shadow-sm p-2">
            <img src={image?.url} alt={image?.title} className="w-full h-[32rem] object-contain" />
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
            alt={`Carousel Thumbnail Image ${index + 1}`}
          />
        </CarouselItem>
      )),
    [images, current]
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

    mainApi.on('select', handleTopSelect)
    thumbnailApi.on('select', handleBottomSelect)

    return () => {
      mainApi.off('select', handleTopSelect)
      thumbnailApi.off('select', handleBottomSelect)
    }
  }, [mainApi, thumbnailApi])

  const handleClick = (index: number) => {
    if (!mainApi || !thumbnailApi) return

    thumbnailApi.scrollTo(index)
    mainApi.scrollTo(index)
    setCurrent(index)
  }

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
    </div>
  )
}

export default Gallery
