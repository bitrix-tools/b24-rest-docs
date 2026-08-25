# Создать новый список обзвона crm.calllist.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами на чтение элементов CRM

Метод `crm.calllist.add` создает новый список обзвона.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY_TYPE***
[`string`](../../data-types.md) | Тип объекта: 
- `CONTACT` — контакт,
- `COMPANY` — компания ||
|| **ENTITIES***
[`integer[]`](../../data-types.md) | Массив числовых идентификаторов контактов или компаний, получить можно методом [crm.item.list](../universal/crm-item-list.md) ||
|| **WEBFORM_ID**
[`integer`](../../data-types.md) | `ID` CRM-формы, которая будет выводиться в форме обзвона. 
`ID` можно найти в списке форм Битрикс24 https://your-domain.ru/crm/webform/ ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -d '{"ENTITY_TYPE":"CONTACT","ENTITIES":[1,2,3],"WEBFORM_ID":5}' \
         https://**your_bitrix24**/rest/**user_id**/**webhook**/crm.calllist.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -d '{"ENTITY_TYPE":"CONTACT","ENTITIES":[1,2,3],"WEBFORM_ID":5,"auth":"**put_access_token_here**"}' \
         https://**your_bitrix24**/rest/crm.calllist.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'crm.calllist.add',
        params: {
          ENTITY_TYPE: 'CONTACT',
          ENTITIES: [9, 17, 19],
          WEBFORM_ID: 1,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created call list ID:', result)
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
      async function addCallList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.calllist.add',
            params: {
              ENTITY_TYPE: 'CONTACT',
              ENTITIES: [9, 17, 19],
              WEBFORM_ID: 1,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Created call list ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addCallList)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.calllist.add',
                [
                    'ENTITY_TYPE' => 'CONTACT',
                    'ENTITIES'    => [9, 17, 19],
                    'WEBFORM_ID'  => 1,
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
        echo 'Error adding call list: ' . $e->getMessage();
    }
    ```

- Python

    Пример

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.calllist.add(
            entity_type="CONTACT",
            entities=[
                9,
                17,
                19,
            ],
            webform_id=1,
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

- BX24.js

    ```js
    BX24.callMethod(
        "crm.calllist.add",
        {
            ENTITY_TYPE: "CONTACT",
            ENTITIES: [9,17,19],
            WEBFORM_ID: 1
        },
        function(result) {
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
        'crm.calllist.add',
        [
            'ENTITY_TYPE' => 'CONTACT',
            'ENTITIES' => [1,2,3],
            'WEBFORM_ID' => 5
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.calllist.add", b24.Params{
    	"ENTITY_TYPE": "CONTACT",
    	"ENTITIES":    []int{1, 2, 3},
    	"WEBFORM_ID":  5,
    })
    if err != nil {
    	return fmt.Errorf("crm.calllist.add: %w", err)
    }

    var newID b24.ID
    if err := json.Unmarshal(res.Result, &newID); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("идентификатор:", newID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 11,
    "time": {
        "start": 1752471668.062547,
        "finish": 1752471668.531711,
        "duration": 0.4691641330718994,
        "processing": 0.4174520969390869,
        "date_start": "2025-07-14T08:41:08+03:00",
        "date_finish": "2025-07-14T08:41:08+03:00",
        "operating_reset_at": 1752472268,
        "operating": 0.41742897033691406
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | ID созданного списка обзвона ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ENTITIES_ERROR",
    "error_description": "Entities is not array"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_ARGUMENT` | `ENTITY_TYPE is not found`, `ENTITIES is not found` | Не передан обязательный параметр ||
|| `400` | `ENTITIES_ERROR` | `Entities is not array` | В параметре `ENTITIES` передан не массив ||
|| `400` | `ENTITY_TYPE_ERROR` | `Incorrect entity type` | В параметре `ENTITY_TYPE` передано значение, отличное от `CONTACT` и `COMPANY` ||
|| `400` | `ENTITY_ERROR` | `Incorrect entities id` | В параметре `ENTITIES` есть идентификаторы, которых нет в CRM ||
|| `400` | `WEBFORM_ERROR` | `Incorrect webform id` | В параметре `WEBFORM_ID` указана несуществующая CRM-форма ||
|| `403` | `ACCESS_ERROR` | `You don't have access to these entities` | Нет доступа ни к одному из переданных элементов ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-calllist-get.md)
- [{#T}](./crm-calllist-items-get.md)
- [{#T}](./crm-calllist-list.md)
- [{#T}](./crm-calllist-statuslist.md)
- [{#T}](./crm-calllist-update.md) 