import { Event } from "../types"

export const mockEvents: Event[] = [
    {
        id: "evt-1",
        title: "Feira de Tecnologia 2025",
        status: "ativo",
        date: "2025-09-12",
        time: "18:00",
        location: "Expo Center SP",
        address: "Av. das Nações, 3000 - São Paulo, SP",
        category: "Tecnologia",
        classification: "Livre",
        about: "Maior evento de tecnologia do Brasil, com palestras, workshops e networking.",
        imageUrl: "/images/tech-event.jpg",

        sectors: [
            {
                id: "sec-1",
                name: "Pista",
                capacity: 500,
                batches: [
                    { id: "bat-1", name: "Lote 1", price: 40, quantity: 100, sold: 80, active: true },
                    { id: "bat-2", name: "Lote 2", price: 60, quantity: 50, sold: 10, active: false },
                ]
            },
            {
                id: "sec-2",
                name: "Camarote",
                capacity: 200,
                batches: [
                    { id: "bat-3", name: "Lote 1", price: 120, quantity: 30, sold: 30, active: false }
                ]
            }
        ],

        coupons: [
            { id: "cp-1", code: "TECH20", discountPercentage: 20, active: true }
        ],

        courtesies: [
            { id: "crt-1", name: "Fulano VIP", email: "vip@tech.com", sent: true }
        ],

        sales: [
            { id: "s-1", name: "João Silva", email: "joao@gmail.com", paymentMethod: "PIX", amount: 40, date: "2025-08-01T14:00:00Z", sectorName: "Pista", batchName: "Lote 1", isCourtesy: false },
            { id: "s-2", name: "Maria Souza", email: "maria@hotmail.com", paymentMethod: "CREDIT_CARD", amount: 60, date: "2025-08-02T16:00:00Z", sectorName: "Pista", batchName: "Lote 2", isCourtesy: false },
        ],

        checkins: [
            { id: "ck-1", ticketCode: "ABC123", name: "João Silva", sector: "Pista", batch: "Lote 1", validated: true, price: 40, date: "2025-09-12T18:30:00Z" },
            { id: "ck-2", ticketCode: "XYZ789", name: "Maria Souza", sector: "Pista", batch: "Lote 2", validated: false, price: 60, date: "" },
        ],

        metrics: {
            totalSales: 2,
            totalTickets: 3,
            averageTicket: 50,
            totalCheckins: 1,
            totalValue: 100,

            payments: {
                creditCard: 60,
                pix: 40,
                boleto: 0,
                total: 100
            },

            checkinStatus: {
                total: 2,
                validated: 1,
                pending: 1,
                cancelled: 0
            }
        },

    }
]
