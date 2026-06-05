# Пригласить пользователя user.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`user`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `user.add` приглашает пользователя. Возможно только от имени пользователя с правами приглашения пользователей, как правило администратора. В случае успеха пользователю будет выслано стандартное приглашение на портал. В `result` возвращается идентификатор нового пользователя.

Если нужно добавить пользователя экстранета, то в полях необходимо передать: `EXTRANET: Y` и `SONET_GROUP_ID: [...]`. Если нужно добавить пользователя интранета, то **обязательно** передается: `UF_DEPARTMENT: [...]`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **EMAIL***
[`string`](../data-types.md) | E-mail пользователя ||
|| **NAME**
[`string`](../data-types.md) | Имя ||
|| **LAST_NAME**
[`string`](../data-types.md) | Фамилия ||
|| **SECOND_NAME**
[`string`](../data-types.md) | Отчество ||
|| **PERSONAL_GENDER**
[`string`](../data-types.md) | Пол ||
|| **PERSONAL_PROFESSION**
[`string`](../data-types.md) | Профессия ||
|| **PERSONAL_WWW**
[`string`](../data-types.md) | Домашняя страничка ||
|| **PERSONAL_BIRTHDAY**
[`string`](../data-types.md) | Дата рождения ||
|| **PERSONAL_PHOTO**
[`array`](../data-types.md) | Фотография, передавайте массив из имени файла и строки с [Bаse64](../files/how-to-upload-files.md) ||
|| **PERSONAL_ICQ**
[`string`](../data-types.md) | ICQ ||
|| **PERSONAL_PHONE**
[`string`](../data-types.md) | Личный телефон ||
|| **PERSONAL_FAX**
[`string`](../data-types.md) | Факс ||
|| **PERSONAL_MOBILE**
[`string`](../data-types.md) | Личный мобильный ||
|| **PERSONAL_PAGER**
[`string`](../data-types.md) | Пейджер ||
|| **PERSONAL_STREET**
[`string`](../data-types.md) | Улица проживания ||
|| **PERSONAL_CITY**
[`string`](../data-types.md) | Город проживания ||
|| **PERSONAL_STATE**
[`string`](../data-types.md) | Область / край ||
|| **PERSONAL_ZIP**
[`string`](../data-types.md) | Почтовый индекс ||
|| **PERSONAL_COUNTRY**
[`string`](../data-types.md) | Страна ||
|| **PERSONAL_MAILBOX**
[`string`](../data-types.md) | Почтовый ящик ||
|| **PERSONAL_NOTES**
[`string`](../data-types.md) | Дополнительные заметки ||
|| **WORK_PHONE**
[`string`](../data-types.md) | Телефон компании ||
|| **WORK_COMPANY**
[`string`](../data-types.md) | Компания ||
|| **WORK_POSITION**
[`string`](../data-types.md) | Должность ||
|| **WORK_DEPARTMENT**
[`string`](../data-types.md) | Отдел ||
|| **WORK_WWW**
[`string`](../data-types.md) | Сайт компании ||
|| **WORK_FAX**
[`string`](../data-types.md) | WORK_FAX ||
|| **WORK_PAGER**
[`string`](../data-types.md) | WORK_PAGER ||
|| **WORK_STREET**
[`string`](../data-types.md) | WORK_STREET ||
|| **WORK_MAILBOX**
[`string`](../data-types.md) | WORK_MAILBOX ||
|| **WORK_CITY**
[`string`](../data-types.md) | Город работы ||
|| **WORK_STATE**
[`string`](../data-types.md) | WORK_STATE ||
|| **WORK_ZIP**
[`string`](../data-types.md) | WORK_ZIP ||
|| **WORK_COUNTRY**
[`string`](../data-types.md) | WORK_COUNTRY ||
|| **WORK_PROFILE**
[`string`](../data-types.md) | WORK_PROFILE ||
|| **WORK_LOGO**
[`array`](../data-types.md) | WORK_LOGO ||
|| **WORK_NOTES**
[`string`](../data-types.md) | WORK_NOTES ||
|| **UF_SKYPE_LINK**
[`string`](../data-types.md) | Ссылка на чат в Skype ||
|| **UF_ZOOM**
[`string`](../data-types.md) | Zoom ||
|| **UF_DEPARTMENT**
[`string`](../data-types.md) | Подразделения ||
|| **UF_INTERESTS**
[`string`](../data-types.md) | Интересы ||
|| **UF_SKILLS**
[`string`](../data-types.md) | Навыки ||
|| **UF_WEB_SITES**
[`string`](../data-types.md) | Другие сайты ||
|| **UF_XING**
[`string`](../data-types.md) | Xing ||
|| **UF_LINKEDIN**
[`string`](../data-types.md) | LinkedIn ||
|| **UF_FACEBOOK**
[`string`](../data-types.md) | Facebook** ||
|| **UF_TWITTER**
[`string`](../data-types.md) | Twitter ||
|| **UF_SKYPE**
[`string`](../data-types.md) | Skype ||
|| **UF_DISTRICT**
[`string`](../data-types.md) | Район ||
|| **UF_PHONE_INNER**
[`string`](../data-types.md) | Внутренний телефон ||
|#

