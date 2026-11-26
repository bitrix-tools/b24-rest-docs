# Обновить существующую кассу sale.cashbox.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`cashbox`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM (право «Разрешить изменять настройки»)

Метод `sale.cashbox.update` обновляет кассу.

{% note info "" %}

Метод работает только с кассами, подключенными через REST-обработчик. Для остальных касс метод возвращает ошибку `ACCESS_DENIED`.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`sale_cashbox.ID`](../data-types.md#sale_cashbox) | Идентификатор кассы.

Получить идентификатор можно методом [sale.cashbox.list](./sale-cashbox-list.md) ||
|| **FIELDS***
[`object`](../../data-types.md) | Поля кассы, которые нужно изменить. Передавайте только изменяемые поля, неизвестные ключи игнорируются [(подробное описание)](#fields) ||
|#

### Параметр FIELDS {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME**
[`string`](../../data-types.md) | Название кассы. Пустое значение вызывает ошибку ||
|| **EMAIL**
[`string`](../../data-types.md) | Email для уведомлений об ошибках печати чеков. Пустое значение вызывает ошибку ||
|| **OFD**
[`string`](../../data-types.md) | Код оператора фискальных данных. Возможные значения:
- `bx_firstofd` — Первый ОФД
- `bx_platformaofd` — Платформа ОФД
- `bx_yarusofd` — ОФД ЯРУС
- `bx_taxcomofd` — Такском ОФД
- `bx_ofdruofd` — OFD.RU
- `bx_tenzorofd` — Тензор ОФД
- `bx_conturofd` — Контур ОФД

Пустая строка отключает ОФД. Другой код вызывает ошибку `Ofd handler not found` ||
|| **OFD_SETTINGS**
[`object`](../../data-types.md) | Настройки ОФД [(подробное описание)](#ofd_settings). Переданный объект заменяет прежние настройки ОФД целиком ||
|| **NUMBER_KKM**
[`string`](../../data-types.md) | Внешний идентификатор кассы ||
|| **KKM_ID**
[`string`](../../data-types.md) | Код модели ККМ ||
|| **ACTIVE**
[`string`](../../data-types.md) | Активность кассы. Возможные значения:
- `Y` — активна
- `N` — неактивна ||
|| **ENABLED**
[`string`](../../data-types.md) | Доступна ли касса для работы. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **SORT**
[`integer`](../../data-types.md) | Сортировка. Нечисловое значение сохраняется как `0` ||
|| **USE_OFFLINE**
[`string`](../../data-types.md) | Используется ли касса офлайн. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **SETTINGS**
[`object`](../../data-types.md) | Значения настроек кассы в формате `{"код раздела": {"код настройки": "значение"}}` по структуре `SETTINGS.CONFIG` обработчика.

Переданные значения объединяются с сохраненными: непереданные настройки не меняются ||
|#

### Параметр OFD_SETTINGS {#ofd_settings}

#|
|| **Название**
`тип` | **Описание** ||
|| **OFD_MODE**
[`object`](../../data-types.md) | Режим работы ОФД, для всех ОФД. Содержит ключ `IS_TEST` со значениями:
- `Y` — тестовый режим
- `N` — рабочий режим ||
|| **SELLER**
[`object`](../../data-types.md) | Информация о продавце, только для `bx_ofdruofd`. Содержит ключ `INN` — ИНН продавца, обязателен для OFD.RU ||
|| **AUTH**
[`object`](../../data-types.md) | Авторизация, только для `bx_yarusofd`. Содержит ключ `INN` — ключ безопасности ||
|#

Пример: `{"OFD_MODE": {"IS_TEST": "N"}, "SELLER": {"INN": "7700000000"}}`.

Метод сохраняет `OFD_SETTINGS` без проверки: ключи и обязательные значения не сверяются с выбранным ОФД

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":1,"FIELDS":{"NAME":"Новое имя"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.cashbox.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":1,"FIELDS":{"NAME":"Новое имя"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.cashbox.update
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
        method: 'sale.cashbox.update',
        params: {
          ID: 1,
          FIELDS: {
            NAME: 'New name',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Cashbox updated:', result)
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
      async function updateCashbox() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.cashbox.update',
            params: {
              ID: 1,
              FIELDS: {
                NAME: 'New name',
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
          console.info('Cashbox updated:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateCashbox)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    fields = {
        "NAME": "Новое имя",
    }

    try:
        bitrix_response = client.sale.cashbox.update(
            bitrix_id=1,
            fields=fields,
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
                'sale.cashbox.update',
                [
                    'ID'     => 1,
                    'FIELDS' => [
                        'NAME' => 'Новое имя',
                    ],
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

    ```js
    BX24.callMethod(
        "sale.cashbox.update",
        {
            "ID": 1,
            "FIELDS": {
                "NAME": "Новое имя",
            }
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
        'sale.cashbox.update',
        [
            'ID' => 1,
            'FIELDS' =>
            [
                'NAME' => 'Новое имя',
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
    res, err := client.Core().Call(ctx, "sale.cashbox.update", b24.Params{
    	"ID": 1,
    	"FIELDS": b24.Params{
    		"NAME": "Новое имя",
    	},
    })
    if err != nil {
    	return fmt.Errorf("sale.cashbox.update: %w", err)
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
        "start": 1712135335.026931,
        "finish": 1712135335.407762,
        "duration": 0.3808310031890869,
        "processing": 0.0336611270904541,
        "date_start": "2024-04-03T11:08:55+02:00",
        "date_finish": "2024-04-03T11:08:55+02:00",
        "operating_reset_at": 1705765533,
        "operating": 3.3076241016387939
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | `true`, если касса обновлена ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_CASHBOX_NOT_FOUND",
    "error_description": "Cashbox not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_CHECK_FAILURE` | Parameter ID is not defined | Не передан параметр `ID` ||
|| `400` | `ERROR_CHECK_FAILURE` | Parameter FIELDS is not defined | Не передан параметр `FIELDS` или передан пустой объект ||
|| `400` | `ERROR_CHECK_FAILURE` | Parameter EMAIL cannot be empty | В `EMAIL` передана пустая строка ||
|| `400` | `ERROR_CHECK_FAILURE` | Ofd handler not found | В `OFD` передан неизвестный код ОФД ||
|| `400` | `ERROR_CHECK_FAILURE` | Parameter SETTINGS must be an array | `SETTINGS` передан не объектом ||
|| `400` | `ERROR_CASHBOX_NOT_FOUND` | Cashbox not found | Касса с указанным `ID` не найдена ||
|| `400` | `ERROR_CASHBOX_UPDATE` | Не заполнено обязательное поле "Название" | В `NAME` передана пустая строка. Код возвращается и при других ошибках сохранения, текст — в `error_description` ||
|| `403` | `ACCESS_DENIED` | Access denied! | У пользователя нет прав администратора CRM, касса работает не через REST-обработчик или обработчик создан другим приложением ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-cashbox-handler-add.md)
- [{#T}](./sale-cashbox-handler-update.md)
- [{#T}](./sale-cashbox-handler-list.md)
- [{#T}](./sale-cashbox-handler-delete.md)
- [{#T}](./sale-cashbox-add.md)
- [{#T}](./sale-cashbox-list.md)
- [{#T}](./sale-cashbox-delete.md)
- [{#T}](./sale-cashbox-check-apply.md)
