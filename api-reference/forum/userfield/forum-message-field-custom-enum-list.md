# Получить значения списка пользовательского поля forum.message.field.custom.enum.list

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

Метод `forum.message.field.custom.enum.list` возвращает все значения пользовательского поля типа «Список» сообщений форума.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`array`](../../data-types.md) | Идентификатор пользовательского поля, значения которого нужно получить. Передайте одно условие в формате `["fieldId", идентификатор]`, например `["fieldId", 6008093]`.

Метод принимает фильтр только в таком виде. Стандартный формат REST 3.0 — массив условий `[["fieldId", 6008093]]` или `[["fieldId", "=", 6008093]]` — вызывает ошибку.

Поле должно иметь тип `enumeration`. Идентификатор можно получить методом [forum.message.field.custom.list](./forum-message-field-custom-list.md) ||
|| **select**
[`array`](../../data-types.md) | Массив полей значения, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор значения
- `fieldId` — идентификатор пользовательского поля
- `value` — текст значения
- `isDefault` — признак значения по умолчанию
- `sort` — порядок сортировки
- `xmlId` — внешний код значения

По умолчанию: все поля ||
|#

{% note info "" %}

Метод возвращает все значения поля за один запрос, отсортированные по возрастанию `sort`. Параметры `order` и `pagination` на результат не влияют. Сортировка по любому полю, кроме `id`, вызывает ошибку валидации.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/forum.message.field.custom.enum.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":["fieldId",6008093],"select":["id","value","isDefault","sort","xmlId"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/forum.message.field.custom.enum.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":["fieldId",6008093],"select":["id","value","isDefault","sort","xmlId"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/forum.message.field.custom.enum.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type EnumValueListResult = {
      items: {
        id: number
        value: string
        isDefault: boolean
        sort: number
        xmlId: string
      }[]
    }

    try {
      const response = await $b24.actions.v3.call.make<EnumValueListResult>({
        method: 'forum.message.field.custom.enum.list',
        params: {
          filter: ['fieldId', 6008093],
          select: ['id', 'value', 'isDefault', 'sort', 'xmlId'],
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        result.items.forEach(item => console.info(item.id, item.value))
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
      async function listEnumValues() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'forum.message.field.custom.enum.list',
            params: {
              filter: ['fieldId', 6008093],
              select: ['id', 'value', 'isDefault', 'sort', 'xmlId'],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          result.items.forEach(item => console.info(item.id, item.value))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listEnumValues)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.forum.message.field.custom.enum.list(
            filter=["fieldId", 6008093],
            select=["id", "value", "isDefault", "sort", "xmlId"],
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
                'forum.message.field.custom.enum.list',
                [
                    'filter' => ['fieldId', 6008093],
                    'select' => ['id', 'value', 'isDefault', 'sort', 'xmlId'],
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
        'forum.message.field.custom.enum.list',
        {
            filter: ['fieldId', 6008093],
            select: ['id', 'value', 'isDefault', 'sort', 'xmlId'],
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
        'forum.message.field.custom.enum.list',
        [
            'filter' => ['fieldId', 6008093],
            'select' => ['id', 'value', 'isDefault', 'sort', 'xmlId'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "forum.message.field.custom.enum.list", b24.Params{
    	"filter": []any{"fieldId", 6008093},
    	"select": []string{"id", "value", "isDefault", "sort", "xmlId"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("forum.message.field.custom.enum.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "items".
    raw, ok := b24.Unwrap(res.Result, "items")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа items")
    }

    var items []struct {
    	ID        int    `json:"id"`
    	Value     string `json:"value"`
    	IsDefault bool   `json:"isDefault"`
    	Sort      int    `json:"sort"`
    	XMLID     string `json:"xmlId"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range items {
    	fmt.Println(item.ID, item.Value)
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
                "id": 4077,
                "value": "Срочный",
                "isDefault": false,
                "sort": 5,
                "xmlId": "HIGH"
            },
            {
                "id": 4079,
                "value": "Обычный",
                "isDefault": true,
                "sort": 20,
                "xmlId": "NORMAL"
            },
            {
                "id": 4081,
                "value": "Низкий",
                "isDefault": true,
                "sort": 30,
                "xmlId": "LOW"
            }
        ]
    },
    "time": {
        "start": 1792670773,
        "finish": 1792670773.884,
        "duration": 0.8840000629425049,
        "processing": 0,
        "date_start": "2026-10-22T15:06:13+03:00",
        "date_finish": "2026-10-22T15:06:13+03:00",
        "operating_reset_at": 1792671360,
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
|| **result.items**
[`array`](../../data-types.md) | Массив значений поля. Состав полей зависит от `select`. Если у поля нет значений, массив пустой. [Описание полей](#items) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#items}

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
[`boolean`](../../data-types.md) | `true` — значение по умолчанию, `false` — обычное значение. Признак может стоять у нескольких значений поля ||
|| **sort**
[`integer`](../../data-types.md) | Порядок сортировки ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код значения ||
|#

## Обработка ошибок

HTTP-статус: **400**, **404**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации фильтров объекта запроса",
        "validation": [
            {
                "message": "Требуется указать фильтр по обязательному полю `fieldId`",
                "field": "filter.fieldId"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter.fieldId` | Требуется указать фильтр по обязательному полю `fieldId` | Передайте фильтр одним условием `["fieldId", 6008093]`, без внешнего массива ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `Unknown filter condition` | Передайте фильтр массивом `["fieldId", 6008093]`, а не объектом ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Значение поля не может быть пустым | Передайте `filter` с идентификатором поля ||
|| `fieldId` | В поле `fieldId` требуется тип данных `int` для такого запроса | Передайте идентификатор поля числом, а не строкой ||
|| `#FIELD#` | В DTO `EnumDto` в поле `#FIELD#` требуется наличие атрибута `Sortable` для такого запроса | Не передавайте `order`: метод его не применяет ||
|#

#### Поле не найдено

Код ошибки: `BITRIX_REST_V3_REALISATION_EXCEPTION_FIELDNOTFOUNDEXCEPTION`

HTTP-статус: **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Поле `#FIELD_ID#` не найдено | Пользовательского поля с таким идентификатором нет у сообщений форума или его тип не `enumeration`. Проверьте поле методом [forum.message.field.custom.list](./forum-message-field-custom-list.md) ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `EnumDto` | Передайте в `select` только поля из [описания элемента items](#items) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./forum-message-field-custom-enum-get.md)
- [{#T}](./forum-message-field-custom-enum-add.md)
- [{#T}](./forum-message-field-custom-enum-update.md)
- [{#T}](./forum-message-field-custom-enum-delete.md)
- [{#T}](./forum-message-field-custom-add.md)
- [{#T}](./forum-message-field-custom-list.md)
- [{#T}](./index.md)
