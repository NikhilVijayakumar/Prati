# task-summary

A styled task list with completion status and optional due dates.

## Overview

Renders a titled summary panel containing a list of tasks. Each task displays its text with a strikethrough style when `status` is `completed`, and an optional due date label. Uses the custom `ifEquals` Handlebars helper for conditional text decoration. Omits the list entirely when the `tasks` array is empty.

## Template Variables

| Variable        | Type     | Required | Description                                         |
| --------------- | -------- | -------- | --------------------------------------------------- |
| `title`         | string   | Yes      | Panel heading text                                  |
| `tasks`         | array    | No       | Array of task objects; omits list when empty        |
| `tasks[].text`  | string   | Yes      | Task display text                                   |
| `tasks[].status`| string   | Yes      | `completed` applies strikethrough; any other value renders normally |
| `tasks[].dueDate`| string  | No       | Due date label rendered in muted text next to task  |

## Custom Helper Dependency

Requires the `ifEquals` block helper registered on the Handlebars instance:

```js
handlebars.registerHelper('ifEquals', function(a, b, options) {
  return a === b ? options.fn(this) : options.inverse(this);
});
```

## Responsibilities

- Render a titled task summary panel with inline styles
- Iterate tasks array and render each task with text and status
- Apply strikethrough and muted color to completed tasks
- Render optional due date label per task
- Omit task list when array is empty

## Non-Responsibilities

- Does not sort or filter tasks — renders in array order
- Does not handle click or check interactions — static HTML only
- Does not compute counts or progress — display only

## States

- **Populated** — `tasks` array has one or more items; list renders
- **Empty** — `tasks` array is empty or omitted; only panel title renders
- **All completed** — all tasks have `status: 'completed'`; all text struck through

## Edge Cases

- Empty `tasks` array: panel title renders; `<ul>` is omitted
- Task missing `dueDate`: due date span is omitted for that task
- Unknown `status` value: task renders without strikethrough
- Very long `text`: wraps within list item; no overflow

## Error Conditions

- `ifEquals` helper not registered — completed tasks render without strikethrough
- `title` not provided — heading renders empty

## See Also

- [Template System README](./README.md) — renderer service and registry overview

## Future Enhancements

- Add `completedCount` / `totalCount` summary line above the list
- Add `priority` field with visual indicator per task
- Support grouping tasks by status (pending vs completed sections)
