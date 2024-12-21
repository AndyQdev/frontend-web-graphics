import {  BarChart, Menu } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import Navigation from './navigation'
import { useHeader } from '@/hooks/useHeader'
import { DialogTitle } from '@radix-ui/react-dialog'
import { ModeToggle } from '@/components/mode-toggle'
import { CardTitle } from '@/components/ui/card'

const Header = () => {
  const { breadcrumb } = useHeader()
  // const { signOut } = useAuth()

  return (
    <header className="flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6 bg-background border-secondary dark:bg-dark-bg-primary">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5 " />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex bg-light-secondary dark:bg-dark-bg-primary flex-col px-0 py-0 gap-0">
          <DialogTitle></DialogTitle>
          <SheetHeader className='pt-3 pl-3'>
            <div className="flex items-center gap-3 px-4 border-b py-3 h-14">
              <BarChart className='text-light-primary'/>
              <CardTitle >GRAPHICS</CardTitle>
            </div>
          </SheetHeader>
          <Navigation />
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumb.map((item, index) => (
              item.path
                ? (<div className='flex items-center sm:gap-2' key={index}>
                  <BreadcrumbItem>

                    <Link to={item.path}>{item.label}</Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </div>)
                : <BreadcrumbItem key={index}>
                    <BreadcrumbPage className='text-light-primary font-semibold'>{item.label}</BreadcrumbPage>
                  </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ModeToggle />
      {/* <Notificaciones></Notificaciones> */}
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => { navigate(PrivateRoutes.PROFILE) }} className='cursor-pointer'>
            <User className="mr-2 h-4 w-4" />
            Perfil
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => { navigate(PrivateRoutes.SETTINGS) }} className='cursor-pointer'>
            <Settings className="mr-2 h-4 w-4" />
            Configuración
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='cursor-pointer'>
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </header>
  )
}

export default Header
