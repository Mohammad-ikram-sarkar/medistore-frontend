// export const adminRoutes = [
//     {
//         title : "admin blog",
//         items :[
//             {
//             title  : "Users",
//             url : "/dashboard/users"
//             },
//             {
//                 title : "Orders",
//                 url : "/dashboard/orders"
//             },
//             {
//                 title : "Categories",
//                 url : "/dashboard/categories"
//             }
//         ] 
//     }
// ]
export interface Route {
    title: string
  url: string
  items?: {
    title: string
    url: string
    isActive? :boolean
    
  }[]
}
// export type NavMainItem = {
//    title: string
//   url: string
//   items?: {
//     title: string
//     url: string
    
//   }[]
// }