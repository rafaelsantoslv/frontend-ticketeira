import CouponForm from "@/components/CouponForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function EventCardCreateCupon({ handleCreateCoupon }) {
    return (
        <Card className="p-6">
            <CardHeader className="px-0 pt-0">
                <CardTitle className="text-lg">Criar Novo Cupom</CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
                <CouponForm onSubmit={handleCreateCoupon} />
            </CardContent>
        </Card>
    )
}