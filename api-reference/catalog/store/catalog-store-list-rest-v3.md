# Получить список складов v 3.0 catalog.store.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» или «Просмотр и выбор склада»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.store.list` возвращает список складов, например все активные склады или только пункты выдачи.

В список попадают склады, которые доступны пользователю по праву «Просмотр и выбор склада». Пользователь с правом «Редактирование складов» также получает склады, которые создал сам.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив полей склада, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор склада
- `title` — название склада
- `active` — активность склада
- `address` — адрес склада
- `description` — описание склада
- `gpsN` — широта склада
- `gpsS` — долгота склада
- `imageId` — идентификатор файла изображения склада
- `imageUrl` — ссылка на изображение склада
- `dateModify` — дата последнего изменения склада
- `dateCreate` — дата создания склада
- `userId` — идентификатор пользователя, который создал склад
- `modifiedBy` — идентификатор пользователя, который последним изменил склад
- `phone` — телефон склада
- `schedule` — график работы склада
- `xmlId` — внешний код склада
- `sort` — порядок сортировки склада в списках
- `email` — e-mail склада
- `issuingCenter` — признак пункта выдачи
- `code` — символьный код склада

Идентификатор `id` возвращается всегда. Значение `["*"]` не поддерживается.

По умолчанию: все поля ||
|| **filter**
[`array`](../../data-types.md) | Фильтр списка в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`, например `[["active", "=", true]]`. Синтаксис фильтра описан в [обзоре REST 3.0](../../rest-v3.md#filter).

Фильтровать можно по всем полям, кроме `image`, `imageId` и `imageUrl`. Для `active` и `issuingCenter` передавайте `true` или `false`, даты — в формате `2026-11-01T00:00:00+03:00`.

Операторы: `=`, `!=`, `>`, `>=`, `<`, `<=`, `in` и `between`. Фильтр не принимает оператор `like`, группы с логикой `or` и отрицание. Если передать в `in` пустой список, метод вернет пустой список ||
|| **order**
[`object`](../../data-types.md) | Сортировка в формате `{"поле": "направление"}`, например `{"sort": "asc"}`.

Сортировать можно по всем полям, кроме `image`, `imageId` и `imageUrl`.

Возможные значения направления:

- `asc` — по возрастанию
- `desc` — по убыванию ||
|| **pagination**
[`object`](../../data-types.md) | Параметры постраничной навигации. [Описание структуры объекта](#pagination) ||
|#

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../data-types.md) | Количество складов на странице. Значения больше `1000` уменьшаются до `1000`. Ноль, отрицательное и нечисловое значение вызывают ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../data-types.md) | Номер страницы, начиная с `1`. Метод пропустит `(page - 1) * limit` записей и не учтет `offset` ||
|| **offset**
[`integer`](../../data-types.md) | Количество записей, которые нужно пропустить от начала списка.

По умолчанию: `0` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.store.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","title","address","active","issuingCenter"],"filter":[["active","=",true],["issuingCenter","=",true]],"order":{"sort":"asc","id":"desc"},"pagination":{"limit":3}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.store.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","title","address","active","issuingCenter"],"filter":[["active","=",true],["issuingCenter","=",true]],"order":{"sort":"asc","id":"desc"},"pagination":{"limit":3},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.store.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type StoreListResult = {
      items: {
        id: number
        title: string
        address: string
        active: boolean
        issuingCenter: boolean
      }[]
    }

    try {
      const response = await $b24.actions.v3.call.make<StoreListResult>({
        method: 'catalog.store.list',
        params: {
          select: ['id', 'title', 'address', 'active', 'issuingCenter'],
          filter: [
            ['active', '=', true],
            ['issuingCenter', '=', true],
          ],
          order: {
            sort: 'asc',
            id: 'desc',
          },
          pagination: {
            limit: 3,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        result.items.forEach(store => console.info(store.id, store.title))
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
      async function listStores() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.store.list',
            params: {
              select: ['id', 'title', 'address', 'active', 'issuingCenter'],
              filter: [
                ['active', '=', true],
                ['issuingCenter', '=', true],
              ],
              order: {
                sort: 'asc',
                id: 'desc',
              },
              pagination: {
                limit: 3,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          result.items.forEach(store => console.info(store.id, store.title))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listStores)
    </script>
    ```

