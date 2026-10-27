# Изменить документ складского учета v 3.0 catalog.document.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Создание и редактирование» на нужный тип документа и одним из прав: «Просмотр и выбор склада» или «Просмотр каталога товаров»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.document.update` изменяет поля документа складского учета и возвращает документ после изменения.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор документа.

Идентификатор можно получить методом [catalog.document.list](./catalog-document-list-rest-v3.md) или из ответа [catalog.document.add](./catalog-document-add-rest-v3.md) ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями документа складского учета, которые нужно изменить. Передавайте только изменяемые поля. [Описание полей](#fields)

Пустой объект `{}` возвращает документ без изменений ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **responsibleId**
[`integer`](../../data-types.md) | Идентификатор ответственного.

Идентификатор пользователя можно получить методом [user.get](../../user/user-get.md) ||
|| **currency**
[`string`](../../data-types.md) | Код валюты документа, например `RUB` ||
|| **title**
[`string`](../../data-types.md) | Название документа. Если не передать, Битрикс24 сформирует название по типу и номеру, например «Приходная накладная #37» ||
|| **docNumber**
[`string`](../../data-types.md) | Номер входящего документа ||
|| **dateDocument**
[`datetime`](../../data-types.md) | Дата документа в формате ISO 8601 с временем, например `2026-10-22T10:00:00+03:00`. Дата без времени вызывает ошибку валидации ||
|| **total**
[`double`](../../data-types.md) | Сумма документа ||
|| **commentary**
[`string`](../../data-types.md) | Комментарий ||
|| **statusBy**
[`integer`](../../data-types.md) | Идентификатор пользователя, который последним изменил статус ||
|| **modifiedBy**
[`integer`](../../data-types.md) | Идентификатор пользователя, который последним изменил документ. Значение сохраняется, только если метод вызывает администратор. В остальных случаях подставляется текущий пользователь ||
|| **contractorId**
[`integer`](../../data-types.md) | Идентификатор поставщика из справочника каталога. Если в Битрикс24 поставщики ведутся в CRM, поле не сохраняется. Привязать поставщика CRM к документу можно методом [catalog.document.contractor.add](../documentcontractor/catalog-documentcontractor-add-rest-v3.md) ||
|| **siteId**
[`string`](../../data-types.md) | Идентификатор сайта ||
|#

Тип документа `docType` изменить нельзя: значение в `fields` метод не сохраняет и не возвращает ошибку. Поля `id`, `dateCreate`, `dateModify`, `createdBy`, `status` и `dateStatus` заполняются автоматически. Если передать их в `fields`, метод вернет ошибку.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.document.update`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":343,"fields":{"title":"Приход от поставщика ООО Альфа","dateDocument":"2026-10-22T10:00:00+03:00","total":15000}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.document.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":343,"fields":{"title":"Приход от поставщика ООО Альфа","dateDocument":"2026-10-22T10:00:00+03:00","total":15000},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.document.update
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type DocumentUpdateResult = {
      item: {
        id: number
        docType: string
        siteId: string
        responsibleId: number
        dateModify: ISODate
        dateCreate: ISODate
        createdBy: number
        modifiedBy: number
        currency: string
        status: string
        dateStatus: ISODate
        dateDocument: ISODate | null
        statusBy: number
        total: number
        commentary: string
        title: string
        docNumber: string
        contractorId: number
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<DocumentUpdateResult>({
        method: 'catalog.document.update',
        params: {
          id: 343,
          fields: {
            title: 'Приход от поставщика ООО Альфа',
            dateDocument: '2026-10-22T10:00:00+03:00',
            total: 15000,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Document updated:', result.item.id, result.item.title)
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
      async function callDocumentUpdate() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.document.update',
            params: {
              id: 343,
              fields: {
                title: 'Приход от поставщика ООО Альфа',
                dateDocument: '2026-10-22T10:00:00+03:00',
                total: 15000,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Document updated:', result.item.id, result.item.title)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', callDocumentUpdate)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.document.update(
            id=343,
            fields={
                "title": "Приход от поставщика ООО Альфа",
                "dateDocument": "2026-10-22T10:00:00+03:00",
                "total": 15000,
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
                'catalog.document.update',
                [
                    'id' => 343,
                    'fields' => [
                        'title' => 'Приход от поставщика ООО Альфа',
                        'dateDocument' => '2026-10-22T10:00:00+03:00',
                        'total' => 15000,
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
        'catalog.document.update',
        {
            id: 343,
            fields: {
                title: 'Приход от поставщика ООО Альфа',
                dateDocument: '2026-10-22T10:00:00+03:00',
                total: 15000,
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
        'catalog.document.update',
        [
            'id' => 343,
            'fields' => [
                'title' => 'Приход от поставщика ООО Альфа',
                'dateDocument' => '2026-10-22T10:00:00+03:00',
                'total' => 15000,
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
    res, err := client.Core().Call(ctx, "catalog.document.update", b24.Params{
    	"id":     343,
    	"fields": b24.Params{
    		"title":        "Приход от поставщика ООО Альфа",
    		"dateDocument": "2026-10-22T10:00:00+03:00",
    		"total":        15000,
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.document.update: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID       int     `json:"id"`
    	DocType  string  `json:"docType"`
    	Title    string  `json:"title"`
    	Status   string  `json:"status"`
    	Total    float64 `json:"total"`
    	Currency string  `json:"currency"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Title, item.Status)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 343,
            "docType": "A",
            "siteId": "s1",
            "responsibleId": 1,
            "dateModify": "2026-10-22T13:34:08+03:00",
            "dateCreate": "2026-10-22T13:34:07+03:00",
            "createdBy": 1,
            "modifiedBy": 1,
            "currency": "RUB",
            "status": "",
            "dateStatus": "2026-10-22T13:34:07+03:00",
            "dateDocument": "2026-10-22T10:00:00+03:00",
            "statusBy": 0,
            "total": 15000,
            "commentary": "Поставка по счету 15",
            "title": "Приход от поставщика ООО Альфа",
            "docNumber": "IN-0015",
            "contractorId": 0
        }
    },
    "time": {
        "start": 1792665248,
        "finish": 1792665248.332424,
        "duration": 0.3324239253997803,
        "processing": 0,
        "date_start": "2026-10-22T13:34:08+03:00",
        "date_finish": "2026-10-22T13:34:08+03:00",
        "operating_reset_at": 1792665840,
        "operating": 0.10437798500061035
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными ответа ||
|| **result.item**
[`object`](../../data-types.md) | Поля документа после изменения. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор документа ||
|| **docType**
[`string`](../../data-types.md) | Тип документа: `A` — приход, `S` — оприходование, `M` — перемещение, `R` — возврат, `D` — списание ||
|| **siteId**
[`string`](../../data-types.md) | Идентификатор сайта, например `s1` ||
|| **responsibleId**
[`integer`](../../data-types.md) | Идентификатор ответственного ||
|| **dateModify**
[`datetime`](../../data-types.md) | Дата и время последнего изменения ||
|| **dateCreate**
[`datetime`](../../data-types.md) | Дата и время создания ||
|| **createdBy**
[`integer`](../../data-types.md) | Идентификатор пользователя, который создал документ ||
|| **modifiedBy**
[`integer`](../../data-types.md) | Идентификатор пользователя, который последним изменил документ ||
|| **currency**
[`string`](../../data-types.md) | Код валюты документа, например `RUB` ||
|| **status**
[`string`](../../data-types.md) | Статус проведения: `"1"` — документ проведен, пустая строка — не проведен ||
|| **dateStatus**
[`datetime`](../../data-types.md) | Дата и время последнего изменения статуса ||
|| **dateDocument**
[`datetime`](../../data-types.md) или `null` | Дата документа. `null`, если дата не задана ||
|| **statusBy**
[`integer`](../../data-types.md) | Идентификатор пользователя, который последним изменил статус. `0`, если статус не менялся ||
|| **total**
[`double`](../../data-types.md) | Сумма документа ||
|| **commentary**
[`string`](../../data-types.md) | Комментарий ||
|| **title**
[`string`](../../data-types.md) | Название документа ||
|| **docNumber**
[`string`](../../data-types.md) | Номер входящего документа ||
|| **contractorId**
[`integer`](../../data-types.md) | Идентификатор поставщика из справочника каталога. `0`, если поставщик не указан ||
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

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не заполнено значение хотя бы одного обязательного поля: id, filter | Передайте `id` документа. Вместе с этим сообщением приходит второе: «Должно быть передано только одно из значений: id, filter» ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `dateDocument` | В поле `dateDocument` требуется тип данных `DateTime` для такого запроса | Передайте дату с временем в формате ISO 8601, например `2026-10-22T10:00:00+03:00` ||
|| `-` | Складской учёт недоступен на вашем тарифе | Метод работает только на тарифах со складским учетом ||
|#

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `#FIELD#` | Поле "#FIELD#" не доступно к заполнению | Уберите из `fields` поля `id`, `dateCreate`, `dateModify`, `createdBy`, `status`, `dateStatus` ||
|#

#### Ошибка формата фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `filter` | Метод не поддерживает `filter`. Передайте `id` документа ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `#ID#` не найдена | Проверьте идентификатор методом [catalog.document.list](./catalog-document-list-rest-v3.md) ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `DocumentDto` | Передайте в `fields` только поля из таблицы [Параметр fields](#fields) ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя на этот тип документа ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-document-add-rest-v3.md)
- [{#T}](./catalog-document-get.md)
- [{#T}](./catalog-document-list-rest-v3.md)
- [{#T}](./catalog-document-delete-rest-v3.md)
- [{#T}](./catalog-document-delete-list-rest-v3.md)
- [{#T}](./catalog-document-field-list.md)
- [{#T}](./catalog-document-field-get.md)
