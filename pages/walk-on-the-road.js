import dynamic from 'next/dynamic';

const WalkOnTheRoad = dynamic(() => import('../components/WalkOnTheRoad'), {
  ssr: false,
});
const WalkOnTheRoad2 = dynamic(() => import('../components/WalkOnTheRoad2'), {
  ssr: false,
});
export default function Walk() {
  return <WalkOnTheRoad2 />;
}
