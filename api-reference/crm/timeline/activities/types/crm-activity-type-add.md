# Добавить пользовательский тип дела crm.activity.type.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор, только в контексте [приложения](../../../../../settings/app-installation/index.md)

Метод `crm.activity.type.add` регистрирует пользовательский тип дела с названием и иконкой.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../../data-types.md) | Объект с полями нового типа дела. Ключи полей передавайте в верхнем регистре, например `TYPE_ID`: ключ `type_id` метод не распознает. [Описание полей](#parametr-fields) ||
|#

### Параметр fields {#parametr-fields}

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TYPE_ID***
[`string`](../../../../data-types.md) | Код типа дела, например `1C`. Не длиннее 100 символов, уникален среди типов текущего приложения.

Код `CONFIGURABLE` нельзя использовать вместе с `IS_CONFIGURABLE_TYPE` = `Y`: он зарезервирован.

После регистрации передавайте код в поле `PROVIDER_TYPE_ID` метода [crm.activity.add](../activity-base/crm-activity-add.md) вместе с `PROVIDER_ID` = `REST_APP` или в поле `typeId` метода [crm.activity.configurable.add](../configurable/crm-activity-configurable-add.md) ||
|| **NAME***
[`string`](../../../../data-types.md) | Название типа дела, например `Дело 1C`. Не длиннее 255 символов ||
|| **ICON_FILE**
[`array`](../../../../data-types.md) | Иконка типа дела — [массив из имени файла и содержимого в Base64](../../../../files/how-to-upload-files.md#array), например `["icon.png", "iVBORw0KGgo..."]`.

Если параметр не передан или файл не удалось прочитать, тип создается без иконки ||
|| **IS_CONFIGURABLE_TYPE**
[`string`](../../../../data-types.md) | Признак типа для конфигурируемых дел:

- `Y` — тип для метода [crm.activity.configurable.add](../configurable/crm-activity-configurable-add.md)
- `N` — тип для метода [crm.activity.add](../activity-base/crm-activity-add.md), значение по умолчанию

Любое значение, кроме `Y`, считается `N` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"TYPE_ID":"1C","NAME":"Дело 1C","ICON_FILE":["icon.png","iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="],"IS_CONFIGURABLE_TYPE":"N"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.type.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'crm.activity.type.add',
        params: {
          fields: {
            TYPE_ID: '1C',
            NAME: '1C activity',
            ICON_FILE: ['icon.png', 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='], // file name and Base64 content
            IS_CONFIGURABLE_TYPE: 'N',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Activity type added:', result)
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
      async function addActivityType() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.activity.type.add',
            params: {
              fields: {
                TYPE_ID: '1C',
                NAME: '1C activity',
                ICON_FILE: ['icon.png', 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='], // file name and Base64 content
                IS_CONFIGURABLE_TYPE: 'N',
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Activity type added:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addActivityType)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.activity.type.add(
            fields={
                "TYPE_ID": "1C",
                "NAME": "Дело 1C",
                "ICON_FILE": [
                    "icon.png",
                    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
                ],
                "IS_CONFIGURABLE_TYPE": "N",
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


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.activity.type.add',
                [
                    'fields' => [
                        'TYPE_ID'            => '1C',
                        'NAME'               => 'Дело 1C',
                        'ICON_FILE'          => ['icon.png', base64_encode(file_get_contents('icon.png'))],
                        'IS_CONFIGURABLE_TYPE' => 'N',
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

    ```js
    BX24.callMethod(
        "crm.activity.type.add",
        {
            fields:
            {
                "TYPE_ID": '1C',
                "NAME": "Дело 1C",
                'ICON_FILE': document.getElementById('type-icon'), // file input node
                "IS_CONFIGURABLE_TYPE": "N"
            }
        }, result => {
            if (result.error())
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
        'crm.activity.type.add',
        [
            'fields' => [
                'TYPE_ID' => '1C',
                'NAME' => 'Дело 1C',
                'ICON_FILE' => ['icon.png', base64_encode(file_get_contents('icon.png'))],
                'IS_CONFIGURABLE_TYPE' => 'N'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    // iconBytes — содержимое файла иконки, например из os.ReadFile("icon.png")
    res, err := client.Core().Call(ctx, "crm.activity.type.add", b24.Params{
    	"fields": b24.Params{
    		"TYPE_ID":              "1C",
    		"NAME":                 "Дело 1C",
    		"ICON_FILE":            []string{"icon.png", base64.StdEncoding.EncodeToString(iconBytes)},
    		"IS_CONFIGURABLE_TYPE": "N",
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.activity.type.add: %w", err)
    }

    var ok bool
    if err := json.Unmarshal(res.Result, &ok); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("выполнено:", ok)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1724068028.331234,
        "finish": 1724068028.726591,
        "duration": 0.3953571319580078,
        "processing": 0.13033390045166016,
        "date_start": "2025-01-21T13:47:08+02:00",
        "date_finish": "2025-01-21T13:47:08+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../../data-types.md) | Результат регистрации:

- `true` — тип зарегистрирован
- `false` — тип не зарегистрирован: не передан `TYPE_ID` или `NAME`, значение длиннее допустимого или ключи полей переданы не в верхнем регистре ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Type is already registered"
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `ACCESS_DENIED` | Access denied! Admin permissions required | Метод вызывает пользователь без прав администратора ||
|| `403` | `ACCESS_DENIED` | Access denied! Application context required | Метод вызван через входящий вебхук или без авторизации приложения ||
|| `400` | Пустое значение | Type is already registered | Тип с таким `TYPE_ID` уже зарегистрирован текущим приложением ||
|| `400` | Пустое значение | Type ID "CONFIGURABLE" is reserved | Передан `TYPE_ID` = `CONFIGURABLE` вместе с `IS_CONFIGURABLE_TYPE` = `Y` ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-activity-type-list.md)
- [{#T}](./crm-activity-type-delete.md)
- [{#T}](../activity-base/crm-activity-add.md)
- [{#T}](../configurable/crm-activity-configurable-add.md)
