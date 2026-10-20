---
name: github-actions
description: "Створюй і перевіряй GitHub Actions CI для TypeScript-проєкту на Ubuntu, Windows і macOS через ci.sh та ci.bat."
---

# GitHub Actions

## Призначення

Створювати workflow GitHub Actions для перевірки проєкту на Ubuntu, Windows і macOS, делегуючи всі команди build/test наявним `ci.sh` і `ci.bat`.

## Коли застосовувати

- Потрібно створити або змінити `.github/workflows/ci.yml`.
- Потрібна CI matrix для Ubuntu, Windows і macOS.
- Потрібно завантажувати результати збірки як artifact.

## Вхід

- Репозиторій із готовими `ci.sh` і `ci.bat`.
- GitHub Actions workflow, якщо він уже існує, для перевірки перед точковим оновленням.
- Вимоги до гілок запуску: `develop` і `master`.

Приклад:

```text
Створи CI для наявних ci.sh і ci.bat на ubuntu-latest, windows-latest і macos-latest.
```

## Вихід

- `.github/workflows/ci.yml` — workflow з назвою `CI`, тригерами `push` і `pull_request` для `develop` та `master`, однією job `build`, matrix трьох ОС, кроками checkout, setup-node Node.js 20, викликом платформного скрипту й завантаженням `build/` як artifact.

## Кроки

1. Перевір, що `ci.sh` і `ci.bat` існують, прочитай їх і переконайся, що вони самостійно виконують установлення залежностей, збірку та тести.
2. Якщо хоча б одного CI-скрипту немає, зупинись і запропонуй виконати `/create-build`; не створюй workflow із відсутніми entrypoint-ами.
3. Перевір `.github/workflows/ci.yml`, якщо він існує. Збережи сумісні наявні налаштування та внеси лише необхідні зміни.
4. Створи workflow із `name: CI`; тригери `push` і `pull_request` обмеж на гілки `develop` та `master`.
5. Створи одну job `build` із `strategy.fail-fast: false` і `strategy.matrix.os: [ubuntu-latest, windows-latest, macos-latest]`.
6. Додай `actions/checkout@v4` та `actions/setup-node@v4` із Node.js 20.
7. Для Unix runner-ів додай крок з умовою `runner.os != 'Windows'`, який викликає тільки `bash ./ci.sh`.
8. Для Windows додай крок із `shell: cmd`, який викликає тільки `ci.bat`.
9. Додай `actions/upload-artifact@v4` для `build/`, з ім'ям artifact, що включає `${{ matrix.os }}`.
10. Не додавай секретів і не розміщуй команди `npm` у workflow: установлення, build і test мають виконуватись у `ci.sh`/`ci.bat`.
11. Після кожного кроку коротко звітуй `created`, `updated` або `skipped`, потім перевір workflow.

## Перевірки

- YAML синтаксично валідний.
- Workflow запускається на `ubuntu-latest`, `windows-latest`, `macos-latest`.
- Є тригер `push` і `pull_request` для `develop` та `master`.
- Використані `actions/checkout@v4`, `actions/setup-node@v4` із Node.js 20 та `actions/upload-artifact@v4`.
- У значеннях `run:` є лише виклики `bash ./ci.sh` або `ci.bat`; немає inline-команд `npm`.
- Artifact завантажує каталог `build/` і має ім'я з назвою ОС matrix.
- Workflow не містить секретів.

## Типова помилка і дія

Якщо відсутній `ci.sh` або `ci.bat`, зупинися й запропонуй `/create-build`. Якщо YAML невалідний або кроки містять команди, що суперечать вимогам, покажи помилку, виправ лише відповідну частину workflow і повтори перевірку. Не повідомляй про успіх, доки валідацію не пройдено.

## Ідемпотентність

Перед створенням workflow перевіряй, чи існує файл, і читай його вміст. Не перезаписуй наявний workflow повністю, якщо достатньо точкового оновлення. Перед додаванням перевіряй наявні triggers, jobs і steps, щоб не створювати дублікати. Повторний запуск має зберігати одну job build та один комплект потрібних кроків.
