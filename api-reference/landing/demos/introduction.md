# Как подготовить пользовательский шаблон

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужно самое строгое из перечисленных прав — право «экспорт» сайтов
>
> - [landing.site.fullExport](../site/landing-site-full-export.md) — пользователь с правом «экспорт» сайтов
> - [landing.demos.register](./landing-demos-register.md) и [landing.demos.getList](./landing-demos-get-list.md) — пользователь с правом Просмотр в разделе Сайты

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Пользовательский шаблон — это готовая заготовка сайта или страницы, которую можно добавить в мастер создания сайтов. Мастер — это экран, на котором пользователь Битрикс24 выбирает оформление при создании нового сайта или страницы. Свой шаблон появляется в этом списке после того, как приложение его зарегистрирует.

Шаблон создают на основе уже готового сайта или страницы из [раздела Сайты](../site/index.md). Сначала сайт экспортируют — выгружают его структуру в набор данных, который можно сохранить и передать дальше. Затем этот набор регистрируют [методами `landing.demos.*`](./index.md) из приложения Битрикс24.

Проверяемый результат: шаблон зарегистрирован для приложения, возвращается методом `landing.demos.getList` и отображается в мастере создания сайта или страницы.

Сценарий состоит из трех шагов:

1. Экспортировать готовый сайт методом [landing.site.fullExport](../site/landing-site-full-export.md)
2. Передать результат экспорта в [landing.demos.register](./landing-demos-register.md)
3. Проверить регистрацию методом [landing.demos.getList](./landing-demos-get-list.md)

Порядок вызовов важен: `landing.demos.register` принимает объект `result`, который возвращает `landing.site.fullExport`, а `landing.demos.getList` проверяет результат регистрации.

## Когда использовать пользовательский шаблон

Используйте пользовательский шаблон, если нужно:

- добавить собственный шаблон в мастер создания сайтов
- распространять готовый сайт или страницу через приложение
- повторно использовать один и тот же набор страниц, блоков и настроек

Если шаблон нужно только установить в одном Битрикс24 без повторного использования, достаточно создать и настроить сайт или страницу обычным способом.

{% note tip "" %}

Если шаблон распространяется как приложение с сайтом, смотрите статьи [Установка шаблонов сайтов](../../../settings/app-installation/site-templates-installation.md) и [Требования к сайтам перед публикацией](../../../market/preparing-to-publish/requirements-sites.md).

{% endnote %}

## Как устроен пользовательский шаблон

Шаблон собирается из трех частей, связанных между собой:

- **исходный сайт или страница** — основа шаблона, ее готовят в [разделе Сайты](../site/index.md)
- **экспорт** — структура сайта в виде данных, которую создает метод [landing.site.fullExport](../site/landing-site-full-export.md)
- **зарегистрированный шаблон** — запись, которая появляется в мастере после вызова [landing.demos.register](./landing-demos-register.md)

Методы `landing.demos.*` выполняют отдельные операции с шаблоном:

- [landing.demos.register](./landing-demos-register.md) — регистрирует шаблон в мастере создания сайта и страницы
- [landing.demos.getList](./landing-demos-get-list.md) — возвращает зарегистрированные шаблоны и позволяет проверить результат регистрации. Если метод вызван из приложения, в ответ попадают только шаблоны этого приложения
- [landing.demos.getSiteList](./landing-demos-get-site-list.md) — возвращает шаблоны сайтов, которые доступны в мастере для выбранного типа сайта. В список попадают и встроенные шаблоны Битрикс24, и подходящие шаблоны, которые вы зарегистрировали. Например, для типа `store` метод вернет шаблоны интернет-магазинов
- [landing.demos.getPageList](./landing-demos-get-page-list.md) — возвращает шаблоны страниц, которые доступны в мастере для выбранного типа сайта
- [landing.demos.unregister](./landing-demos-unregister.md) — удаляет зарегистрированный шаблон

## Как подготовить шаблон

Перед экспортом проверьте сам сайт:

- страницы связаны между собой корректно
- используются нужные блоки и темы
- изображения и внешние ресурсы доступны по рабочим URL
- название, описание и изображения предпросмотра подготовлены для шаблона

Если сайт многостраничный, используйте одну тему для всех страниц. Это помогает сохранить единый внешний вид после установки шаблона.

## Подготовьте данные

Перед началом подготовьте:

- идентификатор сайта, который станет основой шаблона
- внешний код шаблона, например `myfirstsite2026`
- URL опубликованной страницы для `preview_url`
- установленное приложение с OAuth-авторизацией и правом `landing`
- установленный и инициализированный SDK: [B24JsSDK](../../../sdk/b24jssdk/index.md), [B24PhpSDK](../../../sdk/b24phpsdk/index.md) или [B24PySDK](../../../sdk/b24pysdk/index.md)

