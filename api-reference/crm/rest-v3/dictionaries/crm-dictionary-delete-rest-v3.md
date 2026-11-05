# Удалить значение справочника CRM v 3.0 crm.dictionary.<справочник>.delete

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.dictionary.<справочник>.delete` удаляет значение справочника CRM. Справочник задает сегмент `<справочник>` в имени метода.

## Имя метода для справочника

Метод есть только у [справочников значений CRM](./crm-dictionary-list-rest-v3.md#crm-values).

#|
|| **Справочник** | **Метод** ||
|| Типы сделок | `crm.dictionary.dealtype.delete` ||
|| Типы контактов | `crm.dictionary.contacttype.delete` ||
|| Типы компаний | `crm.dictionary.companytype.delete` ||
|| Обращения | `crm.dictionary.honorific.delete` ||
|| Количество сотрудников | `crm.dictionary.employees.delete` ||
|| Сферы деятельности | `crm.dictionary.industry.delete` ||
|| Источники | `crm.dictionary.source.delete` ||
|#

Имя метода пишется в нижнем регистре: `crm.dictionary.dealtype.delete`, а не `crm.dictionary.dealType.delete`. На имя в другом регистре или со справочником, значения которого менять нельзя, например `crm.dictionary.entitytype.delete`, метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`string`](../../../data-types.md) | Идентификатор значения, например `SUBSCRIPTION`. Идентификаторы возвращает метод [crm.dictionary.<справочник>.list](./crm-dictionary-list-rest-v3.md).

Стандартное значение с `isSystem: true` удалить нельзя ||
|#

{% note warning "" %}

Значение можно удалить, даже если оно указано в элементах CRM. Например, сделки удаленного типа сохранят прежний `typeId`, но метод [crm.<тип>.get](../items/crm-entity-get-rest-v3.md) вернет связанный объект `type` как `null`. Создать новую сделку с удаленным типом методом [crm.<тип>.add](../items/crm-entity-add-rest-v3.md) нельзя: метод ответит ошибкой валидации поля `typeId`.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.dictionary.dealtype.delete`

{% endnote %}

Примеры удаляют тип сделки `SUBSCRIPTION`. Для другого справочника замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"SUBSCRIPTION"}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.dictionary.dealtype.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"SUBSCRIPTION","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.dictionary.dealtype.delete
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type DictionaryDeleteResult = {
      result: boolean
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<DictionaryDeleteResult>(
        'crm.dictionary.dealtype.delete',
        {
          id: 'SUBSCRIPTION',
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Deal type deleted:', result.result)
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
      async function deleteDealType() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.dictionary.dealtype.delete',
            {
              id: 'SUBSCRIPTION',
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Deal type deleted:', result.result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', deleteDealType)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.dictionary.dealtype.delete"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": "SUBSCRIPTION",
            },
            prefer_version=3,
        )
        print(response["result"]["result"])
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
                'crm.dictionary.dealtype.delete',
                [
                    'id' => 'SUBSCRIPTION',
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
        'crm.dictionary.dealtype.delete',
        {
            id: 'SUBSCRIPTION',
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
        'crm.dictionary.dealtype.delete',
        [
            'id' => 'SUBSCRIPTION',
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.dictionary.dealtype.delete", b24.Params{
    	"id": "SUBSCRIPTION",
    })
    if err != nil {
    	return fmt.Errorf("crm.dictionary.dealtype.delete: %w", err)
    }

    var deleted struct {
    	Result bool `json:"result"`
    }
    if err := json.Unmarshal(res.Result, &deleted); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(deleted.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "result": true
    },
    "time": {
        "start": 1793715699,
        "finish": 1793715699.657543,
        "duration": 0.6575429439544678,
        "processing": 0,
        "date_start": "2026-11-03T17:21:39+03:00",
        "date_finish": "2026-11-03T17:21:39+03:00",
        "operating_reset_at": 1793716260,
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
|| **result.result**
[`boolean`](../../../data-types.md) | `true`, если значение удалено. Повторный вызов с этим `id` вернет ошибку [«Значение не найдено»](#not-found) ||
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
|| `id` | Нельзя удалить стандартное значение справочника | Перед удалением проверьте признак `isSystem` методом [crm.dictionary.<справочник>.get](./crm-dictionary-get-rest-v3.md) ||
|#

#### Значение не найдено {#not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Проверьте идентификатор методом [crm.dictionary.<справочник>.list](./crm-dictionary-list-rest-v3.md). Значение могло быть удалено раньше ||
|#

#### Ошибка фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение фильтра `#FILTER#` | Уберите `filter`: метод удаляет одно значение по `id` и фильтр не принимает ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Вызовите метод от имени администратора CRM ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.dictionary.dealtype.delete`. Удалять значения можно только в справочниках из таблицы в начале страницы ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-dictionary-add-rest-v3.md)
- [{#T}](./crm-dictionary-update-rest-v3.md)
- [{#T}](./crm-dictionary-get-rest-v3.md)
- [{#T}](./crm-dictionary-list-rest-v3.md)
