# Зарегистрировать место встраивания landing.repo.bind

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Просмотр в разделе Сайты

Метод `landing.repo.bind` регистрирует место встраивания текущего приложения в разделе Сайты.

{% note info "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md).

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields**^*^
[`object`](../../data-types.md) | Параметры места встраивания [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **PLACEMENT**^*^
[`string`](../../data-types.md) | Код места встраивания.

Код зависит от места, где должен появиться пункт приложения:
- `LANDING_SETTINGS` — пункт в меню настроек сайта или страницы
- `LANDING_BLOCK_<CODE>` — пункт редактирования блоков с указанным символьным кодом
- `LANDING_BLOCK_*` — пункт редактирования для всех блоков

Метод удаляет пробелы по краям значения и приводит код к верхнему регистру ||
|| **PLACEMENT_HANDLER**^*^
[`string`](../../data-types.md) | Полный HTTP- или HTTPS-адрес обработчика места встраивания.

Адрес должен содержать протокол и доменное имя ||
|| **TITLE**
[`string`](../../data-types.md) | Название пункта приложения в интерфейсе.

По умолчанию — пустая строка ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример регистрирует пункт приложения в меню настроек сайта или страницы.

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "fields": {
          "PLACEMENT": "LANDING_SETTINGS",
          "PLACEMENT_HANDLER": "https://your-domain.com/widgets/landing-settings-handler.php",
          "TITLE": "Мои настройки"
        },
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/landing.repo.bind
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'landing.repo.bind',
        params: {
          fields: {
            PLACEMENT: 'LANDING_SETTINGS',
            PLACEMENT_HANDLER: 'https://your-domain.com/widgets/landing-settings-handler.php',
            TITLE: 'Мои настройки',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        console.info(response.getData()!.result)
      }
    } catch (error) {
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function bindLandingPlacement() {
        try {
          const $b24 = await B24Js.initializeB24Frame()
          const response = await $b24.actions.v2.call.make({
            method: 'landing.repo.bind',
            params: {
              fields: {
                PLACEMENT: 'LANDING_SETTINGS',
                PLACEMENT_HANDLER: 'https://your-domain.com/widgets/landing-settings-handler.php',
                TITLE: 'Мои настройки',
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          console.info(response.getData().result)
        } catch (error) {
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', bindLandingPlacement)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    fields = {
        "PLACEMENT": "LANDING_SETTINGS",
        "PLACEMENT_HANDLER": "https://your-domain.com/widgets/landing-settings-handler.php",
        "TITLE": "Мои настройки",
    }

    try:
        bitrix_response = client.landing.repo.bind(fields=fields).response
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
                'landing.repo.bind',
                [
                    'fields' => [
                        'PLACEMENT' => 'LANDING_SETTINGS',
                        'PLACEMENT_HANDLER' => 'https://your-domain.com/widgets/landing-settings-handler.php',
                        'TITLE' => 'Мои настройки',
                    ],
                ]
            );

        $result = $response->getResponseData()->getResult();
        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error binding landing placement: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.repo.bind',
        {
            fields: {
                PLACEMENT: 'LANDING_SETTINGS',
                PLACEMENT_HANDLER: 'https://your-domain.com/widgets/landing-settings-handler.php',
                TITLE: 'Мои настройки'
            }
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'landing.repo.bind',
        [
            'fields' => [
                'PLACEMENT' => 'LANDING_SETTINGS',
                'PLACEMENT_HANDLER' => 'https://your-domain.com/widgets/landing-settings-handler.php',
                'TITLE' => 'Мои настройки',
            ],
        ]
    );

    if (isset($result['error']))
    {
        echo 'Ошибка: ' . $result['error_description'];
    }
    else
    {
        echo '<pre>';
        print_r($result['result']);
        echo '</pre>';
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "landing.repo.bind", b24.Params{
    	"fields": b24.Params{
    		"PLACEMENT":         "LANDING_SETTINGS",
    		"PLACEMENT_HANDLER": "https://your-domain.com/widgets/landing-settings-handler.php",
    		"TITLE":             "Мои настройки",
    	},
    })
    if err != nil {
    	return fmt.Errorf("landing.repo.bind: %w", err)
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
        "start": 1775203200,
        "finish": 1775203200.764211,
        "duration": 0.7642109394073486,
        "processing": 0,
        "date_start": "2026-04-03T11:00:00+03:00",
        "date_finish": "2026-04-03T11:00:00+03:00",
        "operating_reset_at": 1775203800,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Результат регистрации места встраивания. Возвращает `true`, если запись успешно добавлена ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "PLACEMENT_EXIST",
    "error_description": "Такое место встраивания уже существует"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `MISSING_PARAMS` | Недостаточно параметров вызова, пропущены: fields | Параметр `fields` не передан ||
|| `400` | `TYPE_ERROR` | Неверный тип аргумента вызова: fields | В `fields` передано значение, которое не является объектом ||
|| `400` | `ACCESS_DENIED` | Недостаточно прав. | У пользователя нет права Просмотр в разделе Сайты или он не прошел общие проверки доступа модуля `landing` ||
|| `400` | `ACCESS_DENIED` | Управлять местами встраивания может только приложение | Метод вызван вне контекста приложения или модуль `rest` недоступен ||
|| `400` | `PLACEMENT_UNKNOWN` | Такое место встраивания недоступно для сайтов | Код `PLACEMENT` не начинается с `LANDING_` ||
|| `400` | `PLACEMENT_HANDLER_INVALID` | Некорректный адрес обработчика места встраивания | В `PLACEMENT_HANDLER` передан пустой или некорректный HTTP- или HTTPS-адрес ||
|| `400` | `PLACEMENT_EXIST` | Такое место встраивания уже существует | У текущего приложения уже есть место встраивания с такими `PLACEMENT` и `PLACEMENT_HANDLER` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./settings.md)
- [{#T}](./block.md)
- [{#T}](./landing-repo-unbind.md)
