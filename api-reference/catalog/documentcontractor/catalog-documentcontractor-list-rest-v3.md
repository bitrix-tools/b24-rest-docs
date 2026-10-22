# Получить список привязок поставщиков к документам v 3.0 catalog.document.contractor.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр» для документов типа «Приход» и правами «Просмотр и выбор склада» и «Просмотр каталога товаров»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.document.contractor.list` возвращает список привязок поставщиков CRM к документам прихода.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив полей привязки, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор привязки
- `documentId` — идентификатор документа
- `entityTypeId` — тип объекта CRM
- `entityId` — идентификатор объекта CRM

Поле `id` возвращается, только если указано в `select`. Значение `["*"]` не поддерживается.

По умолчанию: все поля ||
|| **filter**
[`array`](../../data-types.md) | Фильтр в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`, например `[["documentId", "=", 325]]`. Синтаксис фильтра описан в [обзоре REST 3.0](../../rest-v3.md#filter).

Фильтровать можно по всем полям из параметра `select`. Группы условий с логикой `or` и отрицание не поддерживаются. Условие `in` с пустым списком возвращает пустой список.

Метод возвращает привязки только тех документов, которые доступны пользователю ||
|| **order**
[`object`](../../data-types.md) | Сортировка в формате `{"поле": "направление"}`, например `{"id": "asc"}`.

Возможные значения направления:

- `asc` — по возрастанию
- `desc` — по убыванию

Сортировать можно по всем полям из параметра `select`. Без `order` порядок записей не гарантирован ||
|| **pagination**
[`object`](../../data-types.md) | Постраничная навигация. [Описание объекта](#pagination) ||
|#

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../data-types.md) | Количество записей на странице. Значения больше `1000` уменьшаются до `1000`, значение `0` вызывает ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../data-types.md) | Номер страницы, начиная с `1`. Если передан, заменяет `offset`. Страница за концом списка возвращает пустой массив ||
|| **offset**
[`integer`](../../data-types.md) | Количество записей, которые нужно пропустить ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{user_id}/{токен_вебхука}/catalog.document.contractor.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["documentId","=",325]],"select":["id","documentId","entityTypeId","entityId"],"order":{"id":"asc"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.document.contractor.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["documentId","=",325]],"select":["id","documentId","entityTypeId","entityId"],"order":{"id":"asc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.document.contractor.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type DocumentContractorListResult = {
      items: Array<{
        id?: number
        documentId?: number
        entityTypeId?: number
        entityId?: number
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<DocumentContractorListResult>({
        method: 'catalog.document.contractor.list',
        params: {
          filter: [
            ['documentId', '=', 325],
          ],
          select: ['id', 'documentId', 'entityTypeId', 'entityId'],
          order: {
            id: 'asc',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Contractors:', result.items)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function documentContractorList() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.document.contractor.list',
            params: {
              filter: [
                ['documentId', '=', 325],
              ],
              select: ['id', 'documentId', 'entityTypeId', 'entityId'],
              order: {
                id: 'asc',
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Contractors:', result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', documentContractorList)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.document.contractor.list(
            filter=[
                ["documentId", "=", 325],
            ],
            select=["id", "documentId", "entityTypeId", "entityId"],
            order={
                "id": "asc",
            },
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
                'catalog.document.contractor.list',
                [
                    'filter' => [
                        ['documentId', '=', 325],
                    ],
                    'select' => ['id', 'documentId', 'entityTypeId', 'entityId'],
                    'order' => [
                        'id' => 'asc',
                    ],
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
        'catalog.document.contractor.list',
        {
            filter: [
                ['documentId', '=', 325],
            ],
            select: ['id', 'documentId', 'entityTypeId', 'entityId'],
            order: {
                id: 'asc',
            },
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
        'catalog.document.contractor.list',
        [
            'filter' => [
                ['documentId', '=', 325],
            ],
            'select' => ['id', 'documentId', 'entityTypeId', 'entityId'],
            'order' => [
                'id' => 'asc',
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.document.contractor.list", b24.Params{
    	"filter": []any{
    		[]any{"documentId", "=", 325},
    	},
    	"select": []string{"id", "documentId", "entityTypeId", "entityId"},
    	"order":  b24.Params{
    		"id": "asc",
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.document.contractor.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID           int `json:"id"`
    		EntityTypeID int `json:"entityTypeId"`
    		EntityID     int `json:"entityId"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.ID, item.EntityTypeID, item.EntityID)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "items": [
            {
                "id": 25,
                "documentId": 325,
                "entityTypeId": 4,
                "entityId": 1
            },
            {
                "id": 29,
                "documentId": 325,
                "entityTypeId": 3,
                "entityId": 1
            }
        ]
    },
    "time": {
        "start": 1792665377,
        "finish": 1792665377.15777,
        "duration": 0.15776991844177246,
        "processing": 0,
        "date_start": "2026-10-22T13:36:17+03:00",
        "date_finish": "2026-10-22T13:36:17+03:00",
        "operating_reset_at": 1792665960,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными ответа ||
|| **result.items**
[`array`](../../data-types.md) | Массив привязок. Состав полей зависит от `select`. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор привязки ||
|| **documentId**
[`integer`](../../data-types.md) | Идентификатор документа складского учета ||
|| **entityTypeId**
[`integer`](../../data-types.md) | Тип объекта CRM: `3` — контакт, `4` — компания ||
|| **entityId**
[`integer`](../../data-types.md) | Идентификатор контакта или компании ||
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
                "message": "Filter OR groups are not supported"
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
|| `filter` | Filter OR groups are not supported | Уберите группы с логикой `or` из `filter` ||
|| `-` | Contractors should be provided by CRM | Поставщики документов берутся не из CRM. Методы работают, только если поставщиков документов складского учета ведет CRM ||
|| `-` | CRM module is required for document contractors | Методы работают только при установленном модуле CRM ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select`, `filter`, `order` | Неизвестное поле `#FIELD#` для сущности `DocumentContractorDto` | Укажите только поля из описания параметра `select` ||
|#

#### Ошибка пагинации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации `{"limit":0}` | Передайте в `limit` число от `1` до `1000` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя на документы прихода, склады и каталог ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-documentcontractor-add-rest-v3.md)
- [{#T}](./catalog-documentcontractor-delete-rest-v3.md)
- [{#T}](./catalog-documentcontractor-field-list.md)
- [{#T}](./index.md)
