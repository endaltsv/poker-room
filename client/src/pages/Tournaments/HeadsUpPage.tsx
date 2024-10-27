import HeadsUpTournaments from '@/components/Tournaments/HeadsUpTournaments';
import RecentWinners from '@/components/Tournaments/RecentWinners';

export default function HeadsUpPage() {
  return (
    <div>
      <div>
        <HeadsUpTournaments />
      </div>
      <div className="mt-16">
        <RecentWinners />
      </div>
    </div>
  );
}