\
**Принадлежит компании Meta Platforms, Inc., которая признана экстремистской и запрещена на территории Российской Федерации.*

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "EMAIL": "newuser1@example.com",
        "UF_DEPARTMENT": [1]
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/user.add
    ```

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "EMAIL": "newuser1@example.com",
        "UF_DEPARTMENT": [1],
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/user.add
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
        method: 'user.add',
        params: {
          EMAIL: 'newuser1@example.com',
          UF_DEPARTMENT: [1]
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('New user ID:', result)
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
      async function addUser() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'user.add',
            params: {
              EMAIL: 'newuser1@example.com',
              UF_DEPARTMENT: [1]
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('New user ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addUser)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'user.add',
                [
                    'EMAIL'        => 'newuser1@example.com',
                    'UF_DEPARTMENT' => [1],
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
        echo 'Error adding user: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "user.add",
        {
            "EMAIL": "newuser1@example.com",
            "UF_DEPARTMENT": [1]
        },
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
        'user.add',
        [
            'EMAIL' => 'newuser1@example.com',
            'UF_DEPARTMENT' => [1]
        ]
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
        "result":12,
        "time":{
            "start":1721733827.713938,
            "finish":1721733828.286292,
            "duration":0.5723540782928467,
            "processing":0.5508849620819092,
            "date_start":"2024-07-23T11:23:47+00:00",
            "date_finish":"2024-07-23T11:23:48+00:00",
            "operating":0.5508630275726318
        }
    }
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../data-types.md) | Идентификатор нового пользователя ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_ARGUMENT",
    "error_description": "wrong_email",
    "argument": ""
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| `ERROR_ARGUMENT` | wrong_email | Не передан параметр `EMAIL` или передан некорректный e-mail ||
|| `ERROR_ARGUMENT` | Пользователь с таким email уже существует | Попытка зарегистрировать пользователя на e-mail, который уже занят ||
|| `ERROR_CORE` | access_denied | У пользователя нет прав на вызов метода ||
|| `ERROR_ARGUMENT` | user_count_exceeded | Превышено количество пользователей ||
|| `ERROR_GROUPID` | Не указан код группы | Не указан код группы при добавлении пользователя в экстранет ||
|| `ERROR_NO_GROUP` | Группа указана неверно | Неверно указана группа при добавлении пользователя ||
|| `ERROR_ARGUMENT` | no_extranet_field | При вызове метода не указано к какой группе должен принадлежать пользователь ||
|| `ERROR_CORE` |  | Ошибка обновления полей пользователя ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./user-update.md)
- [{#T}](./user-get.md)
- [{#T}](./user-current.md)
- [{#T}](./user-search.md)
- [{#T}](./user-fields.md)