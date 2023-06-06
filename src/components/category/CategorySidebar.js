// import React, { useEffect, useState } from "react";
// import {
//   CDBSidebar,
//   CDBSidebarContent,
//   CDBSidebarHeader,
//   CDBSidebarMenu,
//   CDBSidebarMenuItem,
// } from "cdbreact";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import { toast } from "react-hot-toast";
// import TokenManager from "../../APIs/TokenManager";
// import { deleteCategory, getCategories } from "../../APIs/CategoryAPI";
// import { getRole } from "../../APIs/AuthAPI";

// const CategorySidebar = (props) => {
//     const isAdmin = getRole() === "ADMIN";
//   console.log(isAdmin);

//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     async function getAllCategories() {
//       const allCategories = await getCategories();
//       setCategories(allCategories);
//     }
//     getAllCategories();
//   }, []);

//   const handleCategorySelect = (categoryId) => {
//     if (categoryId) {
//       props.filterProducts(categoryId);
//     } else {
//       props.filterProducts(null);
//     }
//   };

//   const handleDeleteCategory = (categoryId) => {
//     if (window.confirm("Are you sure you want to delete this category?")) {
//       // Perform delete operation here
//       deleteCategory(categoryId)
//         .then(() => {
//           // Update categories list after successful deletion
//           setCategories(
//             categories.filter((category) => category.id !== categoryId)
//           );
//           toast.success("Successfully removed!");
//         })
//         .catch((error) => {
//           console.log(error);
//           toast.error("Something went wrong!");
//         });
//     }
//   };

//   return (
//     <CDBSidebar
//       textColor="#fff"
//       backgroundColor="#333"
//       style={{ height: "50vh" }}
//     >
//       <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
//         <h5 className="text-decoration-none" style={{ color: "inherit" }}>
//           Categories
//         </h5>
//       </CDBSidebarHeader>
//       <CDBSidebarContent className="sidebar-content">
//         <CDBSidebarMenu>
//           <CDBSidebarMenuItem
//             icon="columns h-4"
//             onClick={() => handleCategorySelect(null)}
//           >
//             <Link to="/home/all/product/categories">All products</Link>
//           </CDBSidebarMenuItem>

//           {categories.map((category) => (
//             <CDBSidebarMenuItem
//               key={category.id}
//               icon="columns"
//               onClick={() => handleCategorySelect(category.id)}
//             >
//               <Link
//                 to={`/home/all/product/category/${category.id}/${category.name}`}
//               >
//                 {category.name}
//               </Link>
//               {isAdmin ? (
//                 <FontAwesomeIcon
//                   icon={faTrash}
//                   className="delete-icon"
//                   onClick={() => handleDeleteCategory(category.id)}
//                 />
//               ) : null}
//             </CDBSidebarMenuItem>
//           ))}
//         </CDBSidebarMenu>
//       </CDBSidebarContent>
//     </CDBSidebar>
//   );
// };

// export default CategorySidebar;
