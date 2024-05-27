import jwt, { JwtPayload } from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "micsecretjwtfa";

interface DecodedToken extends JwtPayload {
  role?: string;
}

export const verifyToken = (token: string): DecodedToken | null => {
  try {
    return jwt.verify(token, secret) as DecodedToken;
  } catch (err) {
    return null;
  }
};

export const logout = (dispatch: any, clearUser: () => void) => {
  // Eliminar la cookie 'auth'

  // Limpiar el estado del usuario
  dispatch(clearUser());
};
