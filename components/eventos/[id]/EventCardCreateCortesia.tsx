import CourtesyForm from "@/components/CourtesyForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function EventCardCreateCortesia({ event, handleCreateCourtesy, isSubmittingCourtesy }) {
    return (
        <Card className="p-6">
            <CardHeader className="px-0 pt-0">
                <CardTitle className="text-lg">Gerar Nova Cortesia</CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
                <CourtesyForm
                    onSubmit={handleCreateCourtesy}
                    sectors={event.sectors}
                    isSubmitting={isSubmittingCourtesy}
                />
            </CardContent>
        </Card>
    )
}