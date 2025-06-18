import { CreditCard } from 'lucide-react'
import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

type CardPaymentsMethodsProps = {
    ageRestriction: string
    paymentMethods: string[]
}

const CardPaymentsMethods = ({
    ageRestriction,
    paymentMethods,
}: CardPaymentsMethodsProps) => {
    return (
        <Card>
            <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Informações</h3>
                <Badge variant="secondary" className="mb-4 text-lg">
                    {ageRestriction}
                </Badge>
                <h4 className="font-semibold mb-2">Formas de Pagamento:</h4>
                <div className="flex flex-wrap gap-2">
                    {paymentMethods.map((method) => (
                        <Badge key={method} variant="outline" className="flex items-center">
                            <CreditCard className="mr-1 h-4 w-4" />
                            {method}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default CardPaymentsMethods