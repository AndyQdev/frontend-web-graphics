import { Outlet } from 'react-router-dom'

import Header from './components/header'
import MainPage from './components/main-page'
import Aside from './components/aside'
import { useSidebar } from '@/context/siderbarContext'
import { Toaster } from '@/components/ui/sonner'

const Layout = () => {
  const { isContract } = useSidebar()
  return (
    <div className={`${isContract ? 'md:grid-cols-[84px_1fr] lg:grid-cols-[84px_1fr] xl:grid-cols-[84px_1fr]' : 'md:grid-cols-[286px_1fr] lg:grid-cols-[300px_1fr] xl:grid-cols-[320px_1fr]'} flex flex-col min-h-[100dvh] w-full bg-light-bg-primary dark:bg-dark-bg-primary overflow-hidden relative md:grid`}>
      <Aside />
      <div className='max-h-[100dvh overflow-hidden]'>
        <Header />
        <div className='flex flex-row w-full h-[calc(100dvh-56px)] lg:h-[calc(100dvh-60px)] relative overflow-hidden bg-light-bg-secondary dark:bg-dark-bg-primary/100'>
          {/* <Aside /> */}
          <MainPage>
            <Outlet />
          </MainPage>
          <Toaster richColors />
        </div>
      </div>
    </div>
  )
}

export default Layout
