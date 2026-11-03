# Получить воронку CRM по идентификатору v 3.0 crm.<тип>.category.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом читать элементы этой воронки

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.category.get` возвращает поля одной воронки по ее идентификатору. Тип объекта задает сегмент `<тип>` в имени метода.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Сделка | `crm.deal.category.get` ||
|| Контакт | `crm.contact.category.get` ||
|| Компания | `crm.company.category.get` ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.category.get`, например `crm.smartprocess1038.category.get` ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`.

Воронки есть у сделки, контакта, компании и у смарт-процесса, если в настройках его типа включены воронки. У лида, предложения, счета и моей компании их нет.

Имя метода пишется в нижнем регистре: `crm.smartprocess1038.category.get`, а не `crm.smartProcess1038.category.get`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор воронки. У воронки по умолчанию сделки, контакта и компании — `0`.

Его возвращает метод [crm.<тип>.category.add](./crm-entity-category-add-rest-v3.md) при создании воронки. Идентификаторы существующих воронок можно получить методом [crm.<тип>.category.list](./crm-entity-category-list-rest-v3.md) ||
|#

{% note warning "" %}

Параметра `select` у метода нет. Если передать `select`, метод не ответит ошибкой и вернет все поля воронки.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.category.get`

{% endnote %}

Примеры получают воронку `105` смарт-процесса с идентификатором типа `1038`. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":105}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.category.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":105,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.category.get
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CategoryGetResult = {
      item: {
        id: number
        name: string
        sort: number
        isDefault: boolean
        isSystem?: boolean
        code?: string
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<CategoryGetResult>(
        'crm.smartprocess1038.category.get',
        {
          id: 105,
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const category = response.getData()!.result.item
        console.info(category.name, category.isDefault)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(B24Js.ApiVersion.v3).call`.

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getCategory() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.category.get',
            {
              id: 105,
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const category = response.getData().result.item
          console.info(category.name, category.isDefault)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getCategory)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.category.get"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 105,
            },
            prefer_version=3,
        )
        result = response["result"]
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"code: {error.code}",
            f"message: {error.error.message}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.smartprocess1038.category.get',
                [
                    'id' => 105,
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

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'crm.smartprocess1038.category.get',
        {
            id: 105,
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

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.smartprocess1038.category.get',
        [
            'id' => 105,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.category.get", b24.Params{
    	"id": 105,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.category.get: %w", err)
    }

    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет item")
    }

    var category struct {
    	ID        int    `json:"id"`
    	Name      string `json:"name"`
    	Sort      int    `json:"sort"`
    	IsDefault bool   `json:"isDefault"`
    }
    if err := json.Unmarshal(raw, &category); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(category.Name, category.IsDefault)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 105,
            "name": "Закупки оборудования и мебели",
            "sort": 650,
            "isDefault": false,
            "isSystem": false,
            "code": ""
        }
    },
    "time": {
        "start": 1793714730,
        "finish": 1793714730.530146,
        "duration": 0.5301458835601807,
        "processing": 0,
        "date_start": "2026-11-03T17:05:30+03:00",
        "date_finish": "2026-11-03T17:05:30+03:00",
        "operating_reset_at": 1793715300,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **result.item**
[`object`](../../../data-types.md) | Поля воронки. [Описание полей](#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Поля воронки {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор воронки ||
|| **name**
[`string`](../../../data-types.md) | Название воронки ||
|| **sort**
[`integer`](../../../data-types.md) | Порядок воронки: метод [crm.<тип>.category.list](./crm-entity-category-list-rest-v3.md) возвращает воронки по возрастанию `sort` ||
|| **isDefault**
[`boolean`](../../../data-types.md) | Признак воронки по умолчанию.

Возможные значения:

- `true` — воронка по умолчанию
- `false` — обычная воронка ||
|| **isSystem**
[`boolean`](../../../data-types.md) | Признак системной воронки, например воронки поставщиков. Поля нет у сделки.

Возможные значения:

- `true` — системная воронка
- `false` — обычная воронка ||
|| **code**
[`string`](../../../data-types.md) | Символьный код системной воронки, например `CATALOG_CONTRACTOR_CONTACT`. У остальных воронок — пустая строка. Поля нет у сделки ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `99999` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Воронка не найдена

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Проверьте идентификатор воронки методом [crm.<тип>.category.list](./crm-entity-category-list-rest-v3.md). Воронки с таким `id` нет у этого типа объекта или у пользователя нет права читать ее элементы ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Передайте `id` воронки ||
|| `id` | Значение поля должно быть не меньше, чем 0 | Передайте неотрицательный идентификатор воронки ||
|| `id` | В поле `id` требуется тип данных `int` для такого запроса | Передайте `id` числом ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.smartprocess1038.category.get`. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) и включены ли в типе воронки ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-category-add-rest-v3.md)
- [{#T}](./crm-entity-category-update-rest-v3.md)
- [{#T}](./crm-entity-category-list-rest-v3.md)
- [{#T}](./crm-entity-category-delete-rest-v3.md)
- [{#T}](./crm-entity-category-stage-list-rest-v3.md)
