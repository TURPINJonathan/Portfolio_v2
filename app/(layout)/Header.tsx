import Link from 'next/link';

export default function HeaderLayout() {
  return (
    <header>
      <Link href="/projects/list">Projects List</Link>
    </header>
  );
}
