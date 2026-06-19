# Создать почтовый сервис mailservice.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`mailservice`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `mailservice.add` создает почтовый сервис для текущего Битрикс24.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME***
[`string`](../data-types.md) | Название почтового сервиса ||
|| **ACTIVE**
[`string`](../data-types.md) | Признак активности сервиса. Допустимые значения:
- `Y` — да
- `N` — нет

Значение по умолчанию: `Y` ||
|| **SERVER**
[`string`](../data-types.md) | Адрес IMAP-сервера. В базе сохраняется в нижнем регистре ||
|| **PORT**
[`integer`](../data-types.md) | Порт IMAP-сервера ||
|| **ENCRYPTION**
[`string`](../data-types.md) | Признак защищенного подключения. Допустимые значения:
- `Y` — да
- `N` — нет ||
|| **LINK**
[`string`](../data-types.md) | Адрес веб-интерфейса почтового сервиса ||
|| **ICON**
[`file`](../data-types.md)
[`integer`](../data-types.md)
[`string`](../data-types.md) | Логотип сервиса. Можно передать файл или существующий идентификатор файла ||
|| **SORT**
[`integer`](../data-types.md) | Индекс сортировки. Значение по умолчанию: `100` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "NAME": "Мой почтовый сервис",
        "ACTIVE": "Y",
        "SERVER": "imap.my-mail.ru",
        "PORT": 993,
        "ENCRYPTION": "Y",
        "LINK": "https://mail.my-mail.ru/",
        "SORT": 500
      }' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/mailservice.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "NAME": "Мой почтовый сервис",
        "ACTIVE": "Y",
        "SERVER": "imap.my-mail.ru",
        "PORT": 993,
        "ENCRYPTION": "Y",
        "LINK": "https://mail.my-mail.ru/",
        "SORT": 500,
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/mailservice.add
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
        method: 'mailservice.add',
        params: {
          NAME: 'My mail service',
          ACTIVE: 'Y',
          SERVER: 'imap.my-mail.ru',
          PORT: 993,
          ENCRYPTION: 'Y',
          LINK: 'https://mail.my-mail.ru/',
          SORT: 500,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created mail service ID:', result)
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
      async function addMailService() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'mailservice.add',
            params: {
              NAME: 'My mail service',
              ACTIVE: 'Y',
              SERVER: 'imap.my-mail.ru',
              PORT: 993,
              ENCRYPTION: 'Y',
              LINK: 'https://mail.my-mail.ru/',
              SORT: 500,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Created mail service ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addMailService)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'mailservice.add',
                [
                    'NAME' => 'Мой почтовый сервис',
                    'ACTIVE' => 'Y',
                    'SERVER' => 'imap.my-mail.ru',
                    'PORT' => 993,
                    'ENCRYPTION' => 'Y',
                    'LINK' => 'https://mail.my-mail.ru/',
                    'SORT' => 500,
                ]
            );

        $result = $response->getResponseData()->getResult();
        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'mailservice.add',
        {
            NAME: 'Мой почтовый сервис',
            ACTIVE: 'Y',
            SERVER: 'imap.my-mail.ru',
            PORT: 993,
            ENCRYPTION: 'Y',
            LINK: 'https://mail.my-mail.ru/',
            SORT: 500
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
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
        'mailservice.add',
        [
            'NAME' => 'Мой почтовый сервис',
            'ACTIVE' => 'Y',
            'SERVER' => 'imap.my-mail.ru',
            'PORT' => 993,
            'ENCRYPTION' => 'Y',
            'LINK' => 'https://mail.my-mail.ru/',
            'SORT' => 500,
        ]
    );

    print_r($result);
    ```

- Python

    Пример

    ```python
    from b24pysdk.client import BaseClient
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    client: BaseClient

    try:
        bitrix_response = client.mailservice.add(
            name="SDK Mail Service",
            encryption=True,
            active=True,
            server="imap.example.com",
            port=993,
            link="https://mail.example.com",
            sort=200,
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
{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 31,
    "time": {
        "start": 1774005930,
        "finish": 1774005930.256403,
        "duration": 0.25640296936035156,
        "processing": 0,
        "date_start": "2026-03-20T14:25:30+03:00",
        "date_finish": "2026-03-20T14:25:30+03:00",
        "operating_reset_at": 1774006530,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../data-types.md) | Идентификатор созданного почтового сервиса ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_CORE",
    "error_description": "Доступ запрещен"
}
```

{% include notitle [Обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_CORE` | Доступ запрещен | Недостаточно прав для добавления почтового сервиса ||
|| `400` | `ERROR_CORE` | Не заполнено обязательное поле "Название" | Не передан обязательный параметр `NAME` ||
|| `400` | `ERROR_CORE` | Неправильное значение для "*название_поля*" | Передано недопустимое значение указанного поля  ||
|#

{% include [Системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./mailservice-update.md)
- [{#T}](./mailservice-get.md)
- [{#T}](./mailservice-list.md)
- [{#T}](./mailservice-delete.md)
- [{#T}](./mailservice-fields.md)
