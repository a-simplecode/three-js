import dynamic from 'next/dynamic';

const WalkOnTheRoad = dynamic(() => import('../components/WalkOnTheRoad'), {
  ssr: false,
});
export default function Walk() {
  return <WalkOnTheRoad />;
}
