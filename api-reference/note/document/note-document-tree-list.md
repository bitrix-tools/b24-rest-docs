# Получить дерево документов note.document.tree.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`note`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к модулю База знаний и правом «Просмотр» для базы знаний документа

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `note.document.tree.list` возвращает дерево документов одной базы знаний.

{% note info "" %}

Архивные документы не попадают в ответ.

{% endnote %}

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **collectionId***
[`integer`](../../data-types.md) | Идентификатор базы знаний.

Идентификатор можно получить методом [note.collection.list](../collection/note-collection-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/note.document.tree.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"collectionId":123}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/note.document.tree.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"collectionId":123,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/note.document.tree.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type TreeNode = {
      id: number
      collectionId: number
      parentId: number | null
      title: string
      position: number
      children: TreeNode[]
    }

    type DocumentTreeListResult = {
      items: TreeNode[]
      truncated: boolean
    }

    try {
      const response = await $b24.actions.v3.call.make<DocumentTreeListResult>({
        method: 'note.document.tree.list',
        params: {
          collectionId: 123,
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Tree roots:', result.items.length, result.truncated)
      }
    } catch (error) {
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getDocumentTree() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'note.document.tree.list',
            params: {
              collectionId: 123,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Tree roots:', result.items.length, result.truncated)
        } catch (error) {
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getDocumentTree)
    </script>
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'note.document.tree.list',
                [
                    'collectionId' => 123,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting document tree: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'note.document.tree.list',
        {
            collectionId: 123
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
        'note.document.tree.list',
        [
            'collectionId' => 123
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
        "items": [
            {
                "id": 10,
                "collectionId": 123,
                "parentId": null,
                "title": "Введение",
                "position": 1,
                "children": [
                    {
                        "id": 11,
                        "collectionId": 123,
                        "parentId": 10,
                        "title": "Глава 1",
                        "position": 1,
                        "children": []
                    }
                ]
            }
        ],
        "truncated": false
    },
    "time": {
        "start": 1780639500,
        "finish": 1780639500.268512,
        "duration": 0.2685120105743408,
        "processing": 0.22631406784057617,
        "date_start": "2026-06-19T10:05:00+03:00",
        "date_finish": "2026-06-19T10:05:00+03:00",
        "operating_reset_at": 1780640100,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с деревом документов ||
|| **items**
[`array`](../../data-types.md) | Корневые узлы дерева документов ||
|| **items[]**
[`object`](../../data-types.md) | Объект документа дерева ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор документа ||
|| **collectionId**
[`integer`](../../data-types.md) | Идентификатор базы знаний ||
|| **parentId**
[`integer`](../../data-types.md) | Идентификатор родительского документа или `null` для корневой страницы ||
|| **title**
[`string`](../../data-types.md) | Заголовок документа ||
|| **position**
[`integer`](../../data-types.md) | Позиция документа среди соседних страниц ||
|| **children**
[`array`](../../data-types.md) | Дочерние страницы документа ||
|| **truncated**
[`boolean`](../../data-types.md) | Значение `true`, если дерево превышало внутренний лимит `TREE_MAX_NODES = 5000` и было обрезано по корневым узлам.

Исключение — первый корневой документ. Если он один превышает внутренний лимит `TREE_MAX_NODES`, метод вернет его начальную часть в порядке обхода в ширину, чтобы ответ не оказался пустым ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
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
                "message": "Обязательное поле `collectionId` не указано",
                "field": "collectionId"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `collectionId` | Обязательное поле `collectionId` не указано | Добавьте `collectionId` в тело запроса ||
|| `collectionId` | В поле `collectionId` требуется тип данных `#TYPE#` для такого запроса | Убедитесь, что передаваемое значение нужного типа ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | У пользователя нет доступа к модулю База знаний или права просматривать указанную базу знаний ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `collectionId` | База знаний не найдена | Проверьте, что база знаний существует и доступна пользователю ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./note-document-get.md)
- [{#T}](./note-document-search-list.md)
- [{#T}](./index.md)
