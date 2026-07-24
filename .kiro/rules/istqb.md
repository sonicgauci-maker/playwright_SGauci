# ISTQB Testing Principles

## 7 Prinsip Testing (ISTQB Foundation)

1. **Testing shows the presence of defects, not their absence**
   - Test membuktikan ada bug, bukan membuktikan software bebas bug

2. **Exhaustive testing is impossible**
   - Tidak mungkin test semua kombinasi — gunakan risk-based testing

3. **Early testing saves time and money**
   - Temukan bug sedini mungkin (shift-left testing)

4. **Defects cluster together**
   - Bug cenderung berkumpul di modul tertentu — fokuskan testing di area berisiko

5. **Pesticide paradox**
   - Test yang sama berulang tidak akan menemukan bug baru — update test secara berkala

6. **Testing is context-dependent**
   - Strategi test berbeda tergantung jenis aplikasi

7. **Absence-of-errors is a fallacy**
   - Software tanpa bug belum tentu memenuhi kebutuhan user

## Test Levels
- Unit Test → Component Test → Integration Test → System Test → Acceptance Test

## Test Types
- Functional Testing
- Non-Functional Testing (performance, security, usability)
- Regression Testing
- Smoke Testing / Sanity Testing

## Test Design Techniques
- **Black-box**: Equivalence Partitioning, Boundary Value Analysis, Decision Table, State Transition
- **White-box**: Statement Coverage, Branch Coverage, Path Coverage
- **Experience-based**: Error Guessing, Exploratory Testing, Checklist-based

## Penerapan di Automation
- Prioritaskan test berdasarkan risiko bisnis (risk-based)
- Cover happy path dulu, baru negative/edge cases
- Regression suite harus dijalankan setiap build
- Smoke test untuk validasi deployment berhasil
