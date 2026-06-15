# Добавить сообщение в Ленту новостей log.blogpost.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`log`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `log.blogpost.add` добавляет сообщение в Ленту новостей.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **POST_MESSAGE***
[`string`](../data-types.md) | Текст сообщения ||
|| **POST_TITLE**
[`string`](../data-types.md) | Заголовок сообщения ||
|| **DEST**
[`array`](../data-types.md) | Список адресатов, которые получат право на просмотр сообщения.

Возможные значения:

{% include notitle [адресаты сообщения](./_includes/log-recepients.md) %}

По умолчанию — `UA`
||
|| **SPERM**
[`array`](../data-types.md) | Устаревший аналог `DEST` ||
|| **FILES**
[`array`](../data-types.md) | Массив файлов в формате, описанном в [работе с файлами](../files/how-to-upload-files.md).

Файлы будут загружены на Диск автора и привязаны к сообщению ||
|| **IMPORTANT**
[`string`](../data-types.md) | Признак важного сообщения.

Возможные значения:

- `Y` — сообщение важно
- `N` — сообщение не важное

По умолчанию — `N` ||
|| **IMPORTANT_DATE_END**
[`string`](../data-types.md) | Дата и время в формате ISO 8601, до которого сообщение будет считаться важным ||
|| **SITE_ID**
[`string`](../data-types.md) | Идентификатор сайта.

По умолчанию — текущий сайт ||
|| **USER_ID**
[`integer`](../data-types.md) | Идентификатор пользователя, от имени которого публикуется сообщение. Доступно только администраторам.

Идентификатор можно получить с помощью метода [user.get](../user/user-get.md)

По умолчанию — текущий пользователь, инициировавший вызов метода ||
|| **TAGS**
[`string`](../data-types.md) | Теги сообщения ||
|| **BACKGROUND_CODE**
[`string`](../data-types.md) | Код фона сообщения ||
|| **PARSE_PREVIEW**
[`string`](../data-types.md) | Автоматическое добавление превью ссылки из текста сообщения.

Возможные значения:
- `Y` — попытаться сформировать превью ссылки из `POST_MESSAGE`
- `N` — не формировать превью

