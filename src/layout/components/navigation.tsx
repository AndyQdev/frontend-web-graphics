import { Link, useLocation, useParams } from 'react-router-dom'
import { type MenuHeaderRoute, MenuSideBar } from '@/utils/sidebar.utils'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@components/ui/collapsible'
import { ChevronRightIcon,  SettingsIcon } from 'lucide-react'
import { useSidebar } from '@/context/siderbarContext'
import { useEffect } from 'react'
import { PrivateRoutes } from '@/models/routes.model'
import { useAuthorization } from '@/hooks/useAuthorization'
import { useAuth } from '@/hooks'
import { authStatus } from '@/utils'
import Loading from '@/components/shared/loading'

function Navigation() {
  const {
    isContract, menuActive, selectedMenu, toggleContract, handleActivateMenu, handleSelectedMenu
  } = useSidebar()
  const { verifyPermission } = useAuthorization()
  const location = useLocation()
  const { id } = useParams()
  const { status } = useAuth()

  let subscribe = true
  useEffect(() => {
    if (subscribe) {
      let currentPathToSelectMenu = location.pathname
      if (currentPathToSelectMenu.includes('crear')) {
        currentPathToSelectMenu = currentPathToSelectMenu.split('/crear')[0]
      }
      if (id) {
        currentPathToSelectMenu = currentPathToSelectMenu.split(`/${id}`)[0]
      }
      handleSelectedMenu && handleSelectedMenu(currentPathToSelectMenu)
    }
    return () => {
      subscribe = false
    }
  }, [location.pathname])
  return (
    <nav className="flex h-full flex-col w-full justify-between overflow-hidden">
      <section className='flex flex-col w-full gap-1 items-start p-4 overflow-y-auto relative overflow-x-hidden'>
        {/* <Link to={PrivateRoutes.DASHBOARD} className={`${selectedMenu === PrivateRoutes.DASHBOARD ? 'text-light-text-primary dark:text-dark-text-primary hover:bg-light-border dark:bg-dark-border font-semibold' : 'text-light-text-secondary dark:text-dark-text-secondary'} h-10 flex items-center gap-3 rounded-md px-4 py-2 transition-all w-full hover:bg-light-border hover:dark:bg-dark-border text-base font-normal`}>
          <HomeIcon width={22} height={22} />
          <span className={isContract ? 'hidden' : ''}>Dashboard</span>
        </Link> */}
        {status === authStatus.authenticated
          ? MenuSideBar.map((item: MenuHeaderRoute, index) => {
            if (item.children && verifyPermission()) {
              return (
                <Collapsible key={index} open={menuActive[item.label]} className='w-full'>
                  <CollapsibleTrigger
                    className='w-full group'
                    onClick={() => {
                      handleActivateMenu(item.label)
                      isContract && toggleContract()
                    }}
                    title={item.label}
                  >
                    <div
                      className={`${selectedMenu.includes(item.path!)
                        ? 'text-light-secondary  dark:text-dark-text-primary text-primary font-semibold bg-light-primary dark:hover:bg-light-primary/90'
                        : 'text-light-text-secondary dark:text-dark-text-secondary'}
                      ${isContract && selectedMenu.includes(item.path!) ? 'hover:bg-light-primary/90 dark:bg-dark-border' : ''}
                      h-10 flex items-center justify-between gap-3 rounded-md pl-4 pr-2 py-2 transition-all w-full ${selectedMenu.includes(item.path!) ? 'hover:bg-light-primary/90' : 'hover:bg-light-primary/ '} hover:dark:bg-dark-border text-base font-normal`}
                    >
                      <div className='flex items-center gap-3 w-full overflow-hidden [&>svg]:shrink-0'>
                        {item.icon}
                        <span className={`${isContract ? 'hidden' : ''} overflow-hidden text-ellipsis whitespace-nowrap`}>{item.label}</span>
                      </div>
                      <ChevronRightIcon className={`${isContract ? 'hidden' : ''} group-aria-expanded:rotate-90 transition-transform shrink-0`} />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="flex flex-col pl-9 relative w-full">
                      {item.children.map((child, index) => {
                        if (verifyPermission()) {
                          return (
                            <Link
                              key={index}
                              to={child.path!}
                              className={`${selectedMenu === child.path ? 'dark:bg-dark-border text-light-primary dark:text-dark-text-primary font-semibold' : 'text-light-text-secondary dark:text-dark-text-secondary'} h-10 flex items-center gap-3 rounded-lg px-3 py-2 mt-1 transition-all hover:bg-light-primary/5 hover:dark:bg-dark-border text-base font-normal w-full`}
                            >
                              {child.icon}
                              <span className={`${isContract ? 'hidden' : ''} overflow-hidden text-ellipsis whitespace-nowrap`}>{child.label}</span>
                            </Link>
                          )
                        } else {
                          return null
                        }
                      })}
                      <hr className={`absolute left-6 h-full border-r border-dashed ${selectedMenu.includes(item.path!) ? 'border-light-primary' : 'border-dark-text-secondary'}`} />
                    </div>
                  </CollapsibleContent>
                </Collapsible>)
            } else {
              if (verifyPermission()) {
                return (
                  <Link
                    key={index}
                    to={item.path!}
                    className={`${selectedMenu === PrivateRoutes.DASHBOARD ? 'text-light-text-primary dark:text-dark-text-primary hover:bg-light-border dark:bg-dark-border font-semibold' : 'text-light-text-secondary dark:text-dark-text-secondary'} h-10 flex items-center gap-3 rounded-md px-4 py-2 mb-1 transition-all w-full hover:bg-light-border hover:dark:bg-dark-border text-base font-normal`}
                  >
                    {item.icon}
                    <span className={isContract ? 'hidden' : ''}>{item.label}</span>
                  </Link>)
              } else {
                return null
              }
            }
          }
          )
          : <div className="grid place-content-center place-items-center w-full py-2"><Loading /></div>}
      </section>
      <section className='border-t p-4'>
        <Link
          to={PrivateRoutes.SETTINGS}
          className={`${selectedMenu === PrivateRoutes.SETTINGS ? 'text-light-bg-primary bg-light-primary  dark:text-primary hover:bg-border dark:bg-dark-border font-semibold' : 'text-black dark:text-secondary'} h-10 text-light-bg-primary bg-light-primary hover:bg-light-primary/90 dark:hover:bg-light-primary/90 flex items-center gap-3 rounded-md px-4 py-2 transition-all w-full hover:bg-secondary hover:dark:bg-dark-border text-base font-normal`}
        >
          <SettingsIcon width={22} height={22} />
          <span className={isContract ? 'hidden' : ''}>Configuración</span>
        </Link>
      </section>
    </nav>
  )
}

export default Navigation
