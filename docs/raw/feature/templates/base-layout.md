# base-layout

A full-page email HTML container with optional header and footer slots.

## Overview

Provides the outer HTML shell for email content. Renders a centered `.container` div with inline styles suitable for email clients, an optional `{{header}}` heading block, a `{{> @partial-block }}` slot for body content, and an optional `{{footer}}` section with muted text styling. Designed as the wrapping partial for other email templates.

## Template Variables

| Variable  | Type     | Required | Description                          |
| --------- | -------- | -------- | ------------------------------------ |
| `title`   | string   | Yes      | `<title>` in `<head>`                |
| `header`  | string   | No       | Heading text rendered above body     |
| `footer`  | string   | No       | Footer text rendered below container |

## Responsibilities

- Render a valid HTML email document with viewport and charset meta tags
- Apply inline styles for email-client compatibility (max-width, font-family, box-shadow)
- Conditionally render a header heading above body content
- Conditionally render a footer section below the container
- Provide a `{{> @partial-block }}` slot for body content injection

## Non-Responsibilities

- Does not render body content — callers inject content via partial block
- Does not apply theming tokens — uses hardcoded email-safe colors
- Does not validate email-client compatibility beyond inline styles

## States

- **Full** — title, header, body partial, and footer all present
- **Minimal** — title and body partial only; header and footer omitted
- **No footer** — header present but footer omitted

## Edge Cases

- No `header` provided: header block is omitted; body partial renders at top of container
- No `footer` provided: footer div is omitted entirely
- Empty `title`: `<title>` renders empty; email client may show "Untitled"

## Error Conditions

- Missing `{{> @partial-block }}` content — container renders empty
- `title` not provided — `<title>` renders empty string

## See Also

- [Template System README](./README.md) — renderer service and registry overview
- [otp-email](./otp-email.md) — template designed to be injected into this layout

## Future Enhancements

- Remove the duplicate minimal HTML shell from the source file
- Accept a `logoUrl` variable for a branded logo above the header
- Accept a `primaryColor` variable to theme the container border or header color
