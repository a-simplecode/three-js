import Link from 'next/link';

export default function Header() {
  return (
    <div className="header">
      <Link href="/">Home</Link> <Link href="/porsh">Porsh</Link>
    </div>
  );
}
