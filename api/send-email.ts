import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import type { IncomingMessage, ServerResponse } from 'http';

// Interface para el cuerpo JSON de la petición
interface SendEmailRequestBody {
  to?: string;
  subject?: string;
  text?: string;
}

// Extensión de los tipos de Node.js para adaptarlos al formato de Vercel Request/Response
interface VercelRequest extends IncomingMessage {
  body: SendEmailRequestBody;
}

interface VercelResponse extends ServerResponse {
  status: (statusCode: number) => VercelResponse;
  json: (data: unknown) => VercelResponse;
}

// Configuración del cliente de AWS SES
// NOTA: Se usan variables de entorno sin el prefijo VITE_ para asegurar que permanezcan seguras en el servidor
const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'sa-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

/**
 * Función Serverless de Vercel para envío de correos electrónicos vía AWS SES
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Aseguramos que solo se admitan peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Utilizar POST.' });
  }

  const { to, subject, text } = req.body;

  // 1. Validación de parámetros en la petición entrante (body)
  if (!to || typeof to !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return res.status(400).json({
      error: 'El parámetro "to" es obligatorio y debe tener un formato de correo válido.',
    });
  }

  if (!subject || typeof subject !== 'string' || subject.trim() === '') {
    return res.status(400).json({
      error: 'El parámetro "subject" es obligatorio y no puede estar vacío.',
    });
  }

  if (!text || typeof text !== 'string' || text.trim() === '') {
    return res.status(400).json({
      error: 'El parámetro "text" es obligatorio y no puede estar vacío.',
    });
  }

  // Obtener el remitente verificado desde el entorno
  const fromEmail = process.env.AWS_SES_FROM_EMAIL;
  if (!fromEmail) {
    console.error('Configuración fallida: AWS_SES_FROM_EMAIL no está definido en el servidor.');
    return res.status(500).json({
      error: 'Error de configuración en el servidor de correo.',
    });
  }

  // 2. Construcción de los parámetros del correo (SendEmailCommand)
  const command = new SendEmailCommand({
    Source: fromEmail,
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: 'UTF-8',
      },
      Body: {
        Text: {
          Data: text,
          Charset: 'UTF-8',
        },
      },
    },
  });

  try {
    // 3. Ejecución del envío utilizando el cliente de AWS SES
    await sesClient.send(command);

    // 4. Respuesta exitosa (status 200)
    return res.status(200).json({
      success: true,
      message: 'Correo electrónico enviado correctamente.',
    });
  } catch (error) {
    // Registrar el error detallado de forma interna en la consola del servidor por seguridad
    console.error('Error durante el envío con AWS SES:', error);

    // 5. Respuesta en caso de fallo (status 500), ocultando trazas técnicas del SDK
    return res.status(500).json({
      error: 'El envío del correo electrónico ha fallado internamente.',
    });
  }
}
