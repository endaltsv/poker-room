import { Tabs, TabsContent } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Users } from 'lucide-react';
import { Button } from '../ui/button';
import { SocketContext } from '@/context/SocketContext';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocketEvents } from '@/hooks/useSocketEvents';

export default function HeadsUpTournaments() {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>('Не зарегестрирован');

  useSocketEvents({
    room_created: () => {
      setStatus('Ожидание второго игрока');
    },
    start_game: (roomId: string) => {
      navigate(`/game/${roomId}`);
    },
  });

  const handleRegister = () => {
    if (socket) {
      socket.emit('register');
      setStatus('Зарегестрирован');
    }
  };

  const tournaments = [
    {
      id: 1,
      type: 'Холдем',
      buyIn: 1,
      prize: 100,
      participants: 0,
    },
    {
      id: 2,
      type: 'Омаха',
      buyIn: 2,
      prize: 200,
      participants: 0,
    },
    {
      id: 3,
      type: 'Холдем',
      buyIn: 5,
      prize: 500,
      participants: 0,
    },
    {
      id: 4,
      type: 'Омаха',
      buyIn: 10,
      prize: 1000,
      participants: 0,
    },
    {
      id: 5,
      type: 'Холдем',
      buyIn: 25,
      prize: 2500,
      participants: 0,
    },
  ];

  return (
    <section>
      <h2 className="w-full mx-auto text-3xl font-bold mb-8 text-center">
        Текущие турниры. {status}
      </h2>
      <Tabs defaultValue="headsup" className="w-full">
        <TabsContent value="headsup">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {tournaments.map((tournament) => (
              <Card
                key={tournament.id}
                className="overflow-hidden transition-all hover:shadow-lg"
              >
                <CardHeader className="bg-muted pb-2">
                  <CardTitle className="flex items-center justify-between">
                    <span>{tournament.type}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Приз до</p>
                      <p className="text-2xl font-bold">${tournament.prize}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">
                        ${tournament.buyIn}
                      </p>
                      <p className="text-sm text-muted-foreground">Бай-ин</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-muted-foreground">
                    <Users className="w-4 h-4 mr-2 text-primary" />
                    <span>{tournament.participants}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleRegister}>
                    Зарегистрироваться
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
