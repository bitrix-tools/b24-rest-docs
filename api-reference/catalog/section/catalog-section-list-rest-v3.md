# Получить список разделов торгового каталога v 3.0 catalog.section.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» или «Просмотр товаров каталога» и правом на чтение разделов инфоблока

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.section.list` возвращает постранично разделы одного инфоблока торгового каталога.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`array`](../../data-types.md) | Фильтр списка в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`. Условие по `iblockId` обязательно. [Описание полей фильтра](#filter).

Синтаксис фильтра описан в [обзоре REST 3.0](../../rest-v3.md#filter) ||
|| **select**
[`array`](../../data-types.md) | Массив строк с именами полей раздела, которые нужно вернуть в ответе, например `["id","name","iblockSectionId"]`.

Доступные поля:

- `id` — идентификатор раздела
- `iblockId` — идентификатор инфоблока
- `name` — название
- `iblockSectionId` — идентификатор родительского раздела
- `active` — активность
- `code` — символьный код
- `xmlId` — внешний идентификатор
- `sort` — индекс сортировки
- `description` — описание
- `descriptionType` — формат описания

По умолчанию: все поля ||
|| **order**
[`object`](../../data-types.md) | Сортировка в формате `{"поле": "направление"}`, например `{"sort":"ASC"}`. Направление: `ASC` — по возрастанию, `DESC` — по убыванию.

Поля для сортировки: `id`, `name`, `active`, `code`, `xmlId`, `sort`.

По умолчанию: `{"id":"ASC"}` ||
|| **pagination**
[`object`](../../data-types.md) | Постраничная навигация. [Описание структуры объекта](#pagination) ||
|#

### Параметр filter {#filter}

Поддерживаются операторы `=`, `!=`, `>`, `>=`, `<`, `<=`, `in`, `between`. Условия соединяются логикой И. Группы с логикой `or` и отрицание не поддерживаются. Два условия с одинаковым полем и оператором в одном фильтре вызывают ошибку валидации.

#|
|| **Поле** | **Описание** ||
|| **iblockId***
[`integer`](../../data-types.md) | Идентификатор инфоблока. Поддерживается только оператор `=` с одним значением.

Идентификатор можно получить методом [catalog.catalog.list](../catalog/catalog-catalog-list-rest-v3.md) ||
|| **iblockSectionId**
[`integer`](../../data-types.md) | Идентификатор родительского раздела. Условие возвращает только прямые вложенные разделы, без разделов следующих уровней.

Значение `0` означает верхний уровень. С ним работают операторы `=`, `!=`, `>` и `in` с одним значением: `["iblockSectionId","=",0]` возвращает разделы верхнего уровня, `["iblockSectionId",">",0]` — все вложенные разделы.

Операторы `<` и `<=` не поддерживаются ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор раздела ||
|| **name**
[`string`](../../data-types.md) | Название раздела ||
|| **active**
[`string`](../../data-types.md) | Активность раздела: `Y` или `N` ||
|| **code**
[`string`](../../data-types.md) | Символьный код раздела ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний идентификатор раздела ||
|#

Поля `sort`, `description` и `descriptionType` в фильтре недоступны. Условие `in` с пустым массивом возвращает пустой список.

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../data-types.md) | Количество разделов на странице.

Допустимые значения: от `1` до `1000`. Значения больше `1000` уменьшаются до `1000`. Ноль и отрицательные значения вызывают ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../data-types.md) | Номер страницы, начиная с `1`. Используйте вместо `offset` ||
|| **offset**
[`integer`](../../data-types.md) | Количество разделов, которые нужно пропустить. Значение должно быть кратно `limit`: например, при `limit` равном `50` допустимы `0`, `50`, `100`.

По умолчанию: `0` ||
|#

Если запрошена страница за пределами списка, метод возвращает пустой массив `items`. Общее количество разделов в ответе не передается: продолжайте обход, пока страница содержит `limit` элементов.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.section.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","name","iblockSectionId","active","sort"],"filter":[["iblockId","=",25],["iblockSectionId","=",385]],"order":{"sort":"ASC"},"pagination":{"limit":10}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.section.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","name","iblockSectionId","active","sort"],"filter":[["iblockId","=",25],["iblockSectionId","=",385]],"order":{"sort":"ASC"},"pagination":{"limit":10},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.section.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type SectionListResult = {
      items: Array<{
        id: number
        name: string
        iblockSectionId: number
        active: 'Y' | 'N'
        sort: number
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<SectionListResult>({
        method: 'catalog.section.list',
        params: {
          select: [
            'id',
            'name',
            'iblockSectionId',
            'active',
            'sort',
          ],
          filter: [
            ['iblockId', '=', 25],
            ['iblockSectionId', '=', 385],
          ],
          order: {
            sort: 'ASC',
          },
          pagination: {
            limit: 10,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Sections:', result.items.length)
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
      async function listSections() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.section.list',
            params: {
              select: [
                'id',
                'name',
                'iblockSectionId',
                'active',
                'sort',
              ],
              filter: [
                ['iblockId', '=', 25],
                ['iblockSectionId', '=', 385],
              ],
              order: {
                sort: 'ASC',
              },
              pagination: {
                limit: 10,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Sections:', result.items.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listSections)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.section.list(
            select=["id", "name", "iblockSectionId", "active", "sort"],
            filter=[
                ["iblockId", "=", 25],
                ["iblockSectionId", "=", 385],
            ],
            order={
                "sort": "ASC",
            },
            pagination={
                "limit": 10,
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
                'catalog.section.list',
                [
                    'select' => ['id', 'name', 'iblockSectionId', 'active', 'sort'],
                    'filter' => [
                        ['iblockId', '=', 25],
                        ['iblockSectionId', '=', 385],
                    ],
                    'order' => [
                        'sort' => 'ASC',
                    ],
                    'pagination' => [
                        'limit' => 10,
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
        'catalog.section.list',
        {
            select: ['id', 'name', 'iblockSectionId', 'active', 'sort'],
            filter: [
                ['iblockId', '=', 25],
                ['iblockSectionId', '=', 385],
            ],
            order: {
                sort: 'ASC',
            },
            pagination: {
                limit: 10,
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
        'catalog.section.list',
        [
            'select' => ['id', 'name', 'iblockSectionId', 'active', 'sort'],
            'filter' => [
                ['iblockId', '=', 25],
                ['iblockSectionId', '=', 385],
            ],
            'order' => [
                'sort' => 'ASC',
            ],
            'pagination' => [
                'limit' => 10,
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
    res, err := client.Core().Call(ctx, "catalog.section.list", b24.Params{
    	"select": []string{"id", "name", "iblockSectionId", "active", "sort"},
    	"filter": []any{
    		[]any{"iblockId", "=", 25},
    		[]any{"iblockSectionId", "=", 385},
    	},
    	"order": b24.Params{
    		"sort": "ASC",
    	},
    	"pagination": b24.Params{
    		"limit": 10,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.section.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID              int    `json:"id"`
    		Name            string `json:"name"`
    		IblockSectionID int    `json:"iblockSectionId"`
    		Active          string `json:"active"`
    		Sort            int    `json:"sort"`
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
                "id": 387,
                "name": "Сумки и рюкзаки",
                "iblockSectionId": 385,
                "active": "N",
                "sort": 200
            }
        ]
    },
    "time": {
        "start": 1792665627,
        "finish": 1792665627.622331,
        "duration": 0.622330904006958,
        "processing": 0,
        "date_start": "2026-10-22T13:40:27+03:00",
        "date_finish": "2026-10-22T13:40:27+03:00",
        "operating_reset_at": 1792666200,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект со списком разделов ||
|| **result.items**
[`array`](../../data-types.md) | Массив разделов на странице. Состав полей каждого раздела зависит от `select`. [Описание полей](#items) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#items}

Таблица содержит все поля, которые можно запросить в `select`.

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор раздела ||
|| **iblockId**
[`integer`](../../data-types.md) | Идентификатор инфоблока торгового каталога ||
|| **name**
[`string`](../../data-types.md) | Название раздела ||
|| **iblockSectionId**
[`integer`](../../data-types.md) | Идентификатор родительского раздела. `0` — раздел верхнего уровня ||
|| **active**
[`string`](../../data-types.md) | Активность раздела: `Y` — активен, `N` — неактивен ||
|| **code**
[`string`](../../data-types.md) | Символьный код раздела. Пустая строка, если код не задан ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний идентификатор раздела. Пустая строка, если идентификатор не задан ||
|| **sort**
[`integer`](../../data-types.md) | Индекс сортировки ||
|| **description**
[`string`](../../data-types.md) | Описание раздела. Пустая строка, если описание не задано ||
|| **descriptionType**
[`string`](../../data-types.md) | Формат описания: `text` или `html` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации фильтров объекта запроса",
        "validation": [
            {
                "message": "Требуется указать фильтр по обязательному полю `iblockId`",
                "field": "filter.iblockId"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибка обязательного фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter.iblockId` | Требуется указать фильтр по обязательному полю `iblockId` | Добавьте в `filter` условие `["iblockId","=",25]` ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter.iblockId` | Filter condition for "iblockId" supports only equality with a single iblock | Передайте `iblockId` с оператором `=` и одним значением. Разделы нескольких инфоблоков получайте отдельными запросами ||
|| `filter.iblockSectionId` | Filter condition for "iblockSectionId" does not support less than comparisons | Не используйте `<` и `<=` для `iblockSectionId` ||
|| `filter.iblockSectionId` | Filter condition for "iblockSectionId" supports the root value 0 only with "=", "!=", ">" or a single value "in" | Не смешивайте `0` с другими идентификаторами в `in`. Получите разделы верхнего уровня отдельным условием `["iblockSectionId","=",0]` ||
|| `-` | Filter OR groups are not supported | Уберите группу с `"logic": "or"` и выполните несколько запросов ||
|| `-` | Filter NOT groups are not supported | Уберите отрицание группы условий ||
|| `-` | Filter has conflicting conditions for the field "#FIELD#" | Оставьте одно условие с этим полем и оператором, например замените два условия `>` на `between` ||
|| `sort` | В DTO `SectionDto` в поле `sort` требуется наличие атрибута `Filterable` для такого запроса | Уберите из `filter` поле, недоступное для фильтрации ||
|| `iblockSectionId` | В DTO `SectionDto` в поле `iblockSectionId` требуется наличие атрибута `Sortable` для такого запроса | Уберите из `order` поле, недоступное для сортировки ||
|| `-` | pagination.offset must be a non-negative multiple of pagination.limit | Передайте `offset`, кратный `limit`, или используйте `page` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `SectionDto` | Передайте в `select`, `filter` и `order` только поля раздела из таблицы [Элемент items](#items) ||
|#

#### Ошибки формата параметров

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `Unknown filter condition` | Передайте `filter` массивом условий, например `[["iblockId","=",25]]` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNFILTEROPERATOREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Неизвестный оператор фильтра `#OPERATOR#` | Используйте операторы из [обзора REST 3.0](../../rest-v3.md#operators) ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDORDEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `order` | Не удается распознать выражение сортировки `#ORDER#` | Передайте `order` объектом с направлением `ASC` или `DESC`, например `{"sort":"ASC"}` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации `#PAGINATION#` | Передайте `limit` от `1` до `1000` и неотрицательный `offset` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Не удается распознать выражение select `#SELECT#` | Передайте `select` массивом строк, например `["id","name"]` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя на каталог и разделы инфоблока из `iblockId` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-section-add-rest-v3.md)
- [{#T}](./catalog-section-update-rest-v3.md)
- [{#T}](./catalog-section-get-rest-v3.md)
- [{#T}](./catalog-section-delete-rest-v3.md)
- [{#T}](./catalog-section-field-list.md)
