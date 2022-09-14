import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) => {
    const { email, nombre, token } = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Informacion del email
    const info = await transport.sendMail({
        from: 'UpTask - Administrador de Proyectos ',
        to: email,
        subject: "UpTask - Confirma tu cuenta",
        text: "comprueba tu cuenta en UpTask",
        html: `
            <p>Hola ${nombre} comprueba tu cuenta en UpTask</p>
            <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace:

            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>

            <p>Si tu no creaste esta cuenta, puedesignorar el mensaje
        `
    })


}

export const emailOlvidePassword = async (datos) => {
    const { email, nombre, token } = datos;


    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Informacion del email
    const info = await transport.sendMail({
        from: 'UpTask - Administrador de Proyectos ',
        to: email,
        subject: "UpTask - Restablece tu password",
        text: "Restalece tu password",
        html: `
            <p>Hola ${nombre} has solicitado restablecer tu password</p>

            <p>Sigue el siguiente enlace para generar un nuevo password:

            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer Password</a>

            <p>Si tu no solicitaste este email innoralo
        `
    })


}