# Изменить значение списка пользовательского поля forum.message.field.custom.enum.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`forum`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `forum.message.field.custom.enum.update` изменяет значение пользовательского поля типа «Список» сообщений форума и возвращает его данные.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор значения списка, которое нужно изменить.

Идентификатор можно получить методом [forum.message.field.custom.enum.list](./forum-message-field-custom-enum-list.md) ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями значения, которые нужно изменить. Передавайте только изменяемые поля. [Описание полей](#fields)

Если передать пустой объект `{}`, метод вернет значение без изменений ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **value**
[`string`](../../data-types.md) | Новый текст значения. Пустая строка удаляет значение из списка ||
|| **sort**
[`integer`](../../data-types.md) | Порядок сортировки значения в списке ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код значения. Должен быть уникальным в пределах поля ||
|| **isDefault**
[`boolean`](../../data-types.md) | Признак значения по умолчанию.

Возможные значения:

- `true` — значение выбирается по умолчанию
- `false` — обычное значение

Метод не снимает признак с других значений поля. Чтобы по умолчанию было одно значение, передайте `false` остальным значениям ||
|#

Значение нельзя перенести в другое поле: `fieldId` в `fields` метод игнорирует без ошибки.

{% note warning "" %}

Если передать `value` пустой строкой, метод удалит значение из списка. Ответ при этом будет успешным и вернет значение с `"value": ""`, но методы [forum.message.field.custom.enum.get](./forum-message-field-custom-enum-get.md) и [forum.message.field.custom.enum.list](./forum-message-field-custom-enum-list.md) его уже не найдут. Чтобы удалить значение, используйте метод [forum.message.field.custom.enum.delete](./forum-message-field-custom-enum-delete.md).

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/forum.message.field.custom.enum.update`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":4077,"fields":{"value":"Срочный","sort":5}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/forum.message.field.custom.enum.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":4077,"fields":{"value":"Срочный","sort":5},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/forum.message.field.custom.enum.update
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type EnumValueUpdateResult = {
      item: {
        id: number
        fieldId: number
        value: string
        isDefault: boolean
        sort: number
        xmlId: string
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<EnumValueUpdateResult>({
        method: 'forum.message.field.custom.enum.update',
        params: {
          id: 4077,
          fields: {
            value: 'Срочный',
            sort: 5,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Enum value updated:', result.item.value)
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
      async function updateEnumValue() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'forum.message.field.custom.enum.update',
            params: {
              id: 4077,
              fields: {
                value: 'Срочный',
                sort: 5,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Enum value updated:', result.item.value)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateEnumValue)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.forum.message.field.custom.enum.update(
            id=4077,
            fields={
                "value": "Срочный",
                "sort": 5,
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
                'forum.message.field.custom.enum.update',
                [
                    'id' => 4077,
                    'fields' => [
                        'value' => 'Срочный',
                        'sort' => 5,
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
        'forum.message.field.custom.enum.update',
        {
            id: 4077,
            fields: {
                value: 'Срочный',
                sort: 5,
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
        'forum.message.field.custom.enum.update',
        [
            'id' => 4077,
            'fields' => [
                'value' => 'Срочный',
                'sort' => 5,
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
    res, err := client.Core().Call(ctx, "forum.message.field.custom.enum.update", b24.Params{
    	"id": 4077,
    	"fields": b24.Params{
    		"value": "Срочный",
    		"sort":  5,
    	},
    })
    if err != nil {
    	return fmt.Errorf("forum.message.field.custom.enum.update: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID        int    `json:"id"`
    	FieldID   int    `json:"fieldId"`
    	Value     string `json:"value"`
    	IsDefault bool   `json:"isDefault"`
    	Sort      int    `json:"sort"`
    	XMLID     string `json:"xmlId"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Value, item.Sort)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 4077,
            "fieldId": 6008093,
            "value": "Срочный",
            "isDefault": false,
            "sort": 5,
            "xmlId": "HIGH"
        }
    },
    "time": {
        "start": 1792670749,
        "finish": 1792670749.13941,
        "duration": 0.13941001892089844,
        "processing": 0,
        "date_start": "2026-10-22T15:05:49+03:00",
        "date_finish": "2026-10-22T15:05:49+03:00",
        "operating_reset_at": 1792671300,
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
[`object`](../../data-types.md) | Значение списка после изменения. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор значения списка ||
|| **fieldId**
[`integer`](../../data-types.md) | Идентификатор пользовательского поля, к которому относится значение ||
|| **value**
[`string`](../../data-types.md) | Текст значения ||
|| **isDefault**
[`boolean`](../../data-types.md) | `true` — значение по умолчанию, `false` — обычное значение ||
|| **sort**
[`integer`](../../data-types.md) | Порядок сортировки ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код значения ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `99999999` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не заполнено значение хотя бы одного обязательного поля: id, filter | Передайте `id` значения списка ||
|| `-` | Должно быть передано только одно из значений: id, filter | Передайте `id` значения списка ||
|#

#### Значение не найдено

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Значения с таким `id` нет или оно относится к полю другого объекта. Получите идентификатор методом [forum.message.field.custom.enum.list](./forum-message-field-custom-enum-list.md) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./forum-message-field-custom-enum-add.md)
- [{#T}](./forum-message-field-custom-enum-get.md)
- [{#T}](./forum-message-field-custom-enum-list.md)
- [{#T}](./forum-message-field-custom-enum-delete.md)
- [{#T}](./forum-message-field-custom-add.md)
- [{#T}](./forum-message-field-custom-list.md)
- [{#T}](./index.md)
