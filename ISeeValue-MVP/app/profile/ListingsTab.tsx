import { Card, CardContent } from "@/components/ui/card"

export default function ListingsTab() {
  const marketplaceOffers = [
    { id: 1, title: 'Solar Panel Installation Services', status: 'Active' },
    { id: 2, title: 'Energy Efficiency Consulting', status: 'Pending' },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Marketplace Offers</h2>
      {marketplaceOffers.map(offer => (
        <Card key={offer.id}>
          <CardContent className="flex items-center justify-between p-4">
            <span>{offer.title}</span>
            <span className={`px-2 py-1 rounded-full text-sm ${
              offer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {offer.status}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

