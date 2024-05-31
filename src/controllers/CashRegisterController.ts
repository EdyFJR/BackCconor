import { Request, Response } from 'express';
import CashRegister from '../models-mongoose/CashRegister';
import Sale from '../models-mongoose/Sales';

// Registrar el dinero inicial y abrir caja
export const openCashRegister = async (req: Request, res: Response) => {
  try {
    const { user, initialAmount } = req.body;
    const newCashRegister = new CashRegister({
      user,
      initialAmount,
      finalAmount: 0, // Se actualizará al cerrar la caja
      payments: { cash: 0, credit: 0, debit: 0 },
      startDate: new Date(),
      endDate: new Date(),
      notes: '',
      closed: false
    });

    const savedCashRegister = await newCashRegister.save();
    res.status(201).json(savedCashRegister);
  } catch (error) {
    res.status(500).json({ message: 'Error opening cash register', error });
  }
};

// Cerrar caja
export const closeCashRegister = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { finalAmount, notes } = req.body;

    const cashRegister = await CashRegister.findById(id).populate('sales');
    if (!cashRegister) {
      return res.status(404).json({ message: 'Cash register not found' });
    }

    const sales = await Sale.find({ user: cashRegister.user, date: { $gte: cashRegister.startDate, $lte: new Date() } });

    let totalCash = 0, totalCredit = 0, totalDebit = 0;

    sales.forEach(sale => {
      sale.productsSold.forEach(product => {
        switch (product.paymentMethod) {
          case 'cash':
            totalCash += product.subtotal;
            break;
          case 'credit':
            totalCredit += product.subtotal;
            break;
          case 'debit':
            totalDebit += product.subtotal;
            break;
        }
      });
    });

    cashRegister.finalAmount = finalAmount;
    cashRegister.payments.cash = totalCash;
    cashRegister.payments.credit = totalCredit;
    cashRegister.payments.debit = totalDebit;
    cashRegister.notes = notes;
    cashRegister.endDate = new Date();
    cashRegister.closed = true;

    const savedCashRegister = await cashRegister.save();
    res.status(200).json(savedCashRegister);
  } catch (error) {
    res.status(500).json({ message: 'Error closing cash register', error});
  }
};

// Obtener todos los cortes de caja
export const getCashRegisters = async (req: Request, res: Response) => {
  try {
    const cashRegisters = await CashRegister.find().populate('user').populate('sales');
    res.status(200).json(cashRegisters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cash registers', error });
  }
};
