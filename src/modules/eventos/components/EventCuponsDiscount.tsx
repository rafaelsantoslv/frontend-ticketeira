import { TabsContent } from "@/components/ui/tabs";
import { EventCardCreateCupon } from "./EventCardCreateCupon";
import { EventCardCuponList } from "./EventCardCuponList";

export function EventCuponsDiscout({ coupons, handleCreateCoupon, handleDeleteCoupon }) {
    return (
        <TabsContent value="cupons">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Cupons de Desconto</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <EventCardCreateCupon handleCreateCoupon={handleCreateCoupon} />
                    <EventCardCuponList coupons={coupons} handleDeleteCoupon={handleDeleteCoupon} />

                </div>
            </div>
        </TabsContent>
    )
}