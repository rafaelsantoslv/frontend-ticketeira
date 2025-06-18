export type Event = {
    id: string
    title: string
    status: "ativo" | "inativo" | "encerrado"
    date: string
    time: string
    location: string
    address: string
    category: string
    classification: string
    about: string
    imageUrl: string

    sectors: Sector[]
    coupons: Coupon[]
    courtesies: Courtesy[]
    sales: Sale[]
    checkins: Checkin[]
    metrics: EventMetrics
}

export type Sector = {
    id: string
    name: string
    capacitu: number
    batches: Batch[]
}

export type Batch = {
    id: string
    name: string
    price: number
    quantity: number
    active: boolean
    sold: number
}

export type Coupon = {
    id: string
    code: string
    discountPercentage: number
    active: boolean
}

export type Courtesy = {
    id: string
    name: string
    email: string
    sent: boolean
}

export type Sale = {
    id: string
    name: string
    email: string
    paymentMethod: "CREDIT_CARD" | "PIX" | "BOLETO"
    amount: number
    date: string
    sectorName: string
    batchName: string
    isCourtesy: boolean
}

export type Checkin = {
    id: string
    ticketCode: string
    name: string
    sector: string
    batch: string
    validated: boolean
    price: number
    date: string
}

export type EventMetrics = {
    totalSales: number
    totalTickets: number
    averageTicket: number
    totalCheckins: number
    totalValue: number

    payments: {
        creditCard: number
        pix: number
        boleto: number
        total: number
    }

    checkinStatus: {
        total: number
        validated: number
        pending: number
        cancelled: number
    }


}

