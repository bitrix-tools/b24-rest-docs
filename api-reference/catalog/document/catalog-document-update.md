# Изменить документ складского учета catalog.document.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр и выбор склада» и правом «Создание и редактирование» на документы нужного типа

Метод `catalog.document.update` изменяет поля документа складского учета, который еще не проведен.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_document.id`](../data-types.md#catalog_document) | Идентификатор документа.

Получить идентификаторы документов можно методом [catalog.document.list](./catalog-document-list.md) ||
|| **fields***
[`object`](../../data-types.md) | Значения полей документа, которые нужно изменить ([подробное описание](#fields)).

Метод меняет только переданные поля, остальные сохраняют прежние значения. Пустой объект `{}` метод принимает без ошибки и обновляет только дату изменения ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **title**
[`string`](../../data-types.md) | Название документа. Пустая строка очищает название, в ответе `title` равно `null` ||
|| **docNumber**
[`string`](../../data-types.md) | Номер документа ||
|| **dateDocument**
[`datetime`](../../data-types.md) | Дата документа, например `2026-11-06T10:00:00+03:00`. Можно передать дату без времени, например `2026-11-06`.

Значение `null` и строку, которую нельзя разобрать как дату, метод пропускает без ошибки: прежняя дата сохраняется ||
|| **commentary**
[`string`](../../data-types.md) | Комментарий к документу ||
|| **responsibleId**
[`user.id`](../../data-types.md) | Идентификатор ответственного. Метод не проверяет, что пользователь существует. Значение, которое не является числом, метод сохраняет как `null` ||
|| **total**
[`double`](../../data-types.md) | Сумма документа. Значение, которое не является числом, метод сохраняет как `null` ||
|| **siteId**
[`string`](../../data-types.md) | Код сайта ||
|| **statusBy**
[`user.id`](../../data-types.md) | Идентификатор пользователя, который изменил статус документа ||
|#

Поля `docType` и `currency` после создания изменить нельзя. Их, а также поля `id`, `status`, `createdBy`, `modifiedBy`, `dateCreate`, `dateModify`, `dateStatus` и неизвестные поля метод пропускает без ошибки. После изменения `modifiedBy` равно идентификатору текущего пользователя, `dateModify` — времени изменения.

Проведенный документ изменить нельзя: сначала отмените проведение методом [catalog.document.cancel](./catalog-document-cancel.md).

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":381,"fields":{"commentary":"Скорректировали дату документа","dateDocument":"2026-11-06T10:00:00+03:00"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.document.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":381,"fields":{"commentary":"Скорректировали дату документа","dateDocument":"2026-11-06T10:00:00+03:00"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.document.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type DocumentUpdateResult = {
      // An empty array comes back when no document has the given id
      document: {
        commentary: string | null
        createdBy: number
        currency: string
        dateCreate: ISODate
        dateDocument: ISODate | null
        dateModify: ISODate
        dateStatus: ISODate
        docNumber: string | null
        docType: string
        id: number
        modifiedBy: number
        responsibleId: number | null
        siteId: string
        status: string
        statusBy: number | null
        title: string | null
        total: number | null
      } | []
    }

    try {
      const response = await $b24.actions.v2.call.make<DocumentUpdateResult>({
        method: 'catalog.document.update',
        params: {
          id: 381,
          fields: {
            commentary: 'Скорректировали дату документа',
            dateDocument: '2026-11-06T10:00:00+03:00',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        if (Array.isArray(result.document)) {
          console.warn('Document not found')
        } else {
          console.info('Updated document:', result.document.id, result.document.dateDocument)
        }
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
      async function updateDocument() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.document.update',
            params: {
              id: 381,
              fields: {
                commentary: 'Скорректировали дату документа',
                dateDocument: '2026-11-06T10:00:00+03:00',
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          // An empty array comes back when no document has the given id
          if (Array.isArray(result.document)) {
            console.warn('Document not found')
            return
          }
          console.info('Updated document:', result.document.id, result.document.dateDocument)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateDocument)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.document.update(
            bitrix_id=381,
            fields={
                "commentary": "Скорректировали дату документа",
                "dateDocument": "2026-11-06T10:00:00+03:00",
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

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.document.update',
                [
                    'id'     => 381,
                    'fields' => [
                        'commentary'   => 'Скорректировали дату документа',
                        'dateDocument' => '2026-11-06T10:00:00+03:00',
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

    ```js
    BX24.callMethod(
        'catalog.document.update',
        {
            id: 381,
            fields: {
                commentary: 'Скорректировали дату документа',
                dateDocument: '2026-11-06T10:00:00+03:00',
            },
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
        'catalog.document.update',
        [
            'id' => 381,
            'fields' => [
                'commentary' => 'Скорректировали дату документа',
                'dateDocument' => '2026-11-06T10:00:00+03:00',
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
    res, err := client.Core().Call(ctx, "catalog.document.update", b24.Params{
    	"id": 381,
    	"fields": b24.Params{
    		"commentary":   "Скорректировали дату документа",
    		"dateDocument": "2026-11-06T10:00:00+03:00",
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.document.update: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "document".
    // Если документа нет, в ключе приходит пустой массив [].
    raw, ok := b24.Unwrap(res.Result, "document")
    if !ok || string(raw) == "[]" {
    	return fmt.Errorf("документ не найден")
    }

    // Необязательные поля могут прийти как null, поэтому для них указатели.
    var item struct {
    	ID           b24.ID  `json:"id"`
    	Status       string  `json:"status"`
    	Commentary   *string `json:"commentary"`
    	DateDocument *string `json:"dateDocument"`
    	ModifiedBy   int     `json:"modifiedBy"`
    	DateModify   string  `json:"dateModify"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.DateModify)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "document": {
            "commentary": "Скорректировали дату документа",
            "createdBy": 1269,
            "currency": "RUB",
            "dateCreate": "2026-11-05T15:58:42+03:00",
            "dateDocument": "2026-11-06T10:00:00+03:00",
            "dateModify": "2026-11-05T15:59:21+03:00",
            "dateStatus": "2026-11-05T15:58:42+03:00",
            "docNumber": "OP-00042",
            "docType": "S",
            "id": 381,
            "modifiedBy": 1269,
            "responsibleId": 1269,
            "siteId": "s1",
            "status": "N",
            "statusBy": null,
            "title": "Оприходование излишков",
            "total": null
        }
    },
    "time": {
        "start": 1793883561,
        "finish": 1793883561.476519,
        "duration": 0.4765191078186035,
        "processing": 0,
        "date_start": "2026-11-05T15:59:21+03:00",
        "date_finish": "2026-11-05T15:59:21+03:00",
        "operating_reset_at": 1793884140,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **result.document**
[`catalog_document`](../data-types.md#catalog_document) | Объект со всеми полями документа после изменения.

Если документа с переданным `id` нет, метод не возвращает ошибку: в `result.document` приходит пустой массив `[]`. Проверить, что документ существует, можно методом [catalog.document.list](./catalog-document-list.md) с фильтром по `id` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Невозможно изменить проведенный документ"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | Не удалось завершить действие, так как у вас недостаточно прав для просмотра и выбора складов | У пользователя нет права «Просмотр и выбор склада» ||
|| `400` | `0` | Недостаточно прав для сохранения документа | У пользователя нет права «Создание и редактирование» на документы этого типа или нет прав на каталог ||
|| `400` | `100` | Could not find value for parameter {id} | Не передан параметр `id` ||
|| `400` | `100` | Invalid value {abc} to match with parameter {id}. Should be value of type int. | В `id` передано не число ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан параметр `fields` ||
|| `400` | `100` | Invalid value {abc} to match with parameter {fields}. Should be value of type array. | В `fields` передан не объект ||
|| `400` | `0` | Невозможно изменить проведенный документ | Документ проведен. Сначала отмените проведение методом [catalog.document.cancel](./catalog-document-cancel.md) ||
|| `400` | `0` | Wrong format of field `title`. | В поле передан массив или объект вместо значения. В тексте указано имя поля ||
|| `400` | `0` | Складской учет недоступен на вашем тарифе | Складской учет недоступен на тарифе портала ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-document-add.md)
- [{#T}](./catalog-document-list.md)
- [{#T}](./catalog-document-cancel.md)
- [{#T}](./catalog-document-get-fields.md)
- [{#T}](./document-element/catalog-document-element-update.md)
