# Получить список зарегистрированных типов пользовательских полей userfieldtype.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `userfieldtype.list` возвращает типы пользовательских полей, которые приложение зарегистрировало методом [userfieldtype.add](./userfieldtype-add.md). Для каждого типа метод отдает код, адрес обработчика, название и описание.

Поле такого типа выводится в карточке элемента CRM, а его содержимое загружает обработчик приложения. Общая схема работы описана в статье [Пользовательские типы полей](./index.md).

Используйте метод, чтобы узнать код типа `USER_TYPE_ID` перед вызовом [userfieldtype.update](./userfieldtype-update.md) или [userfieldtype.delete](./userfieldtype-delete.md).

{% note info "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md)

{% endnote %}

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **start**
[`integer`](../../data-types.md) | Смещение для постраничной навигации. Метод возвращает не более 50 записей за вызов. Чтобы получить следующую страницу, передайте значение `next` из предыдущего ответа: для второй страницы это `50`, для третьей — `100`. Подробнее — в статье [Особенности списочных методов](../../../settings/how-to-call-rest-api/list-methods-pecularities.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/userfieldtype.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each UserFieldTypeItem returned in result[]
    type UserFieldTypeItem = {
      USER_TYPE_ID: string
      HANDLER: string
      TITLE: string
      DESCRIPTION: string
    }

    // userfieldtype.list returns a single page (max 50 records). For the whole result set
    // use a list helper: $b24.actions.v2.callList.make() returns every record as one
    // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
    try {
      const response = await $b24.actions.v2.call.make<UserFieldTypeItem[]>({
        method: 'userfieldtype.list',
        params: {
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('User field types count:', result.length, result)
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
      async function listUserFieldTypes() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // userfieldtype.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          const response = await $b24.actions.v2.call.make({
            method: 'userfieldtype.list',
            params: {
              start: 0,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('User field types count:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listUserFieldTypes)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.userfieldtype.list(
            start=0,
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
        $userFieldTypesResult = $serviceBuilder->getPlacementScope()->userFieldType()->list();
        $userFieldTypes = $userFieldTypesResult->getUserFieldTypes();
        foreach ($userFieldTypes as $userFieldType) {
            print("Description: " . $userFieldType->DESCRIPTION . "\n");
            print("Handler: " . $userFieldType->HANDLER . "\n");
            print("Title: " . $userFieldType->TITLE . "\n");
            print("User Type ID: " . $userFieldType->USER_TYPE_ID . "\n");
        }
    } catch (Throwable $e) {
        print("Error: " . $e->getMessage());
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'userfieldtype.list',
        { start: 0 },
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
        'userfieldtype.list',
        ['start' => 0]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "userfieldtype.list", nil, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("userfieldtype.list: %w", err)
    }

    var items []struct {
    	UserTypeID  string `json:"USER_TYPE_ID"`
    	Handler     string `json:"HANDLER"`
    	Title       string `json:"TITLE"`
    	Description string `json:"DESCRIPTION"`
    }
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.UserTypeID, it.Handler)
    }

    // Total и Next заполняют списочные методы; для полного
    // обхода списка есть client.Core().Pages и Scan.
    if res.Total != nil {
    	fmt.Println("всего:", *res.Total)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "USER_TYPE_ID": "my_custom_type_2",
            "HANDLER": "http:\/\/test.com\/test2.php",
            "TITLE": "test title 2",
            "DESCRIPTION":"test desc 2"
        },
        {
            "USER_TYPE_ID": "my_custom_type_1",
            "HANDLER": "http:\/\/test.com\/test1.php",
            "TITLE": "test title 1",
            "DESCRIPTION": "test desc 1"
        },
        {
            "USER_TYPE_ID": "test_user_type",
            "HANDLER": "http:\/\/test.com\/test.php",
            "TITLE": "test title",
            "DESCRIPTION": "test desc"
        }
    ],
    "total": 3,
    "time":{
        "start":1724423274.842117,
        "finish":1724423275.558021,
        "duration":0.7159039974212646,
        "processing":0.0018908977508544922,
        "date_start":"2024-08-23T16:27:54+02:00",
        "date_finish":"2024-08-23T16:27:55+02:00",
        "operating":0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Список зарегистрированных типов пользовательских полей [(подробное описание)](#result). Если приложение не зарегистрировало ни одного типа, список пустой ||
|| **next**
[`integer`](../../data-types.md) | Смещение для следующей страницы. Передайте значение в параметр `start`, чтобы получить следующие 50 записей. Ключ есть в ответе, только если записи остались ||
|| **total**
[`integer`](../../data-types.md) | Общее количество типов, которые зарегистрировало приложение ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

#### Элемент массива result {#result}

Значения полей приложение задает при регистрации типа методом [userfieldtype.add](./userfieldtype-add.md).

#|
|| **Название**
`тип` | **Описание** ||
|| **USER_TYPE_ID**
[`string`](../../data-types.md) | Короткий код типа, переданный при регистрации. Его принимают [userfieldtype.update](./userfieldtype-update.md) и [userfieldtype.delete](./userfieldtype-delete.md). Полный код типа для создания поля собирается по форме `rest_<APP_ID>_<USER_TYPE_ID>`, как описано в статье [Пользовательские типы полей](./index.md) ||
|| **HANDLER**
[`string`](../../data-types.md) | Адрес обработчика типа. Битрикс24 загружает этот адрес во фрейме внутри поля ||
|| **TITLE**
[`string`](../../data-types.md) | Название типа в административном интерфейсе настройки пользовательских полей ||
|| **DESCRIPTION**
[`string`](../../data-types.md) | Описание типа в административном интерфейсе настройки пользовательских полей ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "WRONG_AUTH_TYPE",
    "error_description": "Current authorization type is denied for this method Application context required"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `WRONG_AUTH_TYPE` | Current authorization type is denied for this method Application context required | Метод вызван не в контексте приложения, например через вебхук ||
|| `403` | `ACCESS_DENIED` | Access denied! | Метод вызвал пользователь без прав администратора ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./userfieldtype-add.md)
- [{#T}](./userfieldtype-update.md)
- [{#T}](./userfieldtype-delete.md)
