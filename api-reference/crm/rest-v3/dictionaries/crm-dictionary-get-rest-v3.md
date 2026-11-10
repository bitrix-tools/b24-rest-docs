# Получить значение справочника CRM v 3.0 crm.dictionary.<справочник>.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на чтение лидов, сделок или других объектов CRM

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.dictionary.<справочник>.get` возвращает одно значение справочника CRM по идентификатору. Справочник задает сегмент `<справочник>` в имени метода.

## Имя метода для справочника

#|
|| **Справочник** | **Метод** ||
|| Типы сделок | `crm.dictionary.dealtype.get` ||
|| Типы контактов | `crm.dictionary.contacttype.get` ||
|| Типы компаний | `crm.dictionary.companytype.get` ||
|| Обращения | `crm.dictionary.honorific.get` ||
|| Количество сотрудников | `crm.dictionary.employees.get` ||
|| Сферы деятельности | `crm.dictionary.industry.get` ||
|| Источники | `crm.dictionary.source.get` ||
|| Типы телефонов | `crm.dictionary.phonetype.get` ||
|| Типы электронной почты | `crm.dictionary.emailtype.get` ||
|| Типы сайтов | `crm.dictionary.webtype.get` ||
|| Типы мессенджеров | `crm.dictionary.imtype.get` ||
|| Типы адресов | `crm.dictionary.addresstype.get` ||
|| Типы объектов CRM | `crm.dictionary.entitytype.get` ||
|| Группы стадий | `crm.dictionary.stagesemantic.get` ||
|| Провайдеры дел | `crm.dictionary.activityprovider.get` ||
|#

Имя метода пишется в нижнем регистре: `crm.dictionary.dealtype.get`, а не `crm.dictionary.dealType.get`. На имя в другом регистре или с неизвестным справочником метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[```string | integer```](../../../data-types.md) | Идентификатор значения, например `SALE`. У справочников `addresstype` и `entitytype` идентификатор — число, например `6`.

Идентификаторы возвращает метод [crm.dictionary.<справочник>.list](./crm-dictionary-list-rest-v3.md) ||
|| **select**
[`array`](../../../data-types.md) | Список полей, которые нужно вернуть. Состав полей у каждого справочника свой, он описан на странице [crm.dictionary.<справочник>.list](./crm-dictionary-list-rest-v3.md#fields).

Если параметр не передан или передан пустой массив, метод возвращает все поля ||
|#

У [справочников значений CRM](./crm-dictionary-list-rest-v3.md#crm-values), то есть у тех, значения которых можно менять, например `dealtype` или `source`, регистр идентификатора не важен: `sale` найдет `SALE`. У остальных справочников передавайте идентификатор в том же регистре, что в ответе метода [crm.dictionary.<справочник>.list](./crm-dictionary-list-rest-v3.md).

Смарт-процессов в справочнике `entitytype` нет. На идентификатор типа смарт-процесса, например `1038`, метод `crm.dictionary.entitytype.get` отвечает ошибкой [«Значение не найдено»](#not-found). Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md).

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.dictionary.dealtype.get`

{% endnote %}

Примеры получают название типа сделки `SALE` и признак стандартного значения. Для другого справочника замените имя метода по таблице выше, возьмите `id` из ответа метода [crm.dictionary.<справочник>.list](./crm-dictionary-list-rest-v3.md) и проверьте поля в `select` по [описанию полей справочника](./crm-dictionary-list-rest-v3.md#fields).

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"SALE","select":["id","name","isSystem"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.dictionary.dealtype.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"SALE","select":["id","name","isSystem"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.dictionary.dealtype.get
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type DictionaryGetResult = {
      item: {
        id: string
        name: string
        isSystem: boolean
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<DictionaryGetResult>(
        'crm.dictionary.dealtype.get',
        {
          id: 'SALE',
          select: ['id', 'name', 'isSystem'],
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Deal type:', result.item.name)
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
      async function getDealType() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.dictionary.dealtype.get',
            {
              id: 'SALE',
              select: ['id', 'name', 'isSystem'],
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Deal type:', result.item.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getDealType)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.dictionary.dealtype.get"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": "SALE",
                "select": ["id", "name", "isSystem"],
            },
            prefer_version=3,
        )
        item = response["result"]["item"]
        print(item["id"], item["name"], item["isSystem"])
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
                'crm.dictionary.dealtype.get',
                [
                    'id' => 'SALE',
                    'select' => ['id', 'name', 'isSystem'],
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
        'crm.dictionary.dealtype.get',
        {
            id: 'SALE',
            select: ['id', 'name', 'isSystem'],
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
        'crm.dictionary.dealtype.get',
        [
            'id' => 'SALE',
            'select' => ['id', 'name', 'isSystem'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.dictionary.dealtype.get", b24.Params{
    	"id":     "SALE",
    	"select": []string{"id", "name", "isSystem"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.dictionary.dealtype.get: %w", err)
    }

    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID       string `json:"id"`
    	Name     string `json:"name"`
    	IsSystem bool   `json:"isSystem"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Name, item.IsSystem)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": "SALE",
            "name": "Продажа",
            "isSystem": true
        }
    },
    "time": {
        "start": 1793715633,
        "finish": 1793715633.516648,
        "duration": 0.5166480541229248,
        "processing": 0,
        "date_start": "2026-11-03T17:20:33+03:00",
        "date_finish": "2026-11-03T17:20:33+03:00",
        "operating_reset_at": 1793716200,
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
[`object`](../../../data-types.md) | Значение справочника. Состав полей задает параметр `select`. [Описание полей](./crm-dictionary-list-rest-v3.md#fields) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `SUBSCRIPTION` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Передайте `id` ||
|| `id` | Значение поля не может быть пустым | Передайте непустой идентификатор ||
|| `id` | В поле `id` требуется тип данных `supported CRM Item entity type ID` для такого запроса | Ошибка справочника `entitytype`: число не является типом объекта CRM, например `999`. Возьмите идентификатор из ответа [crm.dictionary.entitytype.list](./crm-dictionary-list-rest-v3.md) ||
|#

#### Значение не найдено {#not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Проверьте идентификатор методом [crm.dictionary.<справочник>.list](./crm-dictionary-list-rest-v3.md). Значение может быть в другом справочнике: `CALL` — источник, а не тип сделки ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `#DTO#` | Проверьте имя поля в `select` по [описанию полей справочника](./crm-dictionary-list-rest-v3.md#fields) ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Вызовите метод от имени пользователя с правом на чтение лидов, сделок или других объектов CRM ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.dictionary.dealtype.get`. Имя справочника возьмите из таблицы в начале страницы ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-dictionary-add-rest-v3.md)
- [{#T}](./crm-dictionary-update-rest-v3.md)
- [{#T}](./crm-dictionary-list-rest-v3.md)
- [{#T}](./crm-dictionary-delete-rest-v3.md)
