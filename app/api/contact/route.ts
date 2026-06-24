import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, phone, message } = await req.json()

    if (!name || !phone) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Send email via Resend (free tier: 3000/mo)
    const RESEND_KEY = process.env.RESEND_API_KEY

    if (!RESEND_KEY) {
      // Dev mode — just log it
      console.log('📩 Contact form submission:', { name, phone, message })
      return NextResponse.json({ ok: true })
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'PopApp Website <onboarding@resend.dev>',
        to: ['studioidan@gmail.com'],
        subject: `🔔 ליד חדש מהאתר: ${name}`,
        html: `
          <div dir="rtl" style="font-family: sans-serif; max-width: 500px; margin: 0 auto; background: #f9fafb; padding: 32px; border-radius: 12px;">
            <h2 style="color: #111; margin-bottom: 24px;">📩 ליד חדש מהאתר!</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; width: 100px;">שם</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #111;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">טלפון</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #111;">
                  <a href="tel:${phone}" style="color: #00b4d8;">${phone}</a>
                </td>
              </tr>
              ${message ? `
              <tr>
                <td style="padding: 12px 0; color: #6b7280; vertical-align: top;">הודעה</td>
                <td style="padding: 12px 0; color: #111;">${message}</td>
              </tr>` : ''}
            </table>
            <a href="tel:${phone}"
              style="display: inline-block; margin-top: 28px; background: #00b4d8; color: white;
                     padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 700;">
              📞 התקשר עכשיו
            </a>
          </div>
        `,
      }),
    })

    if (!res.ok) {
      console.error('Resend error:', await res.text())
      return NextResponse.json({ error: 'Mail failed' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
