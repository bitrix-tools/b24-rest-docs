# Получить описание полей для пользовательского поля типа enumeration (список) crm.userfield.enumeration.fields

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.userfield.enumeration.fields` возвращает описание полей элемента списка для пользовательского поля типа `enumeration`.

В таком формате элементы передают в ключе `LIST` методов `crm.*.userfield.add` и `crm.*.userfield.update`, например [crm.deal.userfield.add](../../deals/user-defined-fields/crm-deal-userfield-add.md), и получают в ответе `crm.*.userfield.get` и `crm.*.userfield.list`. Метод REST 3.0 `crm.<тип>.field.custom.add` не создает поля типа `enumeration`, для них используйте устаревшие методы `crm.*.userfield.add` или [userfieldconfig.add](../userfieldconfig/userfieldconfig-add.md).

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.userfield.enumeration.fields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.userfield.enumeration.fields
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type FieldInfo = {
      type: string
      title: string
      isReadOnly?: boolean
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type EnumerationFieldsResult = Record<string, FieldInfo>

    try {
      const response = await $b24.actions.v2.call.make<EnumerationFieldsResult>({
        method: 'crm.userfield.enumeration.fields',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Enumeration field names:', Object.keys(result))
        console.info('ID field:', result['ID'])
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
      async function getEnumerationFields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.userfield.enumeration.fields',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Enumeration field names:', Object.keys(result))
          console.info('ID field:', result['ID'])
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getEnumerationFields)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.userfield.enumeration.fields().response
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
                'crm.userfield.enumeration.fields',
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
        "crm.userfield.enumeration.fields",
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
        'crm.userfield.enumeration.fields',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.userfield.enumeration.fields", nil, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.userfield.enumeration.fields: %w", err)
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
        "SORT": {
            "type": "int",
            "title": "Сортировка"
        },
        "VALUE": {
            "type": "string",
            "title": "Значение"
        },
        "DEF": {
            "type": "string",
            "title": "Значение по умолчанию"
        },
        "DEL": {
            "type": "string",
            "title": "Флаг удаления элемента"
        }
    },
    "time": {
        "start": 1773992153,
        "finish": 1773992153.048253,
        "duration": 0.04825305938720703,
        "processing": 0,
        "date_start": "2026-03-20T10:35:53+03:00",
        "date_finish": "2026-03-20T10:35:53+03:00",
        "operating_reset_at": 1773992753,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с описанием полей [(подробное описание)](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

Ключ объекта `result` — поле элемента списка, значение — описание поля [(подробное описание)](#descriptor). В таблице указан тип значения, которое поле принимает в `LIST`. Сводное описание элемента — объект [uf_enum_element](../../../data-types.md#uf_enum_element).

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор элемента. Задает система: при создании поля не передается. В `update` передайте `ID`, чтобы изменить или удалить существующий элемент. Элемент без `ID` добавляется в список как новый ||
|| **SORT**
[`integer`](../../../data-types.md) | Порядок сортировки. Если не передан или меньше 1, элемент получает `500` ||
|| **VALUE**
[`string`](../../../data-types.md) | Текст элемента. Элементы с пустым `VALUE` при создании поля пропускаются ||
|| **DEF**
[`char`](../../../data-types.md) | Признак значения по умолчанию: `Y` или `N`. Если поле не множественное, значением по умолчанию станет только первый элемент с `DEF: Y` ||
|| **DEL**
[`char`](../../../data-types.md) | Флаг удаления: `Y` вместе с `ID` в `update` удаляет элемент. Элементы, которые не переданы в `update`, остаются ||
|#

Кроме этих полей, элемент списка принимает `XML_ID` — внешний идентификатор элемента. Метод его не описывает. В ответе `XML_ID` элемента есть у `crm.*.userfield.list`, у `crm.*.userfield.get` его нет.

#### Описание поля {#descriptor}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../../../data-types.md) | Тип значения: `int` или `string` ||
|| **title**
[`string`](../../../data-types.md) | Название поля на языке интерфейса Битрикс24 ||
|| **isReadOnly**
[`boolean`](../../../data-types.md) | Значение задает система. Ключ есть только у `ID` ||
|#

## Обработка ошибок

Собственных ошибок у метода нет: он не проверяет права в CRM и не принимает параметров.

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-userfield-types.md)
- [{#T}](./crm-userfield-fields.md)
- [{#T}](./crm-userfield-settings-fields.md)
- [{#T}](../../deals/user-defined-fields/crm-deal-userfield-add.md)
- [{#T}](./index.md)
