import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import nodemailer from 'nodemailer'

const app = express()
const port = Number(process.env.PORT || 3001)
const recipient = process.env.CONTACT_TO || 'gustavonatan.2001.pereira@gmail.com'

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }))
app.use(express.json({ limit: '20kb' }))

const requiredFields = ['name', 'email', 'subject', 'message']
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    throw new Error('SMTP não configurado. Preencha o arquivo .env antes de enviar.')
  }
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
  })
}

app.get('/api/health', (_request, response) => response.json({ ok: true }))

app.post('/api/contact', async (request, response) => {
  const data = request.body ?? {}
  const missing = requiredFields.filter((field) => typeof data[field] !== 'string' || !data[field].trim())
  if (missing.length) return response.status(400).json({ error: 'Preencha todos os campos obrigatórios.' })
  if (!emailPattern.test(data.email.trim())) return response.status(400).json({ error: 'Informe um email válido.' })
  if (data.name.length > 120 || data.subject.length > 160 || data.message.length > 5000) {
    return response.status(400).json({ error: 'Um dos campos excede o limite permitido.' })
  }

  try {
    await getTransporter().sendMail({
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
})

app.listen(port, () => console.log(`API de contato disponível em http://localhost:${port}`))
