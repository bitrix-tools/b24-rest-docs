# Получить список разделов торгового каталога catalog.section.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» или «Просмотр товаров каталога» и правом на чтение разделов инфоблока

Метод `catalog.section.list` возвращает список разделов торгового каталога.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив содержит список полей, которые необходимо выбрать (смотрите поля объекта [catalog_section](../data-types.md#catalog_section)).

Если не передан или передан пустой массив, то будут выбраны все доступные поля раздела каталога ||
|| **filter***
[`object`](../../data-types.md) | Объект для фильтрации разделов каталога в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Обязательный ключ — `iblockId`, идентификатор инфоблока торгового каталога. Получить его можно методом [catalog.catalog.list](../catalog/catalog-catalog-list.md).

Фильтровать можно по полям `id`, `iblockId`, `iblockSectionId`, `name`, `code`, `xmlId` и `active`. Условия по другим полям, например `sort` или `description`, метод пропускает без ошибки.

К ключу можно добавить префикс, который задает условие:
- `=` — равно. Используется по умолчанию. Если передать массив значений, метод вернет разделы, у которых значение входит в массив
- `!` или `!=` — не равно. С массивом значений — не входит в массив
- `>` — больше
- `>=` — больше или равно
- `<` — меньше
- `<=` — меньше или равно
- `%` — содержит подстроку. Символ `%` в значении передавать не нужно

Префиксы `@`, `!@`, `=%`, `%=`, `!%`, `!=%` и `!%=` метод не поддерживает: условие с ними не применяется ||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки выбранных разделов каталога в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_section](../data-types.md#catalog_section).

Возможные значения для `order`:
- `asc` — в порядке возрастания
- `desc` — в порядке убывания ||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный: 50 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "select": ["id", "name", "sort"],
        "filter": {
            "iblockId": 25,
            "iblockSectionId": 31
        },
        "order": {
            "sort": "DESC"
        }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.section.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "select": ["id", "name", "sort"],
        "filter": {
            "iblockId": 25,
            "iblockSectionId": 31
        },
        "order": {
            "sort": "DESC"
        },
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/catalog.section.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CatalogSectionListResult = {
      sections: {
        id: number
        name: string
        sort: number
      }[]
    }

    try {
      // catalog.section.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<CatalogSectionListResult>({
        method: 'catalog.section.list',
        params: {
          select: ['id', 'name', 'sort'],
          filter: {
            iblockId: 25,
            'iblockSectionId': 31,
          },
          order: {
            sort: 'DESC',
          },
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Sections on this page:', result.sections.length, result.sections)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function fetchCatalogSections() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // catalog.section.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'catalog.section.list',
            params: {
              select: ['id', 'name', 'sort'],
              filter: {
                iblockId: 25,
                'iblockSectionId': 31,
              },
              order: {
                sort: 'DESC',
              },
              start: 0,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Sections on this page:', result.sections.length, result.sections)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchCatalogSections)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.section.list(
            select=[
                "id",
                "name",
                "sort",
            ],
            filter={
                "iblockId": 25,
            },
            order={
                "sort": "DESC",
            },
            start=0,
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

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.section.list',
                [
                    'select' => ["id", "name", "sort"],
                    'filter' => [
                        'iblockId' => 25,
                        'iblockSectionId'  => 31
                    ],
                    'order'  => ['sort' => 'DESC']
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

    ```js
    BX24.callMethod(
        'catalog.section.list',
        {
            select: ["id", "name", "sort"],
            filter: {
                'iblockId': 25,
                'iblockSectionId': 31
            },
            order: {'sort': 'DESC'}
        },
        function(result)
        {
        if(result.error())
            console.error(result.error());
        else
            console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.section.list',
        [
            'select' => ["id", "name", "sort"],
            'filter' => [
                'iblockId' => 25,
                'iblockSectionId' => 31
            ],
            'order' => [
                'sort' => 'DESC'
            ]
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
    	"select": []string{"id", "name", "sort"},
    	"filter": b24.Params{
    		"iblockId": 25,
    		"iblockSectionId":   31,
    	},
    	"order": b24.Params{
    		"sort": "DESC",
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.section.list: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "sections": [
            {
                "id": 19,
                "name": "Экскурсии",
                "sort": 500
            },
            {
                "id": 21,
                "name": "Ложки коллекционные",
                "sort": 500
            },
            {
                "id": 43,
                "name": "Спортивная Одежда",
                "sort": 500
            },
            {
                "id": 41,
                "name": "Футболки",
                "sort": 400
            },
            {
                "id": 39,
                "name": "Платья",
                "sort": 100
            },
            {
                "id": 33,
                "name": "Обувь",
                "sort": 50
            }
        ]
    },
    "total": 6,
    "time": {
        "start": 1793615638,
        "finish": 1793615638.10939,
        "duration": 0.1093900203704834,
        "processing": 0,
        "date_start": "2026-11-02T13:33:58+03:00",
        "date_finish": "2026-11-02T13:33:58+03:00",
        "operating_reset_at": 1793616180,
        "operating": 0.6537201404571533
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **result.sections**
[`catalog_section[]`](../data-types.md#catalog_section) | Массив объектов с информацией о выбранных разделах каталога ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Required filter fields: iblockId"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300010` | Access Denied | Нет права «Просмотр каталога товаров» или «Просмотр товаров каталога» ||
|| `400` | `200040300030` | Access Denied | Нет права на чтение инфоблока из `filter.iblockId` ||
|| `400` | `200700300050` | Iblock is not exists | Инфоблок из `filter.iblockId` не найден ||
|| `400` | `0` | Required filter fields: iblockId | В `filter` не передан обязательный ключ `iblockId` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-section-add.md)
- [{#T}](./catalog-section-update.md)
- [{#T}](./catalog-section-get.md)
- [{#T}](./catalog-section-delete.md)
- [{#T}](./catalog-section-get-fields.md)
