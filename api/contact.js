import nodemailer from 'nodemailer'

const recipient = process.env.CONTACT_TO || 'gustavonatan.2001.pereira@gmail.com'
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Método não permitido.' })
  }

  const data = request.body ?? {}
  const requiredFields = ['name', 'email', 'subject', 'message']
  const missing = requiredFields.filter((field) => typeof data[field] !== 'string' || !data[field].trim())
  if (missing.length) return response.status(400).json({ error: 'Preencha todos os campos obrigatórios.' })
  if (!emailPattern.test(data.email.trim())) return response.status(400).json({ error: 'Informe um email válido.' })
  if (data.name.length > 120 || data.subject.length > 160 || data.message.length > 5000) {
    return response.status(400).json({ error: 'Um dos campos excede o limite permitido.' })
  }
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    return response.status(503).json({ error: 'O envio de email ainda não está configurado no servidor.' })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    })
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: recipient,
      replyTo: data.email.trim(),
      subject: `[Portfólio] ${data.subject.trim()}`,
      text: `Nome: ${data.name.trim()}\nEmail: ${data.email.trim()}\n\n${data.message.trim()}`,
    })
    return response.status(204).send()
  } catch (error) {
    console.error('Falha ao enviar contato:', error.message)
    return response.status(500).json({ error: 'Não foi possível enviar agora. Tente novamente mais tarde.' })
  }
}
