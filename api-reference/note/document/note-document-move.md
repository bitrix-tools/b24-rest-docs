# Переместить документ note.document.move

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`note`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к модулю База знаний и правом «Редактирование» для исходной и целевой базы знаний

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `note.document.move` перемещает документ вместе с дочерними страницами в другую базу знаний, под другой родительский документ или на другую позицию среди соседних документов.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор документа.

Идентификатор можно получить методом [note.document.list](./note-document-list.md) или [note.document.tree.list](./note-document-tree-list.md).

Документ в архиве или корзине переместить нельзя. Сначала верните его методом [note.document.unarchive](./note-document-unarchive.md) или [note.document.restore](./note-document-restore.md) ||
|| **collectionId**
[`integer`](../../data-types.md) | Идентификатор целевой базы знаний. База знаний должна быть активной: в архивную базу знаний переместить документ нельзя.

Идентификатор можно получить методом [note.collection.list](../collection/note-collection-list.md).

По умолчанию: текущая база знаний документа ||
|| **parentId**
[`integer`](../../data-types.md) | Идентификатор родительского документа в целевой базе знаний.

Идентификатор можно получить методом [note.document.tree.list](./note-document-tree-list.md).

Если параметр не передан, документ становится документом верхнего уровня. Чтобы изменить порядок среди дочерних страниц, передайте `parentId` текущего родителя ||
|| **position**
[`integer`](../../data-types.md) | Вес сортировки среди соседних документов. Документы с большим весом располагаются выше. Чтобы поставить документ между двумя соседями, передайте число между их значениями `position`.

Сохраненный вес пересчитывается по соседним документам и может отличаться от переданного. Актуальное значение вернется в ответе.

По умолчанию: документ встает последним среди соседних ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/note.document.move`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":127,"collectionId":47,"parentId":125,"position":1500}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/note.document.move
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":127,"collectionId":47,"parentId":125,"position":1500,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/note.document.move
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type DocumentMoveResult = {
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
      const response = await $b24.actions.v3.call.make<DocumentMoveResult>({
        method: 'note.document.move',
        params: {
          id: 127,
          collectionId: 47,
          parentId: 125,
          position: 1500,
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Document moved:', result.item.parentId, result.item.position)
      }
    } catch (error) {
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function moveDocument() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'note.document.move',
            params: {
              id: 127,
              collectionId: 47,
              parentId: 125,
              position: 1500,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Document moved:', result.item.parentId, result.item.position)
        } catch (error) {
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', moveDocument)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.note.document.move(
            bitrix_id=127,
            collection_id=47,
            parent_id=125,
            position=1500,
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
                'note.document.move',
                [
                    'id' => 127,
                    'collectionId' => 47,
                    'parentId' => 125,
                    'position' => 1500,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'note.document.move',
        {
            id: 127,
            collectionId: 47,
            parentId: 125,
            position: 1500,
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
        'note.document.move',
        [
            'id' => 127,
            'collectionId' => 47,
            'parentId' => 125,
            'position' => 1500,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "note.document.move", b24.Params{
    	"id":           127,
    	"collectionId": 47,
    	"parentId":     125,
    	"position":     1500,
    })
    if err != nil {
    	return fmt.Errorf("note.document.move: %w", err)
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
    	Position     int    `json:"position"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.ParentID, item.Position)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 127,
            "collectionId": 47,
            "parentId": 125,
            "title": "Инструкция по VPN",
            "markdown": "# Инструкция по VPN\n\nНастройка подключения.",
            "position": 2000,
            "createdBy": 1,
            "updatedBy": 1,
            "createdAt": "2026-10-21T15:30:05+03:00",
            "updatedAt": "2026-10-21T15:31:29+03:00",
            "contentUpdatedAt": "2026-10-21T15:30:05+03:00",
            "state": "live",
            "isArchived": false,
            "isTrashed": false,
            "isOrphan": false
        }
    },
    "time": {
        "start": 1792585889,
        "finish": 1792585889.7807,
        "duration": 0.7806999683380127,
        "processing": 0,
        "date_start": "2026-10-21T15:31:29+03:00",
        "date_finish": "2026-10-21T15:31:29+03:00",
        "operating_reset_at": 1792586460,
        "operating": 0
    }
}
```

В примере передан `position` = `1500`, а сохранен вес `2000`: значение пересчитано по соседним документам.

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными документа ||
|| **result.item**
[`object`](../../data-types.md) | Документ в том виде, в котором он сохранен после перемещения ||
|| **result.item.id**
[`integer`](../../data-types.md) | Идентификатор документа ||
|| **result.item.collectionId**
[`integer`](../../data-types.md) или `null` | Идентификатор базы знаний. `null`, если пользователю открыт только сам документ, а не база знаний ||
|| **result.item.parentId**
[`integer`](../../data-types.md) или `null` | Идентификатор родительского документа. `null` для документа верхнего уровня ||
|| **result.item.title**
[`string`](../../data-types.md) | Заголовок документа ||
|| **result.item.markdown**
[`string`](../../data-types.md) | Содержимое документа в Markdown ||
|| **result.item.position**
[`integer`](../../data-types.md) | Сохраненный вес сортировки среди соседних документов ||
|| **result.item.createdBy**
[`integer`](../../data-types.md) | Идентификатор автора документа ||
|| **result.item.updatedBy**
[`integer`](../../data-types.md) | Идентификатор пользователя, который последним изменил запись документа ||
|| **result.item.createdAt**
[`datetime`](../../data-types.md) | Дата и время создания в формате ISO 8601 с часовым поясом ||
|| **result.item.updatedAt**
[`datetime`](../../data-types.md) | Дата и время изменения записи документа. Перемещение обновляет это поле ||
|| **result.item.contentUpdatedAt**
[`datetime`](../../data-types.md) или `null` | Дата и время, когда было сформировано Markdown-представление текста ||
|| **result.item.state**
[`string`](../../data-types.md) | Состояние документа: `live` — активный, `archived` — в архиве, `trashed` — в корзине ||
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
        "code": "NOTE_INVALID_PARENT",
        "message": "Родительская статья не принадлежит указанной коллекции"
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

#### Ошибка родительского документа

Код ошибки: `NOTE_INVALID_PARENT`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `parentId` | Родительская статья не принадлежит указанной коллекции | Передайте `parentId` документа из целевой базы знаний или укажите в `collectionId` базу знаний родителя ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | У пользователя нет доступа к модулю База знаний или права «Редактирование» для исходной или целевой базы знаний ||
|| `collectionId` | Доступ запрещен | Целевая база знаний находится в архиве. Верните ее методом [note.collection.unarchive](../collection/note-collection-unarchive.md) ||
|#

#### Ошибка расширения доступа

Код ошибки: `NOTE_MOVE_ACCESS_ESCALATION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Переместить может только модератор базы знаний — после перемещения доступ к статье получат новые участники | Целевая ветка открыта более широкому кругу пользователей. Перемещение выполняет пользователь с правом «Администрирование» для базы знаний ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `#ID#` не найдена | Документ не существует, недоступен пользователю, находится в архиве или корзине. Главный документ базы знаний, в котором хранится ее описание, переместить нельзя ||
|| `collectionId` | Запись с ID = `#ID#` не найдена | Целевая база знаний не существует, недоступна пользователю или находится в корзине ||
|| `parentId` | Запись с ID = `#ID#` не найдена | Родительский документ не существует или недоступен пользователю ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./note-document-tree-list.md)
- [{#T}](./note-document-update.md)
- [{#T}](../collection/note-collection-move.md)
- [{#T}](./index.md)
