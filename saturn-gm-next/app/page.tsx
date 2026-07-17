import { HomeClient } from '@/components/HomeClient';

/**
 * Root page — delegates to the client component tree.
 * Kept as a server component so Next.js can apply metadata at the route level.
 */
export default function Page() {
  return <HomeClient />;
}
