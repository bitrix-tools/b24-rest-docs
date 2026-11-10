# Изменить пользовательское поле сообщений форума forum.message.field.custom.update

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

Метод `forum.message.field.custom.update` изменяет пользовательское поле сообщений форума и возвращает его данные.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор пользовательского поля.

Идентификатор можно получить методом [forum.message.field.custom.list](./forum-message-field-custom-list.md) ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями пользовательского поля, которые нужно изменить. Передавайте только изменяемые поля. [Описание полей](#fields)

Если передать пустой объект `{}`, метод вернет поле без изменений ||
|#

{% note warning "" %}

Если передать хотя бы одну подпись — `editFormLabel`, `listColumnLabel`, `listFilterLabel`, `errorMessage` или `helpMessage`, — все подписи, которых нет в запросе, очистятся. Чтобы изменить одну подпись, передайте вместе с ней текущие значения остальных.

{% endnote %}

### Параметр fields {#fields}

Код `name` и тип `userTypeId` изменить нельзя: если передать их в `fields`, метод их проигнорирует.

#|
|| **Название**
`тип` | **Описание** ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код поля ||
|| **sort**
[`integer`](../../data-types.md) | Порядок сортировки ||
|| **isMultiple**
[`boolean`](../../data-types.md) | Признак множественного поля.

Возможные значения:

- `true` — поле хранит несколько значений
- `false` — поле хранит одно значение ||
|| **isMandatory**
[`boolean`](../../data-types.md) | Признак обязательного поля.

Возможные значения:

- `true` — поле обязательно для заполнения
- `false` — поле необязательно ||
|| **showFilter**
[`string`](../../data-types.md) | Показ поля в фильтре списка.

Возможные значения:

- `N` — не показывать
- `I` — точное совпадение
- `E` — поиск по маске
- `S` — поиск по подстроке ||
|| **showInList**
[`boolean`](../../data-types.md) | Показывать ли поле в списке.

Возможные значения:

- `true` — показывать
- `false` — не показывать ||
|| **editInList**
[`boolean`](../../data-types.md) | Разрешено ли редактировать значение поля.

Возможные значения:

- `true` — разрешено
- `false` — запрещено ||
|| **isSearchable**
[`boolean`](../../data-types.md) | Участвуют ли значения поля в поиске.

Возможные значения:

- `true` — участвуют
- `false` — не участвуют ||
|| **settings**
[`object`](../../data-types.md) | Настройки типа поля.

Битрикс24 не применяет переданные настройки: они остаются прежними ||
|| **editFormLabel**
[`object`](../../data-types.md) | Подпись поля в форме редактирования. Передавайте объектом, где ключ — код языка, значение — подпись, например `{"ru":"Код во внешней системе","en":"External system code"}`. Значение строкой не сохраняется ||
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

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/forum.message.field.custom.update`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":6008091,"fields":{"sort":150,"isMandatory":true,"editFormLabel":{"ru":"Код во внешней системе","en":"External system code"}}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/forum.message.field.custom.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":6008091,"fields":{"sort":150,"isMandatory":true,"editFormLabel":{"ru":"Код во внешней системе","en":"External system code"}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/forum.message.field.custom.update
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CustomFieldUpdateResult = {
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
      const response = await $b24.actions.v3.call.make<CustomFieldUpdateResult>({
        method: 'forum.message.field.custom.update',
        params: {
          id: 6008091,
          fields: {
            sort: 150,
            isMandatory: true,
            editFormLabel: { ru: 'Код во внешней системе', en: 'External system code' },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Custom field updated:', result.item.id)
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
      async function updateCustomField() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'forum.message.field.custom.update',
            params: {
              id: 6008091,
              fields: {
                sort: 150,
                isMandatory: true,
                editFormLabel: { ru: 'Код во внешней системе', en: 'External system code' },
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Custom field updated:', result.item.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateCustomField)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.forum.message.field.custom.update(
            id=6008091,
            fields={
                "sort": 150,
                "isMandatory": True,
                "editFormLabel": {"ru": "Код во внешней системе", "en": "External system code"},
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
                'forum.message.field.custom.update',
                [
                    'id' => 6008091,
                    'fields' => [
                        'sort' => 150,
                        'isMandatory' => true,
                        'editFormLabel' => ['ru' => 'Код во внешней системе', 'en' => 'External system code'],
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
        'forum.message.field.custom.update',
        {
            id: 6008091,
            fields: {
                sort: 150,
                isMandatory: true,
                editFormLabel: { ru: 'Код во внешней системе', en: 'External system code' },
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
        'forum.message.field.custom.update',
        [
            'id' => 6008091,
            'fields' => [
                'sort' => 150,
                'isMandatory' => true,
                'editFormLabel' => ['ru' => 'Код во внешней системе', 'en' => 'External system code'],
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
    res, err := client.Core().Call(ctx, "forum.message.field.custom.update", b24.Params{
    	"id": 6008091,
    	"fields": b24.Params{
    		"sort":          150,
    		"isMandatory":   true,
    		"editFormLabel": b24.Params{"ru": "Код во внешней системе", "en": "External system code"},
    	},
    })
    if err != nil {
    	return fmt.Errorf("forum.message.field.custom.update: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID            int     `json:"id"`
    	Sort          int     `json:"sort"`
    	IsMandatory   bool    `json:"isMandatory"`
    	EditFormLabel *string `json:"editFormLabel"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Sort, item.IsMandatory)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

В примере в запросе передана только подпись `editFormLabel`, поэтому подсказка `helpMessage`, заданная при создании поля, очистилась.

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
        "start": 1792670693,
        "finish": 1792670693.237927,
        "duration": 0.23792695999145508,
        "processing": 0,
        "date_start": "2026-10-22T15:04:53+03:00",
        "date_finish": "2026-10-22T15:04:53+03:00",
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
[`object`](../../data-types.md) | Пользовательское поле после изменения. Описание полей — в методе [forum.message.field.custom.get](./forum-message-field-custom-get.md#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
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
|| `-` | Не заполнено значение хотя бы одного обязательного поля: id, filter | Передайте `id` пользовательского поля ||
|| `-` | Должно быть передано только одно из значений: id, filter | Передайте `id` пользовательского поля ||
|#

#### Ошибки валидации полей

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `showFilter` | Значение поля не содержится в списке допустимых значений: N, I, E, S | Передайте одно из значений `N`, `I`, `E`, `S` ||
|#

#### Поле не найдено

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `#ID#` не найдена | Пользовательского поля сообщений форума с таким `id` нет. Проверьте идентификатор методом [forum.message.field.custom.list](./forum-message-field-custom-list.md) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./forum-message-field-custom-add.md)
- [{#T}](./forum-message-field-custom-get.md)
- [{#T}](./forum-message-field-custom-list.md)
- [{#T}](./forum-message-field-custom-delete.md)
- [{#T}](../message/index.md)
- [{#T}](./index.md)
