import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"), 
    route("dashboard","routes/dashboard/dashboard.tsx",[
        route("reporte/interacciones","routes/dashboard/reporte/interacciones/interacciones.tsx"),
        route("mantenimiento/empresas","routes/dashboard/mantenimiento/empresas/empresas.tsx"),        
        route("mantenimiento/empresas/registro", "routes/dashboard/mantenimiento/empresas/registro/empresaRegistro.tsx"),
        route("mantenimiento/usuarios","routes/dashboard/mantenimiento/usuarios/usuarios.tsx"),        
        route("mantenimiento/usuarios/registro", "routes/dashboard/mantenimiento/usuarios/registro/usuarioRegistro.tsx"),
        route("mantenimiento/clientes","routes/dashboard/mantenimiento/clientes/clientes.tsx"),
        route("mantenimiento/licencias","routes/dashboard/mantenimiento/licencias/licencias.tsx"),
    ])

] satisfies RouteConfig;
