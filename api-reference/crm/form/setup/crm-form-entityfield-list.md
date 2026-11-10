# Получить поля объектов CRM для CRM-формы crm.form.entityfield.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр CRM-форм

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.form.entityfield.list` возвращает поля объектов CRM, из которых можно собрать CRM-форму.

{% note warning "" %}

Через REST нельзя добавить в форму поля с вариантами выбора: список, флажки, переключатели. Метод возвращает такие поля, например с типом `list`, но [crm.form.validate](../crm-form-validate.md) и [crm.form.add](../crm-form-add.md) их не принимают.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`array`](../../../data-types.md) | Фильтр по объектам CRM, поля которых нужно получить. Фильтр обязателен и содержит ровно одно условие по полю `entityName`:

- `["entityName", "=", "LEAD"]` — поля одного объекта
- `["entityName", "in", ["CONTACT", "DEAL"]]` — поля нескольких объектов, не больше 10 значений

Коды объектов возвращает метод [crm.form.configuration.get](./crm-form-configuration-get.md) в поле `entitySchemes[].entityNames`, например `LEAD`, `CONTACT`, `COMPANY`, `DEAL`, `QUOTE`, `DYNAMIC_174`. Регистр кода не учитывается.

Другие поля, операторы кроме `=` и `in`, логика `or` и отрицание в фильтре не поддерживаются. Если передать пустой список в `in`, метод вернет пустой массив `items` ||
|#

Сортировка, постраничная навигация и `select` не поддерживаются: метод возвращает все поля выбранных объектов.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.form.entityfield.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["entityName","in",["CONTACT","DEAL"]]]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.form.entityfield.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["entityName","in",["CONTACT","DEAL"]]],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.form.entityfield.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type FormEntityFieldListResult = {
      items: Array<{
        name: string
        label: string
        type: string
        required: boolean
        multiple: boolean
        entityName: string
        entityLabel: string
        items: Array<{ id: string, label: string }>
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<FormEntityFieldListResult>({
        method: 'crm.form.entityfield.list',
        params: {
          filter: [
            ['entityName', 'in', ['CONTACT', 'DEAL']],
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.items.map(field => `${field.name}: ${field.label}`))
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
      async function getFormEntityFields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'crm.form.entityfield.list',
            params: {
              filter: [
                ['entityName', 'in', ['CONTACT', 'DEAL']],
              ],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getFormEntityFields)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.form.entityfield.list(
            filter=[
                ["entityName", "in", ["CONTACT", "DEAL"]],
            ],
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
                'crm.form.entityfield.list',
                [
                    'filter' => [
                        ['entityName', 'in', ['CONTACT', 'DEAL']],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'crm.form.entityfield.list',
        {
            filter: [
                ['entityName', 'in', ['CONTACT', 'DEAL']],
            ],
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
        'crm.form.entityfield.list',
        [
            'filter' => [
                ['entityName', 'in', ['CONTACT', 'DEAL']],
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
    res, err := client.Core().Call(ctx, "crm.form.entityfield.list", b24.Params{
    	"filter": []any{
    		[]any{"entityName", "in", []string{"CONTACT", "DEAL"}},
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.form.entityfield.list: %w", err)
    }

    // Метод заворачивает список в объект с ключом "items".
    raw, ok := b24.Unwrap(res.Result, "items")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа items")
    }

    var items []struct {
    	Name       string `json:"name"`
    	Label      string `json:"label"`
    	Type       string `json:"type"`
    	Required   bool   `json:"required"`
    	EntityName string `json:"entityName"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, field := range items {
    	fmt.Println(field.EntityName, field.Name, field.Type)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

Пример сокращен: в списке оставлено три поля из 98.

```json
{
    "result": {
        "items": [
            {
                "name": "CONTACT_HONORIFIC",
                "label": "Обращение",
                "type": "list",
                "required": false,
                "multiple": false,
                "entityName": "CONTACT",
                "entityLabel": "Контакт",
                "items": [
                    {
                        "id": "HNR_RU_1",
                        "label": "г-н"
                    },
                    {
                        "id": "HNR_RU_2",
                        "label": "г-жа"
                    }
                ]
            },
            {
                "name": "CONTACT_NAME",
                "label": "Имя",
                "type": "string",
                "required": true,
                "multiple": false,
                "entityName": "CONTACT",
                "entityLabel": "Контакт",
                "items": []
            },
            {
                "name": "CONTACT_PHONE",
                "label": "Телефон",
                "type": "typed_string",
                "required": false,
                "multiple": true,
                "entityName": "CONTACT",
                "entityLabel": "Контакт",
                "items": []
            }
        ]
    },
    "time": {
        "start": 1792594067,
        "finish": 1792594068.0578,
        "duration": 1.057800054550171,
        "processing": 1,
        "date_start": "2026-10-21T17:47:47+03:00",
        "date_finish": "2026-10-21T17:47:48+03:00",
        "operating_reset_at": 1792594620,
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
|| **items**
[`object[]`](../../../data-types.md) | Массив полей объектов CRM [(подробное описание)](#items) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#items}

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../../data-types.md) | Код поля, например `CONTACT_NAME`. Передается в `fields[].name` при создании или изменении формы ||
|| **label**
[`string`](../../../data-types.md) | Название поля ||
|| **type**
[`string`](../../../data-types.md) | Тип поля, например `string`, `typed_string`, `list`, `date`, `file`, `address`. Поля с типами `list` и `checkbox` в форму через REST добавить нельзя ||
|| **required**
[`boolean`](../../../data-types.md) | Признак обязательного поля в CRM ||
|| **multiple**
[`boolean`](../../../data-types.md) | Признак множественного поля ||
|| **entityName**
[`string`](../../../data-types.md) | Код объекта CRM, которому принадлежит поле ||
|| **entityLabel**
[`string`](../../../data-types.md) | Название объекта CRM ||
|| **items**
[`object[]`](../../../data-types.md) | Варианты значений поля-списка: элементы с полями `id` — значение, которое сохраняется в CRM, и `label` — название варианта. Для остальных полей массив пустой ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_CRM_V2_INFRASTRUCTURE_REST_EXCEPTION_FORM_UNKNOWNFORMENTITYEXCEPTION",
        "message": "Неизвестные типы элементов CRM: FOO"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Значение поля не может быть пустым | Передайте фильтр с условием по `entityName` ||
|| `name` | В DTO `EntityFieldDto` в поле `name` требуется наличие атрибута `Filterable` для такого запроса | Фильтруйте только по `entityName` ||
|#

#### Ошибки фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `#FILTER#` | Передайте одно условие по `entityName` с оператором `=` или `in`. В `in` укажите не больше 10 значений, не используйте логику `or` и отрицание ||
|#

#### Неизвестный объект CRM

Код ошибки: `BITRIX_CRM_V2_INFRASTRUCTURE_REST_EXCEPTION_FORM_UNKNOWNFORMENTITYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Неизвестные типы элементов CRM: `#ENTITY_NAMES#` | Укажите коды объектов из `entitySchemes[].entityNames` метода [crm.form.configuration.get](./crm-form-configuration-get.md) ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Выдайте пользователю право на просмотр CRM-форм ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-form-configuration-get.md)
- [{#T}](../crm-form-add.md)
- [{#T}](../crm-form-validate.md)
- [{#T}](./crm-form-entityfield-field-list.md)
- [{#T}](./index.md)
