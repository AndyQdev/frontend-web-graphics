import { PrivateRoutes } from '@/models/routes.model'
import { PERMISSION } from '@/modules/auth/utils/permissions.constants'
import { BarChart, HomeIcon,  PieChart, School,  Users, LibraryBig} from 'lucide-react'
import { createElement } from 'react'

export interface MenuHeaderRoute {
  path?: string
  label: string
  icon?: JSX.Element
  children?: MenuHeaderRoute[]
  permissions?: PERMISSION[]
}

export const MenuSideBar: MenuHeaderRoute[] = [
  {
    label: 'DASHBOARD',
    icon: createElement(HomeIcon, { width: 20, height: 20 }),
    path: PrivateRoutes.DASHBOARD,
    permissions: [PERMISSION.USER, PERMISSION.USER_SHOW, PERMISSION.ROLE, PERMISSION.ROLE_SHOW, PERMISSION.PERMISSION, PERMISSION.PERMISSION_SHOW],
    children: [
      {
        path: PrivateRoutes.INSCRITOS,
        label: 'Inscritos',
        icon: createElement(Users, { width: 20, height: 20 }),
        permissions: [PERMISSION.USER, PERMISSION.USER_SHOW]
      },
      {
        path: PrivateRoutes.COMPARACION,
        label: 'Comparaciones',
        icon: createElement(BarChart, { width: 20, height: 20 }),
        permissions: [PERMISSION.USER, PERMISSION.USER_SHOW]
      },
      // {
      //   path: PrivateRoutes.PORCENTAJE,
      //   label: 'Porcentajes',
      //   icon: createElement(PieChart, { width: 20, height: 20 }),
      //   permissions: [PERMISSION.ROLE, PERMISSION.ROLE_SHOW]
      // }
    ]
  },
  // {
  //   label: 'Facultades',
  //   icon: createElement(School, { width: 20, height: 20 }),
  //   path: PrivateRoutes.FACULTAD,
  //   permissions: [PERMISSION.PRODUCT, PERMISSION.PRODUCT_SHOW, PERMISSION.CATEGORY, PERMISSION.CATEGORY_SHOW],
  //   // children: [
  //   //   {
  //   //     path: PrivateRoutes.PRODUCT,
  //   //     label: 'Productos',
  //   //     icon: createElement(PackageIcon, { width: 20, height: 20 }),
  //   //     permissions: [PERMISSION.PRODUCT, PERMISSION.PRODUCT_SHOW]
  //   //   },
  //   //   {
  //   //     path: PrivateRoutes.CATEGORY,
  //   //     label: 'Categorías',
  //   //     icon: createElement(Tag, { width: 20, height: 20 }),
  //   //     permissions: [PERMISSION.CATEGORY, PERMISSION.CATEGORY_SHOW]
  //   //   },
  //   //   {
  //   //     path: PrivateRoutes.RESERVAS,
  //   //     label: 'Reservas',
  //   //     icon: createElement(CalendarClock, { width: 20, height: 20 }),
  //   //     permissions: [PERMISSION.CATEGORY, PERMISSION.CATEGORY_SHOW]
  //   //   }
  //   // ]
  // },
  // {
  //   label: 'Carreras',
  //   icon: createElement(LibraryBig, { width: 20, height: 20 }),
  //   path: PrivateRoutes.CARRERA,
  //   permissions: [PERMISSION.PURCHASE_ORDER, PERMISSION.PURCHASE_ORDER_SHOW],
  //   // children: [
  //   //   {
  //   //     path: PrivateRoutes.PURCHASE_ORDER,
  //   //     label: 'Ordenes',
  //   //     icon: createElement(ShoppingCart, { width: 20, height: 20 }),
  //   //     permissions: [PERMISSION.PURCHASE_ORDER, PERMISSION.PURCHASE_ORDER_SHOW]
  //   //   }
  //   // ]
  // },
  // {
  //   label: 'Administracion',
  //   icon: createElement(Building2Icon, { width: 20, height: 20 }),
  //   path: '/sucursales',
  //   permissions: [PERMISSION.BRANCH, PERMISSION.BRANCH_SHOW],
  //   children: [
  //     {
  //       path: PrivateRoutes.BRANCH,
  //       label: 'Sucursales',
  //       icon: createElement(BuildingIcon, { width: 20, height: 20 }),
  //       permissions: [PERMISSION.BRANCH, PERMISSION.BRANCH_SHOW]
  //     },
  //     {
  //       path: PrivateRoutes.SALES,
  //       label: 'Ventas',
  //       icon: createElement(DollarSign, { width: 20, height: 20 }),
  //       permissions: [PERMISSION.BRANCH, PERMISSION.BRANCH_SHOW]
  //     }
  //   ]
  // },
  // {
  //   label: 'Reportes y Análisis',
  //   icon: createElement(FileText, { width: 20, height: 20 }),
  //   path: '/reportes',
  //   permissions: [PERMISSION.REPORTS, PERMISSION.REPORT_SHOW],
  //   children: [
  //     {
  //       path: PrivateRoutes.SALES_REPORT,
  //       label: 'Reportes de Ventas',
  //       icon: createElement(FileText, { width: 20, height: 20 }),
  //       permissions: [PERMISSION.REPORTS, PERMISSION.REPORT_SHOW]
  //     }
  //   ]
  // }
]
