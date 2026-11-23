# Получить список удаленных элементов CRM v 3.0 crm.recyclebin.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь. Администратор видит все записи корзины CRM, остальные пользователи — только элементы, которые удалили сами

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.recyclebin.list` возвращает записи корзины CRM об удаленных сделках, лидах, контактах, компаниях и элементах смарт-процессов.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter**
[`array`](../../../data-types.md) | Фильтр в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`, например `[["entityTypeId","=",2]]`. [Описание параметра](#filter) ||
|| **select**
[`array`](../../../data-types.md) | Список полей записи, которые нужно вернуть, например `["recordId","entityTypeId","id","title"]`. [Поля записи корзины](#item).

По умолчанию: все поля записи ||
|| **order**
[`object`](../../../data-types.md) | Сортировка в формате `{"поле": "направление"}`. Сортировать можно по полям `recordId`, `title`, `deletedTime`, `deletedById`.

Возможные значения направления:

- `asc` — по возрастанию
- `desc` — по убыванию

По умолчанию: `{"deletedTime": "desc"}`. Записи с одинаковым значением поля сортировки упорядочиваются по `recordId` ||
|| **pagination**
[`object`](../../../data-types.md) | Объект постраничной навигации. [Описание параметра](#pagination) ||
|#

### Параметр filter {#filter}

Фильтр принимает условия только по этим полям:

#|
|| **Поле** | **Операторы** | **Пример** ||
|| `entityTypeId` | `=`, `in` | `["entityTypeId","in",[2,1038]]` ||
|| `title` | `=`, точное совпадение | `["title","=","Поставка оборудования"]` ||
|| `deletedById` | `=` | `["deletedById","=",1]` ||
|| `deletedTime` | `>`, `>=`, `<`, `<=`, `between` | `["deletedTime","between",["2026-11-01T00:00:00+03:00","2026-11-30T23:59:59+03:00"]]` ||
|#

Правила фильтра:

- в `entityTypeId` можно передать сделку `2`, лид `1`, контакт `3`, компанию `4` и идентификатор типа смарт-процесса. Другие типы, например счет `31`, вызывают ошибку
- дата и время в `deletedTime` передаются полностью, в формате `YYYY-MM-DDThh:mm:ss±hh:mm`
- каждое поле — не больше одного раза, условия объединяются по И. Чтобы задать период, используйте `between`
- группы условий с `"logic": "or"` и отрицание не поддерживаются

Фильтра по `recordId` и `id` нет. Чтобы найти запись конкретного элемента, отфильтруйте по `entityTypeId` и `title` и сверьте `id` в ответе.

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../../data-types.md) | Количество записей на странице. Значения больше `100` уменьшаются до `100`. Ноль и отрицательное значение вызывают ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../../data-types.md) | Номер страницы, начиная с `1`. Если передан `page`, параметр `offset` не учитывается ||
|| **offset**
[`integer`](../../../data-types.md) | Количество записей, которые нужно пропустить от начала списка.

По умолчанию: `0` ||
|#

{% note info "" %}

Ответ не содержит общего количества записей. Если на странице вернулось меньше записей, чем указано в `limit`, это последняя страница.

{% endnote %}

{% note info "" %}

В облачном Битрикс24 метод возвращает записи за последние 30 дней, в коробочной версии — за срок хранения из настроек корзины CRM. В список попадают только типы объектов, у которых включена корзина. Если корзина недоступна на тарифе, метод возвращает пустой список.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.recyclebin.list`

{% endnote %}

Примеры получают сделки и элементы смарт-процесса с идентификатором типа `1038`, удаленные с 1 ноября 2026 года.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["entityTypeId","in",[2,1038]],["deletedTime",">=","2026-11-01T00:00:00+03:00"]],"select":["recordId","entityTypeId","id","title","deletedTime","deletedById"],"order":{"deletedTime":"desc"},"pagination":{"limit":50}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.recyclebin.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["entityTypeId","in",[2,1038]],["deletedTime",">=","2026-11-01T00:00:00+03:00"]],"select":["recordId","entityTypeId","id","title","deletedTime","deletedById"],"order":{"deletedTime":"desc"},"pagination":{"limit":50},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.recyclebin.list
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type RecyclebinListResult = {
      items: Array<{
        recordId: number
        entityTypeId: number
        id: number
        title: string
        deletedTime: string
        deletedById: number
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<RecyclebinListResult>(
        'crm.recyclebin.list',
        {
          filter: [
            ['entityTypeId', 'in', [2, 1038]],
            ['deletedTime', '>=', '2026-11-01T00:00:00+03:00'],
          ],
          select: ['recordId', 'entityTypeId', 'id', 'title', 'deletedTime', 'deletedById'],
          order: {
            deletedTime: 'desc',
          },
          pagination: {
            limit: 50,
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Deleted items:', result.items)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(B24Js.ApiVersion.v3).call`.

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function listRecyclebin() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.recyclebin.list',
            {
              filter: [
                ['entityTypeId', 'in', [2, 1038]],
                ['deletedTime', '>=', '2026-11-01T00:00:00+03:00'],
              ],
              select: ['recordId', 'entityTypeId', 'id', 'title', 'deletedTime', 'deletedById'],
              order: {
                deletedTime: 'desc',
              },
              pagination: {
                limit: 50,
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Deleted items:', result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listRecyclebin)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.recyclebin.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "filter": [
                    ["entityTypeId", "in", [2, 1038]],
                    ["deletedTime", ">=", "2026-11-01T00:00:00+03:00"],
                ],
                "select": ["recordId", "entityTypeId", "id", "title", "deletedTime", "deletedById"],
                "order": {
                    "deletedTime": "desc",
                },
                "pagination": {
                    "limit": 50,
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
                'crm.recyclebin.list',
                [
                    'filter' => [
                        ['entityTypeId', 'in', [2, 1038]],
                        ['deletedTime', '>=', '2026-11-01T00:00:00+03:00'],
                    ],
                    'select' => ['recordId', 'entityTypeId', 'id', 'title', 'deletedTime', 'deletedById'],
                    'order' => [
                        'deletedTime' => 'desc',
                    ],
                    'pagination' => [
                        'limit' => 50,
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
        'crm.recyclebin.list',
        {
            filter: [
                ['entityTypeId', 'in', [2, 1038]],
                ['deletedTime', '>=', '2026-11-01T00:00:00+03:00'],
            ],
            select: ['recordId', 'entityTypeId', 'id', 'title', 'deletedTime', 'deletedById'],
            order: {
                deletedTime: 'desc',
            },
            pagination: {
                limit: 50,
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
        'crm.recyclebin.list',
        [
            'filter' => [
                ['entityTypeId', 'in', [2, 1038]],
                ['deletedTime', '>=', '2026-11-01T00:00:00+03:00'],
            ],
            'select' => ['recordId', 'entityTypeId', 'id', 'title', 'deletedTime', 'deletedById'],
            'order' => [
                'deletedTime' => 'desc',
            ],
            'pagination' => [
                'limit' => 50,
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
    res, err := client.Core().Call(ctx, "crm.recyclebin.list", b24.Params{
    	"filter": []any{
    		[]any{"entityTypeId", "in", []int{2, 1038}},
    		[]any{"deletedTime", ">=", "2026-11-01T00:00:00+03:00"},
    	},
    	"select": []string{"recordId", "entityTypeId", "id", "title", "deletedTime", "deletedById"},
    	"order": b24.Params{
    		"deletedTime": "desc",
    	},
    	"pagination": b24.Params{
    		"limit": 50,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.recyclebin.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		RecordID     int    `json:"recordId"`
    		EntityTypeID int    `json:"entityTypeId"`
    		ID           int    `json:"id"`
    		Title        string `json:"title"`
    		DeletedTime  string `json:"deletedTime"`
    		DeletedByID  int    `json:"deletedById"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.RecordID, item.EntityTypeID, item.Title)
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
                "recordId": 14533,
                "entityTypeId": 2,
                "id": 9199,
                "title": "Поставка оборудования",
                "deletedTime": "2026-11-23T13:52:45+03:00",
                "deletedById": 1269
            },
            {
                "recordId": 14463,
                "entityTypeId": 2,
                "id": 9195,
                "title": "Заказ мебели для офиса",
                "deletedTime": "2026-11-23T13:04:57+03:00",
                "deletedById": 1
            }
        ]
    },
    "time": {
        "start": 1795431217,
        "finish": 1795431217.710354,
        "duration": 0.7103540897369385,
        "processing": 0,
        "date_start": "2026-11-23T13:53:37+03:00",
        "date_finish": "2026-11-23T13:53:37+03:00",
        "operating_reset_at": 1795431780,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **result.items**
[`object[]`](../../../data-types.md) | Массив записей корзины с полями из `select`, без `select` — со всеми полями. Если записей нет, массив пустой. [Поля записи корзины](#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Поля записи корзины {#item}

Описание полей с признаками `filterable` и `sortable` возвращают методы [crm.recyclebin.field.list](./crm-recyclebin-field-list-rest-v3.md) и [crm.recyclebin.field.get](./crm-recyclebin-field-get-rest-v3.md).

#|
|| **Название**
`тип` | **Описание** | **Фильтр** | **Сортировка** ||
|| **recordId**
[`integer`](../../../data-types.md) | Идентификатор записи корзины. Его передают в метод [crm.recyclebin.restore](./crm-recyclebin-restore-rest-v3.md) | Нет | Да ||
|| **entityTypeId**
[`integer`](../../../data-types.md) | Идентификатор типа объекта: `1` — лид, `2` — сделка, `3` — контакт, `4` — компания или идентификатор типа смарт-процесса, например `1038` | Да | Нет ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор элемента до удаления. Не совпадает с `recordId` | Нет | Нет ||
|| **title**
[`string`](../../../data-types.md) | Название элемента на момент удаления | Да | Да ||
|| **deletedTime**
[`datetime`](../../../data-types.md) | Дата и время удаления | Да | Да ||
|| **deletedById**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который удалил элемент. Данные пользователя можно получить методом [user.get](../../../user/user-get.md) | Да | Да ||
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
                "message": "Entity type ID is not supported.",
                "field": "filter"
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
|| `filter` | Entity type ID is not supported. | Передайте в `entityTypeId` сделку `2`, лид `1`, контакт `3`, компанию `4` или идентификатор типа смарт-процесса ||
|| `filter` | Unsupported recycle bin filter condition. | Проверьте оператор по [таблице фильтра](#filter): у `title` и `deletedById` только `=`, у `entityTypeId` — `=` и `in` ||
|| `filter` | Unsupported deleted time filter condition. | Используйте для `deletedTime` операторы `>`, `>=`, `<`, `<=` или `between` с двумя датами ||
|| `filter` | Repeated recycle bin filter field. | Укажите каждое поле в фильтре один раз. Для периода по `deletedTime` используйте `between` ||
|| `filter` | Only AND filters without negation are supported. | Уберите группы условий с `"logic": "or"` и отрицание ||
|| `filter` | Deleted by ID must be positive. | Передайте в `deletedById` положительный идентификатор пользователя ||
|| `deletedTime` | В поле `deletedTime` требуется тип данных `DateTime` для такого запроса | Передайте дату и время полностью, например `2026-11-01T00:00:00+03:00` ||
|| `id` | В DTO `RecyclebinItemDto` в поле `id` требуется наличие атрибута `Filterable` для такого запроса | Фильтруйте только по `entityTypeId`, `title`, `deletedById`, `deletedTime` ||
|| `entityTypeId` | В DTO `RecyclebinItemDto` в поле `entityTypeId` требуется наличие атрибута `Sortable` для такого запроса | Сортируйте только по `recordId`, `title`, `deletedTime`, `deletedById` ||
|#

#### Неизвестный оператор фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNFILTEROPERATOREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестный оператор фильтра `%` | Поиска по части названия нет: `title` сравнивается только на точное совпадение оператором `=` ||
|#

#### Неверная сортировка

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDORDEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение сортировки `up` | Передайте направление `asc` или `desc` ||
|#

#### Неверная пагинация

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать параметр пагинации `{"limit":0}` | Передайте `limit` больше нуля и `offset` не меньше нуля ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `foo` для сущности `RecyclebinItemDto` | Проверьте имена полей в `select`, `filter` и `order` по [таблице полей записи корзины](#item) ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Методы корзины CRM в REST 3.0 недоступны на этом Битрикс24 или вызов выполнен без авторизованного пользователя ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-recyclebin-restore-rest-v3.md)
- [{#T}](./crm-recyclebin-field-list-rest-v3.md)
- [{#T}](../items/crm-entity-delete-rest-v3.md)
