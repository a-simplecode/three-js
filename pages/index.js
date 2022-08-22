import dynamic from 'next/dynamic';

const One = dynamic(() => import('../components/One'), { ssr: false });
const Two = dynamic(() => import('../components/Two'), { ssr: false });
const DarkTunnel = dynamic(() => import('../components/DarkTunnel'), {
  ssr: false,
});
export default function Home() {
  return <DarkTunnel />;
}
