# Пользовательские блоки: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Пользовательские блоки добавляют в репозиторий приложения для сайтов и страниц.

Группа методов `landing.repo.*` позволяет работать с пользовательскими блоками. В разделе можно проверить контент, зарегистрировать блок в репозитории, получить список пользовательских блоков и удалить ненужный блок.

> Быстрый переход: [все методы](#all-methods)

## Как начать работу

1. Подготовьте HTML блока, превью и его основные поля
2. Если для блока нужен манифест, подготовьте его по статье [Файл манифеста](../block/manifest.md)
3. Если нужно проверить HTML перед регистрацией, используйте метод [landing.repo.checkContent](./landing-repo-check-content.md)
4. Зарегистрируйте блок методом [landing.repo.register](./landing-repo-register.md)
5. Получите список пользовательских блоков и их коды методом [landing.repo.getList](./landing-repo-get-list.md)
6. Удалите ненужный блок методом [landing.repo.unregister](./landing-repo-unregister.md)

## Основные параметры

**code.** Уникальный код блока. Его используют при регистрации и удалении. Если повторно зарегистрировать блок с тем же `code`, метод [landing.repo.register](./landing-repo-register.md) обновит существующий блок текущего приложения.

**XML_ID.** Внешний код блока в результате [landing.repo.getList](./landing-repo-get-list.md). Его можно использовать как значение параметра `code` при удалении блока через [landing.repo.unregister](./landing-repo-unregister.md).

**CONTENT.** HTML-содержимое блока. Поле `CONTENT` проходит sanitize-проверку при регистрации. Для предварительной проверки HTML можно использовать [landing.repo.checkContent](./landing-repo-check-content.md).

**SECTIONS.** Категории блока строкой через запятую. Значение передают в `fields` метода [landing.repo.register](./landing-repo-register.md). Пример: `cover,about`.

**PREVIEW.** URL превью блока. Значение передают в `fields` метода [landing.repo.register](./landing-repo-register.md).

**SITE_TEMPLATE_ID.** Привязка блока к шаблону сайта. Значение передают в `fields` метода [landing.repo.register](./landing-repo-register.md), если блок должен использоваться только с определенным шаблоном.

**RESET.** Признак обновления блоков с кодом `repo_<ID>`, которые уже добавлены на страницы. Значение передают в `fields` метода [landing.repo.register](./landing-repo-register.md).

## Связь с другими объектами

**Блоки Landing.** Пользовательский блок строится по тем же принципам, что и блоки Landing. При регистрации можно передать параметр `manifest`.

Структуру манифеста смотрите в методе [landing.block.getManifestFile](../block/methods/landing-block-get-manifest-file.md) и в статье [Файл манифеста](../block/manifest.md).

**Репозиторий приложения.** Методы `landing.repo.*` работают с блоками, которые приложение добавляет в собственный репозиторий. Список таких блоков возвращает [landing.repo.getList](./landing-repo-get-list.md).

**Шаблон сайта.** Если блок нужно ограничить определенным шаблоном сайта, при регистрации используют параметр `SITE_TEMPLATE_ID` в методе [landing.repo.register](./landing-repo-register.md).

## Обзор методов {#all-methods}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Просмотр в разделе Сайты

#|
|| **Метод** | **Описание** ||
|| [landing.repo.register](./landing-repo-register.md) | Регистрирует пользовательский блок в репозитории ||
|| [landing.repo.checkContent](./landing-repo-check-content.md) | Проверяет контент блока через санитайзер ||
|| [landing.repo.getList](./landing-repo-get-list.md) | Получает список пользовательских блоков из репозитория ||
|| [landing.repo.unregister](./landing-repo-unregister.md) | Удаляет пользовательский блок из репозитория по его коду ||
|#
