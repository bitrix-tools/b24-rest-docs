# Добавить кассу sale.cashbox.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`cashbox`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM (право «Разрешить изменять настройки»)

Метод `sale.cashbox.add` добавляет кассу, которая работает через REST-обработчик.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME***
[`string`](../../data-types.md) | Название кассы ||
|| **REST_CODE***
[`sale_cashbox_handler.CODE`](../data-types.md#sale_cashbox_handler) | Код REST-обработчика кассы — параметр `CODE` метода [sale.cashbox.handler.add](./sale-cashbox-handler-add.md).

Получить коды обработчиков можно методом [sale.cashbox.handler.list](./sale-cashbox-handler-list.md) ||
|| **EMAIL***
[`string`](../../data-types.md) | Email для уведомлений об ошибках печати чеков. Формат адреса не проверяется ||
|| **OFD**
[`string`](../../data-types.md) | Код оператора фискальных данных. Возможные значения:
- `bx_firstofd` — Первый ОФД
- `bx_platformaofd` — Платформа ОФД
- `bx_yarusofd` — ОФД ЯРУС
- `bx_taxcomofd` — Такском ОФД
- `bx_ofdruofd` — OFD.RU
- `bx_tenzorofd` — Тензор ОФД
- `bx_conturofd` — Контур ОФД

Другой код вызывает ошибку `Ofd handler not found`. По умолчанию касса работает без ОФД ||
|| **OFD_SETTINGS**
[`object`](../../data-types.md) | Настройки ОФД [(подробное описание)](#ofd_settings).

По умолчанию — пустой объект ||
|| **NUMBER_KKM**
[`string`](../../data-types.md) | Внешний идентификатор кассы. Передается в обработчик в ключе `number_kkm` запроса на `PRINT_URL`.

По умолчанию — пустая строка ||
|| **KKM_ID**
[`string`](../../data-types.md) | Код модели ККМ, например `atol`.

По умолчанию — пустая строка ||
|| **ACTIVE**
[`string`](../../data-types.md) | Активность кассы. Возможные значения:
- `Y` — активна
- `N` — неактивна

Любое значение, кроме `Y`, сохраняется как `N`. Значение по умолчанию — `N` ||
|| **SORT**
[`integer`](../../data-types.md) | Сортировка. Нечисловое значение заменяется на `100`.

Значение по умолчанию — `100` ||
|| **USE_OFFLINE**
[`string`](../../data-types.md) | Используется ли касса офлайн. Возможные значения:
- `Y` — да
- `N` — нет

Любое значение, кроме `Y`, сохраняется как `N`. Значение по умолчанию — `N` ||
|| **SETTINGS**
[`object`](../../data-types.md) | Значения настроек кассы по структуре `SETTINGS.CONFIG` обработчика в формате `{"код раздела": {"код настройки": "значение"}}`, например `{"AUTH": {"LOGIN": "user", "PASSWORD": "secret"}}`.

Получить структуру можно методом [sale.cashbox.handler.list](./sale-cashbox-handler-list.md). Метод не проверяет заполнение обязательных настроек.

По умолчанию — пустой объект ||
|#

{% note info "" %}

Новая касса доступна для работы, поле `ENABLED` равно `Y`.

{% endnote %}

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
    -d '{"NAME":"Rest-касса","REST_CODE":"restcashbox01","EMAIL":"user@example.com","NUMBER_KKM":"123","ACTIVE":"Y","SORT":100,"OFD":"bx_firstofd","OFD_SETTINGS":{"OFD_MODE":{"IS_TEST":"N"}},"SETTINGS":{"AUTH":{"KEYWORD":"top_secret!","PREFERENCE":"SECOND"},"INTERACTION":{"MODE":"ACTIVE"}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.cashbox.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"NAME":"Rest-касса","REST_CODE":"restcashbox01","EMAIL":"user@example.com","NUMBER_KKM":"123","ACTIVE":"Y","SORT":100,"OFD":"bx_firstofd","OFD_SETTINGS":{"OFD_MODE":{"IS_TEST":"N"}},"SETTINGS":{"AUTH":{"KEYWORD":"top_secret!","PREFERENCE":"SECOND"},"INTERACTION":{"MODE":"ACTIVE"}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.cashbox.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'sale.cashbox.add',
        params: {
          NAME: 'Rest-cashbox',
          REST_CODE: 'restcashbox01',
          EMAIL: 'user@example.com',
          NUMBER_KKM: '123',
          ACTIVE: 'Y',
          SORT: 100,
          OFD: 'bx_firstofd',
          OFD_SETTINGS: {
            OFD_MODE: {
              IS_TEST: 'N',
            },
          },
          SETTINGS: {
            AUTH: {
              KEYWORD: 'top_secret!',
              PREFERENCE: 'SECOND',
            },
            INTERACTION: {
              MODE: 'ACTIVE',
            },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Added cashbox ID:', result)
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
      async function addCashbox() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.cashbox.add',
            params: {
              NAME: 'Rest-cashbox',
              REST_CODE: 'restcashbox01',
              EMAIL: 'user@example.com',
              NUMBER_KKM: '123',
              ACTIVE: 'Y',
              SORT: 100,
              OFD: 'bx_firstofd',
              OFD_SETTINGS: {
                OFD_MODE: {
                  IS_TEST: 'N',
                },
              },
              SETTINGS: {
                AUTH: {
                  KEYWORD: 'top_secret!',
                  PREFERENCE: 'SECOND',
                },
                INTERACTION: {
                  MODE: 'ACTIVE',
                },
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
          console.info('Added cashbox ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addCashbox)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    settings = {
        "AUTH": {
            "KEYWORD": "top_secret!",
            "PREFERENCE": "SECOND",
        },
        "INTERACTION": {
            "MODE": "ACTIVE",
        },
    }

    try:
        bitrix_response = client.sale.cashbox.add(
            name="Rest-касса",
            rest_code="restcashbox01",
            email="user@example.com",
            number_kkm="123",
            active=True,
            sort=100,
            ofd="bx_firstofd",
            ofd_settings={
                "OFD_MODE": {
                    "IS_TEST": "N",
                },
            },
            settings=settings,
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
                'sale.cashbox.add',
                [
                    'NAME'       => 'Rest-касса',
                    'REST_CODE'  => 'restcashbox01',
                    'EMAIL'      => 'user@example.com',
                    'NUMBER_KKM' => '123',
                    'ACTIVE'     => 'Y',
                    'SORT'       => 100,
                    'OFD'        => 'bx_firstofd',
                    'OFD_SETTINGS' => [
                        'OFD_MODE' => [
                            'IS_TEST' => 'N'
                        ]
                    ],
                    'SETTINGS' => [
                        'AUTH' => [
                            'KEYWORD'    => 'top_secret!',
                            'PREFERENCE' => 'SECOND'
                        ],
                        'INTERACTION' => [
                            'MODE' => 'ACTIVE'
                        ]
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding cashbox: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.cashbox.add",
        {
            "NAME": 'Rest-касса',
            "REST_CODE": 'restcashbox01',
            "EMAIL": "user@example.com",
            "NUMBER_KKM": "123",
            "ACTIVE": "Y",
            "SORT": 100,
            "OFD": "bx_firstofd",
            "OFD_SETTINGS":
            {
                "OFD_MODE":
                {
                    "IS_TEST": "N"
                }
            },
            "SETTINGS":
            {
                "AUTH":
                {
                    "KEYWORD": "top_secret!",
                    "PREFERENCE": "SECOND"
                },
                "INTERACTION":
                {
                    "MODE": "ACTIVE"
                }
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
        'sale.cashbox.add',
        [
            'NAME' => 'Rest-касса',
            'REST_CODE' => 'restcashbox01',
            'EMAIL' => 'user@example.com',
            'NUMBER_KKM' => '123',
            'ACTIVE' => 'Y',
            'SORT' => 100,
            'OFD' => 'bx_firstofd',
            'OFD_SETTINGS' =>
            [
                'OFD_MODE' =>
                [
                    'IS_TEST' => 'N'
                ]
            ],
            'SETTINGS' =>
            [
                'AUTH' =>
                [
                    'KEYWORD' => 'top_secret!',
                    'PREFERENCE' => 'SECOND'
                ],
                'INTERACTION' =>
                [
                    'MODE' => 'ACTIVE'
                ]
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
    res, err := client.Core().Call(ctx, "sale.cashbox.add", b24.Params{
    	"NAME":       "Rest-касса",
    	"REST_CODE":  "restcashbox01",
    	"EMAIL":      "user@example.com",
    	"NUMBER_KKM": "123",
    	"ACTIVE":     "Y",
    	"SORT":       100,
    	"OFD":        "bx_firstofd",
    	"OFD_SETTINGS": b24.Params{
    		"OFD_MODE": b24.Params{
    			"IS_TEST": "N",
    		},
    	},
    	"SETTINGS": b24.Params{
    		"AUTH": b24.Params{
    			"KEYWORD":    "top_secret!",
    			"PREFERENCE": "SECOND",
    		},
    		"INTERACTION": b24.Params{
    			"MODE": "ACTIVE",
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("sale.cashbox.add: %w", err)
    }

    var newID b24.ID
    if err := json.Unmarshal(res.Result, &newID); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("идентификатор:", newID)
    ```

{% endlist %}

{% note tip "Частые кейсы и сценарии" %}

- [{#T}](../../../tutorials/sale/cashbox-add-example.md)

{% endnote %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 5,
    "time": {
        "start": 1712132792.910734,
        "finish": 1712132793.530359,
        "duration": 0.6196250915527344,
        "processing": 0.032338857650756836,
        "date_start": "2024-04-03T10:26:32+02:00",
        "date_finish": "2024-04-03T10:26:33+02:00",
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
[`sale_cashbox.ID`](../data-types.md#sale_cashbox) | Идентификатор добавленной кассы ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_CHECK_FAILURE",
    "error_description": "Parameter NAME is not defined"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_CHECK_FAILURE` | Parameter NAME is not defined | Не передан параметр `NAME` ||
|| `400` | `ERROR_CHECK_FAILURE` | Parameter REST_CODE is not defined | Не передан параметр `REST_CODE` ||
|| `400` | `ERROR_CHECK_FAILURE` | Rest handler with code nosuch not found | Обработчик с кодом из `REST_CODE` не найден ||
|| `400` | `ERROR_CHECK_FAILURE` | Parameter EMAIL is not defined | Не передан параметр `EMAIL` ||
|| `400` | `ERROR_CHECK_FAILURE` | Ofd handler not found | В `OFD` передан неизвестный код ОФД ||
|| `400` | `ERROR_CASHBOX_ADD` | Текст ошибки сохранения | Не удалось сохранить кассу, текст ошибки — в `error_description` ||
|| `403` | `ACCESS_DENIED` | Access denied! | У пользователя нет прав администратора CRM или обработчик создан другим приложением ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-cashbox-handler-add.md)
- [{#T}](./sale-cashbox-handler-update.md)
- [{#T}](./sale-cashbox-handler-list.md)
- [{#T}](./sale-cashbox-handler-delete.md)
- [{#T}](./sale-cashbox-update.md)
- [{#T}](./sale-cashbox-list.md)
- [{#T}](./sale-cashbox-delete.md)
- [{#T}](./sale-cashbox-check-apply.md)
- [{#T}](../../../tutorials/sale/cashbox-add-example.md)
