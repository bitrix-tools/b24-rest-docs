# Прикрепить запись к завершенному звонку telephony.externalCall.attachRecord

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`telephony`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `telephony.externalCall.attachRecord` прикрепляет запись к завершенному звонку и к CRM-делу звонка.

Вызывайте метод после [telephony.externalCall.finish](./telephony-external-call-finish.md), когда запись готова.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CALL_ID***
[`string`](../data-types.md) | Идентификатор звонка из метода [telephony.externalCall.register](./telephony-external-call-register.md).

Если вызвать метод повторно для одного и того же звонка, новая запись заменит ранее прикрепленную ||
|| **RECORD_URL**
[`string`](../data-types.md) | URL записи на внешнем сервере. Если параметр передан, Битрикс24 скачивает файл по ссылке.

Рекомендуется использовать только если файл доступен стабильно и быстро ||
|| **FILENAME**
[`string`](../data-types.md) | Имя файла записи.

Возможные расширения:
- `wav`
- `mp3`

В режиме `RECORD_URL`:
- если `FILENAME` не передан, имя берется из URL ||
|| **FILE_CONTENT**
[`string`](../data-types.md) | Файл в кодировке [Base64](../files/how-to-upload-files.md) ||
|#

{% note info "" %}

Если передан `FILENAME`, но не передан `FILE_CONTENT`, метод вернет `uploadUrl` и `fieldName` для последующей загрузки содержимого файла отдельным запросом.

Если переданы и `FILENAME`, и `FILE_CONTENT` (или указан `RECORD_URL`), файл прикрепляется сразу, и в ответе возвращается `FILE_ID`

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CALL_ID":"externalCall.716f1cb73def9700a23842adf9c4c568.1773130779","FILENAME":"call-001.mp3","FILE_CONTENT":"SUQzAwAAAAAiVVRJVDI...AAAAAAAAAAAAP8="}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/telephony.externalCall.attachRecord
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CALL_ID":"externalCall.716f1cb73def9700a23842adf9c4c568.1773130779","FILENAME":"call-001.mp3","FILE_CONTENT":"SUQzAwAAAAAiVVRJVDI...AAAAAAAAAAAAP8=","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/telephony.externalCall.attachRecord
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type AttachRecordResult = {
      FILE_ID?: number
      uploadUrl?: string
      fieldName?: string
    }

    try {
      const response = await $b24.actions.v2.call.make<AttachRecordResult>({
        method: 'telephony.externalCall.attachRecord',
        params: {
          CALL_ID: 'externalCall.716f1cb73def9700a23842adf9c4c568.1773130779',
          FILENAME: 'call-001.mp3',
          FILE_CONTENT: 'SUQzAwAAAAAiVVRJVDI...AAAAAAAAAAAAP8=',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('FILE_ID:', result.FILE_ID, 'uploadUrl:', result.uploadUrl, 'fieldName:', result.fieldName)
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
      async function attachRecord() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'telephony.externalCall.attachRecord',
            params: {
              CALL_ID: 'externalCall.716f1cb73def9700a23842adf9c4c568.1773130779',
              FILENAME: 'call-001.mp3',
              FILE_CONTENT: 'SUQzAwAAAAAiVVRJVDI...AAAAAAAAAAAAP8=',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('FILE_ID:', result.FILE_ID, 'uploadUrl:', result.uploadUrl, 'fieldName:', result.fieldName)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', attachRecord)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'telephony.externalCall.attachRecord',
                [
                    'CALL_ID' => 'externalCall.716f1cb73def9700a23842adf9c4c568.1773130779',
                    'FILENAME' => 'call-001.mp3',
                    'FILE_CONTENT' => 'SUQzAwAAAAAiVVRJVDI...AAAAAAAAAAAAP8='
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error attaching record: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "telephony.externalCall.attachRecord",
        {
            CALL_ID: 'externalCall.716f1cb73def9700a23842adf9c4c568.1773130779',
            FILENAME: 'call-001.mp3',
            FILE_CONTENT: 'SUQzAwAAAAAiVVRJVDI...AAAAAAAAAAAAP8='
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error(), result.error_description());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'telephony.externalCall.attachRecord',
        [
            'CALL_ID' => 'externalCall.716f1cb73def9700a23842adf9c4c568.1773130779',
            'FILENAME' => 'call-001.mp3',
            'FILE_CONTENT' => 'SUQzAwAAAAAiVVRJVDI...AAAAAAAAAAAAP8='
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

#### Если переданы и FILENAME, и FILE_CONTENT

HTTP-статус: **200**

```json
{
    "result": {
        "FILE_ID": 9079
    },
    "time": {
        "start": 1773134738,
        "finish": 1773134740.398239,
        "duration": 2.3982388973236084,
        "processing": 2,
        "date_start": "2026-03-10T12:25:38+03:00",
        "date_finish": "2026-03-10T12:25:40+03:00",
        "operating_reset_at": 1773135338,
        "operating": 1.9444890022277832
    }
}
```

#### Если передан FILENAME без FILE_CONTENT

```json
{
    "result": {
        "uploadUrl": "https://test.bitrix24.ru/rest/upload.json?auth=2ae2af690000071b006e2cf2000004f5000007e78a418f2bdef34c831de35c35aaa7ac&token=telephony%7CY2FsbElkPWV4dGVybmFsQ2FsbC43MTZmMWNiNzNkZWY5NzAwYTIzODQyYWRmWRxVVVhdzE%3D%7CInekVhYWE3YWMi.rgOHch62uz5kg9GEslf46sPRmN5MYa/kxBkWcOQtZ/8=",
        "fieldName": "file"
    },
    "time": {
        "start": 1773134240,
        "finish": 1773134240.377464,
        "duration": 0.37746405601501465,
        "processing": 0,
        "date_start": "2026-03-10T12:17:20+03:00",
        "date_finish": "2026-03-10T12:17:20+03:00",
        "operating_reset_at": 1773134840,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа ||
|| **FILE_ID**
[`integer`](../data-types.md) | Идентификатор прикрепленного файла ||
|| **uploadUrl**
[`string`](../data-types.md) | URL загрузки файла, если `FILE_CONTENT` не был передан ||
|| **fieldName**
[`string`](../data-types.md) | Имя поля для загрузки файла ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_CORE",
    "error_description": "Required parameters are not set. Request should contain or URL or FILENAME parameter"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_CORE` | Required parameters are not set. Request should contain or URL or FILENAME parameter | Не переданы `RECORD_URL` и `FILENAME` ||
|| `ERROR_CORE` | Call is not found in the statistic table. Looks like it is not finished yet. | Звонок не найден в статистике. Убедитесь, что звонок завершен ||
|| `ERROR_CORE` | File name is empty | Пустой `FILENAME` ||
|| `ERROR_CORE` | Wrong file extension. Only wav and mp3 are allowed | Недопустимое расширение файла ||
|| `ERROR_CORE` | File content is empty. | Пустой `FILE_CONTENT` ||
|| `ERROR_CORE` | File content is not properly encoded. Base64 encoding is expected. | `FILE_CONTENT` передан не в Base64 ||
|| `ERROR_CORE` | Server returns HTTP error code {N} | Ошибка HTTP при загрузке записи по `RECORD_URL` ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./telephony-external-call-register.md)
- [{#T}](./telephony-external-call-finish.md)
- [{#T}](./telephony-call-attach-transcription.md)
