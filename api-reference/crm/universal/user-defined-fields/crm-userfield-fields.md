# Получить описание для пользовательских полей crm.userfield.fields

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.userfield.fields` возвращает описание характеристик пользовательского поля CRM: тип значения каждой характеристики и признаки того, задается ли она при создании и меняется ли позже.

По этому описанию собирают `fields` для методов `crm.*.userfield.add` и `crm.*.userfield.update`, например [crm.deal.userfield.add](../../deals/user-defined-fields/crm-deal-userfield-add.md). Какой метод создает поле нужного типа, указано в разделе [Как выбрать раздел](./index.md#how-to-choose).

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.userfield.fields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.userfield.fields
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type FieldDescriptor = {
      type: string
      title: string
      isReadOnly?: boolean
      isImmutable?: boolean
      isMultiple?: boolean
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type UserfieldFieldsResult = Record<string, FieldDescriptor>

    try {
      const response = await $b24.actions.v2.call.make<UserfieldFieldsResult>({
        method: 'crm.userfield.fields',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(Object.keys(result))
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
      async function fetchUserfieldFields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.userfield.fields',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(Object.keys(result))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchUserfieldFields)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.userfield.fields().response
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
                'crm.userfield.fields',
                []
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
        "crm.userfield.fields",
        {},
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.userfield.fields',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.userfield.fields", nil, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.userfield.fields: %w", err)
    }

    keys, ok := b24.Keys(res.Result)
    if !ok {
    	return fmt.Errorf("ожидался объект в ответе")
    }
    fmt.Println("полей в ответе:", len(keys))
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "ID": {
            "type": "int",
            "title": "Ид",
            "isReadOnly": true
        },
        "ENTITY_ID": {
            "type": "string",
            "title": "Объект",
            "isImmutable": true
        },
        "FIELD_NAME": {
            "type": "string",
            "title": "Код",
            "isImmutable": true
        },
        "USER_TYPE_ID": {
            "type": "string",
            "title": "Тип данных",
            "isImmutable": true
        },
        "XML_ID": {
            "type": "string",
            "title": "Внешний Ид (XML ID)"
        },
        "SORT": {
            "type": "int",
            "title": "Сортировка"
        },
        "MULTIPLE": {
            "type": "char",
            "title": "Множественное"
        },
        "MANDATORY": {
            "type": "char",
            "title": "Обязательное"
        },
        "SHOW_FILTER": {
            "type": "char",
            "title": "Показывать в фильтре списка"
        },
        "SHOW_IN_LIST": {
            "type": "char",
            "title": "Показывать в списке"
        },
        "EDIT_IN_LIST": {
            "type": "char",
            "title": "Разрешать редактирование пользователем"
        },
        "IS_SEARCHABLE": {
            "type": "char",
            "title": "Значения поля участвуют в поиске"
        },
        "EDIT_FORM_LABEL": {
            "type": "string",
            "title": "Подпись в форме редактирования"
        },
        "LIST_COLUMN_LABEL": {
            "type": "string",
            "title": "Заголовок в списке"
        },
        "LIST_FILTER_LABEL": {
            "type": "string",
            "title": "Подпись фильтра в списке"
        },
        "ERROR_MESSAGE": {
            "type": "string",
            "title": "Сообщение об ошибке"
        },
        "HELP_MESSAGE": {
            "type": "string",
            "title": "Помощь"
        },
        "LIST": {
            "type": "uf_enum_element",
            "title": "Элементы списка",
            "isMultiple": true
        },
        "SETTINGS": {
            "type": "object",
            "title": "Дополнительные настройки (зависят от типа)"
        }
    },
    "time": {
        "start": 1773992295,
        "finish": 1773992295.958088,
        "duration": 0.9580879211425781,
        "processing": 0,
        "date_start": "2026-03-20T10:38:15+03:00",
        "date_finish": "2026-03-20T10:38:15+03:00",
        "operating_reset_at": 1773992895,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с описанием характеристик [(подробное описание)](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

Ключ объекта `result` — код характеристики пользовательского поля, значение — описание характеристики [(подробное описание)](#descriptor). В таблице указан тип значения, которое характеристика принимает в `crm.*.userfield.*`.

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор поля. Только для чтения ||
|| **ENTITY_ID**
[`string`](../../../data-types.md) | Код объекта CRM, к которому привязано поле, например `CRM_DEAL`. Метод `crm.*.userfield.add` подставляет код по объекту из имени метода, передавать его не нужно ||
|| **FIELD_NAME**
[`string`](../../../data-types.md) | Код поля в формате `UF_CRM_*`. Обязателен при создании. Код приводится к верхнему регистру, недостающий префикс `UF_CRM_` добавляется: `PRIORITY` станет `UF_CRM_PRIORITY`. Изменить код нельзя ||
|| **USER_TYPE_ID**
[`string`](../../../data-types.md) | Тип данных поля из ответа [crm.userfield.types](./crm-userfield-types.md). Задается при создании, изменить нельзя ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний идентификатор ||
|| **SORT**
[`integer`](../../../data-types.md) | Порядок сортировки ||
|| **MULTIPLE**
[`char`](../../../data-types.md) | Признак множественного поля: `Y` или `N`, по умолчанию `N`. Задается при создании, в `update` не меняется ||
|| **MANDATORY**
[`char`](../../../data-types.md) | Признак обязательного поля: `Y` или `N` ||
|| **SHOW_FILTER**
[`char`](../../../data-types.md) | Признак отображения в фильтре списка. При записи передавайте `Y` или `N`. В ответе `crm.*.userfield.get` и `crm.*.userfield.list` вместо `Y` приходит `E` — поиск по маске. У полей типа `employee` приходит `I` — точное совпадение ||
|| **SHOW_IN_LIST**
[`char`](../../../data-types.md) | Признак отображения в списке: `Y` или `N` ||
|| **EDIT_IN_LIST**
[`char`](../../../data-types.md) | Разрешено ли пользователю редактировать значение: `Y` или `N` ||
|| **IS_SEARCHABLE**
[`char`](../../../data-types.md) | Участвуют ли значения поля в поиске: `Y` или `N` ||
|| **EDIT_FORM_LABEL**
[`string`](../../../data-types.md) или [`lang_map`](../../data-types.md#tipy-dannyh) | Подпись в форме редактирования. Строка или объект с подписями по языкам ||
|| **LIST_COLUMN_LABEL**
[`string`](../../../data-types.md) или [`lang_map`](../../data-types.md#tipy-dannyh) | Заголовок колонки в списке ||
|| **LIST_FILTER_LABEL**
[`string`](../../../data-types.md) или [`lang_map`](../../data-types.md#tipy-dannyh) | Подпись поля в фильтре списка ||
|| **ERROR_MESSAGE**
[`string`](../../../data-types.md) или [`lang_map`](../../data-types.md#tipy-dannyh) | Сообщение об ошибке ||
|| **HELP_MESSAGE**
[`string`](../../../data-types.md) или [`lang_map`](../../data-types.md#tipy-dannyh) | Текст подсказки ||
|| **LIST**
[`uf_enum_element[]`](../../../data-types.md#uf_enum_element) | Элементы списка для поля типа `enumeration`. Описание полей элемента возвращает метод [crm.userfield.enumeration.fields](./crm-userfield-enumeration-fields.md) ||
|| **SETTINGS**
[`object`](../../../data-types.md) | Настройки, которые зависят от типа поля. Состав для каждого типа возвращает метод [crm.userfield.settings.fields](./crm-userfield-settings-fields.md) ||
|#

#### Описание характеристики {#descriptor}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../../../data-types.md) | Тип значения: `int`, `string`, `char`, `object` или `uf_enum_element` ||
|| **title**
[`string`](../../../data-types.md) | Название характеристики на языке интерфейса Битрикс24 ||
|| **isReadOnly**
[`boolean`](../../../data-types.md) | Значение задает система, передать его нельзя. Ключ есть только у `ID` ||
|| **isImmutable**
[`boolean`](../../../data-types.md) | Значение задается при создании поля и не меняется в `update`. Ключ есть у `ENTITY_ID`, `FIELD_NAME`, `USER_TYPE_ID` ||
|| **isMultiple**
[`boolean`](../../../data-types.md) | Значение передается массивом. Ключ есть только у `LIST` ||
|#

## Обработка ошибок

Собственных ошибок у метода нет: он не проверяет права в CRM и не принимает параметров.

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-userfield-types.md)
- [{#T}](./crm-userfield-settings-fields.md)
- [{#T}](./crm-userfield-enumeration-fields.md)
- [{#T}](../../deals/user-defined-fields/crm-deal-userfield-add.md)
- [{#T}](./index.md)
