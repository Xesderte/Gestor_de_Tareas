/**
 * Envía un correo de notificación solicitando el envío al endpoint serverless local.
 * 
 * @param to Dirección de destino del correo electrónico
 * @param subject Asunto del correo electrónico
 * @param text Cuerpo del correo electrónico
 */
export const sendNotificationEmail = async (
  to: string,
  subject: string,
  text: string
): Promise<void> => {
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ to, subject, text }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error al enviar el correo electrónico');
  }
};
