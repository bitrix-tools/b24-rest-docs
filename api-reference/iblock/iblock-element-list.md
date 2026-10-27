# Получить список элементов инфоблока iblock.element.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`iblock`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../rest-v3.md).

{% endnote %}

Метод `iblock.element.list` возвращает список элементов инфоблока с фильтрацией, сортировкой и постраничной навигацией.

{% note warning "" %}

Метод работает только с инфоблоками, у которых в административной панели задан «Символьный код API» и включен «Доступ через REST». В облачном Битрикс24 административной панели нет, поэтому задать эти настройки нельзя и метод возвращает ошибку. Подробнее — в [ограничениях и особенностях раздела](./index.md#restrictions).

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`array`](../data-types.md) | Фильтр списка в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`.

Фильтр обязателен и должен содержать условие на равенство по `iblockId` с положительным идентификатором инфоблока, например `[["iblockId",14]]`. Метод возвращает элементы только этого инфоблока.

Фильтровать можно по полям `id`, `iblockId`, `name`, `iblockSectionId`. Фильтр по `properties` и другим полям элемента не поддерживается.

Синтаксис фильтра описан в [обзоре REST 3.0](../rest-v3.md#filter) ||
|| **select**
[`array`](../data-types.md) | Массив полей элемента, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор элемента
- `iblockId` — идентификатор инфоблока
- `name` — название элемента
- `iblockSectionId` — идентификатор раздела инфоблока
- `properties` — значения свойств элемента

По умолчанию: `id`, `iblockId`, `name`, `iblockSectionId`. Поле `properties` без `select` возвращается, только если у элемента заполнены свойства ||
|| **order**
[`object`](../data-types.md) | Сортировка в формате `{"поле": "направление"}`, например `{"id":"ASC"}`.

Сортировать можно по полям `id`, `name`, `iblockSectionId`.

Возможные значения направления:

- `ASC` — по возрастанию
- `DESC` — по убыванию ||
|| **pagination**
[`object`](../data-types.md) | Параметры постраничной навигации. [Описание структуры объекта](#pagination) ||
|#

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../data-types.md) | Количество элементов на странице. Значения больше `1000` уменьшаются до `1000`. Ноль, отрицательное и нечисловое значение вызывают ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../data-types.md) | Номер страницы, начиная с `1`. Смещение вычисляется как `(page - 1) * limit`. Если передан `page`, значение `offset` не учитывается ||
|| **offset**
[`integer`](../data-types.md) | Количество записей, которые нужно пропустить от начала списка.

По умолчанию: `0` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/iblock.element.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["iblockId",14],["iblockSectionId",8]],"select":["id","name","properties"],"order":{"id":"ASC"},"pagination":{"limit":50}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/iblock.element.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["iblockId",14],["iblockSectionId",8]],"select":["id","name","properties"],"order":{"id":"ASC"},"pagination":{"limit":50},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/iblock.element.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type PropertyValue = {
      id: number
      value: string
      description: string | null
    }

    type ElementListResult = {
      items: Array<{
        id: number
        name: string
        properties: Record<string, PropertyValue | PropertyValue[]> | []
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<ElementListResult>({
        method: 'iblock.element.list',
        params: {
          filter: [
            ['iblockId', 14],
            ['iblockSectionId', 8],
          ],
          select: ['id', 'name', 'properties'],
          order: { id: 'ASC' },
          pagination: { limit: 50 },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        result.items.forEach(item => console.info(item.id, item.name))
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
      async function listElements() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'iblock.element.list',
            params: {
              filter: [
                ['iblockId', 14],
                ['iblockSectionId', 8],
              ],
              select: ['id', 'name', 'properties'],
              order: { id: 'ASC' },
              pagination: { limit: 50 },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          result.items.forEach(item => console.info(item.id, item.name))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listElements)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.iblock.element.list(
            filter=[
                ["iblockId", 14],
                ["iblockSectionId", 8],
            ],
            select=["id", "name", "properties"],
            order={"id": "ASC"},
            pagination={"limit": 50},
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
                'iblock.element.list',
                [
                    'filter' => [
                        ['iblockId', 14],
                        ['iblockSectionId', 8],
                    ],
                    'select' => ['id', 'name', 'properties'],
                    'order' => ['id' => 'ASC'],
                    'pagination' => ['limit' => 50],
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
        'iblock.element.list',
        {
            filter: [
                ['iblockId', 14],
                ['iblockSectionId', 8],
            ],
            select: ['id', 'name', 'properties'],
            order: { id: 'ASC' },
            pagination: { limit: 50 },
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
        'iblock.element.list',
        [
            'filter' => [
                ['iblockId', 14],
                ['iblockSectionId', 8],
            ],
            'select' => ['id', 'name', 'properties'],
            'order' => ['id' => 'ASC'],
            'pagination' => ['limit' => 50],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "iblock.element.list", b24.Params{
    	"filter": []any{
    		[]any{"iblockId", 14},
    		[]any{"iblockSectionId", 8},
    	},
    	"select": []string{"id", "name", "properties"},
    	"order": b24.Params{
    		"id": "ASC",
    	},
    	"pagination": b24.Params{
    		"limit": 50,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("iblock.element.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID         int             `json:"id"`
    		Name       string          `json:"name"`
    		Properties json.RawMessage `json:"properties"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.ID, item.Name)
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
                "id": 215,
                "name": "Кресло офисное",
                "properties": {
                    "COLOR": {
                        "id": 1043,
                        "value": "Черный",
                        "description": null
                    },
                    "SIZE": [
                        {
                            "id": 1044,
                            "value": "M",
                            "description": null
                        },
                        {
                            "id": 1045,
                            "value": "L",
                            "description": null
                        }
                    ]
                }
            },
            {
                "id": 216,
                "name": "Стол письменный",
                "properties": []
            }
        ]
    },
    "time": {
        "start": 1792670785,
        "finish": 1792670785.424705,
        "duration": 0.42470502853393555,
        "processing": 0,
        "date_start": "2026-10-22T15:06:25+03:00",
        "date_finish": "2026-10-22T15:06:25+03:00",
        "operating_reset_at": 1792671360,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Объект с данными ответа ||
|| **result.items**
[`array`](../data-types.md) | Массив элементов инфоблока на странице. Состав полей зависит от `select`. [Описание полей](#items) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

Общее количество записей метод не возвращает. Если в ответе меньше записей, чем `limit`, страница последняя.

#### Элемент items {#items}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор элемента ||
|| **iblockId**
[`integer`](../data-types.md) | Идентификатор инфоблока ||
|| **name**
[`string`](../data-types.md) | Название элемента ||
|| **iblockSectionId**
[`integer`](../data-types.md) | Идентификатор раздела инфоблока. `null`, если элемент не привязан к разделу ||
|| **properties**
[`object`](../data-types.md) | Значения свойств элемента. Ключ — символьный код свойства, значение — [объект значения](#property-value) для одиночного свойства или массив таких объектов для множественного.

Если `properties` указано в `select`, а свойств у элемента нет, возвращается пустой массив `[]` ||
|#

#### Объект значения свойства {#property-value}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор значения свойства ||
|| **value**
[`string`](../data-types.md) | Значение свойства ||
|| **description**
[`string`](../data-types.md) | Описание значения. `null`, если описание не задано ||
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
                "message": "Unable to compile iblock entity.",
                "field": "iblockId"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Значение поля не может быть пустым | Передайте `filter` с условием по `iblockId` ||
|| `filter` | iblockId must be a positive integer. | Передайте в условии по `iblockId` положительный идентификатор инфоблока ||
|| `iblockId` | Iblock not found. | Инфоблока с таким идентификатором нет. Проверьте значение `iblockId` в фильтре ||
|| `iblockId` | Unable to compile iblock entity. | У инфоблока не задан символьный код API. Задайте его в административной панели. В облачном Битрикс24 это сделать нельзя ||
|| `iblockId` | Restricted iblock ID:`#ID#` (`#API_CODE#`) | У инфоблока выключен доступ через REST. Включите его в административной панели ||
|| `#FIELD#` | В DTO `ElementDto` в поле `#FIELD#` требуется наличие атрибута `Sortable` для такого запроса | Сортируйте только по полям `id`, `name`, `iblockSectionId` ||
|#

#### Ошибка фильтра по обязательному полю

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter.iblockId` | Требуется указать фильтр по обязательному полю `iblockId` | Добавьте в `filter` условие `["iblockId", N]` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select`, `filter` | Неизвестное поле `#FIELD#` для сущности `ElementDto` | Укажите только поля из [описания элемента items](#items) ||
|#

#### Ошибка сортировки

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDORDEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `order` | Не удается распознать выражение сортировки `#ORDER#` | Передайте направление `ASC` или `DESC` ||
|#

#### Ошибка постраничной навигации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации `#PAGINATION#` | Передайте `limit` положительным числом, `offset` — неотрицательным числом, `page` — числом ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./iblock-element-get.md)
- [{#T}](./iblock-element-field-list.md)
- [{#T}](./index.md)
- [{#T}](../lists/index.md)