- Python

    У методов `catalog.store.*` REST 3.0 нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `call_method` токена клиента с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "catalog.store.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})
    bitrix_token = client.get_token()

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "select": ["id", "title", "address", "active", "issuingCenter"],
                "filter": [
                    ["active", "=", True],
                    ["issuingCenter", "=", True],
                ],
                "order": {
                    "sort": "asc",
                    "id": "desc",
                },
                "pagination": {
                    "limit": 3,
                },
            },
            prefer_version=3,
        )
        result = response["result"]
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"code: {error.code}",
            f"message: {error.error.message}",
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
                'catalog.store.list',
                [
                    'select' => ['id', 'title', 'address', 'active', 'issuingCenter'],
                    'filter' => [
                        ['active', '=', true],
                        ['issuingCenter', '=', true],
                    ],
                    'order' => [
                        'sort' => 'asc',
                        'id' => 'desc',
                    ],
                    'pagination' => [
                        'limit' => 3,
                    ],
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
        'catalog.store.list',
        {
            select: ['id', 'title', 'address', 'active', 'issuingCenter'],
            filter: [
                ['active', '=', true],
                ['issuingCenter', '=', true],
            ],
            order: {
                sort: 'asc',
                id: 'desc',
            },
            pagination: {
                limit: 3,
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
        'catalog.store.list',
        [
            'select' => ['id', 'title', 'address', 'active', 'issuingCenter'],
            'filter' => [
                ['active', '=', true],
                ['issuingCenter', '=', true],
            ],
            'order' => [
                'sort' => 'asc',
                'id' => 'desc',
            ],
            'pagination' => [
                'limit' => 3,
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
    res, err := client.Core().Call(ctx, "catalog.store.list", b24.Params{
    	"select": []string{"id", "title", "address", "active", "issuingCenter"},
    	"filter": []any{
    		[]any{"active", "=", true},
    		[]any{"issuingCenter", "=", true},
    	},
    	"order": b24.Params{
    		"sort": "asc",
    		"id":   "desc",
    	},
    	"pagination": b24.Params{
    		"limit": 3,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.store.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID            int    `json:"id"`
    		Title         string `json:"title"`
    		Address       string `json:"address"`
    		Active        bool   `json:"active"`
    		IssuingCenter bool   `json:"issuingCenter"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, store := range result.Items {
    	fmt.Println(store.ID, store.Title)
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
                "id": 13,
                "title": "Склад 3",
                "active": true,
                "address": "Склад 3",
                "issuingCenter": true
            },
            {
                "id": 11,
                "title": "Склад 2",
                "active": true,
                "address": "Калининград, улица Баженова, д. 40",
                "issuingCenter": true
            },
            {
                "id": 9,
                "title": "AliExpress",
                "active": true,
                "address": "AliExpress",
                "issuingCenter": true
            }
        ]
    },
    "time": {
        "start": 1794922633,
        "finish": 1794922633.749759,
        "duration": 0.7497589588165283,
        "processing": 0,
        "date_start": "2026-11-17T16:37:13+03:00",
        "date_finish": "2026-11-17T16:37:13+03:00",
        "operating_reset_at": 1794923220,
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
[`array`](../../data-types.md) | Массив складов на странице. Состав полей зависит от `select`. [Описание полей](#items) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

Общее количество записей метод не возвращает. Если в ответе меньше записей, чем `limit`, страница последняя.

#### Элемент items {#items}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор склада ||
|| **title**
[`string`](../../data-types.md) | Название склада. Пустая строка, если название не задано ||
|| **active**
[`boolean`](../../data-types.md) | Активность склада: `true` — склад активен, `false` — неактивен ||
|| **address**
[`string`](../../data-types.md) | Адрес склада ||
|| **description**
[`string`](../../data-types.md) | Описание склада. Пустая строка, если описание не задано ||
|| **gpsN**
[`double`](../../data-types.md) | Широта склада. Если координата не задана, приходит `0`. Если в Битрикс24 сохранено значение, которое не является числом, например пустая строка, приходит `null` ||
|| **gpsS**
[`double`](../../data-types.md) | Долгота склада. Если координата не задана, приходит `0`. Если в Битрикс24 сохранено значение, которое не является числом, например пустая строка, приходит `null` ||
|| **imageId**
[`integer`](../../data-types.md) | Идентификатор файла изображения склада. `0`, если изображения нет ||
|| **imageUrl**
[`string`](../../data-types.md) | Ссылка на изображение склада. Пустая строка, если изображения нет ||
|| **dateModify**
[`datetime`](../../data-types.md) | Дата последнего изменения склада ||
|| **dateCreate**
[`datetime`](../../data-types.md) | Дата создания склада. У складов, которые Битрикс24 создал сам, может быть `null` ||
|| **userId**
[`integer`](../../data-types.md) | Идентификатор пользователя, который создал склад. `0` у складов, которые Битрикс24 создал сам ||
|| **modifiedBy**
[`integer`](../../data-types.md) | Идентификатор пользователя, который последним изменил склад ||
|| **phone**
[`string`](../../data-types.md) | Телефон склада. Пустая строка, если телефон не задан ||
|| **schedule**
[`string`](../../data-types.md) | График работы склада. Пустая строка, если график не задан ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код склада. Пустая строка, если код не задан ||
|| **sort**
[`integer`](../../data-types.md) | Порядок сортировки склада в списках ||
|| **email**
[`string`](../../data-types.md) | E-mail склада. Пустая строка, если адрес не задан ||
|| **issuingCenter**
[`boolean`](../../data-types.md) | Признак пункта выдачи: `true` — склад работает как пункт выдачи, `false` — обычный склад ||
|| **code**
[`string`](../../data-types.md) | Символьный код склада. Пустая строка, если код не задан ||
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
|| `-` | Filter OR groups are not supported | Уберите из фильтра группу с логикой `or`. Выполните несколько запросов или используйте оператор `in` ||
|| `-` | Filter NOT groups are not supported | Уберите из фильтра отрицание. Используйте оператор `!=` ||
|| `image`, `imageId`, `imageUrl` | В DTO `StoreDto` в поле `#FIELD#` требуется наличие атрибута `Filterable` для такого запроса | Уберите поле из `filter`: по изображению фильтровать нельзя ||
|| `image`, `imageId`, `imageUrl` | В DTO `StoreDto` в поле `#FIELD#` требуется наличие атрибута `Sortable` для такого запроса | Уберите поле из `order`: по изображению сортировать нельзя ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select`, `filter`, `order` | Неизвестное поле `#FIELD#` для сущности `StoreDto` | Укажите только поля из [описания элемента items](#items) ||
|#

#### Ошибка формата фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `Unknown filter condition` | Передайте `filter` массивом условий, например `[["active","=",true]]` ||
|#

#### Ошибка оператора фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNFILTEROPERATOREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Неизвестный оператор фильтра `#OPERATOR#` | Используйте операторы `=`, `!=`, `>`, `>=`, `<`, `<=`, `in`, `between` ||
|#

#### Ошибка сортировки

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDORDEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `order` | Не удается распознать выражение сортировки `#ORDER#` | Передайте направление `asc` или `desc` ||
|#

#### Ошибка пагинации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации `#PAGINATION#` | Передайте `limit` положительным числом, `offset` — неотрицательным числом, `page` — числом ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | У пользователя нет права «Просмотр каталога товаров» или «Просмотр и выбор склада» ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-store-add-rest-v3.md)
- [{#T}](./catalog-store-update-rest-v3.md)
- [{#T}](./catalog-store-get-rest-v3.md)
- [{#T}](./catalog-store-delete-rest-v3.md)
- [{#T}](./catalog-store-field-list.md)
