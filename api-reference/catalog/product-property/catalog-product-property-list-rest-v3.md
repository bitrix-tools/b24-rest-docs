# Получить список свойств товаров или вариаций v 3.0 catalog.product.property.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.product.property.list` возвращает список свойств товаров и вариаций. Свойства инфоблоков, которые не являются торговыми каталогами, например универсальных списков, в список не попадают.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Список полей свойства, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор свойства
- `timestampX` — дата и время последнего изменения
- `iblockId` — идентификатор торгового каталога
- `name` — название
- `active` — активность
- `sort` — сортировка
- `code` — символьный код
- `defaultValue` — значение по умолчанию
- `propertyType` — базовый тип
- `userType` — пользовательский тип
- `userTypeSettings` — настройки пользовательского типа
- `rowCount` — число строк поля ввода
- `colCount` — число колонок поля ввода
- `listType` — внешний вид списка
- `multiple` — множественное свойство
- `multipleCnt` — число полей для множественных значений
- `xmlId` — внешний идентификатор
- `fileType` — расширения файлов
- `linkIblockId` — идентификатор связанного инфоблока
- `withDescription` — можно ли добавить описание к значению
- `searchable` — участие в поиске
- `filtrable` — участие в фильтрации
- `isRequired` — обязательно ли для заполнения
- `hint` — подсказка
- `controlId` — имя поля свойства в формах инфоблока

По умолчанию: все поля ||
|| **filter**
[`array`](../../data-types.md) | Фильтр в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`, например `[["iblockId","=",25]]`. Синтаксис фильтра описан в [обзоре REST 3.0](../../rest-v3.md#filter).

Фильтровать можно по полям `id`, `timestampX`, `iblockId`, `name`, `active`, `sort`, `code`, `propertyType`, `userType`, `multiple`, `xmlId`, `linkIblockId`, `withDescription`, `searchable`, `filtrable` и `isRequired`. Для флагов передавайте `true` или `false`.

Отрицание по `iblockId` не поддерживается: вместо условия «все каталоги, кроме одного» перечислите нужные каталоги через оператор `in`.

Идентификаторы торговых каталогов можно получить методом [catalog.catalog.list](../catalog/catalog-catalog-list-rest-v3.md) ||
|| **order**
[`object`](../../data-types.md) | Сортировка в формате `{"поле": "направление"}`, например `{"sort":"ASC"}`.

Сортировать можно по полям `id`, `timestampX`, `iblockId`, `name`, `active`, `sort`, `code`, `propertyType` и `xmlId`.

Возможные значения направления:

- `ASC` — по возрастанию
- `DESC` — по убыванию ||
|| **pagination**
[`object`](../../data-types.md) | Постраничная навигация. [Описание объекта](#pagination) ||
|#

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../data-types.md) | Количество свойств на странице. Значения больше `1000` уменьшаются до `1000`. Ноль и отрицательное значение вызывают ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../data-types.md) | Номер страницы, начиная с `1`. Если передан `page`, значение `offset` не учитывается ||
|| **offset**
[`integer`](../../data-types.md) | Количество свойств, которые нужно пропустить от начала списка.

По умолчанию: `0` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.product.property.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","iblockId","name","code","propertyType","userType","multiple"],"filter":[["iblockId","=",25],["propertyType","=","L"]],"order":{"sort":"ASC"},"pagination":{"limit":3}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.property.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","iblockId","name","code","propertyType","userType","multiple"],"filter":[["iblockId","=",25],["propertyType","=","L"]],"order":{"sort":"ASC"},"pagination":{"limit":3},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.product.property.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ProductPropertyListResult = {
      items: Array<{
        id: number
        iblockId: number
        name: string
        code: string | null
        propertyType: string
        userType: string | null
        multiple: boolean
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<ProductPropertyListResult>({
        method: 'catalog.product.property.list',
        params: {
          select: ['id', 'iblockId', 'name', 'code', 'propertyType', 'userType', 'multiple'],
          filter: [
            ['iblockId', '=', 25],
            ['propertyType', '=', 'L'],
          ],
          order: {
            sort: 'ASC',
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
        result.items.forEach(property => console.info(property.id, property.name, property.code))
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
      async function listProductProperties() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.product.property.list',
            params: {
              select: ['id', 'iblockId', 'name', 'code', 'propertyType', 'userType', 'multiple'],
              filter: [
                ['iblockId', '=', 25],
                ['propertyType', '=', 'L'],
              ],
              order: {
                sort: 'ASC',
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
          result.items.forEach(property => console.info(property.id, property.name, property.code))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listProductProperties)
    </script>
    ```

