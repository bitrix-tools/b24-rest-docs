# Зарегистрировать новый тип пользовательских полей userfieldtype.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `userfieldtype.add` регистрирует тип пользовательских полей приложения и работает только в контексте [приложения](../../../settings/app-installation/index.md). После регистрации создайте поле этого типа методом [userfieldconfig.add](../../crm/universal/userfieldconfig/userfieldconfig-add.md): в `field.userTypeId` передайте полный код `rest_<APP_ID>_<USER_TYPE_ID>`, где `APP_ID` — идентификатор приложения из метода [app.info](../../common/system/app-info.md). Чтобы создать поле, приложению нужны еще scope `userfieldconfig` и `crm`.

Собственный тип нужен, когда поле должно показывать интерфейс приложения, например данные внешнего сервиса. Для обычного текста, числа или списка достаточно стандартных типов полей.

Когда пользователь открывает карточку с полем этого типа, Битрикс24 загружает адрес `HANDLER` во фрейме поля и передает в `PLACEMENT_OPTIONS` данные поля и элемента. Пример для поля в карточке сделки:

```json
{
    "MODE": "view",
    "ENTITY_ID": "CRM_DEAL",
    "FIELD_NAME": "UF_CRM_DCTEST",
    "ENTITY_VALUE_ID": "22",
    "VALUE": "Значение поля",
    "MULTIPLE": "N",
    "MANDATORY": "N",
    "XML_ID": null,
    "ENTITY_DATA": {
        "entityTypeId": 2,
        "entityId": "22",
        "module": "crm"
    },
    "URI": "/crm/deal/details/22/?IFRAME=Y&IFRAME_TYPE=SIDE_SLIDER"
}
```

