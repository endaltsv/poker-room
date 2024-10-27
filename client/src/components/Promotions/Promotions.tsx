import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { ChevronRight, DollarSign, Trophy, CalendarDays } from 'lucide-react';

export default function Promotions() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-8 text-center">Новости и акции</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="transition-all hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              Новый турнир с гарантией $1,000,000
            </CardTitle>
            <CardDescription className="flex items-center mt-1">
              <CalendarDays className="w-4 h-4 mr-1" />
              Начало 1 июня
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Не пропустите наш новый мега-турнир с рекордным призовым фондом!
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full group">
              Подробнее
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardFooter>
        </Card>
        <Card className="transition-all hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Бонус на первый депозит 200%
            </CardTitle>
            <CardDescription className="flex items-center mt-1">
              <CalendarDays className="w-4 h-4 mr-1" />
              До конца месяца
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Удвойте свой первый депозит и получите дополнительные билеты на
              турниры!
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full group">
              Подробнее
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
