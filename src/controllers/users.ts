import { Request, Response } from 'express';
import User from '../models-sequelize/User';

import bcrypt from "bcrypt";

// Controlador para obtener todos los usuarios
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Controlador para obtener un usuario por su ID
export const getUserById = async (req: Request, res: Response) => { 
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

// Controlador para crear un nuevo usuario
export const createUser = async (req: Request, res: Response) => {
  const { username, password, name, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
      const newUser = new User({
          username,
          password: hashedPassword,
          name,
          role
      });
      const savedUser = await newUser.save();
      res.json(savedUser);
  } catch (error) {
      console.error('Error al crear el usuario:', error);
      res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

// Controlador para actualizar un usuario por su ID
export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { username, password, name, role } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        password,
        name,
        role,
      },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

// Controlador para eliminar un usuario por su ID
export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }
 
    res.json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};
