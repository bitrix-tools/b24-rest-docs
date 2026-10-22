# Получить пользовательское поле сообщений форума forum.message.field.custom.get

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

Метод `forum.message.field.custom.get` возвращает пользовательское поле сообщений форума по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор пользовательского поля.

Идентификатор можно получить методом [forum.message.field.custom.list](./forum-message-field-custom-list.md) ||
|| **select**
[`array`](../../data-types.md) | Массив полей, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор поля
- `entityId` — идентификатор объекта
- `name` — код поля
- `userTypeId` — тип поля
- `xmlId` — внешний код
- `sort` — порядок сортировки
- `isMultiple` — признак множественного поля
- `isMandatory` — признак обязательного поля
- `showFilter` — показ в фильтре списка
- `showInList` — показ в списке
- `editInList` — возможность редактирования
- `isSearchable` — участие в поиске
- `settings` — настройки типа поля
- `editFormLabel` — подпись в форме редактирования
- `listColumnLabel` — заголовок колонки в списке
- `listFilterLabel` — подпись в фильтре
- `errorMessage` — текст ошибки
- `helpMessage` — текст подсказки

По умолчанию: все поля ||
|#

Подписи возвращаются на языке ответа. Язык можно задать заголовком `X-Bitrix-Rest-Response-Language`, например `X-Bitrix-Rest-Response-Language: en`.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/forum.message.field.custom.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":6008091}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/forum.message.field.custom.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":6008091,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/forum.message.field.custom.get
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CustomFieldGetResult = {
      item: {
        id: number
        entityId: string
        name: string
        userTypeId: string
        xmlId: string | null
        sort: number
        isMultiple: boolean
        isMandatory: boolean
        showFilter: string
        showInList: boolean
        editInList: boolean
        isSearchable: boolean
        settings: Record<string, unknown>
        editFormLabel: string | null
        listColumnLabel: string | null
        listFilterLabel: string | null
        errorMessage: string | null
        helpMessage: string | null
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<CustomFieldGetResult>({
        method: 'forum.message.field.custom.get',
        params: {
          id: 6008091,
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.item.name, result.item.userTypeId)
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
      async function getCustomField() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'forum.message.field.custom.get',
            params: {
              id: 6008091,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.item.name, result.item.userTypeId)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getCustomField)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.forum.message.field.custom.get(
            id=6008091,
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
                'forum.message.field.custom.get',
                [
                    'id' => 6008091,
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
        'forum.message.field.custom.get',
        {
            id: 6008091,
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
        'forum.message.field.custom.get',
        [
            'id' => 6008091,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "forum.message.field.custom.get", b24.Params{
    	"id": 6008091,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("forum.message.field.custom.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID            int     `json:"id"`
    	Name          string  `json:"name"`
    	UserTypeID    string  `json:"userTypeId"`
    	IsMandatory   bool    `json:"isMandatory"`
    	EditFormLabel *string `json:"editFormLabel"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Name, item.UserTypeID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 6008091,
            "entityId": "FORUM_MESSAGE",
            "name": "UF_EXTERNAL_ID",
            "userTypeId": "string",
            "xmlId": "EXTERNAL_ID",
            "sort": 150,
            "isMultiple": false,
            "isMandatory": true,
            "showFilter": "N",
            "showInList": true,
            "editInList": true,
            "isSearchable": true,
            "settings": {
                "size": 20,
                "rows": 1,
                "regexp": "",
                "minLength": 0,
                "maxLength": 0,
                "defaultValue": ""
            },
            "editFormLabel": "Код во внешней системе",
            "listColumnLabel": null,
            "listFilterLabel": null,
            "errorMessage": null,
            "helpMessage": null
        }
    },
    "time": {
        "start": 1792670694,
        "finish": 1792670694.618115,
        "duration": 0.6181149482727051,
        "processing": 0,
        "date_start": "2026-10-22T15:04:54+03:00",
        "date_finish": "2026-10-22T15:04:54+03:00",
        "operating_reset_at": 1792671240,
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
[`object`](../../data-types.md) | Пользовательское поле. Состав полей зависит от `select`. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор пользовательского поля ||
|| **entityId**
[`string`](../../data-types.md) | Идентификатор объекта, к которому относится поле. Для сообщений форума всегда `FORUM_MESSAGE` ||
|| **name**
[`string`](../../data-types.md) | Код поля ||
|| **userTypeId**
[`string`](../../data-types.md) | Тип поля, например `string`, `integer`, `enumeration`, `disk_file` ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код поля. `null`, если не задан ||
|| **sort**
[`integer`](../../data-types.md) | Порядок сортировки ||
|| **isMultiple**
[`boolean`](../../data-types.md) | `true` — множественное поле, `false` — одиночное ||
|| **isMandatory**
[`boolean`](../../data-types.md) | `true` — обязательное поле, `false` — необязательное ||
|| **showFilter**
[`string`](../../data-types.md) | Показ в фильтре списка:

- `N` — не показывать
- `I` — точное совпадение
- `E` — поиск по маске
- `S` — поиск по подстроке ||
|| **showInList**
[`boolean`](../../data-types.md) | `true` — поле показывается в списке ||
|| **editInList**
[`boolean`](../../data-types.md) | `true` — значение поля можно редактировать ||
|| **isSearchable**
[`boolean`](../../data-types.md) | `true` — значения поля участвуют в поиске ||
|| **settings**
[`object`](../../data-types.md) | Настройки типа поля. Ключи приходят в camelCase, признаки — значениями `true` и `false`. Набор ключей зависит от типа: у `string` это `size`, `rows`, `regexp`, `minLength`, `maxLength`, `defaultValue`, у `enumeration` — `display`, `listHeight`, `captionNoValue`, `showNoValue` ||
|| **editFormLabel**
[`string`](../../data-types.md) | Подпись в форме редактирования на языке ответа. `null`, если подпись не задана ||
|| **listColumnLabel**
[`string`](../../data-types.md) | Заголовок колонки в списке на языке ответа. `null`, если не задан ||
|| **listFilterLabel**
[`string`](../../data-types.md) | Подпись в фильтре на языке ответа. `null`, если не задана ||
|| **errorMessage**
[`string`](../../data-types.md) | Текст ошибки на языке ответа. `null`, если не задан ||
|| **helpMessage**
[`string`](../../data-types.md) | Текст подсказки на языке ответа. `null`, если не задан ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `999999999` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Передайте `id` пользовательского поля ||
|#

#### Поле не найдено

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `#ID#` не найдена | Пользовательского поля сообщений форума с таким `id` нет. Проверьте идентификатор методом [forum.message.field.custom.list](./forum-message-field-custom-list.md) ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `CustomDto` | Передайте в `select` только поля из [описания объекта item](#item) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./forum-message-field-custom-list.md)
- [{#T}](./forum-message-field-custom-update.md)
- [{#T}](./forum-message-field-custom-add.md)
- [{#T}](./forum-message-field-custom-delete.md)
- [{#T}](./forum-message-field-custom-enum-list.md)
- [{#T}](../message/index.md)
- [{#T}](./index.md)
