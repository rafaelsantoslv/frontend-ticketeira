import { Calendar, MapPin } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'

type EventBannerProps = {
    name: string
    date: string
    location: string
    imageUrl: string
}

const EventBanner = ({ name, date, location, imageUrl }: EventBannerProps) => {
    return (
        <section className="mb-12 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
                <Image
                    src={imageUrl}
                    alt={name}
                    width={600}
                    height={400}
                    className="rounded-lg object-cover w-full h-[400px]"
                />
            </div>
            <div className="md:w-1/2 flex flex-col justify-between">
                <div>
                    <h1 className="text-4xl font-bold mb-4">{name}</h1>
                    <p className="text-xl mb-4 flex items-center">
                        <Calendar className="mr-2" /> {date}
                    </p>
                    <p className="text-xl mb-6 flex items-center">
                        <MapPin className="mr-2" /> {location}
                    </p>
                </div>
                <Button size="lg" className="w-full md:w-auto">
                    Comprar Ingresso
                </Button>
            </div>
        </section>
    )
}

export default EventBanner