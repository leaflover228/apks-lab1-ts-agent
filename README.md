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

1. Відкрийте в VS Code корінь репозиторію, де видно каталог `.github`.
2. Відкрийте GitHub Copilot Chat і виберіть harness **Local** та режим **Agent**. Workspace prompt-файли VS Code доступні в Local harness, а не в Copilot CLI harness.
3. Виберіть custom agent **build-engineer**.
4. Перейдіть на гілку `develop` і переконайтеся, що робоче дерево чисте.
5. У полі чату введіть `/` і виберіть workspace prompt `project-init` із `.github/prompts/project-init.prompt.md` (не вбудовану команду `/init` — Initialize Copilot instructions), або введіть `/project-init` і виберіть саме prompt-файл.

Файл `project-init.prompt.md` задає ім'я workspace-команди `/project-init`. Оркестратор послідовно виконує `/git-init`, `/create-project`, `/create-build`, `/create-actions` і `/check`; він створює `feature/hello-world` лише після перевірки гілки `develop` і чистого дерева. Успіх оголошується лише тоді, коли `/check` повертає `PASS`.
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
