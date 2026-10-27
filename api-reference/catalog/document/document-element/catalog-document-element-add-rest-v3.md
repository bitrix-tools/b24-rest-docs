# Добавить товар в документ складского учета v 3.0 catalog.document.element.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Создание и редактирование» для документов этого типа и правом «Просмотр и выбор склада» для складов товарной позиции

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `catalog.document.element.add` добавляет товарную позицию в документ складского учета и возвращает ее поля.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Объект с полями новой товарной позиции. [Описание полей](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **docId***
[`integer`](../../../data-types.md) | Идентификатор документа складского учета. Документ не должен быть проведен.

Идентификатор можно получить методом [catalog.document.list](../catalog-document-list-rest-v3.md) или из ответа [catalog.document.add](../catalog-document-add-rest-v3.md) ||
|| **elementId***
[`integer`](../../../data-types.md) | Идентификатор товара.

Идентификатор можно получить методом [catalog.product.list](../../product/catalog-product-list-rest-v3.md) ||
|| **storeFrom**
[`integer`](../../../data-types.md) | Идентификатор склада, с которого списывается товар. Используется в документах списания, реализации и перемещения.

Идентификатор можно получить методом [catalog.store.list](../../store/catalog-store-list.md) ||
|| **storeTo**
[`integer`](../../../data-types.md) | Идентификатор склада, на который поступает товар. Используется в документах прихода, оприходования и перемещения.

Идентификатор можно получить методом [catalog.store.list](../../store/catalog-store-list.md) ||
|| **amount**
[`double`](../../../data-types.md) | Количество товара ||
|| **purchasingPrice**
[`double`](../../../data-types.md) | Закупочная цена в валюте документа ||
|#

Поле `id` заполняется автоматически. Если передать его в `fields`, метод вернет ошибку.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.document.element.add`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"docId":325,"storeTo":17,"elementId":7573,"amount":3,"purchasingPrice":115}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.document.element.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"docId":325,"storeTo":17,"elementId":7573,"amount":3,"purchasingPrice":115},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.document.element.add
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type DocumentElementAddResult = {
      item: {
        id: number
        docId: number
        storeFrom: number
        storeTo: number
        elementId: number
        amount: number
        purchasingPrice: number
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<DocumentElementAddResult>({
        method: 'catalog.document.element.add',
        params: {
          fields: {
            docId: 325,
            storeTo: 17,
            elementId: 7573,
            amount: 3,
            purchasingPrice: 115,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Element added:', result.item.id)
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
      async function documentElementAdd() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.document.element.add',
            params: {
              fields: {
                docId: 325,
                storeTo: 17,
                elementId: 7573,
                amount: 3,
                purchasingPrice: 115,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Element added:', result.item.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', documentElementAdd)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.document.element.add(
            fields={
                "docId": 325,
                "storeTo": 17,
                "elementId": 7573,
                "amount": 3,
                "purchasingPrice": 115,
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
                'catalog.document.element.add',
                [
                    'fields' => [
                        'docId' => 325,
                        'storeTo' => 17,
                        'elementId' => 7573,
                        'amount' => 3,
                        'purchasingPrice' => 115,
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
        'catalog.document.element.add',
        {
            fields: {
                docId: 325,
                storeTo: 17,
                elementId: 7573,
                amount: 3,
                purchasingPrice: 115,
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
        'catalog.document.element.add',
        [
            'fields' => [
                'docId' => 325,
                'storeTo' => 17,
                'elementId' => 7573,
                'amount' => 3,
                'purchasingPrice' => 115,
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
    res, err := client.Core().Call(ctx, "catalog.document.element.add", b24.Params{
    	"fields": b24.Params{
    		"docId":           325,
    		"storeTo":         17,
    		"elementId":       7573,
    		"amount":          3,
    		"purchasingPrice": 115,
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.document.element.add: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID        int     `json:"id"`
    	DocID     int     `json:"docId"`
    	ElementID int     `json:"elementId"`
    	Amount    float64 `json:"amount"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Amount)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 67,
            "docId": 325,
            "storeFrom": 0,
            "storeTo": 17,
            "elementId": 7573,
            "amount": 3,
            "purchasingPrice": 115
        }
    },
    "time": {
        "start": 1792665369,
        "finish": 1792665369.641646,
        "duration": 0.6416459083557129,
        "processing": 0,
        "date_start": "2026-10-22T13:36:09+03:00",
        "date_finish": "2026-10-22T13:36:09+03:00",
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
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **result.item**
[`object`](../../../data-types.md) | Поля добавленной товарной позиции. [Описание полей](#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор товарной позиции документа ||
|| **docId**
[`integer`](../../../data-types.md) | Идентификатор документа складского учета ||
|| **storeFrom**
[`integer`](../../../data-types.md) | Идентификатор склада, с которого списывается товар. `0` — склад не указан ||
|| **storeTo**
[`integer`](../../../data-types.md) | Идентификатор склада, на который поступает товар. `0` — склад не указан ||
|| **elementId**
[`integer`](../../../data-types.md) | Идентификатор товара ||
|| **amount**
[`double`](../../../data-types.md) | Количество товара ||
|| **purchasingPrice**
[`double`](../../../data-types.md) | Закупочная цена в валюте документа ||
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
                "message": "Conducted document",
                "field": "ERROR_DOCUMENT_STATUS"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `docId` | Не заполнено обязательное поле "docId" | Передайте `docId` в `fields` ||
|| `elementId` | Не заполнено обязательное поле "elementId" | Передайте `elementId` в `fields` ||
|| `id` | Поле "id" не доступно к заполнению | Уберите `id` из `fields` ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `docId` | В поле `docId` требуется тип данных `int` для такого запроса | Передайте целое число ||
|| `amount` | В поле `amount` требуется тип данных `float` для такого запроса | Передайте число ||
|| `ERROR_DOCUMENT_STATUS` | Conducted document | Документ проведен. Отмените проведение методом [catalog.document.cancel](../catalog-document-cancel-rest-v3.md) и повторите запрос ||
|| `-` | Error of adding new document element | Товарная позиция не сохранена. Проверьте значения полей и повторите запрос ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Документа с идентификатором `docId` нет. Проверьте идентификатор методом [catalog.document.list](../catalog-document-list-rest-v3.md) ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `DocumentElementDto` | Передайте в `fields` только поля из таблицы [Параметр fields](#fields) ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права на документы этого типа и на склады товарной позиции ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-document-element-update-rest-v3.md)
- [{#T}](./catalog-document-element-list-rest-v3.md)
- [{#T}](./catalog-document-element-delete-rest-v3.md)
- [{#T}](./catalog-document-element-field-list.md)
- [{#T}](./catalog-document-element-field-get.md)
- [{#T}](../catalog-document-list-rest-v3.md)
