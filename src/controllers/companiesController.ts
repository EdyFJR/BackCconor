import { Request, Response } from 'express';
import Empresa, { EmpresaDocument } from '../models-mongoose/Company';
import User from '../models-mongoose/User';


// Crear una nueva empresa
export const createEmpresa = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { adminId } = req.body;
        const userExists = await User.findById(adminId);
        const userAlreadyAdmin = await Empresa.findOne({ adminId });


        if (!userExists) {
            return res.status(500).json({ error: `Error, el usuario ${adminId} No existe` });
        }
        if (userAlreadyAdmin) {
            return res.status(500).json({ error: `Error, el usuario ${adminId} Ya es administrador de una empresa` });

        }
        const newEmpresa: EmpresaDocument = new Empresa(req.body);


        const savedEmpresa: EmpresaDocument = await newEmpresa.save();
        return res.status(201).json(savedEmpresa);
    } catch (error) {
        console.error('Error al crear la empresa:', error);
        return res.status(500).json({ error: 'Error al crear la empresa' });
    }
};

// Obtener todas las empresas
export const getAllEmpresas = async (req: Request, res: Response): Promise<Response> => {
    try {
        const companies: EmpresaDocument[] = await Empresa.find();
        return res.status(200).json({
            ok: true,
            companies
        });
    } catch (error) {
        console.error('Error al obtener las empresas:', error);
        return res.status(500).json({ error: 'Error al obtener las empresas' });
    }
};
export const getNumberCompanies = async (req: Request, res: Response): Promise<Response> => {
    try {
        const numberOfCompanies = await Empresa.count();
        return res.status(200).json({
            ok: true,
            numberOfCompanies
        });
    } catch (error) {
        console.error('Error al obtener las empresas:', error);
        return res.status(500).json({ error: 'Error al obtener las empresas' });
    }
};

export const getCompaniesPages = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Parámetros de paginación con valores por defecto
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 5;

        // Calcular el desplazamiento
        const skip = (page - 1) * limit;

        // Obtener datos paginados
        const companies: EmpresaDocument[] = await Empresa.find().skip(skip).limit(limit);

        // Contar el total de documentos para calcular el total de páginas
        const total = await Empresa.countDocuments();
        const totalPages = Math.ceil(total / limit);

        // Devolver resultados paginados
        return res.status(200).json({
            totalPages,
            page,
            limit,
            companies
        });
    } catch (error) {
        console.error('Error al obtener las empresas:', error);
        return res.status(500).json({ error: 'Error al obtener las empresas' });
    }
};

// Obtener una empresa por su ID
export const getEmpresaById = async (req: Request, res: Response) => {
    try {
        const empresa = await Empresa.findById(req.params.id);
        if (!empresa) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }

        return res.status(200).json(
            {
                ok: true,
                company: empresa
            }
        );
    } catch (error) {
        console.error('Error al obtener la empresa:', error);
        return res.status(500).json({ error: 'Error al obtener la empresa' });
    }
};

// Actualizar una empresa
export const updateEmpresa = async (req: Request, res: Response) => {
    try {

        const empresa = await Empresa.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!empresa) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }
        return res.status(200).json(
            empresa
        );
    } catch (error) {
        console.error('Error al actualizar la empresa:', error);
        return res.status(500).json({ error: 'Error al actualizar la empresa' });
    }
};

// Eliminar una empresa
export const deleteEmpresa = async (req: Request, res: Response) => {
    try {
        const empresa: EmpresaDocument | null = await Empresa.findByIdAndDelete(req.params.id);
        if (!empresa) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }
        return res.status(200).json({ message: 'Empresa eliminada' });
    } catch (error) {
        console.error('Error al eliminar la empresa:', error);
        return res.status(500).json({ error: 'Error al eliminar la empresa' });
    }
};
