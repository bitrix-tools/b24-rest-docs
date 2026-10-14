# Получить поля связи записи таймлайна с элементом CRM crm.timeline.bindings.fields

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: `любой пользователь`

Метод `crm.timeline.bindings.fields` получает описание полей связи записи таймлайна с элементом CRM.

Метод помогает проверить состав и обязательность полей перед добавлением связи и получить их названия на языке интерфейса.

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.timeline.bindings.fields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.timeline.bindings.fields
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
      isRequired: boolean
      isReadOnly: boolean
      isImmutable: boolean
      isMultiple: boolean
      isDynamic: boolean
      title: string
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type BindingsFieldsResult = Record<string, FieldInfo>

    try {
      const response = await $b24.actions.v2.call.make<BindingsFieldsResult>({
        method: 'crm.timeline.bindings.fields',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(Object.keys(result), result['OWNER_ID'])
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@2/dist/umd/index.min.js"></script>
    <script>
      async function getTimelineBindingsFields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.timeline.bindings.fields',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(Object.keys(result), result['OWNER_ID'])
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getTimelineBindingsFields)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.timeline.bindings.fields().response
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
                'crm.timeline.bindings.fields'
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching timeline bindings fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.timeline.bindings.fields",
        {},
        result => {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.dir(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.timeline.bindings.fields'
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.timeline.bindings.fields", nil, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.timeline.bindings.fields: %w", err)
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
        "OWNER_ID": {
            "type": "integer",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": true,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ID записи таймлайна"
        },
        "ENTITY_ID": {
            "type": "integer",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": true,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ID элемента"
        },
        "ENTITY_TYPE": {
            "type": "string",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": true,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Тип элемента"
        }
    },
    "time": {
        "start": 1715091541.642592,
        "finish": 1715091541.730599,
        "duration": 0.08800697326660156,
        "date_start": "2024-05-03T17:19:01+03:00",
        "date_finish": "2024-05-03T17:19:01+03:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа. Ключ — имя поля связи из [списка полей](#fields), значение — объект с [описанием поля](#field-description) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Список полей {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **OWNER_ID**
[`integer`](../../../data-types.md) | Идентификатор записи таймлайна. Обязательное, неизменяемое ||
|| **ENTITY_ID**
[`integer`](../../../data-types.md) | Идентификатор элемента CRM, с которым связана запись таймлайна. Обязательное, неизменяемое ||
|| **ENTITY_TYPE**
[`string`](../../../data-types.md) | Символьный код типа объекта CRM `entityTypeName`, с которым связана запись таймлайна. Обязательное, неизменяемое. Возможные значения:
- `lead` — лид
- `deal` — сделка
- `contact` — контакт
- `company` — компания
- `quote` — предложение
- `smart_invoice` — счет
- `order` — заказ
- `activity` — дело
- `dynamic_<entityTypeId>` — элемент смарт-процесса, например `dynamic_128`

Метод [crm.timeline.bindings.bind](./crm-timeline-bindings-bind.md) принимает и другие типы объектов CRM, например `invoice` — счет в старом формате. Как устроены символьные коды типов, описано в разделе [Тип объекта CRM](../../data-types.md#object_type) ||
|#

Типы полей описывают значения, которые принимает метод [crm.timeline.bindings.bind](./crm-timeline-bindings-bind.md). В ответе метода [crm.timeline.bindings.list](./crm-timeline-bindings-list.md) значения всех трех полей приходят строками.

#### Описание поля {#field-description}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../../../data-types.md) | Тип значения поля: `integer` или `string` ||
|| **isRequired**
[`boolean`](../../../data-types.md) | Обязательность поля ||
|| **isReadOnly**
[`boolean`](../../../data-types.md) | Доступность поля только для чтения ||
|| **isImmutable**
[`boolean`](../../../data-types.md) | Запрет на изменение поля после создания связи. Чтобы изменить связь, удалите ее методом [crm.timeline.bindings.unbind](./crm-timeline-bindings-unbind.md) и создайте заново ||
|| **isMultiple**
[`boolean`](../../../data-types.md) | Множественность поля ||
|| **isDynamic**
[`boolean`](../../../data-types.md) | Признак пользовательского поля. У полей связи всегда `false` ||
|| **title**
[`string`](../../../data-types.md) | Название поля на языке интерфейса ||
|#

## Обработка ошибок

Своих ошибок у метода нет: параметров он не принимает, а состав полей одинаков в любом Битрикс24. Возможны только системные ошибки, например при неверной авторизации.

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-timeline-bindings-bind.md)
- [{#T}](./crm-timeline-bindings-list.md)
- [{#T}](./crm-timeline-bindings-unbind.md)
- [{#T}](./index.md)
