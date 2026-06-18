# otp-email

A minimal OTP code delivery email body.

## Overview

Renders a heading, personalized greeting, and bolded OTP code. Intended as a partial injected into `base-layout` or rendered standalone. Produces the inner HTML body only — no outer shell.

## Template Variables

| Variable | Type   | Required | Description                      |
| -------- | ------ | -------- | -------------------------------- |
| `title`  | string | Yes      | `<h1>` heading text              |
| `name`   | string | Yes      | Recipient name in greeting line  |
| `code`   | string | Yes      | OTP code rendered in `<strong>`  |

## Responsibilities

- Render an `<h1>` title heading
- Render a personalized greeting with recipient name
- Render the OTP code in bold emphasis

## Non-Responsibilities

- Does not render an outer HTML document — body partial only
- Does not apply expiry time or code length constraints
- Does not render any call-to-action or additional instructions

## States

- **Default** — all three variables provided; full email body renders

## Edge Cases

- Empty `name`: greeting renders "Hello ," with a trailing comma and no name
- Empty `code`: `<strong>` renders empty; no visible OTP

## Error Conditions

- Any variable missing — Handlebars renders the variable reference as empty string; no crash

## See Also

- [Template System README](./README.md) — renderer service and registry overview
- [base-layout](./base-layout.md) — outer container to wrap this partial

## Future Enhancements

- Add `expiresIn` variable for code expiry messaging
- Add a "Do not share this code" security notice
- Add a resend link or support contact link
