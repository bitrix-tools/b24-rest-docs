# Получить базовую информацию о текущем пользователе profile

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`базовый`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `profile` получает базовую информацию о текущем пользователе. В отличие от [user.current](../../user/user-current.md), ему не нужен отдельный scope.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/profile
    ```

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/profile
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ProfileResult = {
      ID: string,
      ADMIN: boolean,
      NAME: string,
      LAST_NAME: string,
      PERSONAL_GENDER: string,
      TIME_ZONE: string | null,
      PERSONAL_PHOTO?: string,
    }

    try {
      const response = await $b24.actions.v2.call.make<ProfileResult | []>({
        method: 'profile',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        // An inactive user gets an empty array instead of an object
        if (Array.isArray(result)) {
          console.info('User is inactive')
        } else {
          console.info(result.ID, result.NAME, result.LAST_NAME, result.ADMIN)
        }
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
      async function fetchProfile() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'profile',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.ID, result.NAME, result.LAST_NAME, result.ADMIN)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchProfile)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.profile().response
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
                'profile',
                []
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
        echo 'Error calling profile method: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "profile",
        {},
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'profile',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "ID": "1",
        "ADMIN": true,
        "NAME": "Вадим",
        "LAST_NAME": "Валеев",
        "PERSONAL_GENDER": "M",
        "TIME_ZONE": "Europe/Moscow",
        "PERSONAL_PHOTO": "https://example.bitrix24.ru/upload/main/c7b/c7bd44b1babaa5448125dd97d038ce1b/photo.jpg"
    },
    "time": {
        "start": 1722848182.67776,
        "finish": 1722848182.71787,
        "duration": 0.0401120185852051,
        "processing": 0.00115704536437988,
        "date_start": "2024-08-05T08:56:22+00:00",
        "date_finish": "2024-08-05T08:56:22+00:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с базовыми данными текущего пользователя.

Структура описана [ниже](#profile).

Если пользователь неактивен, вместо объекта вернется пустой массив `[]` ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

### Объект result {#profile}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор текущего пользователя ||
|| **ADMIN**
[`boolean`](../../data-types.md) | Признак администратора Битрикс24: `true` — администратор, `false` — нет. Совпадает с результатом метода [user.admin](./user-admin.md) ||
|| **NAME**
[`string`](../../data-types.md) | Имя пользователя ||
|| **LAST_NAME**
[`string`](../../data-types.md) | Фамилия пользователя ||
|| **PERSONAL_GENDER**
[`string`](../../data-types.md) | Пол: `M` — мужской, `F` — женский. Если пол не указан, вернется пустая строка ||
|| **TIME_ZONE**
[`string`](../../data-types.md) | Часовой пояс пользователя, например `Europe/Moscow`. Если часовой пояс не задан, вернется пустая строка или `null` ||
|| **PERSONAL_PHOTO**
[`string`](../../data-types.md) | Абсолютная ссылка на исходный файл фотографии пользователя. Поле возвращается, только если фотография загружена ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Access denied! User authorization required"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `ACCESS_DENIED` | Access denied! User authorization required | Запрос выполнен без авторизованного пользователя ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./user-admin.md)
- [{#T}](./user-access.md)
- [{#T}](../../user/user-current.md)