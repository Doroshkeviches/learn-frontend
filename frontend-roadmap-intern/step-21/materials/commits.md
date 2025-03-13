####  Git rules

## ## Commits content requirements

Каждый коммит должен иметь

- либо готовый функционал/документацию
- либо завершенное исправление дефекта в коде
- либо завершен рефакторинг кода

Короче говоря, все изменения в коммите должны описываться одним предложением с одним предикатом.

**Почему это необходимо?**

— Когда наставник просматривает ваш пул-реквест, ему будет проще просмотреть список коммитов и проверить логику в каждом коммите отдельно, чем просматривать код всего приложения.
- Если логика одного коммита неверна, вы сможете «отменить» его, не мешая другим функциям.

## Соблюдает требования к имени

- Название коммита должно соответствовать [рекомендациям] (https://www.conventionalcommits.org/en/v1.0.0/)
– Необходимо использовать настоящее время (например, `add feature`, а не `added feature`).
- Необходимо использовать повелительное наклонение (например, `move cursor to ...`, а не `moves cursor to ...`)

### Примеры названий коммитов

- `init`: - используется для начала проекта или задачи.

**Примеры:**

  ```
  init: start youtube task
  init: start mentor-dashboard task
  ```

- `feat`: – используется для добавления новой функции (added zoom, added footer, updated product card etc.)

**Примеры:**

  ```
  feat: add basic page layout
  feat: implement search box
  feat: implement request to youtube API
  feat: implement swipe for horizontal list
  feat: add additional navigation button
  feat: add banner
  feat: add social links
  feat: add physical security section
  feat: add real social icons
  ```

- `fix`: – используется для исправления некоторых ошибок.

**Примеры:**

  ```
  fix: implement correct loading data from youtube
  fix: change layout for video items to fix bugs
  fix: relayout header for firefox
  fix: adjust social links for mobile
  ```

- `refactor`: – рефакторинг кода: функциональность приложения не изменилась, файлы были перемещены/созданы/удалены, изменено форматирование кода, улучшены алгоритмы, но функциональная часть осталась прежней.

**Примеры:**

  ```
  refactor: change structure of the project
  refactor: rename vars for better readability
  refactor: apply eslint
  refactor: apply prettier
  ```

- `docs`: – используется для обновлений docs/README.

**Примеры:**

  ```
  docs: update readme with additional information
  docs: update description of run() method
  ```
