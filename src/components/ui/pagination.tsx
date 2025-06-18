"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }: PaginationProps) {
  // Gerar array de páginas para exibição
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5 // Número máximo de botões de página para mostrar

    if (totalPages <= maxPagesToShow) {
      // Se o total de páginas for menor que o máximo, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Caso contrário, mostrar um subconjunto com a página atual no centro
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
      let endPage = startPage + maxPagesToShow - 1

      if (endPage > totalPages) {
        endPage = totalPages
        startPage = Math.max(1, endPage - maxPagesToShow + 1)
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }

      // Adicionar elipses se necessário
      if (startPage > 1) {
        pageNumbers.unshift(-1) // -1 representa "..."
        pageNumbers.unshift(1) // Sempre mostrar a primeira página
      }

      if (endPage < totalPages) {
        pageNumbers.push(-2) // -2 representa "..." no final
        pageNumbers.push(totalPages) // Sempre mostrar a última página
      }
    }

    return pageNumbers
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      <div className="text-sm text-muted-foreground">
        Mostrando {Math.min(itemsPerPage * (currentPage - 1) + 1, totalItems)} a{" "}
        {Math.min(itemsPerPage * currentPage, totalItems)} de {totalItems} eventos
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Página anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {pageNumbers.map((pageNumber, index) => {
          if (pageNumber === -1 || pageNumber === -2) {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2">
                ...
              </span>
            )
          }

          return (
            <Button
              key={pageNumber}
              variant={pageNumber === currentPage ? "default" : "outline"}
              size="icon"
              onClick={() => onPageChange(pageNumber)}
              className={`h-9 w-9 ${pageNumber === currentPage ? "bg-[#400041] hover:bg-[#5a105b]" : ""}`}
              aria-label={`Ir para página ${pageNumber}`}
              aria-current={pageNumber === currentPage ? "page" : undefined}
            >
              {pageNumber}
            </Button>
          )
        })}

        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Próxima página"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
