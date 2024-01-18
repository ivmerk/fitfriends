import jwt, { JwtHeader, JwtPayload } from 'jsonwebtoken';

interface DecodedToken {
  header: JwtHeader;
  payload: JwtPayload;
}

export const checkTokenExpiration = (token: string): boolean => {
  try {
    const decodedToken: DecodedToken | null = jwt.decode(token, {
      complete: true,
    }) as DecodedToken | null;

    if (!decodedToken || !decodedToken.header || !decodedToken.payload) {
      // Токен не декодирован или некорректен
      return false;
    }

    const currentTimestamp: number = Math.floor(Date.now() / 1000);

    // Проверяем, истек ли срок действия токена
    if (
      decodedToken.payload.exp &&
      decodedToken.payload.exp < currentTimestamp
    ) {
      // Срок действия токена истек
      return false;
    }

    // Срок действия токена действителен
    return true;
  } catch (error) {
    // Обработка ошибок декодирования токена
    // console.error('Ошибка при декодировании токена:', error);
    return false;
  }
};

// // Пример использования
// const accessToken = 'your_access_token_here';

// if (checkTokenExpiration(accessToken)) {
//   console.log('Access token действителен');
// } else {
//   console.log('Access token истек или недействителен');
// }
