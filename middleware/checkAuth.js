import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";


const checkAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // jwt.verify -> nos permite descifrar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // creo una variable usuario donde pueda acceder en controladores
      // select con un - retira ese dato del pedido
      // findById busca un usuario por su id
      req.usuario = await Usuario.findById(decoded.id).select("-password -confirmado -token -createdAt -updatedAt -__v");      
      // next nos permite ir al siguiente midelware
      return next();
    } catch (error) {
      return res.status(404).json({ msg: "Hubo un error" });
    }
  }

  if (!token) {
    const error = new Error("Token no válido");
    return res.status(401).json({ msg: error.message });
  }

  next();
};

export default checkAuth;
