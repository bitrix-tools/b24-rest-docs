# Добавить логотип crm.timeline.logo.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: `администратор`

Метод `crm.timeline.logo.add` добавляет новый пользовательский логотип. Его код можно передать в поле [`layout.body.logo.code`](../../activities/configurable/structure/body.md#logo-dto) при создании или изменении конфигурируемого дела.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **code***
[`string`](../../../../data-types.md) | Уникальный код пользовательского логотипа, например `info`. Код не должен совпадать с кодом существующего пользовательского или системного логотипа ||
|| **fileContent***
[`string`](../../../../data-types.md) | Закодированное `base64` содержимое файла логотипа.

Требования к файлу:

- Тип — PNG
- Размер — 60x60 пикселей

||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"code":"info","fileContent":"iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TRdGqgx1UHDLUgmBBVMRRq1CECqFWaNXB5NIvaNKQpLg4Cq4FBz8Wqw4uzro6uAqC4AeIo5OToouU"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.timeline.logo.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"code":"info","fileContent":"iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TRdGqgx1UHDLUgmBBVMRRq1CECqFWaNXB5NIvaNKQpLg4Cq4FBz8Wqw4uzro6uAqC4AeIo5OToouU","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.timeline.logo.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type AddLogoResult = {
      logo: {
        code: string
        isSystem: boolean
        fileUri: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<AddLogoResult>({
        method: 'crm.timeline.logo.add',
        params: {
          code: 'info',
          fileContent: 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TRdGqgx1UHDLUgmBBVMRRq1CECqFWaNXB5NIvaNKQpLg4Cq4FBz8Wqw4uzro6uAqC4AeIo5OToouU',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.logo.code, result.logo.isSystem, result.logo.fileUri)
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
      async function addLogo() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.timeline.logo.add',
            params: {
              code: 'info',
              fileContent: 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TRdGqgx1UHDLUgmBBVMRRq1CECqFWaNXB5NIvaNKQpLg4Cq4FBz8Wqw4uzro6uAqC4AeIo5OToouU',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.logo.code, result.logo.isSystem, result.logo.fileUri)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addLogo)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.timeline.logo.add(
            code="info",
            file_content="iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TRdGqgx1UHDLUgmBBVMRRq1CECqFWaNXB5NIvaNKQpLg4Cq4FBz8Wqw4uzro6uAqC4AeIo5OToouU",
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
                'crm.timeline.logo.add',
                [
                    'code'        => 'info',
                    'fileContent' => 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TRdGqgx1UHDLUgmBBVMRRq1CECqFWaNXB5NIvaNKQpLg4Cq4FBz8Wqw4uzro6uAqC4AeIo5OToouU',
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
        echo 'Error adding timeline logo: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.timeline.logo.add",
        {
            code: "info",
            fileContent: "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TRdGqgx1UHDLUgmBBVMRRq1CECqFWaNXB5NIvaNKQpLg4Cq4FBz8Wqw4uzro6uAqC4AeIo5OToouU",
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

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.timeline.logo.add',
        [
            'code' => 'info',
            'fileContent' => 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TRdGqgx1UHDLUgmBBVMRRq1CECqFWaNXB5NIvaNKQpLg4Cq4FBz8Wqw4uzro6uAqC4AeIo5OToouU'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.timeline.logo.add", b24.Params{
    	"code":        "info",
    	"fileContent": "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TRdGqgx1UHDLUgmBBVMRRq1CECqFWaNXB5NIvaNKQpLg4Cq4FBz8Wqw4uzro6uAqC4AeIo5OToouU",
    })
    if err != nil {
    	return fmt.Errorf("crm.timeline.logo.add: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "logo".
    raw, ok := b24.Unwrap(res.Result, "logo")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа logo")
    }

    var item struct {
    	Code     string `json:"code"`
    	IsSystem bool   `json:"isSystem"`
    	FileUri  string `json:"fileUri"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.Code, item.IsSystem)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "logo": {
            "code": "info",
            "isSystem": false,
            "fileUri": "/upload/crm/286/a1k092hygdrzpiz6a01enuymqoo5qzym/ou0akdwnbxalzk9hgfme39nbvtozblew"
        }
    },
    "time": {
        "start": 1712132792.910734,
        "finish": 1712132793.530359,
        "duration": 0.6196250915527344,
        "processing": 0.032338857650756836,
        "date_start": "2024-04-03T10:26:32+02:00",
        "date_finish": "2024-04-03T10:26:33+02:00",
        "operating_reset_at": 1705765533,
        "operating": 3.3076241016387939
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../../data-types.md) | Корневой элемент ответа [(подробное описание)](#result) ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Поле**
`тип` | **Описание** ||
|| **logo**
[`object`](../../../../data-types.md) | Добавленный логотип [(подробное описание)](#logo) ||
|#

##### Объект logo {#logo}

#|
|| **Поле**
`тип`  | **Описание** ||
|| **code**
[`string`](../../../../data-types.md) | Код логотипа ||
|| **isSystem**
[`boolean`](../../../../data-types.md) | Признак системного логотипа. Возможные значения:
- `true` — если логотип является стандартным (поставляется в продукте)
- `false` — если логотип добавлен пользователем 
||
|| **fileUri**
[`string`](../../../../data-types.md) | Путь к файлу.

Если логотип был добавлен пользователем, поле содержит путь к файлу картинки логотипа ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Доступ запрещен"
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ACCESS_DENIED` | Доступ запрещен | Метод вызвал пользователь без прав администратора ||
|| `400` | `INVALID_ARG_VALUE` | Invalid image или Only png 60px on 60px is supported | В `fileContent` передано некорректное содержимое либо изображение не соответствует формату PNG и размеру 60x60 пикселей ||
|| `400` | `FILE_SAVE_ERROR` | File not saved | Переданный файл не удалось сохранить ||
|| `400` | `100` | Не переданы обязательные поля | Не передан `code` или `fileContent` ||
|| `400` | `0` | Текст ошибки зависит от причины | Код уже занят другим пользовательским логотипом или совпадает с системным кодом ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-timeline-logo-get.md)
- [{#T}](./crm-timeline-logo-list.md)
- [{#T}](./crm-timeline-logo-delete.md)



