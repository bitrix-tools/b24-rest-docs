# Добавить пользовательское поле сообщений форума forum.message.field.custom.add

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

Метод `forum.message.field.custom.add` добавляет пользовательское поле сообщений форума и возвращает его данные.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями нового пользовательского поля. [Описание полей](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../data-types.md) | Код поля. Должен начинаться с `UF_`, может содержать только заглавные латинские буквы, цифры и `_`, длина — от 4 до 50 символов, например `UF_EXTERNAL_ID`.

Код должен быть уникальным среди пользовательских полей сообщений. Коды существующих полей можно получить методом [forum.message.field.custom.list](./forum-message-field-custom-list.md).

Изменить код после создания нельзя ||
|| **userTypeId***
[`string`](../../data-types.md) | Тип поля, например:

- `string` — строка
- `integer` — целое число
- `double` — число
- `boolean` — да/нет
- `date` — дата
- `datetime` — дата и время
- `enumeration` — список. Значения списка добавляются методом [forum.message.field.custom.enum.add](./forum-message-field-custom-enum-add.md)
- `file` — файл
- `url` — ссылка

Изменить тип после создания нельзя ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код поля ||
|| **sort**
[`integer`](../../data-types.md) | Порядок сортировки.

По умолчанию: `100` ||
|| **isMultiple**
[`boolean`](../../data-types.md) | Признак множественного поля.

Возможные значения:

- `true` — поле хранит несколько значений
- `false` — поле хранит одно значение

По умолчанию: `false` ||
|| **isMandatory**
[`boolean`](../../data-types.md) | Признак обязательного поля.

Возможные значения:

- `true` — поле обязательно для заполнения
- `false` — поле необязательно

По умолчанию: `false` ||
|| **showFilter**
[`string`](../../data-types.md) | Показ поля в фильтре списка.

Возможные значения:

- `N` — не показывать
- `I` — точное совпадение
- `E` — поиск по маске
- `S` — поиск по подстроке

По умолчанию: `N` ||
|| **showInList**
[`boolean`](../../data-types.md) | Показывать ли поле в списке.

Возможные значения:

- `true` — показывать
- `false` — не показывать

По умолчанию: `true` ||
|| **editInList**
[`boolean`](../../data-types.md) | Разрешено ли редактировать значение поля.

Возможные значения:

- `true` — разрешено
- `false` — запрещено

По умолчанию: `true` ||
|| **isSearchable**
[`boolean`](../../data-types.md) | Участвуют ли значения поля в поиске.

Возможные значения:

- `true` — участвуют
- `false` — не участвуют

По умолчанию: `false` ||
|| **settings**
[`object`](../../data-types.md) | Настройки типа поля.

