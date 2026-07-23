import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

// ─── HOW TO SET YOUR RESEND API KEY ──────────────────────────────────────────
// 1. Copy .env.local.example → .env.local  (at the project root)
// 2. Replace "your_key_here" with your real key from https://resend.com/api-keys
// 3. Restart the dev server (`npm run dev`) — Next.js reads .env.local automatically.
//
// The env var is accessed below via:  process.env.RESEND_API_KEY
// ─────────────────────────────────────────────────────────────────────────────

// ─── Zod validation schema ───────────────────────────────────────────────────
const contactSchema = z.object({
  name:    z.string().min(1,  { message: 'Name is required.'                    }),
  email:   z.string().email(  { message: 'A valid email address is required.'   }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

// ─── POST /api/contact ────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  // 1. Parse JSON body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON in request body.' },
      { status: 400 },
    );
  }

  // 2. Validate with Zod
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.errors[0]?.message ?? 'Validation failed.';
    return NextResponse.json({ error: firstError }, { status: 422 });
  }

  const { name, email, message } = parsed.data;

  // 3. Check for Resend API Key
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || apiKey === 'your_key_here') {
    // Local Simulation Mode — logs message to server console and returns success
    console.log('--------------------------------------------------');
    console.log('📬 [SIMULATED CONTACT FORM SUBMISSION]');
    console.log(`FROM: ${name} <${email}>`);
    console.log(`MESSAGE: ${message}`);
    console.log('--------------------------------------------------');

    return NextResponse.json({
      success: true,
      simulated: true,
      message: 'Transmission logged successfully (Simulation Mode). Add RESEND_API_KEY in .env.local to send real emails.',
    }, { status: 200 });
  }

  // 4. Send email via Resend if API key is present
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from:    'Portfolio Contact <onboarding@resend.dev>',
      to:      ['shivamk.sah2003@gmail.com'],
      reply_to: email,
      subject: `[Portfolio Inquiry] ${name} sent you a message`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #050d18; color: #e0f4ff; padding: 32px; border: 1px solid #00f5ff; border-radius: 12px;">
          <h2 style="color: #00f5ff; margin-top: 0; font-size: 20px;">📬 New Visitor Inquiry — Shivam Portfolio</h2>
          
          <div style="background-color: #0a1628; padding: 20px; border-radius: 8px; border: 1px solid #0d2137; margin: 20px 0;">
            <p style="margin: 0 0 10px 0; font-size: 14px;"><strong style="color: #00ff88;">Visitor Name:</strong> ${name}</p>
            <p style="margin: 0 0 10px 0; font-size: 14px;"><strong style="color: #00ff88;">Visitor Email:</strong> <a href="mailto:${email}" style="color: #00f5ff; text-decoration: underline;">${email}</a></p>
            <p style="margin: 0; font-size: 12px; color: #7eb8d4;">(Tip: Hitting 'Reply' in Gmail will reply directly to ${email})</p>
          </div>

          <h3 style="color: #a855f7; font-size: 15px; margin-bottom: 8px;">Message Content:</h3>
          <div style="background-color: #0a1628; padding: 20px; border-radius: 8px; border-left: 4px solid #a855f7; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</div>

          <hr style="border: none; border-top: 1px solid #0d2137; margin: 24px 0 16px 0;" />
          <p style="font-size: 11px; color: #3a6880; margin: 0;">Dispatched automatically from shivamkumar.dev portfolio contact portal.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { error: 'Failed to dispatch email via Resend. Please check API key.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Email sending exception:', err);
    return NextResponse.json(
      { error: 'Server exception when sending email.' },
      { status: 500 },
    );
  }
}
