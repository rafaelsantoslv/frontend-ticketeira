import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatCurrency";
import { Trash2 } from "lucide-react";

export function EventCardCuponList({ coupons, handleDeleteCoupon }) {
    return (
        <Card className="p-6">
            <CardHeader className="px-0 pt-0">
                <CardTitle className="text-lg">Cupons Ativos</CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
                {coupons.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        Nenhum cupom cadastrado. Crie um novo cupom ao lado.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {coupons.map((coupon) => (
                            <div key={coupon.id} className="flex items-center justify-between p-3 border rounded-md">
                                <div>
                                    <div className="flex items-center">
                                        <span className="font-medium">{coupon.code}</span>
                                        <span
                                            className={`ml-2 text-xs px-2 py-0.5 rounded-full ${coupon.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            {coupon.active ? "Ativo" : "Inativo"}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {coupon.discountType === "percentage"
                                            ? `${coupon.discountValue}% de desconto`
                                            : `${formatCurrency(coupon.discountValue)} de desconto`}
                                        {coupon.unlimited
                                            ? " • Uso ilimitado"
                                            : ` • ${coupon.usageCount}/${coupon.usageLimit} usos`}
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => handleDeleteCoupon(coupon.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}