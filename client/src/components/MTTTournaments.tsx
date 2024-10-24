import { Users } from 'lucide-react';
import { Button } from './ui/button';

export default function MTTTournaments() {
  const tournaments = [
    {
      id: 1,
      date: '19 ноя 23:00',
      name: 'Скрытая Угроза',
      format: 'БЛ 6 Макс',
      buyIn: '195263 р.',
      prize: '195746 р.',
      participants: 40,
      status: 'Регистрация',
    },
    {
      id: 2,
      date: '17 ноя 14:00',
      name: 'Финальный Сателлит',
      format: 'БЛ 6 Макс',
      buyIn: '559633 р.',
      prize: '918530 р.',
      participants: 44,
      status: 'Регистрация',
    },
    {
      id: 3,
      date: '2 ноя 13:00',
      name: 'Запретный Город',
      format: 'БЛ Холдем',
      buyIn: '213673 р.',
      prize: '106374 р.',
      participants: 49,
      status: 'Закрыт',
    },
    {
      id: 4,
      date: '15 ноя 13:00',
      name: 'Поясной Окунь',
      format: 'БЛ 6 Макс',
      buyIn: '734415 р.',
      prize: '194718 р.',
      participants: 19,
      status: 'Закрыт',
    },
    {
      id: 5,
      date: '19 ноя 21:00',
      name: 'Омаха Мультитурбо',
      format: 'БЛ 6 Макс',
      buyIn: '184386 р.',
      prize: '199710 р.',
      participants: 2,
      status: 'Объявлен',
    },
    {
      id: 6,
      date: '25 ноя 13:00',
      name: 'Китайский Дракон',
      format: 'БЛ 14+ Ананас',
      buyIn: '242580 р.',
      prize: '706370 р.',
      participants: 16,
      status: 'Регистрация',
    },
    {
      id: 7,
      date: '30 ноя 23:00',
      name: 'BPT - Main Event',
      format: 'БЛ 6 Макс',
      buyIn: '20790 р.',
      prize: '125380 р.',
      participants: 14,
      status: 'Регистрация',
    },
    {
      id: 8,
      date: '13 ноя 22:00',
      name: 'Озёрная Щучка',
      format: 'БЛ Холдем',
      buyIn: '901071 р.',
      prize: '208194 р.',
      participants: 39,
      status: 'Объявлен',
    },
    {
      id: 9,
      date: '22 ноя 12:00',
      name: 'Запретный Город',
      format: 'БЛ 14+ Ананас',
      buyIn: '30585 р.',
      prize: '818242 р.',
      participants: 38,
      status: 'Объявлен',
    },
    {
      id: 10,
      date: '21 ноя 15:00',
      name: 'BPT - HighRoller Event',
      format: 'БЛ 6 Макс',
      buyIn: '300996 р.',
      prize: '649599 р.',
      participants: 24,
      status: 'Закрыт',
    },
    {
      id: 11,
      date: '30 ноя 17:00',
      name: 'BPT - Main Event',
      format: 'БЛ Холдем',
      buyIn: '153800 р.',
      prize: '929300 р.',
      participants: 48,
      status: 'Регистрация',
    },
    {
      id: 12,
      date: '24 ноя 14:00',
      name: 'Поясной Окунь',
      format: 'БЛ 6 Макс',
      buyIn: '836451 р.',
      prize: '451323 р.',
      participants: 9,
      status: 'Регистрация',
    },
    {
      id: 13,
      date: '18 ноя 21:00',
      name: 'Омаха Мультитурбо',
      format: 'ПЛ Омаха',
      buyIn: '104326 р.',
      prize: '489751 р.',
      participants: 12,
      status: 'Объявлен',
    },
    {
      id: 14,
      date: '26 ноя 15:00',
      name: 'Скрытая Угроза',
      format: 'БЛ 6 Макс',
      buyIn: '245893 р.',
      prize: '875193 р.',
      participants: 35,
      status: 'Закрыт',
    },
    {
      id: 15,
      date: '12 ноя 16:00',
      name: 'Китайский Дракон',
      format: 'БЛ 14+ Ананас',
      buyIn: '164910 р.',
      prize: '721378 р.',
      participants: 28,
      status: 'Объявлен',
    },
    {
      id: 16,
      date: '29 ноя 13:00',
      name: 'Финальный Сателлит',
      format: 'БЛ Холдем',
      buyIn: '297860 р.',
      prize: '345890 р.',
      participants: 19,
      status: 'Регистрация',
    },
    {
      id: 17,
      date: '27 ноя 19:00',
      name: 'Атака Клонов',
      format: 'БЛ Холдем',
      buyIn: '784910 р.',
      prize: '984561 р.',
      participants: 41,
      status: 'Объявлен',
    },
    {
      id: 18,
      date: '15 ноя 18:00',
      name: 'Запретный Город',
      format: 'ПЛ Омаха',
      buyIn: '324670 р.',
      prize: '564709 р.',
      participants: 29,
      status: 'Закрыт',
    },
    {
      id: 19,
      date: '22 ноя 14:00',
      name: 'Phoenix PT - Main Event',
      format: 'БЛ Холдем',
      buyIn: '576309 р.',
      prize: '786432 р.',
      participants: 36,
      status: 'Регистрация',
    },
    {
      id: 20,
      date: '21 ноя 11:00',
      name: 'Скрытая Угроза',
      format: 'БЛ 6 Макс',
      buyIn: '345678 р.',
      prize: '456789 р.',
      participants: 18,
      status: 'Регистрация',
    },
  ];

  const formatCurrency = (value: string) => {
    const numericValue = parseInt(value.replace(/\D/g, ''), 10);
    return new Intl.NumberFormat('ru-RU').format(numericValue) + ' р.';
  };

  return (
    <section className="p-4 overflow-x-auto">
      <table className="w-full table-auto text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Дата</th>
            <th className="p-2">Турнир</th>
            <th className="p-2 hidden sm:table-cell">Формат</th>
            <th className="p-2">Бай-ин</th>
            <th className="p-2">Приз</th>
            <th className="p-2">Участники</th>
            <th className="p-2 text-center">Статус</th>
          </tr>
        </thead>
        <tbody>
          {tournaments.map((tournament) => (
            <tr key={tournament.id} className="border-t">
              <td className="p-2">{tournament.date}</td>
              <td className="p-2">{tournament.name}</td>
              <td className="p-2 hidden sm:table-cell">{tournament.format}</td>
              <td className="p-2">{formatCurrency(tournament.buyIn)}</td>
              <td className="p-2">{formatCurrency(tournament.prize)}</td>
              <td className="p-2 flex items-center">
                <Users className="w-4 h-4 mr-2 text-primary" />
                {tournament.participants}
              </td>
              <td className="p-2 text-center">
                {tournament.status === 'Регистрация' ? (
                  <Button variant="ghost">
                    <span className="text-green-600">{tournament.status}</span>
                  </Button>
                ) : (
                  <Button variant="ghost">
                    <span className="text-gray-600">{tournament.status}</span>
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
