# Получить документ складского учета по идентификатору catalog.document.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр и выбор склада» или «Просмотр каталога товаров»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.document.get` возвращает поля документа складского учета по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор документа.

Идентификатор можно получить методом [catalog.document.list](./catalog-document-list-rest-v3.md) или из ответа [catalog.document.add](./catalog-document-add-rest-v3.md).

Метод возвращает документ, только если у пользователя есть право «Просмотр» на его тип. Иначе метод вернет ошибку доступа ||
|| **select**
[`array`](../../data-types.md) | Массив полей документа, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор документа
- `docType` — тип документа
- `siteId` — идентификатор сайта
- `responsibleId` — идентификатор ответственного
- `dateModify` — дата изменения
- `dateCreate` — дата создания
- `createdBy` — кто создал
- `modifiedBy` — кто изменил
- `currency` — валюта
- `status` — статус проведения
- `dateStatus` — дата изменения статуса
- `dateDocument` — дата документа
- `statusBy` — кто изменил статус
- `total` — сумма
- `commentary` — комментарий
- `title` — название
- `docNumber` — номер входящего документа
- `contractorId` — идентификатор поставщика

Поле `id` возвращается всегда, даже если его нет в `select`. Значение `["*"]` не поддерживается.

По умолчанию: все поля ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.document.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":343,"select":["id","docType","title","status","total","currency","dateDocument"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.document.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":343,"select":["id","docType","title","status","total","currency","dateDocument"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.document.get
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type DocumentGetResult = {
      item: {
        id: number
        docType: string
        currency: string
        status: string
        dateDocument: ISODate | null
        total: number
        title: string
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<DocumentGetResult>({
        method: 'catalog.document.get',
        params: {
          id: 343,
          select: ['id', 'docType', 'title', 'status', 'total', 'currency', 'dateDocument'],
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Document:', result.item.id, result.item.title, result.item.status)
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
      async function callDocumentGet() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.document.get',
            params: {
              id: 343,
              select: ['id', 'docType', 'title', 'status', 'total', 'currency', 'dateDocument'],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Document:', result.item.id, result.item.title, result.item.status)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', callDocumentGet)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.document.get(
            id=343,
            select=["id", "docType", "title", "status", "total", "currency", "dateDocument"],
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
                'catalog.document.get',
                [
                    'id' => 343,
                    'select' => ['id', 'docType', 'title', 'status', 'total', 'currency', 'dateDocument'],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'catalog.document.get',
        {
            id: 343,
            select: ['id', 'docType', 'title', 'status', 'total', 'currency', 'dateDocument'],
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
        'catalog.document.get',
        [
            'id' => 343,
            'select' => ['id', 'docType', 'title', 'status', 'total', 'currency', 'dateDocument'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.document.get", b24.Params{
    	"id":     343,
    	"select": []string{"id", "docType", "title", "status", "total", "currency", "dateDocument"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.document.get: %w", err)
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
            "currency": "RUB",
            "status": "",
            "dateDocument": "2026-10-22T10:00:00+03:00",
            "total": 15000,
            "title": "Приход от поставщика ООО Альфа"
        }
    },
    "time": {
        "start": 1792665249,
        "finish": 1792665249.695711,
        "duration": 0.6957108974456787,
        "processing": 0,
        "date_start": "2026-10-22T13:34:09+03:00",
        "date_finish": "2026-10-22T13:34:09+03:00",
        "operating_reset_at": 1792665840,
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
|| **result.item**
[`object`](../../data-types.md) | Поля документа. Состав зависит от `select`. [Описание полей](#item) ||
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
|| `id` | Обязательное поле `id` не указано | Передайте в `id` положительное целое число ||
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
|| `select` | Неизвестное поле `#FIELD#` для сущности `DocumentDto` | Укажите в `select` только поля из описания параметра `select` ||
|#

#### Ошибка формата select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Не удается распознать выражение select `#SELECT#` | Передайте `select` массивом строк, например `["id","title"]` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право «Просмотр» на тип документа ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-document-add-rest-v3.md)
- [{#T}](./catalog-document-update-rest-v3.md)
- [{#T}](./catalog-document-list-rest-v3.md)
- [{#T}](./catalog-document-delete-rest-v3.md)
- [{#T}](./catalog-document-delete-list-rest-v3.md)
- [{#T}](./catalog-document-field-list.md)
- [{#T}](./catalog-document-field-get.md)
