"use client"

import { useState, useEffect } from "react"
import { Search, Menu, LogIn, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { mockEvents } from "@/lib/mock-data"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export function PublicHeader({ searchTerm = "", onSearchChange, showSearch = true }) {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm)
    const [searchResults, setSearchResults] = useState([])
    const [showResults, setShowResults] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setLocalSearchTerm(searchTerm)
    }, [searchTerm])

    useEffect(() => {
        if (localSearchTerm.trim().length >= 2) {
            const results = mockEvents
                .filter(
                    (event) =>
                        event.title.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
                        event.locationName?.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
                        event.category?.toLowerCase().includes(localSearchTerm.toLowerCase()),
                )
                .slice(0, 5)
            setSearchResults(results)
            setShowResults(true)
        } else {
            setSearchResults([])
            setShowResults(false)
        }
    }, [localSearchTerm])

    const handleSearchChange = (e) => {
        const value = e.target.value
        setLocalSearchTerm(value)
        if (onSearchChange) {
            onSearchChange(value)
        }
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        if (localSearchTerm.trim()) {
            router.push(`/eventos?search=${encodeURIComponent(localSearchTerm.trim())}`)
            setShowResults(false)
        }
    }

    const handleResultClick = () => {
        setShowResults(false)
    }

    const clearSearch = () => {
        setLocalSearchTerm("")
        if (onSearchChange) {
            onSearchChange("")
        }
        setShowResults(false)
    }

    const navigation = [
        { name: "Eventos", href: "/eventos" },
        { name: "Categorias", href: "/categorias" },
        { name: "Sobre", href: "/sobre" },
        { name: "Contato", href: "/contato" },
    ]

    return (
        <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg">U</span>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Unyx Ticket
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-600 hover:text-blue-600 transition-colors font-medium relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Search Bar - Desktop */}
                    {showSearch && (
                        <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
                            <form onSubmit={handleSearchSubmit} className="relative w-full">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    type="text"
                                    placeholder="Buscar eventos..."
                                    value={localSearchTerm}
                                    onChange={handleSearchChange}
                                    className="pl-10 pr-10 w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                                />
                                {localSearchTerm && (
                                    <button
                                        type="button"
                                        onClick={clearSearch}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </form>

                            {/* Quick Search Results */}
                            {showResults && searchResults.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 max-h-[400px] overflow-y-auto">
                                    <div className="p-2">
                                        <h3 className="text-sm font-medium text-gray-500 px-2 py-1">
                                            {searchResults.length} resultado{searchResults.length !== 1 ? "s" : ""} encontrado
                                            {searchResults.length !== 1 ? "s" : ""}
                                        </h3>
                                        <div className="space-y-2 mt-2">
                                            {searchResults.map((event) => (
                                                <Link
                                                    key={event.id}
                                                    href={`/eventos/${event.id}`}
                                                    className="block"
                                                    onClick={handleResultClick}
                                                >
                                                    <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                                            <img
                                                                src={event.coverImage || "/placeholder.svg?height=64&width=64"}
                                                                alt={event.title}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="font-medium text-sm line-clamp-1">{event.title}</h4>
                                                            <div className="flex items-center text-xs text-gray-500 mt-1">
                                                                <span className="line-clamp-1">
                                                                    {format(new Date(event.startDate), "dd MMM", { locale: ptBR })} • {event.locationName}
                                                                </span>
                                                            </div>
                                                            <div className="mt-1">
                                                                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                                                                    {event.category}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="mt-2 pt-2 border-t border-gray-100 text-center">
                                            <button
                                                onClick={handleSearchSubmit}
                                                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                            >
                                                Ver todos os resultados
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Button variant="ghost" className="text-gray-600 hover:text-blue-600" asChild>
                            <Link href="/login">
                                <LogIn className="h-4 w-4 mr-2" />
                                Entrar
                            </Link>
                        </Button>
                        <Button
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl"
                            asChild
                        >
                            <Link href="/register">Cadastrar</Link>
                        </Button>
                    </div>

                    {/* Mobile Actions */}
                    <div className="flex md:hidden items-center space-x-2">
                        {showSearch && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="text-gray-600"
                            >
                                <Search className="h-5 w-5" />
                            </Button>
                        )}

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-gray-600">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-80">
                                <div className="flex flex-col space-y-6 mt-6">
                                    <nav className="flex flex-col space-y-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors"
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </nav>

                                    <div className="border-t pt-6 space-y-4">
                                        <Button variant="outline" className="w-full justify-start" asChild>
                                            <Link href="/login">
                                                <LogIn className="h-4 w-4 mr-2" />
                                                Entrar
                                            </Link>
                                        </Button>
                                        <Button
                                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                                            asChild
                                        >
                                            <Link href="/register">Cadastrar</Link>
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>

                {/* Mobile Search */}
                {showSearch && isSearchOpen && (
                    <div className="md:hidden pb-4">
                        <form onSubmit={handleSearchSubmit} className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                type="text"
                                placeholder="Buscar eventos..."
                                value={localSearchTerm}
                                onChange={handleSearchChange}
                                className="pl-10 pr-10 w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                                autoFocus
                            />
                            {localSearchTerm && (
                                <button
                                    type="button"
                                    onClick={clearSearch}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </form>

                        {/* Mobile Quick Search Results */}
                        {showResults && searchResults.length > 0 && (
                            <div className="mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 max-h-[400px] overflow-y-auto">
                                <div className="p-2">
                                    <h3 className="text-sm font-medium text-gray-500 px-2 py-1">
                                        {searchResults.length} resultado{searchResults.length !== 1 ? "s" : ""} encontrado
                                        {searchResults.length !== 1 ? "s" : ""}
                                    </h3>
                                    <div className="space-y-2 mt-2">
                                        {searchResults.map((event) => (
                                            <Link key={event.id} href={`/eventos/${event.id}`} className="block" onClick={handleResultClick}>
                                                <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                                        <img
                                                            src={event.coverImage || "/placeholder.svg?height=64&width=64"}
                                                            alt={event.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-medium text-sm line-clamp-1">{event.title}</h4>
                                                        <div className="flex items-center text-xs text-gray-500 mt-1">
                                                            <span className="line-clamp-1">
                                                                {format(new Date(event.startDate), "dd MMM", { locale: ptBR })} • {event.locationName}
                                                            </span>
                                                        </div>
                                                        <div className="mt-1">
                                                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                                                                {event.category}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="mt-2 pt-2 border-t border-gray-100 text-center">
                                        <button
                                            onClick={handleSearchSubmit}
                                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            Ver todos os resultados
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    )
}
