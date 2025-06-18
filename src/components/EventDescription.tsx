import React from 'react'

type EventDescriptionProps = {
    description: string
    eventAbout: string
}

const EventDescription = ({
    description,
    eventAbout,
}: EventDescriptionProps) => {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Sobre o Evento</h2>
            <p className="mb-4">{description}</p>
            <h3 className="text-xl font-semibold mb-2">O que teremos:</h3>
            <ul className="list-disc list-inside mb-4">
                <p>{eventAbout}</p>
            </ul>
        </div>
    )
}

export default EventDescription