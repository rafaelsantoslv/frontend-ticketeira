import { TabsContent } from "@/components/ui/tabs";
import { EventCardCreateCortesia } from "./EventCardCreateCortesia";
import { EventCardCortesiaList } from "./EventCardCortesiaList";

export function EventCortesy({ event, handleCreateCourtesy, isSubmittingCourtesy, courtesies, handleResendCourtesy, handleDeleteCourtesy }) {
    return (
        <TabsContent value="cortesias">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Ingressos Cortesia</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <EventCardCreateCortesia event={event} handleCreateCourtesy={handleCreateCourtesy} isSubmittingCourtesy={isSubmittingCourtesy} />
                    <EventCardCortesiaList courtesies={courtesies} event={event} handleResendCourtesy={handleResendCourtesy} handleDeleteCourtesy={handleDeleteCourtesy} />
                </div>
            </div>
        </TabsContent>
    )
}