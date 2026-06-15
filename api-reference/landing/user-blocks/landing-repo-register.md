# Добавить пользовательский блок в репозиторий landing.repo.register

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Просмотр в разделе Сайты

Метод `landing.repo.register` добавляет новый пользовательский блок в репозиторий.

Метод обновляет блок, если он уже существует с этим же кодом для текущего приложения. Если не существует — создает новый.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **code**^*^
[`string`](../../data-types.md) | Уникальный код блока ||
|| **fields**^*^
[`object`](../../data-types.md) | Поля блока [подробнее](#fields) ||
|| **manifest**
[`object`](../../data-types.md) | Манифест блока.

Структуру манифеста смотрите в методе [landing.block.getManifestFile](../block/methods/landing-block-get-manifest-file.md) и в разделе [Файл манифеста](../block/manifest.md) ||
|#

### Тип fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME**^*^
[`string`](../../data-types.md) | Название блока ||
|| **CONTENT**^*^
[`string`](../../data-types.md) | HTML-содержимое блока. Перед сохранением проходит sanitize-проверку ||
|| **SECTIONS**^*^
[`string`](../../data-types.md) | Категории блока строкой через запятую, например `cover,about` ||
|| **PREVIEW**^*^
[`string`](../../data-types.md) | URL превью блока ||
|| **DESCRIPTION**
[`string`](../../data-types.md) | Описание блока ||
|| **ACTIVE**
[`string`](../../data-types.md) | Активность блока (`Y`/`N`) ||
|| **SITE_TEMPLATE_ID**
[`string`](../../data-types.md) | Привязка блока к шаблону сайта ||
|| **RESET**
[`string`](../../data-types.md) | Если передать `Y`, метод регистрирует обновление добавленных на страницы блоков с кодом `repo_<ID>` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример регистрации блока, где:
- `code` — уникальный код блока `myblockx`
- `fields` — основные параметры блока (`NAME`, `DESCRIPTION`, `SECTIONS`, `PREVIEW`, `CONTENT`)
- `manifest` — базовый манифест блока с описанием `block` и `nodes`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "code": "myblockx",
        "fields": {
          "NAME": "Test block",
          "DESCRIPTION": "Just try!",
          "SECTIONS": "cover,about",
          "PREVIEW": "https://www.bitrix24.ru/images/b24_screen.png",
          "CONTENT": "<section class=\"landing-block\"><div class=\"container\">Test</div></section>"
        },
        "manifest": {
          "block": {"name": "Test block"},
          "nodes": {
            ".landing-block-node-text": {"name": "Text", "type": "text"}
          }
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.repo.register.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "code": "myblockx",
        "fields": {
          "NAME": "Test block",
          "SECTIONS": "cover,about",
          "PREVIEW": "https://www.bitrix24.ru/images/b24_screen.png",
          "CONTENT": "<section class=\"landing-block\"><div class=\"container\">Test</div></section>"
        },
        "manifest": {
          "block": {"name": "Test block"}
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.repo.register.json"
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'landing.repo.register',
        params: {
          code: 'myblockx',
          fields: {
            NAME: 'Test block',
            DESCRIPTION: 'Just try!',
            SECTIONS: 'cover,about',
            PREVIEW: 'https://www.bitrix24.ru/images/b24_screen.png',
            CONTENT: '<section class="landing-block"><div class="container">Test</div></section>',
          },
          manifest: {
            block: { name: 'Test block' },
            nodes: {
              '.landing-block-node-text': { name: 'Text', type: 'text' },
            },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Registered block id:', result)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function registerBlock() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'landing.repo.register',
            params: {
              code: 'myblockx',
              fields: {
                NAME: 'Test block',
                DESCRIPTION: 'Just try!',
                SECTIONS: 'cover,about',
                PREVIEW: 'https://www.bitrix24.ru/images/b24_screen.png',
                CONTENT: '<section class="landing-block"><div class="container">Test</div></section>',
              },
              manifest: {
                block: { name: 'Test block' },
                nodes: {
                  '.landing-block-node-text': { name: 'Text', type: 'text' },
                },
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Registered block id:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', registerBlock)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.repo.register',
                [
                    'code' => 'myblockx',
                    'fields' => [
                        'NAME' => 'Test block',
                        'DESCRIPTION' => 'Just try!',
                        'SECTIONS' => 'cover,about',
                        'PREVIEW' => 'https://www.bitrix24.ru/images/b24_screen.png',
                        'CONTENT' => '<section class="landing-block"><div class="container">Test</div></section>',
                    ],
                    'manifest' => [
                        'block' => ['name' => 'Test block'],
                        'nodes' => [
                            '.landing-block-node-text' => ['name' => 'Text', 'type' => 'text'],
                        ],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling landing.repo.register: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.repo.register',
        {
            code: 'myblockx',
            fields: {
                NAME: 'Test block',
                DESCRIPTION: 'Just try!',
                SECTIONS: 'cover,about',
                PREVIEW: 'https://www.bitrix24.ru/images/b24_screen.png',
                CONTENT: '<section class="landing-block"><div class="container">Test</div></section>'
            },
            manifest: {
                block: { name: 'Test block' },
                nodes: {
                    '.landing-block-node-text': { name: 'Text', type: 'text' }
                }
            }
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'landing.repo.register',
        [
            'code' => 'myblockx',
            'fields' => [
                'NAME' => 'Test block',
                'DESCRIPTION' => 'Just try!',
                'SECTIONS' => 'cover,about',
                'PREVIEW' => 'https://www.bitrix24.ru/images/b24_screen.png',
                'CONTENT' => '<section class="landing-block"><div class="container">Test</div></section>',
            ],
            'manifest' => [
                'block' => ['name' => 'Test block'],
            ],
        ]
    );

    echo '<pre>';
    print_r($result);
    echo '</pre>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 7,
    "time": {
        "start": 1774879194,
        "finish": 1774879194.526507,
        "duration": 0.5265069007873535,
        "processing": 0,
        "date_start": "2026-03-30T16:59:54+03:00",
        "date_finish": "2026-03-30T16:59:54+03:00",
        "operating_reset_at": 1774879794,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Идентификатор добавленного или обновленного блока в репозитории ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "MANIFEST_INTERSECT_IMG",
    "error_description": "Редактируемый элемент манифеста \".landing-block-node-text\" не может иметь стилевой тип \"Изображение\". Измените стилевой тип."
}
```

```json
{
    "error": "ERROR_ARGUMENT",
    "error_description": "The value of an argument 'code' has an invalid type",
    "argument": "code"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ACCESS_DENIED` | Недостаточно прав | Пользователь не прошел общие проверки доступа ||
|| `ERROR_ARGUMENT` | Некорректный тип аргумента | Передан аргумент в неверном типе. Название аргумента возвращается в поле `argument` ||
|| `MISSING_PARAMS` | Недостаточно параметров вызова | Не передан обязательный параметр (`code` или `fields`) ||
|| `REQUIRED_FIELD_NO_EXISTS` | Отсутствует обязательное поле | Не передано одно из полей: `NAME`, `CONTENT`, `SECTIONS`, `PREVIEW` ||
|| `MANIFEST_INTERSECT_IMG` | Конфликт типов в манифесте | Для одного селектора задан `node` и стиль с типом `background`, `block-default` или `block-border` ||
|| `CONTENT_IS_BAD` | Небезопасный контент блока | Поле `fields.CONTENT` не прошло sanitize-проверку ||
|| `PRESET_CONTENT_IS_BAD` | Небезопасный контент пресета | Небезопасное содержимое в `manifest.cards[*].presets[*]` ||
|| `UNSUPPORTED_BLOCK_TYPE` | Неподдерживаемый тип блока | В коде метода проверяется ограничение на `MAINPAGE` в `manifest.block.type` ||
|| `UNSUPPORTED_BLOCK_SUBTYPE` | Неподдерживаемый подтип блока | В `manifest.block.subtype` передан `widget` ||
|| `insufficient_scope` | Недостаточно scope у токена | Токен не содержит scope `landing` ||
|| `SYSTEM_ERROR` | Внутренняя ошибка | Ошибка выполнения на стороне сервера ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-repo-check-content.md)
- [{#T}](./landing-repo-get-list.md)
- [{#T}](./landing-repo-unregister.md)
- [{#T}](./index.md)
