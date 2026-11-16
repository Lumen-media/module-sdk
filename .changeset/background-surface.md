---
"@lumen-media/module-sdk": minor
---

Add `BackgroundSurface` to `@lumen-media/module-sdk/ui` so modules can render
media and generated backgrounds the way the host does — including the live
shader effect — instead of putting a `lumen-bg://` URI into an `<img>`.

`openBackgroundPicker` now takes an options object with `animated` (default
`true`) to control whether generated backgrounds animate in the picker, and
`SelectedBackground` documents the `generator` type and its rendered `thumb`.
