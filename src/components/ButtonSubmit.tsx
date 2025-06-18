import React from "react";

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function SubmitButton({ isLoading, children }: { isLoading: boolean; children: React.ReactNode }) {
    return (
        <Button type="submit" disabled={isLoading} className="w-full bg-[#400041] hover:bg-[#5a105b]">
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                </>
            ) : (
                children
            )}
        </Button>
    )
}