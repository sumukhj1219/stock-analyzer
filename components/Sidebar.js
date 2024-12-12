import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  const items = [
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Trading view',
      href: '/trading-view'
    },
    {
      label: 'Settings ⚙️',
      href: '/settings',
    },
    
  ];

  return (
    <div className="flex h-screen">
      <div className="bg-secondary w-52 p-4 shadow-lg overflow-y-auto flex flex-col justify-between">
        {/* Top Section */}
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary flex items-center justify-center">Workspace 🏢</h1>
            <Separator orientation="horizontal" className="mt-3" />
          </div>
          <nav>
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    className=" px-4 py-2 text-lg font-extrabold text-primary hover:bg-yellow-200 border-r-8 border-b-8 border-2 border-primary hover:text-primary flex items-center justify-center"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div >
        <Link
                    href={'/'}
                    aria-label={'logout'}
                    className="block px-4 py-2 text-lg font-extrabold text-primary bg-red-400 hover:bg-red-700 border-r-8 border-b-8 border-2 border-primary hover:text-primary"
                  >
                    Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
