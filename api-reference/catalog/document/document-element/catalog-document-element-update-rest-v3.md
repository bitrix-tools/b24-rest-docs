# Обновить товар в документе складского учета v 3.0 catalog.document.element.update

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

Метод `catalog.document.element.update` изменяет товарную позицию в непроведенном документе складского учета и возвращает ее поля.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор товарной позиции.

Идентификатор можно получить методом [catalog.document.element.list](./catalog-document-element-list-rest-v3.md) или из ответа [catalog.document.element.add](./catalog-document-element-add-rest-v3.md) ||
|| **fields***
[`object`](../../../data-types.md) | Объект с полями товарной позиции, которые нужно изменить. Передавайте только изменяемые поля. [Описание полей](#fields)

Пустой объект `{}` вызывает ошибку ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
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

{% note warning "" %}

По описанию полей `docId` и `elementId` задаются только при добавлении. Сейчас метод принимает их и в `fields` и переносит позицию в другой документ или меняет товар. Чтобы изменить документ или товар, удалите позицию и добавьте новую.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.document.element.update`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":67,"fields":{"amount":4,"purchasingPrice":110}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.document.element.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":67,"fields":{"amount":4,"purchasingPrice":110},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.document.element.update
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type DocumentElementUpdateResult = {
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
      const response = await $b24.actions.v3.call.make<DocumentElementUpdateResult>({
        method: 'catalog.document.element.update',
        params: {
          id: 67,
          fields: {
            amount: 4,
            purchasingPrice: 110,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Element updated:', result.item.amount)
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
      async function documentElementUpdate() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.document.element.update',
            params: {
              id: 67,
              fields: {
                amount: 4,
                purchasingPrice: 110,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Element updated:', result.item.amount)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', documentElementUpdate)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.document.element.update(
            bitrix_id=67,
            fields={
                "amount": 4,
                "purchasingPrice": 110,
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
                'catalog.document.element.update',
                [
                    'id' => 67,
                    'fields' => [
                        'amount' => 4,
                        'purchasingPrice' => 110,
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
        'catalog.document.element.update',
        {
            id: 67,
            fields: {
                amount: 4,
                purchasingPrice: 110,
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
        'catalog.document.element.update',
        [
            'id' => 67,
            'fields' => [
                'amount' => 4,
                'purchasingPrice' => 110,
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
    res, err := client.Core().Call(ctx, "catalog.document.element.update", b24.Params{
    	"id":     67,
    	"fields": b24.Params{
    		"amount":          4,
    		"purchasingPrice": 110,
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.document.element.update: %w", err)
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
            "amount": 4,
            "purchasingPrice": 110
        }
    },
    "time": {
        "start": 1792665370,
        "finish": 1792665370.918465,
        "duration": 0.9184648990631104,
        "processing": 0,
        "date_start": "2026-10-22T13:36:10+03:00",
        "date_finish": "2026-10-22T13:36:10+03:00",
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
[`object`](../../../data-types.md) | Поля товарной позиции после изменения. [Описание полей](#item) ||
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
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `999999` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не заполнено значение хотя бы одного обязательного поля: id, filter | Передайте `id` товарной позиции. Вместе с этим сообщением приходит второе: «Должно быть передано только одно из значений: id, filter» ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `amount` | В поле `amount` требуется тип данных `float` для такого запроса | Передайте число ||
|| `ERROR_DOCUMENT_STATUS` | Conducted document | Документ проведен. Отмените проведение методом [catalog.document.cancel](../catalog-document-cancel-rest-v3.md) и повторите запрос ||
|| `-` | Error of modifying new document | Передайте в `fields` хотя бы одно поле ||
|#

#### Ошибка формата фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `filter` | Метод не поддерживает `filter`. Передайте `id` товарной позиции ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `#ID#` не найдена | Товарной позиции с таким идентификатором нет. Проверьте идентификатор методом [catalog.document.element.list](./catalog-document-element-list-rest-v3.md) ||
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

- [{#T}](./catalog-document-element-add-rest-v3.md)
- [{#T}](./catalog-document-element-list-rest-v3.md)
- [{#T}](./catalog-document-element-delete-rest-v3.md)
- [{#T}](./catalog-document-element-field-list.md)
- [{#T}](./catalog-document-element-field-get.md)
- [{#T}](../catalog-document-list-rest-v3.md)
