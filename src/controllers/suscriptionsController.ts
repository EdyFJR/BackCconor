import Stripe from 'stripe';

const stripe = new Stripe('sk_test_TU_CLAVE_SECRETA', { apiVersion: '2023-10-16' });

class SuscripcionController {

    // Obtener todos los productos (suscripciones) de Stripe
    public async obtenerProductos(req:any, res:any) {
        try {
            const productos = await stripe.products.list();
            res.status(200).json(productos.data);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los productos', error });
        }
    }

    // Obtener los precios de un producto específico
    public async obtenerPreciosDeProducto(req:any, res:any) {
        try {
            const productId = req.params.id;            
            const precios = await stripe.prices.list({ product: productId });
            res.status(200).json(precios.data);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los precios del producto', error });
        }
    }

    // Crear una nueva suscripción
    public async crearSuscripcion(req:any, res:any) {
        try {
            const { customerId, priceId } = req.body;

            const stripeSubscription = await stripe.subscriptions.create({
                customer: customerId,
                items: [{ price: priceId }],
                expand: ['latest_invoice.payment_intent'],
            });

            if (stripeSubscription.latest_invoice) {
                // Aquí puedes manejar la información de la factura si es necesario
            }

            res.status(201).json({ message: 'Suscripción creada exitosamente', stripeSubscription });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear la suscripción', error });
        }
    }

    public async crearCliente(req:any, res:any      ) {
        try {
            const { email, name, description } = req.body;

            const customer = await stripe.customers.create({
                email,
                name,
                description
            });

            res.status(201).json({ message: 'Cliente creado exitosamente', customer });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el cliente', error });
        }
    }
}

export default new SuscripcionController();
