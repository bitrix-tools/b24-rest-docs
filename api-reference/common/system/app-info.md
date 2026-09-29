# Показать информацию о приложении app.info

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`базовый`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `app.info` возвращает информацию о приложении: статус, версию, срок оплаты и тариф Битрикс24, см. также [ответ при вызове через вебхук](#webhook).

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/app.info
    ```

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/app.info
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type AppInfoResult = {
      ID: number
      CODE: string
      VERSION: number
      STATUS: string
      INSTALLED: boolean
      PAYMENT_EXPIRED: string
      DAYS: number | null
      LANGUAGE_ID: string
      LICENSE: string
      LICENSE_PREVIOUS?: string
      LICENSE_TYPE?: string
      LICENSE_FAMILY?: string
    }

    try {
      const response = await $b24.actions.v2.call.make<AppInfoResult>({
        method: 'app.info',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.ID, result.CODE, result.STATUS, result.LICENSE)
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
      async function getAppInfo() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'app.info',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.ID, result.CODE, result.STATUS, result.LICENSE)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getAppInfo)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.app.info().response
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
        $applicationInfoResult = $serviceBuilder->getMainScope()->main()->getApplicationInfo();
        $itemResult = $applicationInfoResult->applicationInfo();
        print("ID: " . $itemResult->ID . PHP_EOL);
        print("Code: " . $itemResult->CODE . PHP_EOL);
        print("Version: " . $itemResult->VERSION . PHP_EOL);
        print("Status: " . $itemResult->getStatus()->getStatusCode() . PHP_EOL);
        print("Installed: " . ($itemResult->INSTALLED ? 'true' : 'false') . PHP_EOL);
        print("Payment Expired: " . $itemResult->PAYMENT_EXPIRED . PHP_EOL);
        print("Days: " . $itemResult->DAYS . PHP_EOL);
        print("License: " . $itemResult->LICENSE . PHP_EOL);
    } catch (Throwable $e) {
        print("Error: " . $e->getMessage() . PHP_EOL);
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "app.info",
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
        'app.info',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "app.info", nil)
    if err != nil {
    	return fmt.Errorf("app.info: %w", err)
    }

    var item struct {
    	ID             b24.ID `json:"ID"`
    	Code           string `json:"CODE"`
    	Version        int    `json:"VERSION"`
    	Status         string `json:"STATUS"`
    	Installed      bool   `json:"INSTALLED"`
    	PaymentExpired string `json:"PAYMENT_EXPIRED"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Code)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "ID": 5,
        "CODE": "telefum24.kp10",
        "VERSION": 4,
        "STATUS": "F",
        "INSTALLED": true,
        "PAYMENT_EXPIRED": "N",
        "DAYS": null,
        "LANGUAGE_ID": "ru",
        "LICENSE": "ru_ent10000",
        "LICENSE_TYPE": "ent10000",
        "LICENSE_FAMILY": "ent"
    },
    "time": {
        "start": 1722841503.0585,
        "finish": 1722841503.09885,
        "duration": 0.0403509140014648,
        "processing": 0.00533103942871094,
        "date_start": "2024-08-05T07:05:03+00:00",
        "date_finish": "2024-08-05T07:05:03+00:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Информация о приложении [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Локальный идентификатор приложения в Битрикс24 ||
|| **CODE**
[`string`](../../data-types.md) | Код приложения ||
|| **VERSION**
[`integer`](../../data-types.md) | Установленная версия приложения ||
|| **STATUS**
[`string`](../../data-types.md) | Статус приложения:

- `L` — локальное приложение
- `F` — бесплатное тиражное приложение
- `S` — подписное тиражное приложение ||
|| **INSTALLED**
[`boolean`](../../data-types.md) | Завершена ли установка приложения. Если `false`, приложение доступно только администраторам Битрикс24 и должно сообщить об окончании установки вызовом [BX24.installFinish](../../../sdk/bx24-js-sdk/system-functions/bx24-install-finish.md). Пока значение `false`, Битрикс24 не доставляет приложению события и не показывает его встройки, даже если [event.bind](../../events/event-bind.md) и [placement.bind](../../widgets/placement-bind.md) отработали успешно ||
|| **PAYMENT_EXPIRED**
[`string`](../../data-types.md) | Истек ли оплаченный период: `Y` или `N` ||
|| **DAYS**
[`integer`](../../data-types.md) | Количество дней до конца подписки или оплаченного периода. После окончания срока — отрицательное число.

`null`, если срок не ограничен, например у бесплатного или локального приложения, а также у подписного приложения, когда подписка в Битрикс24 не подключена ||
|| **LANGUAGE_ID**
[`string`](../../data-types.md) | Язык сайта Битрикс24 по умолчанию, например `ru` ||
|| **LICENSE**
[`string`](../../data-types.md) | Тариф Битрикс24 с префиксом региона, например `ru_std`. Для тарифов, состав которых менялся при сохранении названия, например CRM+, Команда и Компания, по этому полю нельзя понять, какой именно тариф действует. Примеры значений:

- `ru_project` — тариф Проект
- `ru_basic` — тариф Базовый
- `ru_std` — тариф Стандартный
- `ru_pro100` — тариф Профессиональный
- `ru_ent250` — Энтерпрайз 250
- `ru_ent500` — Энтерпрайз 500
- `ru_ent1000` — Энтерпрайз 1000
- `ru_ent2000` — Энтерпрайз 2000
- `ru_ent10000` — Энтерпрайз 10000

В коробочной версии Битрикс24 — строка `<язык>_selfhosted`, например `ru_selfhosted` ||
|| **LICENSE_PREVIOUS**
[`string`](../../data-types.md) | Тариф, который действовал до демо-режима, в формате `LICENSE`. Приходит, только если Битрикс24 сейчас в демо-режиме тарифа ||
|| **LICENSE_TYPE**
[`string`](../../data-types.md) | Идентификатор тарифа без префикса региона, например `ent10000`. Только в облачном Битрикс24 ||
|| **LICENSE_FAMILY**
[`string`](../../data-types.md) | Семейство тарифа, например `ent`. Только в облачном Битрикс24 ||
|#

{% note info "" %}

Когда подписка закончилась или не подключена, поле `PAYMENT_EXPIRED` равно `Y`. Если срок подписки известен, поле `DAYS` содержит отрицательное число — сколько дней прошло после окончания.

{% endnote %}

### Ответ при вызове через вебхук {#webhook}

Через вебхук метод не возвращает данные о приложении, а отдает scope вебхука и тариф Битрикс24:

```json
{
    "result": {
        "SCOPE": [
            "crm",
            "user"
        ],
        "LICENSE": "ru_std"
    },
    "time": {
        "start": 1790665588,
        "finish": 1790665588.741944,
        "duration": 0.7419440746307373,
        "processing": 0,
        "date_start": "2026-09-29T10:06:28+03:00",
        "date_finish": "2026-09-29T10:06:28+03:00",
        "operating_reset_at": 1790666188,
        "operating": 0.11118412017822266
    }
}
```

#|
|| **Название**
`тип` | **Описание** ||
|| **SCOPE**
[`string[]`](../../data-types.md) | Коды scope вебхука, как в методе [scope](./scope.md) ||
|| **LICENSE**
[`string`](../../data-types.md) | Тариф Битрикс24, формат как у поля `LICENSE` выше ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Access denied! Application context required"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `ACCESS_DENIED` | Access denied! Application context required | Запрос авторизован не приложением и не вебхуком, а сессией пользователя ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./method-get.md)
- [{#T}](./scope.md)
- [{#T}](./access-name.md)
- [{#T}](./feature-get.md)
- [{#T}](./server-time.md)