Что означает каждый ключ и что еще приходит в запросе, описано в разделе [Что получает обработчик](./index.md#handler-data).

Обработчик загружается в поле, только когда установка приложения завершена. Проверить это можно по значению `INSTALLED` в ответе метода [app.info](../../common/system/app-info.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **USER_TYPE_ID***
[`string`](../../data-types.md) | Код типа. Метод приводит его к нижнему регистру.

Код должен быть уникальным среди типов всех приложений Битрикс24: если он уже занят, метод вернет ошибку `Handler already binded`.

Полный код типа `rest_<APP_ID>_<USER_TYPE_ID>` должен укладываться в 50 символов. Метод примет и более длинный код, но у созданного поля код типа обрежется до 50 символов, и Битрикс24 не найдет тип ||
|| **HANDLER***
[`string`](../../data-types.md) | Адрес обработчика, который Битрикс24 загрузит в поле. Он должен начинаться с `http://` или `https://`, а имя хоста — содержать точку.

У каждого типа приложения должен быть свой адрес: если адрес уже занят, метод вернет ошибку `Handler already binded`.

Для Битрикс24 по HTTPS используйте адрес с HTTPS, иначе браузер не загрузит содержимое поля ||
|| **TITLE**
[`string`](../../data-types.md) | Название типа до 255 символов. Выводится в административном интерфейсе настройки пользовательских полей. Если не передать, названием станет код типа ||
|| **DESCRIPTION**
[`string`](../../data-types.md) | Описание типа до 255 символов. Выводится в административном интерфейсе настройки пользовательских полей ||
|| **OPTIONS**
[`object`](../../data-types.md) | Дополнительные настройки. Сейчас доступен один ключ: `height` — высота поля в пикселях, целое число.

По умолчанию — `0`: поле получит стандартную высоту, в карточке CRM это 200 пикселей ||
|| **LANG_ALL**
[`object`](../../data-types.md) | Название и описание типа для разных языков. Ключ объекта — двухбуквенный код языка, например `ru` или `en`. Значение — объект со строковыми полями `TITLE` и `DESCRIPTION` до 255 символов. Если передан непустой `LANG_ALL`, метод не учитывает параметры `TITLE` и `DESCRIPTION`.

Метод сохраняет все переданные переводы, а [userfieldtype.list](./userfieldtype-list.md) возвращает одну версию названия и описания, выбранную при регистрации: на языке Битрикс24, если она передана, иначе другую из переданных ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "USER_TYPE_ID": "test_type",
        "HANDLER": "https://www.myapplication.com/handler/",
        "TITLE": "Updated test type",
        "DESCRIPTION": "Test userfield type for documentation with updated description",
        "OPTIONS": {
            "height": 60
        },
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/userfieldtype.add
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
        method: 'userfieldtype.add',
        params: {
          USER_TYPE_ID: 'test_type',
          HANDLER: 'https://www.myapplication.com/handler/',
          TITLE: 'Updated test type',
          DESCRIPTION: 'Test userfield type for documentation with updated description',
          OPTIONS: {
            height: 60,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Registration result:', result)
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
      async function addUserFieldType() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'userfieldtype.add',
            params: {
              USER_TYPE_ID: 'test_type',
              HANDLER: 'https://www.myapplication.com/handler/',
              TITLE: 'Updated test type',
              DESCRIPTION: 'Test userfield type for documentation with updated description',
              OPTIONS: {
                height: 60,
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
          console.info('Registration result:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addUserFieldType)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    options = {
        "height": 60,
    }

    try:
        bitrix_response = client.userfieldtype.add(
            user_type_id="test_type",
            handler="https://www.myapplication.com/handler/",
            title="Updated test type",
            description="Test userfield type for documentation with updated description",
            options=options,
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
                'userfieldtype.add',
                [
                    'USER_TYPE_ID' => 'test_type',
                    'HANDLER'      => 'https://www.myapplication.com/handler/',
                    'TITLE'        => 'Updated test type',
                    'DESCRIPTION'  => 'Test userfield type for documentation with updated description',
                    'OPTIONS'      => [
                        'height' => 60,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result[0], true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding user field type: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'userfieldtype.add',
        {
            USER_TYPE_ID: 'test_type',
            HANDLER: 'https://www.myapplication.com/handler/',
            TITLE: 'Updated test type',
            DESCRIPTION: 'Test userfield type for documentation with updated description',
            OPTIONS: {
                height: 60,
            },
        },
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
        'userfieldtype.add',
        [
            'USER_TYPE_ID' => 'test_type',
            'HANDLER' => 'https://www.myapplication.com/handler/',
            'TITLE' => 'Updated test type',
            'DESCRIPTION' => 'Test userfield type for documentation with updated description',
            'OPTIONS' => [
                'height' => 60
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
    res, err := client.Core().Call(ctx, "userfieldtype.add", b24.Params{
    	"USER_TYPE_ID": "test_type",
    	"HANDLER":      "https://www.myapplication.com/handler/",
    	"TITLE":        "Updated test type",
    	"DESCRIPTION":  "Test userfield type for documentation with updated description",
    	"OPTIONS": b24.Params{
    		"height": 60,
    	},
    })
    if err != nil {
    	return fmt.Errorf("userfieldtype.add: %w", err)
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
    "result":true,
    "time":{
        "start":1724421710.397825,
        "finish":1724421711.040353,
        "duration":0.6425280570983887,
        "processing":5.888938903808594e-5,
        "date_start":"2024-08-23T16:01:50+02:00",
        "date_finish":"2024-08-23T16:01:51+02:00","operating":0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Результат регистрации нового типа пользовательских полей ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_CORE",
    "error_description":"Unable to set placement handler: Handler already binded"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `WRONG_AUTH_TYPE` | Current authorization type is denied for this method Application context required | Метод вызван не из приложения, например через вебхук ||
|| `403` | `ACCESS_DENIED` | Access denied! | Метод вызвал не администратор ||
|| `400` | `ERROR_CORE` | Unable to set placement handler: Handler already binded | `HANDLER` уже занят другим типом этого приложения или такой `USER_TYPE_ID` уже зарегистрирован ||
|| `400` | `ERROR_CORE` | Error: Для значения поля "TITLE" превышена максимальная длина: 255 | Название, описание или код языка длиннее допустимого. Метод успевает создать запись о типе, и она появится в [userfieldtype.list](./userfieldtype-list.md), но регистрация не завершена — создать поле с этим типом нельзя. Удалите тип методом [userfieldtype.delete](./userfieldtype-delete.md) и зарегистрируйте заново ||
|| `400` | `ERROR_ARGUMENT` | Argument 'USER_TYPE_ID' is null or empty | Не передан `USER_TYPE_ID` ||
|| `400` | `ERROR_ARGUMENT` | Argument 'HANDLER' is null or empty | Не передан `HANDLER` ||
|| `400` | `ERROR_WRONG_HANDLER_URL` | Wrong handler URL | В `HANDLER` не указано имя хоста или в имени хоста нет точки. Например, адрес записан без `https://` или указывает на `localhost` ||
|| `400` | `ERROR_UNSUPPORTED_PROTOCOL` | Unsupported handler protocol | Имя хоста в `HANDLER` корректное, но протокол не `http` и не `https`, например `ftp://` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./userfieldtype-update.md)
- [{#T}](./userfieldtype-list.md)
- [{#T}](./userfieldtype-delete.md)
- [{#T}](../../crm/universal/userfieldconfig/userfieldconfig-add.md)
- [{#T}](../../crm/universal/user-defined-fields/userfield-type.md)
