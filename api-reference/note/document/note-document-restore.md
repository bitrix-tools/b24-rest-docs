# Восстановить документ из корзины note.document.restore

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`note`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор Битрикс24 или пользователь с доступом к модулю База знаний и правом «Редактирование» для базы знаний документа. Документ, база знаний которого удалена окончательно, может восстановить также пользователь, удаливший документ, или его автор

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `note.document.restore` восстанавливает документ из корзины вместе с дочерними страницами, удаленными вместе с ним.

{% note info "" %}

Если база знаний документа находится в корзине, документ отдельно не восстанавливается. Восстановите базу знаний целиком методом [note.collection.restore](../collection/note-collection-restore.md).

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор документа в корзине.

Идентификатор можно получить методом [note.document.list](./note-document-list.md) с фильтром `[["state","=","trashed"]]`.

Документ в архиве возвращается методом [note.document.unarchive](./note-document-unarchive.md) ||
|| **collectionId**
[`integer`](../../data-types.md) | Идентификатор базы знаний, в которую нужно восстановить документ. Нужно право «Редактирование» для этой базы знаний. В архивную базу знаний восстановить документ нельзя.

Обязателен, если база знаний документа удалена окончательно. Без него метод вернет ошибку `NOTE_RESTORE_TARGET_REQUIRED`.

Идентификатор можно получить методом [note.collection.list](../collection/note-collection-list.md).

По умолчанию: база знаний, из которой документ был удален. Документ встает под прежний родительский документ, если тот активен ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/note.document.restore`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":133}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/note.document.restore
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":133,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/note.document.restore
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type DocumentRestoreResult = {
      item: {
        id: number
        collectionId: number | null
        parentId: number | null
        title: string
        markdown: string
        position: number
        createdBy: number
        updatedBy: number
        createdAt: ISODate
        updatedAt: ISODate
        contentUpdatedAt: ISODate | null
        state: 'live' | 'archived' | 'trashed'
        isArchived: boolean
        isTrashed: boolean
        isOrphan: boolean
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<DocumentRestoreResult>({
        method: 'note.document.restore',
        params: {
          id: 133,
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Document restored:', result.item.id, result.item.state)
      }
    } catch (error) {
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function restoreDocument() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'note.document.restore',
            params: {
              id: 133,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Document restored:', result.item.id, result.item.state)
        } catch (error) {
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', restoreDocument)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.note.document.restore(
            bitrix_id=133,
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'note.document.restore',
                [
                    'id' => 133,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'note.document.restore',
        {
            id: 133,
        },
        result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'note.document.restore',
        [
            'id' => 133,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "note.document.restore", b24.Params{
    	"id": 133,
    })
    if err != nil {
    	return fmt.Errorf("note.document.restore: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID           b24.ID `json:"id"`
    	CollectionID b24.ID `json:"collectionId"`
    	ParentID     b24.ID `json:"parentId"`
    	State        string `json:"state"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.CollectionID, item.State)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 133,
            "collectionId": 47,
            "parentId": 131,
            "title": "Дочерний документ",
            "markdown": "",
            "position": 1000,
            "createdBy": 1,
            "updatedBy": 1,
            "createdAt": "2026-10-21T15:33:07+03:00",
            "updatedAt": "2026-10-21T15:37:32+03:00",
            "contentUpdatedAt": "2026-10-21T15:33:07+03:00",
            "state": "live",
            "isArchived": false,
            "isTrashed": false,
            "isOrphan": false
        }
    },
    "time": {
        "start": 1792586252,
        "finish": 1792586252.657717,
        "duration": 0.6577169895172119,
        "processing": 0,
        "date_start": "2026-10-21T15:37:32+03:00",
        "date_finish": "2026-10-21T15:37:32+03:00",
        "operating_reset_at": 1792586820,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными документа ||
|| **result.item**
[`object`](../../data-types.md) | Документ в том виде, в котором он восстановлен ||
|| **result.item.id**
[`integer`](../../data-types.md) | Идентификатор документа ||
|| **result.item.collectionId**
[`integer`](../../data-types.md) или `null` | Идентификатор базы знаний, в которую восстановлен документ ||
|| **result.item.parentId**
[`integer`](../../data-types.md) или `null` | Идентификатор родительского документа. `null` для документа верхнего уровня ||
|| **result.item.title**
[`string`](../../data-types.md) | Заголовок документа ||
|| **result.item.markdown**
[`string`](../../data-types.md) | Содержимое документа в Markdown ||
|| **result.item.position**
[`integer`](../../data-types.md) | Вес сортировки среди соседних документов ||
|| **result.item.createdBy**
[`integer`](../../data-types.md) | Идентификатор автора документа ||
|| **result.item.updatedBy**
[`integer`](../../data-types.md) | Идентификатор пользователя, который последним изменил запись документа ||
|| **result.item.createdAt**
[`datetime`](../../data-types.md) | Дата и время создания в формате ISO 8601 с часовым поясом ||
|| **result.item.updatedAt**
[`datetime`](../../data-types.md) | Дата и время изменения записи документа ||
|| **result.item.contentUpdatedAt**
[`datetime`](../../data-types.md) или `null` | Дата и время, когда было сформировано Markdown-представление текста ||
|| **result.item.state**
[`string`](../../data-types.md) | Состояние документа. После восстановления — `live` ||
|| **result.item.isArchived**
[`boolean`](../../data-types.md) | Устаревшее поле. Используйте `state`. `true` — документ в архиве ||
|| **result.item.isTrashed**
[`boolean`](../../data-types.md) | Устаревшее поле. Используйте `state`. `true` — документ в корзине ||
|| **result.item.isOrphan**
[`boolean`](../../data-types.md) | Устаревшее поле. `true` — документ в корзине, а его база знаний удалена ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `133` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Добавьте `id` в тело запроса ||
|| `id` | В поле `id` требуется тип данных `int` для такого запроса | Передайте идентификатор числом ||
|#

#### Ошибка целевой базы знаний

Код ошибки: `NOTE_RESTORE_TARGET_REQUIRED`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `collectionId` | Прежняя база знаний удалена — укажите, в какую базу вернуть статью | Передайте в `collectionId` идентификатор активной базы знаний ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | У пользователя нет доступа к модулю База знаний или права восстанавливать документ ||
|| `collectionId` | Доступ запрещен | Целевая база знаний находится в архиве или у пользователя нет права «Редактирование» для нее ||
|#

#### Ошибка расширения доступа

Код ошибки: `NOTE_MOVE_ACCESS_ESCALATION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Переместить может только модератор базы знаний — после перемещения доступ к статье получат новые участники | Место восстановления открыто более широкому кругу пользователей. Восстановление выполняет пользователь с правом «Администрирование» для базы знаний ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `#ID#` не найдена | Документ не существует, недоступен пользователю или не находится в корзине. Если база знаний документа в корзине, восстановите ее методом [note.collection.restore](../collection/note-collection-restore.md) ||
|| `collectionId` | Запись с ID = `#ID#` не найдена | Целевая база знаний не существует, недоступна пользователю или находится в корзине ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./note-document-delete.md)
- [{#T}](./note-document-unarchive.md)
- [{#T}](../collection/note-collection-restore.md)
- [{#T}](./index.md)
