# Создать документ note.document.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`note`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к модулю База знаний и правом «Редактирование» для нужной базы знаний

Метод `note.document.add` создает новый документ в базе знаний и возвращает его идентификатор.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **collectionId***
[`integer`](../../../data-types.md) | Идентификатор базы знаний.

Идентификатор можно получить методом [note.collection.list](../collection/note-collection-list.md) ||
|| **title***
[`string`](../../../data-types.md) | Заголовок документа.

Заголовок документа не должен превышать 255 символов ||
|| **parentId**
[`integer`](../../../data-types.md) | Идентификатор родительского документа.

Идентификатор можно получить методом [note.document.tree.list](./note-document-tree-list.md).

Используйте, если нужно создать вложенный документ. Родительский документ должен принадлежать той же базе знаний, что и `collectionId` ||
|| **markdown**
[`string`](../../../data-types.md) | Начальное содержимое документа в Markdown.

Максимальный размер: `1 048 576` байт ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/note.document.add`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"collectionId":42,"title":"Глава 1","parentId":10,"markdown":"# Глава 1\n\nТекст документа"}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/note.document.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"collectionId":42,"title":"Глава 1","parentId":10,"markdown":"# Глава 1\n\nТекст документа","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/note.document.add
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type DocumentAddResult = {
      id: number
    }

    try {
      const response = await $b24.actions.v3.call.make<DocumentAddResult>({
        method: 'note.document.add',
        params: {
          collectionId: 42,
          title: 'Глава 1',
          parentId: 10,
          markdown: '# Глава 1\n\nТекст документа',
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Document created:', result.id)
      }
    } catch (error) {
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function addDocument() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'note.document.add',
            params: {
              collectionId: 42,
              title: 'Глава 1',
              parentId: 10,
              markdown: '# Глава 1\n\nТекст документа',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Document created:', result.id)
        } catch (error) {
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addDocument)
    </script>
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'note.document.add',
                [
                    'collectionId' => 42,
                    'title' => 'Глава 1',
                    'parentId' => 10,
                    'markdown' => "# Глава 1\n\nТекст документа",
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error creating document: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'note.document.add',
        {
            collectionId: 42,
            title: 'Глава 1',
            parentId: 10,
            markdown: '# Глава 1\n\nТекст документа'
        },
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'note.document.add',
        [
            'collectionId' => 42,
            'title' => 'Глава 1',
            'parentId' => 10,
            'markdown' => "# Глава 1\n\nТекст документа"
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
    "result": {
        "id": 77
    },
    "time": {
        "start": 1780390800,
        "finish": 1780390800.214321,
        "duration": 0.21432113647460938,
        "processing": 0.17321419715881348,
        "date_start": "2026-06-16T12:00:00+03:00",
        "date_finish": "2026-06-16T12:00:00+03:00",
        "operating_reset_at": 1780391400,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с результатом создания документа ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор созданного документа ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "Обязательное поле `title` не указано",
                "field": "title"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `collectionId`
`title` | Обязательное поле `#FIELD#` не указано | Добавьте указанное поле в тело запроса ||
|| `collectionId`
`title`
`parentId`
`markdown` | В поле `#FIELD#` требуется тип данных `#TYPE#` для такого запроса | Убедитесь, что передаваемое значение нужного типа ||
|| `title` | Заголовок документа не может быть пустым | Передайте непустую строку в поле `title` ||
|| `title` | Заголовок документа не должен превышать 255 символов | Сократите значение `title` ||
|#

Код ошибки: `NOTE_MARKDOWN_TOO_LARGE`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `markdown` | Содержимое документа слишком большое. Максимально допустимый размер — `1 048 576` байт | Сократите содержимое `markdown` ||
|#

Код ошибки: `NOTE_INVALID_PARENT`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `parentId` | Родительский документ не принадлежит указанной коллекции | Укажите `parentId` документа из той же базы знаний, что и `collectionId`, или не передавайте `parentId` ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | У пользователя нет доступа к модулю База знаний или права создавать документы в указанной базе знаний ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `collectionId` | База знаний не найдена | Проверьте, что база знаний существует и доступна пользователю ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./note-document-update.md)
- [{#T}](./note-document-archive.md)
- [{#T}](./note-document-delete.md)
- [{#T}](./index.md)
