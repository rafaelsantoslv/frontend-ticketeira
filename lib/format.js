export function formatCurrency(value) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
}

export function formatDate(date) {
    return new Intl.DateTimeFormat("pt-BR").format(new Date(date))
}

export function formatDateTime(date) {
    return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    }).format(new Date(date))
}

export function formatPercentage(value) {
    return new Intl.NumberFormat("pt-BR", {
        style: "percent",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(value / 100)
}
