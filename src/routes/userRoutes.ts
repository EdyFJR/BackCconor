import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getAvailableAdmins,
  getAllNonAdminUsersOfCompany,
  isCompanyAdmin,
  getNumberUsers,
  getAllAdmins,
  getCompanyAdmin,
} from '../controllers/users';
import { validarAdmin, validarAdminOrSysAdmin, validarSysAdmin, verifyToken } from '../middleware/jwtMiddleware';

const router = Router();

// Rutas estáticas
router.get('/', verifyToken, validarSysAdmin, getAllUsers);
router.get('/number', verifyToken, validarSysAdmin, getNumberUsers);
router.get('/admins/available', verifyToken, validarSysAdmin, getAvailableAdmins);
router.get('/company/admins/all', verifyToken, validarSysAdmin, getAllAdmins);
router.get('/company/admin/:adminId', verifyToken, validarAdminOrSysAdmin, getCompanyAdmin);

// Rutas dinámicas con parámetros específicos
router.get('/admins/:companyId/:adminId', verifyToken, validarSysAdmin, isCompanyAdmin);
router.get('/company/:adminId', verifyToken, validarAdminOrSysAdmin, getAllNonAdminUsersOfCompany);

// Rutas dinámicas para acciones específicas de un usuario
router.get('/:id', verifyToken, validarSysAdmin, getUserById);
router.post('/', createUser);
router.put('/:id', verifyToken, validarSysAdmin, updateUser);
router.delete('/:id', verifyToken, validarSysAdmin, deleteUser);

export default router;
