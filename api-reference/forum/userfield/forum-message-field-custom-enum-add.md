# Добавить значение списка в пользовательское поле forum.message.field.custom.enum.add

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

Метод `forum.message.field.custom.enum.add` добавляет значение в пользовательское поле типа «Список» сообщений форума и возвращает данные значения.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями нового значения списка. [Описание полей](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **fieldId***
[`integer`](../../data-types.md) | Идентификатор пользовательского поля, в которое нужно добавить значение. Поле должно иметь тип `enumeration`.

Идентификатор можно получить методом [forum.message.field.custom.list](./forum-message-field-custom-list.md) или из ответа метода [forum.message.field.custom.add](./forum-message-field-custom-add.md) ||
|| **value***
[`string`](../../data-types.md) | Текст значения, который видит пользователь.

Передавайте непустую строку. При пустой строке значение не создается, но метод отвечает успешно и возвращает другое значение этого поля — последнее по идентификатору ||
|| **sort**
[`integer`](../../data-types.md) | Порядок сортировки значения в списке.

По умолчанию: `500` ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код значения. Должен быть уникальным в пределах поля: повторный код вызывает внутреннюю ошибку с HTTP-статусом 500.

Если код не передан, Битрикс24 генерирует его автоматически — 32-символьную строку, например `cd9b47f0dad282fb4332d61d14a31222` ||
|| **isDefault**
[`boolean`](../../data-types.md) | Признак значения по умолчанию.

Возможные значения:

- `true` — значение выбирается по умолчанию
- `false` — обычное значение

Метод не снимает признак с других значений поля. Если значение по умолчанию уже есть, после добавления их станет несколько, даже у поля с одиночным выбором. Чтобы снять признак, передайте `false` нужному значению методом [forum.message.field.custom.enum.update](./forum-message-field-custom-enum-update.md).

По умолчанию: `false` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/forum.message.field.custom.enum.add`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"fieldId":6008093,"value":"Высокий","sort":10,"xmlId":"HIGH"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/forum.message.field.custom.enum.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"fieldId":6008093,"value":"Высокий","sort":10,"xmlId":"HIGH"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/forum.message.field.custom.enum.add
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type EnumValueAddResult = {
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
      const response = await $b24.actions.v3.call.make<EnumValueAddResult>({
        method: 'forum.message.field.custom.enum.add',
        params: {
          fields: {
            fieldId: 6008093,
            value: 'Высокий',
            sort: 10,
            xmlId: 'HIGH',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Enum value created:', result.item.id)
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
      async function addEnumValue() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'forum.message.field.custom.enum.add',
            params: {
              fields: {
                fieldId: 6008093,
                value: 'Высокий',
                sort: 10,
                xmlId: 'HIGH',
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Enum value created:', result.item.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addEnumValue)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.forum.message.field.custom.enum.add(
            fields={
                "fieldId": 6008093,
                "value": "Высокий",
                "sort": 10,
                "xmlId": "HIGH",
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
                'forum.message.field.custom.enum.add',
                [
                    'fields' => [
                        'fieldId' => 6008093,
                        'value' => 'Высокий',
                        'sort' => 10,
                        'xmlId' => 'HIGH',
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
        'forum.message.field.custom.enum.add',
        {
            fields: {
                fieldId: 6008093,
                value: 'Высокий',
                sort: 10,
                xmlId: 'HIGH',
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
        'forum.message.field.custom.enum.add',
        [
            'fields' => [
                'fieldId' => 6008093,
                'value' => 'Высокий',
                'sort' => 10,
                'xmlId' => 'HIGH',
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
    res, err := client.Core().Call(ctx, "forum.message.field.custom.enum.add", b24.Params{
    	"fields": b24.Params{
    		"fieldId": 6008093,
    		"value":   "Высокий",
    		"sort":    10,
    		"xmlId":   "HIGH",
    	},
    })
    if err != nil {
    	return fmt.Errorf("forum.message.field.custom.enum.add: %w", err)
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
    fmt.Println(item.ID, item.Value, item.XMLID)
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
            "value": "Высокий",
            "isDefault": false,
            "sort": 10,
            "xmlId": "HIGH"
        }
    },
    "time": {
        "start": 1792670734,
        "finish": 1792670734.756363,
        "duration": 0.7563629150390625,
        "processing": 0,
        "date_start": "2026-10-22T15:05:34+03:00",
        "date_finish": "2026-10-22T15:05:34+03:00",
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
[`object`](../../data-types.md) | Созданное значение списка. [Описание полей](#item) ||
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

HTTP-статус: **400**, **404**, **500**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_REALISATION_EXCEPTION_FIELDNOTFOUNDEXCEPTION",
        "message": "Поле `999999999` не найдено"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации полей

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fieldId` | Не заполнено обязательное поле "fieldId" | Добавьте `fieldId` в `fields` ||
|| `value` | Не заполнено обязательное поле "value" | Добавьте `value` в `fields` ||
|#

#### Поле не найдено

Код ошибки: `BITRIX_REST_V3_REALISATION_EXCEPTION_FIELDNOTFOUNDEXCEPTION`

HTTP-статус: **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Поле `#FIELD_ID#` не найдено | Пользовательского поля с таким `fieldId` нет у сообщений форума или его тип не `enumeration`. Проверьте идентификатор и тип поля методом [forum.message.field.custom.list](./forum-message-field-custom-list.md) ||
|#

#### Внутренняя ошибка

HTTP-статус: **500**

```json
{
    "error": "INTERNAL_SERVER_ERROR",
    "error_description": "Internal server error"
}
```

#|
|| **Причина** | **Как исправить** ||
|| В поле уже есть значение с таким `xmlId` | Передайте уникальный `xmlId` или не передавайте его, чтобы код сгенерировался автоматически ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./forum-message-field-custom-enum-update.md)
- [{#T}](./forum-message-field-custom-enum-get.md)
- [{#T}](./forum-message-field-custom-enum-list.md)
- [{#T}](./forum-message-field-custom-enum-delete.md)
- [{#T}](./forum-message-field-custom-add.md)
- [{#T}](./forum-message-field-custom-list.md)
- [{#T}](./index.md)
