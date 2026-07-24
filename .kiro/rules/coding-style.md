# Coding Style Rules

## TypeScript
- Gunakan `const` untuk variabel yang tidak berubah, `let` hanya jika perlu reassign
- JANGAN gunakan `var`
- Gunakan arrow function untuk callback
- Gunakan template literal untuk string concatenation
- Gunakan optional chaining (`?.`) dan nullish coalescing (`??`)

## Formatting
- Indentasi: 2 spasi
- Semicolons: wajib di akhir statement
- Quotes: single quotes untuk string
- Trailing comma: gunakan di object dan array multiline
- Max line length: 100 karakter

## Naming
- Variables & functions: camelCase (`loginPage`, `getUserData`)
- Constants: UPPER_SNAKE_CASE (`BASE_URL`, `MAX_RETRY`)
- Classes & interfaces: PascalCase (`LoginPage`, `UserData`)
- Files: snake_case atau kebab-case (`login-page.ts`, `login_page.ts`)
- Test files: `XX_NamaModul_Fitur.spec.ts`

## Comments
- Komentar di atas blok kode yang kompleks
- Gunakan `// TODO:` untuk pekerjaan yang belum selesai
- Gunakan `// FIXME:` untuk bug yang diketahui
- Jangan komentar kode yang sudah jelas (self-documenting code)

## Import
- Group imports: library → framework → local modules
- Gunakan named imports, hindari wildcard `import *`
