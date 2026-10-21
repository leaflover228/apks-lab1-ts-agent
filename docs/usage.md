# Інструкція з використання

## Запуск агента у VS Code

1. Встановіть Node.js 20 або новішу версію, Git і VS Code.
2. Відкрийте цей репозиторій як workspace у VS Code; у корені має бути каталог `.github/`.
3. Відкрийте **GitHub Copilot Chat** у Chat view.
4. Виберіть harness **Local** і режим **Agent**. Workspace prompt-файли доступні в Local harness, а не в Copilot CLI harness.
5. Виберіть custom agent **build-engineer**.

Agent manifest і prompt-файли розташовані в `.github/agents/` та `.github/prompts/`. Базова назва файла задає slash-команду: `.github/prompts/project-init.prompt.md` → `/project-init`. Щоб не запустити вбудовану команду `/init` (Initialize Copilot instructions), введіть `/` і виберіть `project-init` у списку **Prompts** (workspace prompt). Якщо prompt не з'являється, перевірте корінь workspace та Local harness, потім виконайте **Developer: Reload Window**.

## Виконання `/project-init` і `/check`

Щоб послідовно створити TypeScript Hello World, build/test і CI:

1. Переконайтеся, що поточна гілка `develop` і робоче дерево чисте; оркестратор створить нову гілку `feature/hello-world`.
2. У Copilot Chat у Local harness з активним агентом `build-engineer` введіть `/` та виберіть workspace prompt `project-init` зі списку **Prompts** (або `/project-init`, якщо саме цей prompt вибрано зі списку).
3. Дозвольте виконання потрібних команд та перегляньте звіти агента після кожного етапу.
4. Оркестратор послідовно виконує `/git-init` → `/create-project` → `/create-build` → `/create-actions` → `/check` і зупиняється на першій помилці.
5. Успішне завершення можна оголосити лише коли `/check` повертає загальний результат `PASS`.

Щоб запустити лише перевірку, введіть `/check`. Ця команда read-only: вона перевіряє конфігурацію та проєкт, але не створює, не змінює і не видаляє файли. На гілці `develop`, якщо проєкт ще не створений, проєктні перевірки можуть бути позначені `SKIPPED`.

> `/git-init` перевіряє, що поточний каталог уже є Git-репозиторієм. Якщо це не так, він запропонує виконати `git init` вручну і не запускає цю команду автоматично.
## Локальна перевірка

Відкрийте термінал у каталозі створеного проєкту. Встановіть залежності з lockfile, зберіть TypeScript і запустіть тести:

```sh
npm ci
npm run build
npm test
```

Щоб запустити Hello World через npm script:

```sh
npm start
```

На Linux/macOS перевірте launcher:

```sh
./build/hello
```

На Windows у Command Prompt або PowerShell запустіть:

```bat
build\hello.cmd
```

Очікуваний вивід запуску — `Hello, World!`; тест `BasicAddition` має завершитися успішно.

## Перевірка Git ignore

Перегляньте стан робочого дерева:

```sh
git status --short
```

Перевірте правила ігнорування для результату збірки та залежностей:

```sh
git check-ignore build node_modules
```

Команда має вивести обидва шляхи. Якщо вона не виводить один із них, перевірте `.gitignore` на наявність відповідних записів `build/` і `node_modules/`. `git status --short` не має показувати вміст цих каталогів як нові файли.

## Типові помилки
- **`/project-init` не з'являється або замість нього вибрано вбудовану `/init`:** відкрийте репозиторій як workspace, перемкніть harness на **Local**, активуйте `build-engineer` і виберіть `project-init` у списку **Prompts**. Переконайтеся, що `.github/prompts/project-init.prompt.md` існує; за потреби виконайте **Developer: Reload Window**. У Copilot CLI harness ці workspace prompt-файли недоступні.

- **`/git-init` повідомляє, що це не Git-репозиторій:** перевірте, що у VS Code відкрито правильний каталог. Якщо потрібно створити репозиторій саме тут, виконайте `git init` вручну, як пропонує prompt, а потім повторіть `/git-init`.
- **`/create-project` не знаходить skill `project-scaffold`:** перевірте наявність `.github/skills/project-scaffold/SKILL.md` та відкриття кореня репозиторію у VS Code.
- **`/create-build` не знаходить `src/index.ts`:** виконайте `/create-project`, перевірте його результат і повторіть `/create-build`.
- **`npm ci` завершується помилкою через lockfile:** переконайтеся, що `package-lock.json` існує та відповідає `package.json`. Якщо його немає або manifest змінено, виконайте `npm install`, перевірте зміни, а потім повторіть `npm ci`.
- **`npm run build` завершується помилкою:** перегляньте повідомлення TypeScript та перевірте відповідність `tsconfig.json`, версій залежностей і розширень імпортів обраному режиму модулів.
- **`npm test` або `BasicAddition` падає:** використайте вивід Vitest для пошуку причини в реалізації чи конфігурації. Не змінюйте очікуване значення тесту лише для того, щоб він пройшов.
- **`build/hello` не запускається на Linux/macOS:** повторіть `npm run build` і перевірте, що launcher має права виконання; скрипт збірки має встановлювати права `755`.
- **`build\hello.cmd` не запускається у Windows:** повторіть збірку та перевірте наявність `build\hello.cmd` і доступність Node.js у `PATH`.
- **Workflow не створюється:** переконайтеся, що в корені існують `ci.sh` і `ci.bat`; за їх відсутності виконайте `/create-build` перед `/create-actions`.
- **`/check` повертає `FAIL`:** прочитайте рядки таблиці зі статусом `FAIL`, виправте вказані проблеми відповідною командою та повторіть `/check`. Не оголошуйте успіх, доки загальний статус не стане `PASS`.
