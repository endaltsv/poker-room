import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
export default function RecentWinners() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-8 text-center">
        Недавние победители
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card
            key={i}
            className="overflow-hidden transition-all hover:shadow-lg"
          >
            <CardHeader className="text-center pb-2">
              <Avatar className="w-20 h-20 mx-auto">
                <AvatarImage src={`/placeholder.svg?height=80&width=80`} />
                <AvatarFallback>W{i}</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent className="text-center pt-2">
              <h3 className="font-semibold text-lg">Игрок{i}</h3>
              <p className="text-muted-foreground">Выиграл $50,000</p>
              <Badge variant="outline" className="mt-2">
                Турнир по 5$
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
