# Удалить тип смарт-процесса v 3.0 crm.smartprocess.delete

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM или пользователь с правом управлять этим смарт-процессом в настройках прав CRM

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.smartprocess.delete` удаляет тип смарт-процесса по его идентификатору `entityTypeId`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId***
[`integer`](../../../data-types.md) | Идентификатор типа смарт-процесса, например `1038`. Значение больше `0`.

Идентификаторы типов возвращает метод [crm.smartprocess.list](./crm-smart-process-list-rest-v3.md) ||
|#

Кроме `entityTypeId` метод не принимает других параметров: на любой лишний параметр он отвечает [ошибкой валидации](#request-validation).

Тип удаляется, только если в нем нет элементов. Элементы удаляет метод [`crm.smartprocess<entityTypeId>.delete`](../items/crm-entity-delete-rest-v3.md), например `crm.smartprocess1038.delete`, или метод прошлой версии [crm.item.delete](../../universal/crm-item-delete.md). Элементы в корзине удаление типа не блокируют.

Связи `relations` с другими типами, привязки `linkedUserFields` и размещение в цифровых рабочих местах удалению не мешают: Битрикс24 убирает их вместе с типом. Если тип подключен к связи CRM или служит источником объектов связи, метод вернет [ошибку](#request-validation) `TYPE_USED_IN_BINDING`: сначала отключите тип от связи в настройках CRM.

Имя метода пишется в нижнем регистре: `crm.smartprocess.delete`. На имя `crm.smartProcess.delete` метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess.delete`

{% endnote %}

Примеры удаляют тип смарт-процесса с `entityTypeId = 1038`. Подставьте идентификатор своего типа из ответа метода [crm.smartprocess.list](./crm-smart-process-list-rest-v3.md).

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":1038}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":1038,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess.delete
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type SmartProcessDeleteResult = {
      result: boolean
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<SmartProcessDeleteResult>(
        'crm.smartprocess.delete',
        {
          entityTypeId: 1038,
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        console.info('Deleted:', response.getData()!.result.result)
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
      async function deleteSmartProcessType() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess.delete',
            {
              entityTypeId: 1038,
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          console.info('Deleted:', response.getData().result.result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', deleteSmartProcessType)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess.delete"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "entityTypeId": 1038,
            },
            prefer_version=3,
        )
        print("Deleted:", response["result"]["result"])
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
                'crm.smartprocess.delete',
                [
                    'entityTypeId' => 1038,
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
        'crm.smartprocess.delete',
        {
            entityTypeId: 1038,
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
        'crm.smartprocess.delete',
        [
            'entityTypeId' => 1038,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.smartprocess.delete", b24.Params{
    	"entityTypeId": 1038,
    })
    if err != nil {
    	return fmt.Errorf("crm.smartprocess.delete: %w", err)
    }

    var deleted struct {
    	Result bool `json:"result"`
    }
    if err := json.Unmarshal(res.Result, &deleted); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("Deleted:", deleted.Result)
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
        "start": 1795772819,
        "finish": 1795772819.819501,
        "duration": 0.8195009231567383,
        "processing": 0,
        "date_start": "2026-11-27T12:46:59+03:00",
        "date_finish": "2026-11-27T12:46:59+03:00",
        "operating_reset_at": 1795772820,
        "operating": 1.2481939792633057
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
[`boolean`](../../../data-types.md) | `true`, если тип удален ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "Smart process type contains items. Delete the items before deleting the type.",
                "field": "TYPE_HAS_ITEMS"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Тип не найден {#not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `0` не найдена | Типа с таким `entityTypeId` нет, он уже удален, это системный тип, например `2` для сделки или `31` для счета, или у пользователя нет права управлять этим смарт-процессом. Проверьте идентификатор методом [crm.smartprocess.list](./crm-smart-process-list-rest-v3.md). В тексте ошибки всегда `0`, а не переданный идентификатор ||
|#

#### Ошибки валидации запроса {#request-validation}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `entityTypeId` | Обязательное поле `entityTypeId` не указано | Передайте `entityTypeId` ||
|| `entityTypeId` | Значение поля должно быть не меньше, чем 1 | Передайте положительный идентификатор типа ||
|| `entityTypeId` | В поле `entityTypeId` требуется тип данных `int` для такого запроса | Передайте идентификатор целым числом, например `1038`, а не строкой ||
|| Имя лишнего параметра, например `foo` | Delete accepts only entityTypeId. | Оставьте в запросе только `entityTypeId` ||
|| `TYPE_HAS_ITEMS` | Smart process type contains items. Delete the items before deleting the type. | Удалите элементы типа методом [`crm.smartprocess<entityTypeId>.delete`](../items/crm-entity-delete-rest-v3.md) и повторите запрос ||
|| `TYPE_USED_IN_BINDING` | Smart process type is used in bindings. Remove the bindings before deleting it. | Тип подключен к связи CRM или служит источником объектов связи. Отключите тип от всех связей в настройках CRM и повторите запрос ||
|| `RESTRICTION` | Your plan does not allow deleting smart process types. | Тариф Битрикс24 не разрешает менять настройки этого смарт-процесса ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `crm.smartProcess.delete` не найден | Напишите имя метода в нижнем регистре: `crm.smartprocess.delete` ||
|#

#### Внутренняя ошибка

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INTERNAL_INTERNALEXCEPTION`, HTTP-статус **500**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Что-то пошло не так | Битрикс24 не завершил удаление типа. Проверьте методом [crm.smartprocess.get](./crm-smart-process-get-rest-v3.md), остался ли тип, и повторите запрос ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-smart-process-add-rest-v3.md)
- [{#T}](./crm-smart-process-update-rest-v3.md)
- [{#T}](./crm-smart-process-list-rest-v3.md)
- [{#T}](../items/crm-entity-delete-rest-v3.md)
