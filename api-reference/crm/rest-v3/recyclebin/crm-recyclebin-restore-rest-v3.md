# Восстановить элемент из корзины CRM v 3.0 crm.recyclebin.restore

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь, который удалил элемент, или администратор

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.recyclebin.restore` восстанавливает удаленный элемент CRM из корзины по идентификатору записи корзины.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **recordId***
[`integer`](../../../data-types.md) | Идентификатор записи корзины. Не путайте с идентификатором элемента до удаления: это разные числа.

Идентификатор записи можно получить методом [crm.recyclebin.list](./crm-recyclebin-list-rest-v3.md) в поле `recordId` ||
|#

{% note warning "" %}

Восстановленный элемент получает новый идентификатор. Берите его из `result.item.id` ответа, а не из поля `id` записи корзины.

{% endnote %}

{% note info "" %}

Восстановить можно только запись, которую возвращает [crm.recyclebin.list](./crm-recyclebin-list-rest-v3.md) этому пользователю: пользователь, кроме администратора, видит только элементы, которые удалил сам. Записи старше срока хранения — в облачном Битрикс24 30 дней — не восстанавливаются. После восстановления запись удаляется из корзины.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.recyclebin.restore`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"recordId":14533}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.recyclebin.restore
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"recordId":14533,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.recyclebin.restore
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type RecyclebinRestoreResult = {
      item: {
        entityTypeId: number
        id: number
        url: string
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<RecyclebinRestoreResult>(
        'crm.recyclebin.restore',
        {
          recordId: 14533,
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Restored item ID:', result.item.id)
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
      async function restoreItem() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.recyclebin.restore',
            {
              recordId: 14533,
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Restored item ID:', result.item.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', restoreItem)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.recyclebin.restore"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "recordId": 14533,
            },
            prefer_version=3,
        )
        result = response["result"]
        print(result["item"])
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
                'crm.recyclebin.restore',
                [
                    'recordId' => 14533,
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
        'crm.recyclebin.restore',
        {
            recordId: 14533,
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
        'crm.recyclebin.restore',
        [
            'recordId' => 14533,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.recyclebin.restore", b24.Params{
    	"recordId": 14533,
    })
    if err != nil {
    	return fmt.Errorf("crm.recyclebin.restore: %w", err)
    }

    var out struct {
    	Item struct {
    		EntityTypeID int    `json:"entityTypeId"`
    		ID           int    `json:"id"`
    		URL          string `json:"url"`
    	} `json:"item"`
    }
    if err := json.Unmarshal(res.Result, &out); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(out.Item.EntityTypeID, out.Item.ID, out.Item.URL)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "entityTypeId": 2,
            "id": 9205,
            "url": "/crm/deal/details/9205/"
        }
    },
    "time": {
        "start": 1795431190,
        "finish": 1795431191.112406,
        "duration": 1.1124060153961182,
        "processing": 1,
        "date_start": "2026-11-23T13:53:10+03:00",
        "date_finish": "2026-11-23T13:53:11+03:00",
        "operating_reset_at": 1795431780,
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
[`object`](../../../data-types.md) | Восстановленный элемент. [Описание объекта](#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId**
[`integer`](../../../data-types.md) | Идентификатор типа объекта: `1` — лид, `2` — сделка, `3` — контакт, `4` — компания или идентификатор типа смарт-процесса ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор восстановленного элемента. Отличается от идентификатора элемента до удаления. Элемент можно получить методом [crm.<тип>.get](../items/crm-entity-get-rest-v3.md) ||
|| **url**
[`string`](../../../data-types.md) | Относительный адрес карточки элемента, например `/crm/deal/details/9205/`. У смарт-процесса в адресе есть параметр воронки `categoryId` ||
|#

{% note info "" %}

История изменений и история стадий, записанные до удаления, остаются у прежнего идентификатора и через методы [crm.<тип>.history.list](../history/crm-entity-history-list-rest-v3.md) и [crm.<тип>.stagehistory.list](../history/crm-entity-stage-history-list-rest-v3.md) не возвращаются. История стадий восстановленного элемента начинается с текущей стадии.

{% endnote %}

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "Recycle bin item is unavailable.",
                "field": "RECYCLEBIN_ITEM_UNAVAILABLE"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `recordId` | Обязательное поле `recordId` не указано | Передайте `recordId` ||
|| `recordId` | В поле `recordId` требуется тип данных `int` для такого запроса | Передайте идентификатор записи числом ||
|| `recordId` | Значение поля должно быть не меньше, чем 1 | Передайте положительный идентификатор записи ||
|#

#### Ошибки восстановления

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`. Код причины приходит в `validation.field`.

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `RECYCLEBIN_ITEM_UNAVAILABLE` | Recycle bin item is unavailable. | Записи нет в корзине, она уже восстановлена, старше срока хранения, ее удалил другой пользователь, у типа объекта выключена корзина или корзина недоступна на тарифе. Получите доступные записи методом [crm.recyclebin.list](./crm-recyclebin-list-rest-v3.md) ||
|| `RECYCLEBIN_RESTORE_FAILED` | Could not restore recycle bin item. | Восстановление завершилось ошибкой. Часть данных элемента могла восстановиться: проверьте корзину методом [crm.recyclebin.list](./crm-recyclebin-list-rest-v3.md) и элемент по названию методом [crm.<тип>.list](../items/crm-entity-list-rest-v3.md), прежде чем повторять вызов ||
|| `RECYCLEBIN_INVALID_RESTORE_RESULT` | Core restore did not return an item ID. | Корзина не вернула идентификатор восстановленного элемента. Найдите элемент по названию методом [crm.<тип>.list](../items/crm-entity-list-rest-v3.md) ||
|| `RECYCLEBIN_INVALID_RESTORE_RESULT` | The restored item is unavailable. | Восстановленный элемент недоступен. Найдите элемент по названию методом [crm.<тип>.list](../items/crm-entity-list-rest-v3.md) ||
|| `RECYCLEBIN_RESTORE_URL_UNAVAILABLE` | The restored item URL is unavailable. | Элемент восстановлен, но адрес карточки не получен. Найдите элемент по названию методом [crm.<тип>.list](../items/crm-entity-list-rest-v3.md) ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Методы корзины CRM в REST 3.0 недоступны на этом Битрикс24 или вызов выполнен без авторизованного пользователя ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-recyclebin-list-rest-v3.md)
- [{#T}](../items/crm-entity-get-rest-v3.md)
- [{#T}](../items/crm-entity-delete-rest-v3.md)
