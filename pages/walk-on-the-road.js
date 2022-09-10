import dynamic from 'next/dynamic';

const WalkOnTheRoad2 = dynamic(() => import('../components/WalkOnTheRoad2'), {
  ssr: false,
});
export default function Walk() {
  return <WalkOnTheRoad2 />;
}
