# Лабораторна робота: AI-агент для розробки та CI/CD

**ПІП:** Ящук Георгій Олегович  
**Група:** КІ-405  
**Варіант 6:** TypeScript, npm scripts, Vitest

## Короткий опис

Репозиторій містить конфігурацію GitHub Copilot custom agent Build Engineer, skills і prompt-команди для автоматизації створення кросплатформного TypeScript Hello World проєкту з npm scripts, тестом Vitest `BasicAddition` та CI для Windows, Linux і macOS.

## Вимоги

- Node.js 20 або новіший
- Visual Studio Code
- GitHub Copilot, доступний у VS Code

## Як запустити агента

1. Відкрийте репозиторій у VS Code.
2. Відкрийте Copilot Chat і виберіть режим **Agent**.
3. Виберіть агента **build-engineer**.
4. Запустіть prompt-команду `/init`.

Команда послідовно виконує `/git-init`, `/create-project`, `/create-build`, `/create-actions` і `/check`. Агент оголошує успіх лише тоді, коли `/check` повертає `PASS`.

## Як зібрати і запустити результат

У корені створеного проєкту виконайте:

```sh
npm ci
npm run build
npm test
./build/hello
```

У Windows запустіть launcher:

```bat
build\hello.cmd
```