По умолчанию — `N` ||
|| **UF_\***
[`mixed`](../data-types.md) | Пользовательские поля. Поддерживается определенный [набор полей](#uf-fields), который зависит от настроек портала ||
|#

### Пользовательские поля{#uf-fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **UF_BLOG_POST_FILE**
[`array`](../data-types.md) | Альтернатива `FILES`.

Передавайте список идентификаторов файлов Диска в формате `['n<ID_файла_диска>']`.

Получить идентификатор можно с помощью методов [disk.storage.getchildren](../disk/storage/disk-storage-get-children.md) и [disk.folder.getchildren](../disk/folder/disk-folder-get-children.md)

{% note info "" %}

При указании `FILES` параметр `UF_BLOG_POST_FILE` игнорируется

{% endnote %}  ||
|| **UF_BLOG_POST_IMPRTNT**
[`integer`](../data-types.md) | Признак важного сообщения.

Заполняется автоматически при `IMPORTANT = 'Y'` ||
|| **UF_IMPRTANT_DATE_END**
[`datetime`](../data-types.md#datetime) | Срок действия важного сообщения.

Заполняется автоматически при переданном `IMPORTANT_DATE_END` ||
|| **UF_BLOG_POST_URL_PRV**
[`integer`](../data-types.md) | Превью ссылки из текста сообщения.

Заполняется автоматически при `PARSE_PREVIEW = 'Y'`, если превью удалось сформировать ||
|| **UF_GRATITUDE**
[`integer`](../data-types.md) | Данные функционала Благодарность в формате:

```js
 GRATITUDE_MEDAL: '<XML_ID_медали>',
 GRATITUDE_EMPLOYEES: [<ID_пользователя>]
```
||
|| **UF_BLOG_POST_VOTE**
[`integer`](../data-types.md) | Данные опроса в формате:

```js
UF_BLOG_POST_VOTE: 'n<ID_опроса>',
'UF_BLOG_POST_VOTE_n<ID_опроса>_DATA': {
    QUESTIONS: [
        {
            QUESTION: 'Вопрос',
            FIELD_TYPE: 0, // Тип выбора: 0 — один вариант, 1 — несколько вариантов
            ANSWERS: [
                { MESSAGE: 'Ответ 1' },
                { MESSAGE: 'Ответ 2' }
            ]
        }
    ],
    ANONYMITY: 0, // Анонимность голосования: 0 — нет, 1 — да
    OPTIONS: 0 // Переголосование: 0 — запрещено, 1 — разрешено
}
```
При создании нового опроса используйте произвольный идентификатор с префиксом `n` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"POST_TITLE":"Новый регламент","POST_MESSAGE":"С 1 ноября обновляется процесс согласования.","DEST":["UA"],"TAGS":"регламент,согласование,обновление","IMPORTANT":"Y","FILES":[["first-image.jpg","iVBORw0KGgoAAAANSUhEUgAAAAUA..."],["second-image.jpg","iVBORw0KGgoAAAANSUhEUgAAAAUA..."]]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/log.blogpost.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"POST_TITLE":"Новый регламент","POST_MESSAGE":"С 1 ноября обновляется процесс согласования.","DEST":["UA"],"TAGS":"регламент,согласование,обновление","IMPORTANT":"Y","FILES":[["first-image.jpg","iVBORw0KGgoAAAANSUhEUgAAAAUA..."],["second-image.jpg","iVBORw0KGgoAAAANSUhEUgAAAAUA..."]],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/log.blogpost.add
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
        method: 'log.blogpost.add',
        params: {
          POST_TITLE: 'New regulation',
          POST_MESSAGE: 'As of November 1, the approval process is being updated.',
          DEST: ['UA'],
          TAGS: 'regulation,approval,update',
          IMPORTANT: 'Y',
          FILES: [
            ['first-image.jpg', 'iVBORw0KGgoAAAANSUhEUgAAAAUA...'],
            ['second-image.jpg', 'iVBORw0KGgoAAAANSUhEUgAAAAUA...'],
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created blog post with ID:', result)
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
      async function addBlogpost() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'log.blogpost.add',
            params: {
              POST_TITLE: 'New regulation',
              POST_MESSAGE: 'As of November 1, the approval process is being updated.',
              DEST: ['UA'],
              TAGS: 'regulation,approval,update',
              IMPORTANT: 'Y',
              FILES: [
                ['first-image.jpg', 'iVBORw0KGgoAAAANSUhEUgAAAAUA...'],
                ['second-image.jpg', 'iVBORw0KGgoAAAANSUhEUgAAAAUA...'],
              ],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Created blog post with ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addBlogpost)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'log.blogpost.add',
                [
                    'POST_TITLE' => 'Новый регламент',
                    'POST_MESSAGE' => 'С 1 ноября обновляется процесс согласования.',
                    'DEST' => ['UA'],
                    'TAGS' => 'регламент,согласование,обновление',
                    'IMPORTANT' => 'Y',
                    'FILES' => [
                        ['first-image.jpg', 'iVBORw0KGgoAAAANSUhEUgAAAAUA...'],
                        ['second-image.jpg', 'iVBORw0KGgoAAAANSUhEUgAAAAUA...']
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding blog post: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'log.blogpost.add',
        {
            POST_TITLE: 'Новый регламент',
            POST_MESSAGE: 'С 1 ноября обновляется процесс согласования.',
            DEST: ['UA'],
            TAGS: 'регламент,согласование,обновление',
            IMPORTANT: 'Y',
            FILES: [
                ['first-image.jpg', 'iVBORw0KGgoAAAANSUhEUgAAAAUA...'],
                ['second-image.jpg', 'iVBORw0KGgoAAAANSUhEUgAAAAUA...']
            ]
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error(), result.error_description());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'log.blogpost.add',
        [
            'POST_TITLE' => 'Новый регламент',
            'POST_MESSAGE' => 'С 1 ноября обновляется процесс согласования.',
            'DEST' => ['UA'],
            'TAGS' => 'регламент,согласование,обновление',
            'IMPORTANT' => 'Y',
            'FILES' => [
                ['first-image.jpg', 'iVBORw0KGgoAAAANSUhEUgAAAAUA...'],
                ['second-image.jpg', 'iVBORw0KGgoAAAANSUhEUgAAAAUA...']
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 217,
    "time": {
        "start": 1773750554,
        "finish": 1773750555.955794,
        "duration": 1.955794095993042,
        "processing": 1,
        "date_start": "2026-03-17T15:29:14+03:00",
        "date_finish": "2026-03-17T15:29:15+03:00",
        "operating_reset_at": 1773751154,
        "operating": 0.9908020496368408
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../data-types.md) | Идентификатор созданного сообщения ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "SONET_CONTROLLER_LIVEFEED_BLOGPOST_ADD_ERROR",
    "error_description": "Blog post hasn't been added"
}
```

{% include notitle [Обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `SONET_CONTROLLER_LIVEFEED_BLOGPOST_ADD_ERROR` | `Blog post hasn't been added` | Общая ошибка сохранения сообщения, например, при пустом `POST_MESSAGE` ||
|| `SONET_CONTROLLER_LIVEFEED_BLOGPOST_ADD_ERROR` | `No destination specified` | Не удалось определить получателей сообщения ||
|| `SONET_CONTROLLER_LIVEFEED_BLOGPOST_MODULE_BLOG_NOT_INSTALLED` | `Blog module is not installed` | Модуль `blog` не установлен ||
|| `SONET_CONTROLLER_LIVEFEED_BLOG_NOT_FOUND` | `Blog not found` | Не удалось получить блог, к которому относится сообщение ||
|| — | `Cannot add blog post` | Внутренняя ошибка при создании сообщения ||
|#

{% include [Системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./log-blogpost-update.md)
- [{#T}](./log-blogpost-get.md)
- [{#T}](./log-blogpost-delete.md)
- [{#T}](./log-blogpost-share.md)
- [{#T}](./log-blogpost-getusers-important.md)
