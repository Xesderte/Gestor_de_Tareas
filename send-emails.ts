import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Inicializa el cliente de AWS con tus variables de entorno
const sesClient = new SESClient({
    region: process.env.AWS_REGION || "sa-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});

export default async function handler(req: any, res: any) {
    // Vercel Serverless Functions solo deben aceptar POST para este caso
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    try {
        const command = new SendEmailCommand({
            Source: process.env.AWS_SES_FROM_EMAIL, // Tu correo verificado como remitente
            Destination: {
                ToAddresses: [to], // El correo del usuario que se registra
            },
            Message: {
                Subject: { Data: subject },
                Body: { Text: { Data: text } },
            },
        });

        await sesClient.send(command);
        return res.status(200).json({ message: "Email enviado correctamente" });
    } catch (error: any) {
        console.error("Error al enviar email con AWS SES:", error);
        return res.status(500).json({ error: "Error interno al enviar el correo", details: error.message });
    }
}