Идентификатор сайта можно получить методом [landing.site.getList](../site/landing-site-get-list.md) или из результата метода [landing.site.add](../site/landing-site-add.md). Внешний код должен содержать только строчные латинские буквы и цифры без разделителей.

В примерах замените `326`, `myfirstsite2026` и URL предпросмотра своими значениями. Выполняйте примеры выбранной вкладки последовательно в одном скрипте: переменная с результатом экспорта используется на следующем шаге.

{% note warning "" %}

OAuth-токен дает доступ к Битрикс24. Храните его в настройках приложения или переменных окружения и не добавляйте в исходный код.

{% endnote %}

## 1. Экспортируйте сайт

Вызовите [landing.site.fullExport](../site/landing-site-full-export.md). В параметре `id` передайте идентификатор сайта, а в `params.code` — внешний код шаблона. Метод вернет полную структуру сайта в поле `result`.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    // $b24 — предварительно инициализированный экземпляр B24JsSDK
    const exportResponse = await $b24.actions.v2.call.make({
      method: 'landing.site.fullExport',
      params: {
        id: 326,
        params: {
          code: 'myfirstsite2026',
          name: 'Сайт автомастерской',
          preview_url: 'https://example.com/previews/myfirstsite2026'
        }
      }
    })

    if (!exportResponse.isSuccess) {
      throw new Error(exportResponse.getErrorMessages().join('; '))
    }

    const exportData = exportResponse.getData().result
    ```

- PHP

    ```php
    // $b24Service — предварительно инициализированный B24PhpSDK
    $response = $b24Service->core->call(
        'landing.site.fullExport',
        [
            'id' => 326,
            'params' => [
                'code' => 'myfirstsite2026',
                'name' => 'Сайт автомастерской',
                'preview_url' => 'https://example.com/previews/myfirstsite2026',
            ],
        ]
    );

    $exportData = $response->getResponseData()->getResult();
    ```

- Python

    ```python
    # client — предварительно инициализированный B24PySDK
    export_data = client.landing.site.full_export(
        bitrix_id=326,
        params={
            "code": "myfirstsite2026",
            "name": "Сайт автомастерской",
            "preview_url": "https://example.com/previews/myfirstsite2026",
        },
    ).response.result
    ```

{% endlist %}

Сокращенный ответ:

```json
{
    "result": {
        "charset": "UTF-8",
        "code": "myfirstsite2026",
        "name": "Сайт автомастерской",
        "type": "page",
        "version": 3,
        "items": {
            "myfirstsite2026": {
                "code": "myfirstsite2026",
                "name": "Сайт автомастерской",
                "type": "page",
                "version": 3,
                "items": {}
            }
        }
    }
}
```

Сохраните весь объект `result`, а не только отдельные поля. Переменные `exportData`, `$exportData` и `export_data` содержат данные для следующего шага.

## 2. Зарегистрируйте шаблон

Передайте сохраненный объект экспорта в параметр `data` метода [landing.demos.register](./landing-demos-register.md). Не перестраивайте структуру вручную: в ней уже есть внешний код `code`, карта страниц `items`, поля, блоки и настройки сайта.

Примеры продолжают код первого шага.

{% list tabs %}

- JS

    ```js
    const registerResponse = await $b24.actions.v2.call.make({
      method: 'landing.demos.register',
      params: {
        data: exportData
      }
    })

    if (!registerResponse.isSuccess) {
      throw new Error(registerResponse.getErrorMessages().join('; '))
    }

    const registeredTemplateIds = registerResponse.getData().result
    if (registeredTemplateIds.length === 0) {
      throw new Error('Шаблон не зарегистрирован')
    }
    ```

- PHP

    ```php
    $response = $b24Service->core->call(
        'landing.demos.register',
        [
            'data' => $exportData,
        ]
    );

    $registeredTemplateIds = $response->getResponseData()->getResult();
    if ($registeredTemplateIds === []) {
        throw new RuntimeException('Шаблон не зарегистрирован');
    }
    ```

- Python

    ```python
    registered_template_ids = client.landing.demos.register(
        data=export_data,
    ).response.result

    if not registered_template_ids:
        raise RuntimeError("Шаблон не зарегистрирован")
    ```

{% endlist %}

Успешный ответ содержит идентификаторы созданных или обновленных шаблонов:

```json
{
    "result": [5]
}
```

Сохраните массив `result`. Если он пуст, не переходите к проверке в интерфейсе и проверьте данные запроса.

## 3. Проверьте регистрацию шаблона

Вызовите [landing.demos.getList](./landing-demos-get-list.md) и найдите запись с внешним кодом `XML_ID`, равным `myfirstsite2026`. Метод, вызванный из приложения, возвращает только шаблоны этого приложения.

{% list tabs %}

- JS

    ```js
    const listResponse = await $b24.actions.v2.call.make({
      method: 'landing.demos.getList',
      params: {
        params: {
          select: ['ID', 'XML_ID', 'TITLE', 'TYPE']
        }
      }
    })

    if (!listResponse.isSuccess) {
      throw new Error(listResponse.getErrorMessages().join('; '))
    }

    const template = listResponse
      .getData()
      .result
      .find((item) => item.XML_ID === 'myfirstsite2026')

    if (!template) {
      throw new Error('Шаблон не найден')
    }
    ```

- PHP

    ```php
    $response = $b24Service->core->call(
        'landing.demos.getList',
        [
            'params' => [
                'select' => ['ID', 'XML_ID', 'TITLE', 'TYPE'],
            ],
        ]
    );

    $templates = $response->getResponseData()->getResult();
    $template = array_values(array_filter(
        $templates,
        static fn(array $item): bool => $item['XML_ID'] === 'myfirstsite2026'
    ))[0] ?? null;
    if ($template === null) {
        throw new RuntimeException('Шаблон не найден');
    }
    ```

- Python

    ```python
    templates = client.landing.demos.get_list(
        params={
            "select": ["ID", "XML_ID", "TITLE", "TYPE"],
        },
    ).response.result

    template = next(
        (item for item in templates if item["XML_ID"] == "myfirstsite2026"),
        None,
    )

    if template is None:
        raise RuntimeError("Шаблон не найден")
    ```

{% endlist %}

Сокращенный ответ:

```json
{
    "result": [
        {
            "ID": "5",
            "XML_ID": "myfirstsite2026",
            "TITLE": "Сайт автомастерской",
            "TYPE": "page"
        }
    ]
}
```

## Проверим результат

Сценарий выполнен успешно, если:

- `landing.demos.register` вернул непустой массив идентификаторов
- `landing.demos.getList` вернул шаблон с ожидаемыми значениями `XML_ID`, `TITLE` и `TYPE`
- шаблон появился в мастере создания сайта или страницы и открывается его предпросмотр

## Ошибки и диагностика

- `BX_EMPTY_REQUIRED` на втором шаге — проверьте `data.code` и поле `code` у каждой страницы в `data.items`
- `REGISTER_ERROR_DATA` на втором шаге — передайте в `data` весь объект `result` из `landing.site.fullExport`
- `CONTENT_IS_BAD` на втором шаге — проверьте содержимое шаблона методом `landing.repo.checkcontent`, затем повторите регистрацию
- `AI_SITE_EXPORT_NOT_ALLOWED` на первом шаге — экспорт AI-сайтов не поддерживается. Выберите другой сайт
- `ACCESS_DENIED` на первом шаге — проверьте право пользователя на «экспорт» сайтов; на втором и третьем шагах — право Просмотр в разделе Сайты
- **Шаблон не найден на третьем шаге** — проверьте `XML_ID`, контекст приложения и результат `landing.demos.register`, затем повторите третий шаг
- **Предпросмотр не открывается** — проверьте доступность `preview_url` без авторизации

## Что важно учитывать {#important}

- для многостраничного сайта передавайте в `data` весь результат `landing.site.fullExport`, включая карту страниц `items`
- поле `type` задает назначение шаблона, а `tpl_type` — его место в мастере: `S` для сайта и `P` для страницы
- внешние изображения и `preview_url` должны оставаться доступными после регистрации шаблона
- передавайте OAuth-токены только через настройки приложения или переменные окружения, не добавляйте их в исходный код
- для локализации названия и описания передайте в `landing.demos.register` параметры `lang` и `lang_original`
- для удаления шаблона получите его внешний код `XML_ID` методом `landing.demos.getList` и передайте код в [landing.demos.unregister](./landing-demos-unregister.md)

## Продолжите изучение

- [Обзор методов пользовательских шаблонов](./index.md)
- [Зарегистрировать шаблон в мастере создания сайта](./landing-demos-register.md)
- [Получить список зарегистрированных шаблонов](./landing-demos-get-list.md)
- [Получить список шаблонов для создания сайтов](./landing-demos-get-site-list.md)
- [Получить список шаблонов для создания страниц](./landing-demos-get-page-list.md)
- [Удалить зарегистрированный шаблон](./landing-demos-unregister.md)
- [Экспортировать сайт](../site/landing-site-full-export.md)
- [Локализация шаблона](./localization.md)