Битрикс24 не применяет переданные настройки: поле создается с настройками типа по умолчанию. Текущие настройки возвращаются в ответе ||
|| **editFormLabel**
[`object`](../../data-types.md) | Подпись поля в форме редактирования. Передавайте объектом, где ключ — код языка, значение — подпись, например `{"ru":"Внешний код","en":"External ID"}`. Значение строкой не сохраняется ||
|| **listColumnLabel**
[`object`](../../data-types.md) | Заголовок колонки в списке. Формат такой же, как у `editFormLabel` ||
|| **listFilterLabel**
[`object`](../../data-types.md) | Подпись поля в фильтре. Формат такой же, как у `editFormLabel` ||
|| **errorMessage**
[`object`](../../data-types.md) | Текст ошибки при неверном значении поля. Формат такой же, как у `editFormLabel` ||
|| **helpMessage**
[`object`](../../data-types.md) | Текст подсказки к полю. Формат такой же, как у `editFormLabel` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/forum.message.field.custom.add`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"UF_EXTERNAL_ID","userTypeId":"string","xmlId":"EXTERNAL_ID","sort":200,"isMandatory":false,"isSearchable":true,"editFormLabel":{"ru":"Внешний код","en":"External ID"},"helpMessage":{"ru":"Код сообщения во внешней системе","en":"Message code in the external system"}}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/forum.message.field.custom.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"UF_EXTERNAL_ID","userTypeId":"string","xmlId":"EXTERNAL_ID","sort":200,"isMandatory":false,"isSearchable":true,"editFormLabel":{"ru":"Внешний код","en":"External ID"},"helpMessage":{"ru":"Код сообщения во внешней системе","en":"Message code in the external system"}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/forum.message.field.custom.add
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CustomFieldAddResult = {
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
      const response = await $b24.actions.v3.call.make<CustomFieldAddResult>({
        method: 'forum.message.field.custom.add',
        params: {
          fields: {
            name: 'UF_EXTERNAL_ID',
            userTypeId: 'string',
            xmlId: 'EXTERNAL_ID',
            sort: 200,
            isMandatory: false,
            isSearchable: true,
            editFormLabel: { ru: 'Внешний код', en: 'External ID' },
            helpMessage: { ru: 'Код сообщения во внешней системе', en: 'Message code in the external system' },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Custom field created:', result.item.id)
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
      async function addCustomField() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'forum.message.field.custom.add',
            params: {
              fields: {
                name: 'UF_EXTERNAL_ID',
                userTypeId: 'string',
                xmlId: 'EXTERNAL_ID',
                sort: 200,
                isMandatory: false,
                isSearchable: true,
                editFormLabel: { ru: 'Внешний код', en: 'External ID' },
                helpMessage: { ru: 'Код сообщения во внешней системе', en: 'Message code in the external system' },
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Custom field created:', result.item.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addCustomField)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.forum.message.field.custom.add(
            fields={
                "name": "UF_EXTERNAL_ID",
                "userTypeId": "string",
                "xmlId": "EXTERNAL_ID",
                "sort": 200,
                "isMandatory": False,
                "isSearchable": True,
                "editFormLabel": {"ru": "Внешний код", "en": "External ID"},
                "helpMessage": {"ru": "Код сообщения во внешней системе", "en": "Message code in the external system"},
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
                'forum.message.field.custom.add',
                [
                    'fields' => [
                        'name' => 'UF_EXTERNAL_ID',
                        'userTypeId' => 'string',
                        'xmlId' => 'EXTERNAL_ID',
                        'sort' => 200,
                        'isMandatory' => false,
                        'isSearchable' => true,
                        'editFormLabel' => ['ru' => 'Внешний код', 'en' => 'External ID'],
                        'helpMessage' => ['ru' => 'Код сообщения во внешней системе', 'en' => 'Message code in the external system'],
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
        'forum.message.field.custom.add',
        {
            fields: {
                name: 'UF_EXTERNAL_ID',
                userTypeId: 'string',
                xmlId: 'EXTERNAL_ID',
                sort: 200,
                isMandatory: false,
                isSearchable: true,
                editFormLabel: { ru: 'Внешний код', en: 'External ID' },
                helpMessage: { ru: 'Код сообщения во внешней системе', en: 'Message code in the external system' },
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
        'forum.message.field.custom.add',
        [
            'fields' => [
                'name' => 'UF_EXTERNAL_ID',
                'userTypeId' => 'string',
                'xmlId' => 'EXTERNAL_ID',
                'sort' => 200,
                'isMandatory' => false,
                'isSearchable' => true,
                'editFormLabel' => ['ru' => 'Внешний код', 'en' => 'External ID'],
                'helpMessage' => ['ru' => 'Код сообщения во внешней системе', 'en' => 'Message code in the external system'],
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
    res, err := client.Core().Call(ctx, "forum.message.field.custom.add", b24.Params{
    	"fields": b24.Params{
    		"name":          "UF_EXTERNAL_ID",
    		"userTypeId":    "string",
    		"xmlId":         "EXTERNAL_ID",
    		"sort":          200,
    		"isMandatory":   false,
    		"isSearchable":  true,
    		"editFormLabel": b24.Params{"ru": "Внешний код", "en": "External ID"},
    		"helpMessage":   b24.Params{"ru": "Код сообщения во внешней системе", "en": "Message code in the external system"},
    	},
    })
    if err != nil {
    	return fmt.Errorf("forum.message.field.custom.add: %w", err)
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
            "sort": 200,
            "isMultiple": false,
            "isMandatory": false,
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
            "editFormLabel": "Внешний код",
            "listColumnLabel": null,
            "listFilterLabel": null,
            "errorMessage": null,
            "helpMessage": "Код сообщения во внешней системе"
        }
    },
    "time": {
        "start": 1792670680,
        "finish": 1792670680.614779,
        "duration": 0.614778995513916,
        "processing": 0,
        "date_start": "2026-10-22T15:04:40+03:00",
        "date_finish": "2026-10-22T15:04:40+03:00",
        "operating_reset_at": 1792670760,
        "operating": 0.23125314712524414
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
[`object`](../../data-types.md) | Созданное пользовательское поле. [Описание полей](#item) ||
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
[`string`](../../data-types.md) | Тип поля ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код поля. `null`, если не задан ||
|| **sort**
[`integer`](../../data-types.md) | Порядок сортировки ||
|| **isMultiple**
[`boolean`](../../data-types.md) | `true` — множественное поле, `false` — одиночное ||
|| **isMandatory**
[`boolean`](../../data-types.md) | `true` — обязательное поле, `false` — необязательное ||
|| **showFilter**
[`string`](../../data-types.md) | Показ в фильтре списка: `N`, `I`, `E` или `S`. Расшифровка значений — в [описании параметра fields](#fields) ||
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
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYALREADYEXISTSEXCEPTION",
        "message": "Запись с идентификатором UF_EXTERNAL_ID уже существует."
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации полей

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `name` | Не заполнено обязательное поле "name" | Добавьте `name` в `fields` ||
|| `userTypeId` | Не заполнено обязательное поле "userTypeId" | Добавьте `userTypeId` в `fields` ||
|| `showFilter` | Значение поля не содержится в списке допустимых значений: N, I, E, S | Передайте одно из значений `N`, `I`, `E`, `S` ||
|#

#### Поле уже существует

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYALREADYEXISTSEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с идентификатором `#NAME#` уже существует. | Поле с таким кодом уже есть. Укажите другой `name` ||
|#

#### Внутренняя ошибка

HTTP-статус: **500**

Ответ приходит в формате старой версии API: `{"error":"INTERNAL_SERVER_ERROR","error_description":"Internal server error"}`.

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Internal server error | Неверный код поля или тип. Проверьте, что `name` начинается с `UF_`, содержит только заглавные латинские буквы, цифры и `_` и имеет длину от 4 до 50 символов, а `userTypeId` — существующий тип поля ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./forum-message-field-custom-update.md)
- [{#T}](./forum-message-field-custom-get.md)
- [{#T}](./forum-message-field-custom-list.md)
- [{#T}](./forum-message-field-custom-delete.md)
- [{#T}](./forum-message-field-custom-enum-list.md)
- [{#T}](../message/index.md)
- [{#T}](./index.md)
