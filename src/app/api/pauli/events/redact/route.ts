import { NextResponse } from 'next/server';
import { z } from 'zod';
import { redact } from '@/lib/safety/redaction';

const RedactSchema = z.object({
  text: z.string().min(1).max(10000),
  level: z.enum(['strict', 'standard', 'light']).optional().default('standard'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text, level } = RedactSchema.parse(body);
    const result = redact(text, level);

    return NextResponse.json({
      success: true,
      result: {
        text: result.text,
        itemsRedacted: result.itemsRedacted,
        originalLength: result.originalLength,
        redactedLength: result.redactedLength,
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
