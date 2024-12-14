import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { IndianRupee } from 'lucide-react';

const Sidebar = () => {
  const items = [
    {
      id:'1',
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      id:'2',
      label: 'Trading view',
      href: '/trading-view'
    },
    {
      id:'3',
      label: 'Custom Strategy',
      href:""
    }
  ];

  return (
    <div className="flex h-screen">
      <div className="bg-primary w-52 p-4 shadow-lg overflow-y-auto flex flex-col justify-between">
        <div>
          <div className="mb-6">
            <h1 className="text-xl font-bold text-secondary flex items-center justify-center"><IndianRupee className='text-amber-500' />GuardianStocks</h1>
            <Separator orientation="horizontal" className="mt-3" />
          </div>
          <nav>
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    className=" px-4 py-2 text-sm rounded-lg font-extrabold text-secondary hover:bg-yellow-200  hover:text-primary flex items-center"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className='flex items-center justify-center'>
        <Button variant={'destructive'} size={'lg'}>
          Logout
        </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
