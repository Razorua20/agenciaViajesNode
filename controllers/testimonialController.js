import { Testimonial } from "../models/testimoniales.js";

const guardarTestimonial = async (req, res) => {
    //Validar
    console.log(req.body)
    const { nombre, email, mensaje } = req.body;

    const errores = [];

    if (nombre.trim() === '') {
        errores.push({ alerta: 'El nombre esta vacio' });
    }

    if (email.trim() === '') {
        errores.push({ alerta: 'El email esta vacio' });
    }

    if (mensaje.trim() === '') {
        errores.push({ alerta: 'El mensaje esta vacio' });
    }

    if (errores.length > 0) {
        //Consultar testimoniales existentes
        const testimoniales = await Testimonial.findAll();
        //Mostrar la vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            email,
            mensaje,
            testimoniales
        })
    } else {
        //Almacenarlo en una bd
        try {
            await Testimonial.create({
                nombre,
                email,
                mensaje
            })

            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }
};

export {
    guardarTestimonial
};