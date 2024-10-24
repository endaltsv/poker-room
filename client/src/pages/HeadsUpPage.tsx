import HeadsUpTournaments from '@/components/HeadsUpTournaments';
import RecentWinners from '@/components/RecentWinners';

export default function HeadsUpPage() {
  return (
    <>
      <div>
        <HeadsUpTournaments />
      </div>
      <div className="mt-16">
        <RecentWinners />
      </div>
    </>
  );
}
