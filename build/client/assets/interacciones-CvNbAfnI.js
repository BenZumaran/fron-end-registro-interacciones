import{w as c}from"./with-props-D6P1vN0Z.js";import{l as e}from"./chunk-D52XG6IA-Crw0zIzM.js";const m=c(function({loaderData:t}){function s(r){const l=document.getElementById("default-modal");if(l==null||l.classList.toggle("hidden"),r===-1){const d=document.getElementById("formRegistroUsuario");d==null||d.reset();return}let a=document.getElementById("numInteraccion");a.value=t.data[r].numeroInteraccion,a=document.getElementById("tipo"),a.value=t.data[r].tipoInteraccion.descripcionTipo,a=document.getElementById("cliente"),a.value=t.data[r].clienteInteraccion.nombresCliente,a=document.getElementById("empresaCliente"),a.value=t.data[r].clienteInteraccion.empresaCliente.razonSocialEmpresa,a=document.getElementById("fecha"),a.value=new Date(t.data[r].fechaInteraccion).toLocaleString(),a=document.getElementById("detalle"),a.value=t.data[r].detalleInteraccion}return e.jsxs("section",{className:"bg-gray-50 dark:bg-gray-900 p-3 sm:p-5",children:[e.jsx("div",{className:"mx-auto max-w-screen-xl px-4 lg:px-12",children:e.jsxs("div",{className:"bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden",children:[e.jsx("div",{className:"flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4",children:e.jsx("div",{className:"w-full md:w-1/2",children:e.jsxs("form",{className:"flex items-center",children:[e.jsx("label",{htmlFor:"simple-search",className:"sr-only",children:"Search"}),e.jsxs("div",{className:"relative w-full",children:[e.jsx("div",{className:"absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",children:e.jsx("svg",{"aria-hidden":"true",className:"w-5 h-5 text-gray-500 dark:text-gray-400",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{fillRule:"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",clipRule:"evenodd"})})}),e.jsx("input",{type:"text",id:"simple-search",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Search",required:!0})]})]})})}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"w-full text-sm text-left text-gray-500 dark:text-gray-400",children:[e.jsx("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",className:"px-4 py-3",children:"Número"}),e.jsx("th",{scope:"col",className:"px-4 py-3",children:"Fecha"}),e.jsx("th",{scope:"col",className:"px-4 py-3",children:"Cliente"}),e.jsx("th",{scope:"col",className:"px-4 py-3",children:"Tipo"}),e.jsx("th",{scope:"col",className:"px-4 py-3",children:"Revisar"})]})}),e.jsx("tbody",{children:t.data&&t.data.map((r,l)=>e.jsxs("tr",{className:"border-b dark:border-gray-700",children:[e.jsx("th",{scope:"row",className:"px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white",children:r.numeroInteraccion}),e.jsx("td",{className:"px-4 py-3",children:new Date(r.fechaInteraccion).toLocaleString()}),e.jsx("td",{className:"px-4 py-3",children:r.clienteInteraccion.nombresCliente}),e.jsx("td",{className:"px-4 py-3",children:r.tipoInteraccion.descripcionTipo}),e.jsx("td",{className:"px-4 py-3",children:e.jsx("button",{type:"button",className:"text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900",onClick:()=>s(l),children:"Detalle"})})]}))})]})})]})}),e.jsx("div",{id:"default-modal",tabIndex:-1,"aria-hidden":"true",className:"hidden overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-full h-full md:inset-0 h-[calc(100%-1rem)]",style:{position:"fixed",padding:"10vh 28vw",height:"100vh",backgroundColor:"rgba(0, 0, 0, 0.5)"},children:e.jsx("div",{className:"relative p-4 w-full max-w-2xl max-h-full",children:e.jsxs("div",{className:"relative bg-white rounded-lg shadow dark:bg-gray-700",children:[e.jsxs("div",{className:"flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-900 dark:text-white",children:"Detalle Interacción"}),e.jsxs("button",{type:"button",className:"text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white","data-modal-hide":"default-modal",onClick:()=>s(-1),children:[e.jsx("svg",{className:"w-3 h-3","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 14 14",children:e.jsx("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"})}),e.jsx("span",{className:"sr-only",children:"Close modal"})]})]}),e.jsx("div",{className:"mx-auto my-10 h-fit w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700",children:e.jsxs("div",{className:"p-6 space-y-4 md:space-y-6 sm:p-8 h-fit",children:[e.jsx("h1",{className:"text-2xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white",children:"Detalle e la Interacción"}),e.jsxs("form",{className:"space-y-4 md:space-y-6",id:"formDetalleInteraccion",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"numInteraccion",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Número de Interacción"}),e.jsx("input",{type:"text",name:"numInteraccion",id:"numInteraccion",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",disabled:!0})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"tipo",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Tipo"}),e.jsx("input",{type:"text",name:"tipo",id:"tipo",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",disabled:!0})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"cliente",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Cliente"}),e.jsx("input",{type:"text",name:"cliente",id:"cliente",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",disabled:!0})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"empresaCliente",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Empresa Cliente"}),e.jsx("input",{type:"text",name:"empresaCliente",id:"empresaCliente",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",disabled:!0})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"fecha",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Fecha de Interacción"}),e.jsx("input",{type:"text",name:"fecha",id:"fecha",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",disabled:!0})]}),e.jsx("label",{htmlFor:"detalle",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Detalle"}),e.jsx("textarea",{id:"detalle",rows:4,className:"block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",disabled:!0})]})]})})]})})})]})});export{m as default};