- Python

    У методов `catalog.product.property.*` REST 3.0 нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `call_method` токена клиента с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "catalog.product.property.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})
    bitrix_token = client.get_token()

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "select": ["id", "iblockId", "name", "code", "propertyType", "userType", "multiple"],
                "filter": [
                    ["iblockId", "=", 25],
                    ["propertyType", "=", "L"],
                ],
                "order": {
                    "sort": "ASC",
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
                'catalog.product.property.list',
                [
                    'select' => ['id', 'iblockId', 'name', 'code', 'propertyType', 'userType', 'multiple'],
                    'filter' => [
                        ['iblockId', '=', 25],
                        ['propertyType', '=', 'L'],
                    ],
                    'order' => [
                        'sort' => 'ASC',
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
        'catalog.product.property.list',
        {
            select: ['id', 'iblockId', 'name', 'code', 'propertyType', 'userType', 'multiple'],
            filter: [
                ['iblockId', '=', 25],
                ['propertyType', '=', 'L'],
            ],
            order: {
                sort: 'ASC',
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
        'catalog.product.property.list',
        [
            'select' => ['id', 'iblockId', 'name', 'code', 'propertyType', 'userType', 'multiple'],
            'filter' => [
                ['iblockId', '=', 25],
                ['propertyType', '=', 'L'],
            ],
            'order' => [
                'sort' => 'ASC',
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
    res, err := client.Core().Call(ctx, "catalog.product.property.list", b24.Params{
    	"select": []string{"id", "iblockId", "name", "code", "propertyType", "userType", "multiple"},
    	"filter": []any{
    		[]any{"iblockId", "=", 25},
    		[]any{"propertyType", "=", "L"},
    	},
    	"order": b24.Params{
    		"sort": "ASC",
    	},
    	"pagination": b24.Params{
    		"limit": 3,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.product.property.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID           int    `json:"id"`
    		Name         string `json:"name"`
    		Code         string `json:"code"`
    		PropertyType string `json:"propertyType"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, property := range result.Items {
    	fmt.Println(property.ID, property.Name, property.Code, property.PropertyType)
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
                "id": 295,
                "iblockId": 25,
                "name": "Новинка",
                "code": "NEWPRODUCT",
                "propertyType": "L",
                "userType": null,
                "multiple": false
            },
            {
                "id": 297,
                "iblockId": 25,
                "name": "Лидер продаж",
                "code": "SALELEADER",
                "propertyType": "L",
                "userType": null,
                "multiple": false
            },
            {
                "id": 299,
                "iblockId": 25,
                "name": "Спецпредложение",
                "code": "SPECIALOFFER",
                "propertyType": "L",
                "userType": null,
                "multiple": false
            }
        ]
    },
    "time": {
        "start": 1794922888,
        "finish": 1794922888.556874,
        "duration": 0.5568740367889404,
        "processing": 0,
        "date_start": "2026-11-17T16:41:28+03:00",
        "date_finish": "2026-11-17T16:41:28+03:00",
        "operating_reset_at": 1794923460,
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
[`array`](../../data-types.md) | Массив свойств. Состав полей зависит от `select`. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

Общее количество свойств метод не возвращает. Если в ответе меньше свойств, чем `limit`, страница последняя.

#### Элемент items {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор свойства ||
|| **timestampX**
[`datetime`](../../data-types.md) | Дата и время последнего изменения свойства ||
|| **iblockId**
[`integer`](../../data-types.md) | Идентификатор торгового каталога, к которому относится свойство ||
|| **name**
[`string`](../../data-types.md) | Название свойства ||
|| **active**
[`boolean`](../../data-types.md) | Активность свойства:
- `true` — свойство активно
- `false` — свойство неактивно ||
|| **sort**
[`integer`](../../data-types.md) | Сортировка ||
|| **code**
[`string`](../../data-types.md) или `null` | Символьный код свойства ||
|| **defaultValue**
[`string`](../../data-types.md) или `null` | Значение по умолчанию ||
|| **propertyType**
[`string`](../../data-types.md) | Базовый тип свойства:
- `N` — число
- `S` — строка
- `L` — список
- `F` — файл
- `E` — привязка к элементам
- `G` — привязка к разделам ||
|| **userType**
[`string`](../../data-types.md) или `null` | Пользовательский тип свойства, например `Money` или `DateTime`. У свойства без пользовательского типа и у свойства-флажка — `null` ||
|| **userTypeSettings**
[`object`](../../data-types.md) или [`array`](../../data-types.md) | Настройки пользовательского типа. Если настроек нет — пустой массив `[]` ||
|| **rowCount**
[`integer`](../../data-types.md) | Число строк поля ввода ||
|| **colCount**
[`integer`](../../data-types.md) | Число колонок поля ввода ||
|| **listType**
[`string`](../../data-types.md) | Внешний вид списка:
- `L` — выпадающий список
- `C` — флажки ||
|| **multiple**
[`boolean`](../../data-types.md) | Множественное свойство:
- `true` — свойство хранит несколько значений
- `false` — одно значение ||
|| **multipleCnt**
[`integer`](../../data-types.md) или `null` | Число полей для ввода множественных значений ||
|| **xmlId**
[`string`](../../data-types.md) или `null` | Внешний идентификатор свойства ||
|| **fileType**
[`string`](../../data-types.md) или `null` | Расширения файлов для свойства типа `F` ||
|| **linkIblockId**
[`integer`](../../data-types.md) или `null` | Для свойств типа `E` и `G` — идентификатор инфоблока, к элементам или разделам которого привязано свойство ||
|| **withDescription**
[`boolean`](../../data-types.md) | `true` — к значению свойства можно добавить описание ||
|| **searchable**
[`boolean`](../../data-types.md) | `true` — значения свойства участвуют в поиске ||
|| **filtrable**
[`boolean`](../../data-types.md) | `true` — свойство участвует в фильтрации товаров ||
|| **isRequired**
[`boolean`](../../data-types.md) | `true` — свойство обязательно для заполнения в карточке товара ||
|| **hint**
[`string`](../../data-types.md) или `null` | Подсказка к полю свойства ||
|| **controlId**
[`string`](../../data-types.md) | Имя поля свойства в формах инфоблока в формате `PROPERTY_<id>`, например `PROPERTY_1291` ||
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
                "message": "Filter negation over `iblockId` is not supported"
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
|| `#FIELD#` | В DTO `ProductPropertyDto` в поле `#FIELD#` требуется наличие атрибута `Filterable` для такого запроса | Фильтруйте только по полям из описания параметра `filter` ||
|| `#FIELD#` | В DTO `ProductPropertyDto` в поле `#FIELD#` требуется наличие атрибута `Sortable` для такого запроса | Сортируйте только по полям из описания параметра `order` ||
|| `-` | Filter negation over `iblockId` is not supported | Уберите отрицание по `iblockId` и перечислите нужные каталоги через оператор `in` ||
|#

#### Ошибка оператора фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNFILTEROPERATOREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Неизвестный оператор фильтра `#OPERATOR#` | Используйте операторы из [обзора REST 3.0](../../rest-v3.md#filter) ||
|#

#### Ошибка сортировки

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDORDEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `order` | Не удается распознать выражение сортировки `#ORDER#` | Передайте направление `ASC` или `DESC` ||
|#

#### Ошибка пагинации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации `{"limit":0}` | Передайте в `limit` число больше `0` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `ProductPropertyDto` | Укажите в `select` только поля из описания параметра `select` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право «Просмотр каталога товаров» ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-property-add-rest-v3.md)
- [{#T}](./catalog-product-property-update-rest-v3.md)
- [{#T}](./catalog-product-property-get-rest-v3.md)
- [{#T}](./catalog-product-property-delete-rest-v3.md)
- [{#T}](./catalog-product-property-field-list.md)
- [{#T}](./catalog-product-property-type-list.md)
