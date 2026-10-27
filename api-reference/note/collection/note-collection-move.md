# Изменить позицию базы знаний note.collection.move

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`note`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к модулю База знаний и правом «Создание баз знаний»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `note.collection.move` перемещает базу знаний на другое место в списке баз знаний.

{% note info "" %}

Порядок баз знаний общий для всего Битрикс24: изменение увидят все сотрудники в боковом меню.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор базы знаний.

Идентификатор можно получить методом [note.collection.list](./note-collection-list.md).

База знаний в архиве или корзине не перемещается ||
|| **position**
[`integer`](../../data-types.md) | Вес сортировки базы знаний. Базы знаний с большим весом располагаются выше. Чтобы поставить базу знаний между двумя другими, передайте число между их значениями `position`.

Сохраненный вес пересчитывается по соседним базам знаний и может отличаться от переданного. Актуальное значение вернется в ответе.

По умолчанию: база знаний встает последней в списке ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/note.collection.move`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":47,"position":500}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/note.collection.move
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":47,"position":500,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/note.collection.move
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CollectionMoveResult = {
      item: {
        id: number
        name: string
        position: number
        policyLevel: string
        accessLevel: string
        state: 'live' | 'archived' | 'trashed'
        isArchived: boolean
        createdBy: number
        createdAt: ISODate
        updatedBy: number
        updatedAt: ISODate
        markdownDescription: string | null
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<CollectionMoveResult>({
        method: 'note.collection.move',
        params: {
          id: 47,
          position: 500,
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Collection position:', result.item.position)
      }
    } catch (error) {
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function moveCollection() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'note.collection.move',
            params: {
              id: 47,
              position: 500,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Collection position:', result.item.position)
        } catch (error) {
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', moveCollection)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.note.collection.move(
            bitrix_id=47,
            position=500,
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
                'note.collection.move',
                [
                    'id' => 47,
                    'position' => 500,
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
        'note.collection.move',
        {
            id: 47,
            position: 500,
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
        'note.collection.move',
        [
            'id' => 47,
            'position' => 500,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "note.collection.move", b24.Params{
    	"id":       47,
    	"position": 500,
    })
    if err != nil {
    	return fmt.Errorf("note.collection.move: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID       b24.ID `json:"id"`
    	Name     string `json:"name"`
    	Position int    `json:"position"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Position)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 47,
            "name": "Регламенты",
            "position": 550,
            "policyLevel": "private",
            "accessLevel": "full",
            "state": "live",
            "isArchived": false,
            "createdBy": 1,
            "createdAt": "2026-10-21T15:29:56+03:00",
            "updatedBy": 1,
            "updatedAt": "2026-10-21T15:46:14+03:00",
            "markdownDescription": null
        }
    },
    "time": {
        "start": 1792586774,
        "finish": 1792586774.535677,
        "duration": 0.5356769561767578,
        "processing": 0,
        "date_start": "2026-10-21T15:46:14+03:00",
        "date_finish": "2026-10-21T15:46:14+03:00",
        "operating_reset_at": 1792587360,
        "operating": 0
    }
}
```

В примере передан `position` = `500`, а сохранен вес `550`: значение пересчитано по соседним базам знаний с весами `1000` и `100`.

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными базы знаний ||
|| **result.item**
[`object`](../../data-types.md) | База знаний в том виде, в котором она сохранена после перемещения ||
|| **result.item.id**
[`integer`](../../data-types.md) | Идентификатор базы знаний ||
|| **result.item.name**
[`string`](../../data-types.md) | Название базы знаний ||
|| **result.item.position**
[`integer`](../../data-types.md) | Сохраненный вес сортировки базы знаний ||
|| **result.item.policyLevel**
[`string`](../../data-types.md) | Код политики доступа базы знаний, например `private` или `portal` ||
|| **result.item.accessLevel**
[`string`](../../data-types.md) | Код уровня доступа текущего пользователя к базе знаний, например `full` ||
|| **result.item.state**
[`string`](../../data-types.md) | Состояние базы знаний: `live` — активная, `archived` — в архиве, `trashed` — в корзине ||
|| **result.item.isArchived**
[`boolean`](../../data-types.md) | `true` — база знаний в архиве, `false` — не в архиве ||
|| **result.item.createdBy**
[`integer`](../../data-types.md) | Идентификатор автора базы знаний ||
|| **result.item.createdAt**
[`datetime`](../../data-types.md) | Дата и время создания в формате ISO 8601 с часовым поясом ||
|| **result.item.updatedBy**
[`integer`](../../data-types.md) | Идентификатор последнего редактора базы знаний ||
|| **result.item.updatedAt**
[`datetime`](../../data-types.md) | Дата и время последнего изменения в формате ISO 8601 с часовым поясом ||
|| **result.item.markdownDescription**
[`string`](../../data-types.md) или `null` | Описание базы знаний в Markdown ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **409**

```json
{
    "error": {
        "code": "NOTE_COLLECTION_IN_RECYCLE_BIN",
        "message": "База знаний удалена в корзину — восстановите её, чтобы изменить"
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

#### Ошибка базы знаний в корзине

Код ошибки: `NOTE_COLLECTION_IN_RECYCLE_BIN`

HTTP-статус: **409**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | База знаний удалена в корзину — восстановите её, чтобы изменить | Восстановите базу знаний методом [note.collection.restore](./note-collection-restore.md) ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | У пользователя нет доступа к модулю База знаний или права «Создание баз знаний» ||
|| `id` | Доступ запрещен | База знаний находится в архиве. Верните ее методом [note.collection.unarchive](./note-collection-unarchive.md) ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `#ID#` не найдена | База знаний не существует или недоступна пользователю ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./note-collection-list.md)
- [{#T}](./note-collection-update.md)
- [{#T}](../document/note-document-move.md)
- [{#T}](./index.md)
