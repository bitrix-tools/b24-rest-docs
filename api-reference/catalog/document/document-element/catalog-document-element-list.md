# Получить список товаров в документах складского учета catalog.document.element.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» или «Просмотр и выбор склада»

Метод `catalog.document.element.list` возвращает товарные позиции документов складского учета с фильтрацией, сортировкой и постраничной навигацией.

В ответ попадают позиции только тех документов, на тип которых у пользователя есть право «Просмотр», и только тех складов, которые доступны по праву «Просмотр и выбор склада». Без права «Просмотр закупочной цены товара» поле `purchasingPrice` приходит со значением `null`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../../data-types.md) | Массив полей позиции, которые нужно вернуть. Доступные поля: `id`, `docId`, `elementId`, `storeFrom`, `storeTo`, `amount`, `purchasingPrice`. Описание полей — в объекте [catalog_document_element](../../data-types.md#catalog_document_element).

Если массив не передан или пустой, метод вернет все поля. Неизвестные поля метод пропускает без ошибки. Имена полей пишите в camelCase: если в `select` нет ни одного известного поля, например `["ID", "AMOUNT"]`, метод вернет все поля ||
|| **filter**
[`object`](../../../data-types.md) | Объект для фильтрации позиций в формате `{"field_1": "value_1", ..., "field_N": "value_N"}`.

Возможные значения для `field` — поля из списка в `select`. Например, `{"docId": 371}` вернет позиции документа `371`.

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN, в качестве значения передается массив
- `!@` — NOT IN, в качестве значения передается массив
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно

Массив без префикса работает как IN: `{"id": [71, 101]}` вернет обе позиции. Значение `null` без префикса находит позиции с незаполненным полем, например `{"amount": null}`.

Условия `<` и `<=` могут находить и позиции с незаполненным полем. Префиксы поиска по подстроке `%`, `=%`, `!%` к полям позиции не применяются: все поля числовые.

Неизвестные поля и имена в верхнем регистре, например `AMOUNT`, метод пропускает без ошибки и возвращает позиции без учета такого условия. Проверяйте имена полей по списку выше ||
|| **order**
[`object`](../../../data-types.md) | Объект для сортировки позиций в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` — поля из списка в `select`.

Возможные значения для `order`:

- `asc` — в порядке возрастания
- `desc` — в порядке убывания

Регистр направления не важен: `DESC` и `desc` работают одинаково. Неизвестные поля в `order` метод пропускает без ошибки ||
|| **start**
[`integer`](../../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы.

Если `start` больше количества найденных позиций, метод вернет пустой массив `documentElements` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","docId","elementId","amount","storeFrom","storeTo"],"filter":{"docId":371},"order":{"id":"ASC"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.document.element.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","docId","elementId","amount","storeFrom","storeTo"],"filter":{"docId":371},"order":{"id":"ASC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.document.element.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of one position (only the selected fields); empty fields come as null
    type DocumentElement = {
      id: number
      docId: number
      elementId: number | null
      amount: number | null
      storeFrom: number | null
      storeTo: number | null
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type DocumentElementListResult = {
      documentElements: DocumentElement[]
    }

    try {
      // catalog.document.element.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<DocumentElementListResult>({
        method: 'catalog.document.element.list',
        params: {
          select: [
            'id',
            'docId',
            'elementId',
            'amount',
            'storeFrom',
            'storeTo',
          ],
          filter: {
            docId: 371,
          },
          order: {
            id: 'ASC',
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
        console.info(result.documentElements.length, result.documentElements)
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
      async function listDocumentElements() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // catalog.document.element.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'catalog.document.element.list',
            params: {
              select: [
                'id',
                'docId',
                'elementId',
                'amount',
                'storeFrom',
                'storeTo',
              ],
              filter: {
                docId: 371,
              },
              order: {
                id: 'ASC',
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
          console.info(result.documentElements.length, result.documentElements)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listDocumentElements)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.document.element.list(
            select=[
                "id",
                "docId",
                "elementId",
                "amount",
                "storeFrom",
                "storeTo",
            ],
            filter={
                "docId": 371,
            },
            order={
                "id": "ASC",
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
                'catalog.document.element.list',
                [
                    'select' => [
                        'id',
                        'docId',
                        'elementId',
                        'amount',
                        'storeFrom',
                        'storeTo',
                        'purchasingPrice'
                    ],
                    'filter' => [
                        'docId' => 371
                    ],
                    'order' => [
                        'id' => 'ASC'
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching document elements: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.document.element.list',
        {
            select: [
                'id',
                'docId',
                'elementId',
                'amount',
                'storeFrom',
                'storeTo'
            ],
            filter: {
                docId: 371
            },
            order: {
                id: 'ASC'
            }
        },
        function(result)
        {
            if (result.error())
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
        'catalog.document.element.list',
        [
            'select' => [
                'id',
                'docId',
                'elementId',
                'amount',
                'storeFrom',
                'storeTo'
            ],
            'filter' => [
                'docId' => 371
            ],
            'order' => [
                'id' => 'ASC'
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
    res, err := client.Core().Call(ctx, "catalog.document.element.list", b24.Params{
    	"select": []string{"id", "docId", "elementId", "amount", "storeFrom", "storeTo"},
    	"filter": b24.Params{
    		"docId": 371,
    	},
    	"order": b24.Params{
    		"id": "ASC",
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.document.element.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "documentElements".
    raw, ok := b24.Unwrap(res.Result, "documentElements")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа documentElements")
    }

    // Незаполненные поля приходят как null, поэтому для них указатели.
    var items []struct {
    	Amount    *float64 `json:"amount"`
    	DocID     b24.ID   `json:"docId"`
    	ElementID *int     `json:"elementId"`
    	ID        b24.ID   `json:"id"`
    	StoreFrom *int     `json:"storeFrom"`
    	StoreTo   *int     `json:"storeTo"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.Amount)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "documentElements": [
            {
                "amount": 20,
                "docId": 371,
                "elementId": 6595,
                "id": 71,
                "storeFrom": null,
                "storeTo": 43
            },
            {
                "amount": 12,
                "docId": 371,
                "elementId": 6595,
                "id": 101,
                "storeFrom": null,
                "storeTo": 43
            }
        ]
    },
    "total": 2,
    "time": {
        "start": 1793884005,
        "finish": 1793884005.329118,
        "duration": 0.329118013381958,
        "processing": 0,
        "date_start": "2026-11-05T16:06:45+03:00",
        "date_finish": "2026-11-05T16:06:45+03:00",
        "operating_reset_at": 1793884560,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа ||
|| **result.documentElements**
[`catalog_document_element[]`](../../data-types.md#catalog_document_element) | Массив позиций. У каждой позиции только поля из `select`, незаполненные поля приходят со значением `null` ||
|| **next**
[`integer`](../../../data-types.md) | Значение `start` для получения следующей страницы. Возвращается, если найдено больше 50 позиций ||
|| **total**
[`integer`](../../../data-types.md) | Общее количество найденных позиций ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "100",
    "error_description": "Invalid order \"BAD\""
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_DOCUMENT_RIGHTS` | Access denied | У пользователя нет ни права «Просмотр каталога товаров», ни права «Просмотр и выбор склада» ||
|| `400` | `100` | Invalid order "BAD" | В `order` передано направление, отличное от `asc` и `desc`. В тексте направление приведено к верхнему регистру ||
|| `400` | `100` | Invalid value {abc} to match with parameter {filter}. Should be value of type array. | В `filter` передан не объект. Такая же ошибка с `{select}` или `{order}` — если в них передан не массив и не объект ||
|#

{% include [Системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-document-element-add.md)
- [{#T}](./catalog-document-element-update.md)
- [{#T}](./catalog-document-element-delete.md)
- [{#T}](./catalog-document-element-get-fields.md)
