import {
  LuMonitorDot,
  LuPackage,
  LuShoppingBag,
  LuSquareUserRound,
  LuTicket,
  LuSettings,
  LuWarehouse,
  LuMessageSquare,
  LuCreditCard,
  LuShield,
  LuBike ,
  LuNewspaper,
} from 'react-icons/lu';
import { IoMdContacts } from "react-icons/io";
import { AiOutlineInteraction } from "react-icons/ai";
import { href } from 'react-router';

export const menuItemsData = [
  // --- Main ---
  {
    key: 'Dashboard',
    label: 'Dashboard',
    icon: LuMonitorDot,
    href: '/',
  },

  // --- Catalog Section ---
  {
    key: 'Catalog',
    label: 'Catalog',
    isTitle: true,
  },
  {
    key: 'Products',
    label: 'Products',
    icon: LuPackage,
    children: [
      {
        key: 'AllProducts',
        label: 'All Products',
        href: '/product-list',
      },
      {
        key: 'AddNewProduct',
        label: 'Add New',
        href: '/product-create',
      },
      // {
      //   key: 'Categories',
      //   label: 'Categories',
      //   href: '/products/categories',
      // },
      // {
      //   key: 'Tags',
      //   label: 'Tags',
      //   href: '/products/tags',
      // },
    ],
  },
  {
    key: 'Inventory',
    label: 'Inventory',
    icon: LuWarehouse,
    href: '/inventory',
  },
 

  // --- Sales Section ---
  {
    key: 'Sales',
    label: 'Sales',
    isTitle: true,
  },
  {
    key: 'Orders',
    label: 'Orders',
    icon: LuShoppingBag,
    href: '/orders',
  },
  {
    key: 'Transactions',
    label: 'Transactions',
    icon: LuCreditCard,
    href: '/transactions',
  },
  {
    key: 'Test Ride Booking',
    label: 'Test Ride Booking',
    icon: LuBike ,
    href: '/test-ride',
  },

  // --- Content Section ---
  {
    key: 'Content',
    label: 'Content',
    isTitle: true,
  },
  {
    key: 'Blog',
    label: 'Blog',
    icon: LuNewspaper,
    children: [
      {
        key: 'AllBlogs',
        label: 'All Blogs',
        href: '/all-blog',
      },
      {
        key: 'AddNewPost',
        label: 'Add New Blog',
        href: '/add-blog',
      },
      // {
      //   key: 'EditBlog',
      //   label: 'Edit',
      //   href: '/edit-blog',
      // },
    ],
  },

  // --- User Management Section ---
  {
    key: 'Users',
    label: 'User Management',
    isTitle: true,
  },
  {
    key: 'Customers',
    label: 'Customers',
    icon: LuSquareUserRound,
    href: '/customers-list',
  },
  // {
  //   key: 'Administrators',
  //   label: 'Staff',
  //   icon: LuShield,
  //   href: '/admin-users',
  // },

  // --- Marketing Section ---
  {
    key: 'Marketing',
    label: 'Marketing',
    isTitle: true,
  },
  {
    key: 'Coupons',
    label: 'Coupons',
    icon: LuTicket,
    children:[
      {
        key: 'All-Coupons',
        label: 'AllCoupons',
        href: '/all-coupon'

      },
      {
        key: 'Add-Coupons',
        label: 'AddNewCoupons',
        href: '/add-coupon',

      }
    ]
  },

  // --- Enquiries ---
  {
    key: 'Enquiries',
    label: 'Enquiries',
    isTitle: true,
  },
  {
    key:'Intractions',
    label:'Interactions',
    icon:AiOutlineInteraction,
    children:[
       {
    key: 'contacts',
    label: 'contacts',
    
    href: '/contacts-list',
  },
  {
    key: 'dealership',
    label: 'dealership',
    
    href: '/dealership-list',
  },
  {
    key: 'career',
    label: 'career',
    
    href: '/careerform-list',
  },
  {
    key: 'leads',
    label: 'leads',
    
    href: '/leads',
  },
]
  },
 

  // --- Configuration ---
  // {
  //   key: 'Configuration',
  //   label: 'Configuration',
  //   isTitle: true,
  // },
  // {
  //   key: 'Settings',
  //   label: 'Store Settings',
  //   icon: LuSettings,
  //   children: [
  //     {
  //       key: 'GeneralSettings',
  //       label: 'General',
  //       href: '/settings/general',
  //     },
  //     {
  //       key: 'PaymentMethods',
  //       label: 'Payments',
  //       href: '/settings/payments',
  //     },
  //     {
  //       key: 'Shipping',
  //       label: 'Shipping',
  //       href: '/settings/shipping',
  //     },
  //     {
  //       key: 'Taxes',
  //       label: 'Taxes',
  //       href: '/settings/taxes',
  //     },
  //   ],
  // },
];
