"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenuFrontEnd = void 0;
const getMenuFrontEnd = (role = 'admin') => {
    const menu = [
        {
            id: '',
            title: '',
            icon: 'mdi mdi-gauge',
            submenu: []
        }
    ];
    if (role === 'admin') {
        menu[0].title = 'ADMIN TOOLS';
        menu[0].id = 'admin';
        menu[0].icon = 'bi bi-cone-striped';
        menu[0].submenu.unshift({ title: 'Empresa', url: 'admin/company', icon: 'bi bi-building-fill' }, { title: 'Usuarios', url: 'admin/users', icon: 'bi bi-people-fill' }, { title: 'Productos', url: 'admin/products', icon: 'bi bi-bag-fill' }, { title: 'Proveedores', url: 'admin/products', icon: 'bi bi-file-earmark-person' }, { title: 'Lotes', url: 'admin/products', icon: 'bi bi-box2-fill' }, { title: 'Categorias', url: 'admin/categories', icon: 'bi bi-bookmark-fill' }, { title: 'recetas', url: 'admin/recipes', icon: 'bi bi-backpack4' });
    }
    if (role === 'user') {
        menu[0].title = 'USUARIO TOOLS';
        menu[0].id = 'user';
        menu[0].icon = 'bi bi-cone-striped';
        menu[0].submenu.unshift({ title: 'Empresa', url: 'admin/company', icon: 'bi bi-building-fill' }, { title: 'Usuarios', url: 'admin/users', icon: 'bi bi-people-fill' }, { title: 'Productos', url: 'admin/products', icon: 'bi bi-bag-fill' }, { title: 'Proveedores', url: 'admin/products', icon: 'bi bi-file-earmark-person' }, { title: 'Lotes', url: 'admin/products', icon: 'bi bi-box2-fill' }, { title: 'Categorias', url: 'admin/categories', icon: 'bi bi-bookmark-fill' }, { title: 'recetas', url: 'admin/recipe', icon: 'bi bi-backpack4' });
    }
    if (role === 'sysadmin') {
        menu[0].title = 'SYSADMIN TOOLS';
        menu[0].id = 'users';
        menu[0].icon = 'bi bi-people-fillS';
        menu[0].submenu.unshift({ title: 'Empresas', url: 'sysadmin/companies', icon: 'bi bi-building-fill' }, { title: 'Usuarios', url: 'sysadmin/users', icon: 'bi bi-people-fill' });
    }
    return menu;
};
exports.getMenuFrontEnd = getMenuFrontEnd;
