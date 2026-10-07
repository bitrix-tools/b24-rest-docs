# Обновить данные пользователя user.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`user`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом приглашения сотрудников или редактирования всех пользователей; пользователь с правом редактирования собственного профиля — только для своего профиля

Метод `user.update` обновляет данные пользователя.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`integer`](../data-types.md) | Положительный идентификатор пользователя, данные которого нужно обновить ||
|| **ACTIVE**
[`boolean`](../data-types.md) | Признак активности пользователя: `Y` — активен, `N` — уволен ||
|| **EMAIL**
[`string`](../data-types.md) | E-mail пользователя ||
|| **NAME**
[`string`](../data-types.md) | Имя ||
|| **LAST_NAME**
[`string`](../data-types.md) | Фамилия ||
|| **SECOND_NAME**
[`string`](../data-types.md) | Отчество ||
|| **PERSONAL_GENDER**
[`string`](../data-types.md) | Пол: `M` — мужской, `F` — женский. Другие значения преобразуются в пустую строку ||
|| **PERSONAL_PROFESSION**
[`string`](../data-types.md) | Профессия ||
|| **PERSONAL_WWW**
[`string`](../data-types.md) | Домашняя страничка ||
|| **PERSONAL_BIRTHDAY**
[`date`](../data-types.md) | Дата рождения в формате ISO 8601, например `1990-05-14` ||
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
[`string`](../data-types.md) | Рабочий факс ||
|| **WORK_PAGER**
[`string`](../data-types.md) | Рабочий пейджер ||
|| **WORK_STREET**
[`string`](../data-types.md) | Улица и дом по адресу компании ||
|| **WORK_MAILBOX**
[`string`](../data-types.md) | Почтовый ящик компании ||
|| **WORK_CITY**
[`string`](../data-types.md) | Город работы ||
|| **WORK_STATE**
[`string`](../data-types.md) | Область или край по адресу компании ||
|| **WORK_ZIP**
[`string`](../data-types.md) | Почтовый индекс компании ||
|| **WORK_COUNTRY**
[`string`](../data-types.md) | Страна по адресу компании ||
|| **WORK_PROFILE**
[`string`](../data-types.md) | Направления деятельности компании ||
|| **WORK_LOGO**
[`array`](../data-types.md) | Логотип компании. Массив данных файла ||
|| **WORK_NOTES**
[`string`](../data-types.md) | Дополнительные заметки о компании ||
|| **UF_SKYPE_LINK**
[`string`](../data-types.md) | Ссылка на чат в Skype ||
|| **UF_ZOOM**
[`string`](../data-types.md) | Zoom ||
|| **UF_DEPARTMENT**
[`integer[]`](../data-types.md) | Идентификаторы подразделений пользователя, например `[1, 2]`. Один идентификатор можно передать без массива. Получить идентификаторы можно методом [department.get](../departments/department-get.md) ||
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
        "ID": 1,
        "NAME": "Administrator",
        "LAST_NAME": "SomeLastName"
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/user.update
    ```

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "ID": 1,
        "NAME": "Administrator",
        "LAST_NAME": "SomeLastName",
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/user.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type UserUpdateResult = boolean

    try {
      const response = await $b24.actions.v2.call.make<UserUpdateResult>({
        method: 'user.update',
        params: {
          ID: 1,
          NAME: 'Administrator',
          LAST_NAME: 'SomeLastName',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('User updated successfully:', result)
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
      async function updateUser() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'user.update',
            params: {
              ID: 1,
              NAME: 'Administrator',
              LAST_NAME: 'SomeLastName',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('User updated successfully:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateUser)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.user.update(
            fields={
                "ID": 1,
                "NAME": "Administrator",
                "LAST_NAME": "SomeLastName",
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
                'user.update',
                [
                    'ID'       => 1,
                    'NAME'     => 'Administrator',
                    'LAST_NAME' => 'SomeLastName',
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
        echo 'Error updating user: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "user.update",
        {
            "ID": 1,
            "NAME": "Administrator",
            "LAST_NAME": "SomeLastName"
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
        'user.update',
        [
            'ID' => 1,
            'NAME' => 'Administrator',
            'LAST_NAME' => 'SomeLastName'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "user.update", b24.Params{
    	"ID":        1,
    	"NAME":      "Administrator",
    	"LAST_NAME": "SomeLastName",
    })
    if err != nil {
    	return fmt.Errorf("user.update: %w", err)
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
            "start": 1721807581.02493,
            "finish": 1721807581.20039,
            "duration": 0.17546010017395,
            "processing": 0.133708000183105,
            "date_start": "2024-07-24T07:53:01+00:00",
            "date_finish": "2024-07-24T07:53:01+00:00",
            "operating": 0.133685827255249
        }
    }
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | `true`, если метод выполнился без ошибки. Обновленный профиль в ответ не входит ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_CORE",
    "error_description": "access_denied"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Сообщение об ошибке** | **Описание** ||
|| `insufficient_scope` | The request requires higher privileges than provided by the access token | Для вызова требуется скоуп `user`; скоупы `user_brief` и `user_basic` не подходят ||
|| `ERROR_CORE` | access_denied | `ID` не передан или не является положительным числом ||
|| `ERROR_CORE` | access_denied | Недостаточно прав для изменения данных указанного пользователя ||
|| `ERROR_CORE` | Текст ошибки зависит от причины | Не удалось сохранить изменения профиля. Метод возвращает сообщение о причине ошибки ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./user-add.md)
- [{#T}](./user-get.md)
- [{#T}](./user-current.md)
- [{#T}](./user-search.md)
- [{#T}](./user-fields.md)
