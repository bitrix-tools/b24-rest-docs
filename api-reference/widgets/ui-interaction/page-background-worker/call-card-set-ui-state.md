# Изменить состояние интерфейса карточки звонка со стороны приложения CallCardSetUiState

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement`](../../../scopes/permissions.md) — регистрация точки встраивания, [`telephony`](../../../scopes/permissions.md) — регистрация звонка, поднимающего карточку
>
> Кто может выполнять команду: любой пользователь

Команда `CallCardSetUiState` изменяет состояние интерфейса карточки звонка.

{% note info "" %}

Команда работает в контексте приложения, открытого в точке встраивания `PAGE_BACKGROUND_WORKER`. Это команда js-интерфейса, а не метод REST: вызвать ее запросом к `/rest/` нельзя.

{% endnote %}

## Как вызвать команду

Команду вызывают из виджета методом [BX24.placement.call](../bx24-placement-call.md). Третий аргумент — функция обратного вызова, в нее приходит результат команды.

```js
BX24.placement.call('CallCardSetUiState', {uiState: 'connected'}, function (result) {
    console.log(result);
});
```

## Параметры команды

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **uiState***
[`string`](../../../data-types.md) | Состояние интерфейса карточки.

Возможные значения:

- `incoming` — входящий звонок
- `transferIncoming` — входящий перевод звонка
- `outgoing` — исходящий звонок
- `connectingIncoming` — выполняется соединение входящего звонка
- `connectingOutgoing` — выполняется соединение исходящего звонка
- `connected` — соединение установлено
- `transferring` — выполняется перевод звонка
- `transferFailed` — ошибка перевода звонка
- `transferConnected` — перевод звонка успешно соединен
- `error` — ошибка звонка
- `moneyError` — ошибка из-за недостатка средств
- `redial` — повторный набор

Тот же список можно получить программно командой [CallCardGetListUiStates](./call-card-get-list-ui-states.md). Как выглядит карточка в каждом состоянии и какие кнопки в нем доступны, показано на странице [{#T}](./card.md) ||
|| **disableAutoStartTimer**
[`boolean`](../../../data-types.md) | Дополнительный параметр для `uiState = connected`.

Возможные значения:

- `true` — не запускать таймер автоматически
- `false` или отсутствие параметра — запускать таймер автоматически ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Рекомендуется вызывать команду после события [BackgroundCallCard::initialized](./events/initialized.md)

{% endnote %}

{% list tabs %}

- BX24.js

    ```js
    BX24.ready(function () {
        BX24.init(function () {
            BX24.placement.call('CallCardSetUiState', {uiState: 'connected'}, function (result) {
                console.log(result);
            });
        });
    });
    ```

- JS (TS)

    ```ts
    // $b24 — инициализированный экземпляр SDK, см. руководство по началу работы
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    await $b24.placement.call('CallCardSetUiState', { uiState: 'connected' })
    ```

- JS (UMD)

    ```html
    <!-- Загрузка SDK в UMD-сборке, глобальный объект B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', async () => {
        const $b24 = await B24Js.initializeB24Frame()

        const result = await $b24.placement.call('CallCardSetUiState', {uiState: 'connected'})

        console.log(result)
      })
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.placement.call(
            placement='CallCardSetUiState',
            params={
                "uiState": "connected",
                "disableAutoStartTimer": True,
            },
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
                'placement.call',
                [
                    'PLACEMENT' => 'CallCardSetUiState',
                    'PARAMS' => [
                        'uiState' => 'connected',
                        'disableAutoStartTimer' => true,
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'placement.call',
        {
            PLACEMENT: 'CallCardSetUiState',
            PARAMS: {
                uiState: 'connected',
                disableAutoStartTimer: true
            }
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error(), result.error_description());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'placement.call',
        [
            'PLACEMENT' => 'CallCardSetUiState',
            'PARAMS' => [
                'uiState' => 'connected',
                'disableAutoStartTimer' => true,
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Результат команды

```json
[]
```

### Возвращаемые данные

Пустой массив при успешном вызове.

## Ошибки

Ошибка команды приходит в ту же функцию обратного вызова: вместо обычного результата в нее передается массив с объектом, у которого `result` равен `error`.

```json
[
    {
        "result": "error",
        "errorCode": "Invalid ui state"
    }
]
```

### Значения errorCode

#|
|| **Код** | **Описание** | **Значение** ||
|| `Call card is undefined` | Карточка звонка недоступна | Нет активной карточки звонка для управления ||
|| `Invalid ui state` | Некорректное значение `uiState` | Переданное состояние отсутствует в списке поддерживаемых состояний ||
|#

Если команда вызвана в другой точке встраивания, функция обратного вызова не будет вызвана вовсе: неизвестную команду интерфейс точки встраивания игнорирует. Проверить, что команда `CallCardSetUiState` доступна, можно методом [BX24.placement.getInterface](../bx24-placement-get-interface.md).

## Продолжите изучение

- [{#T}](./call-card-set-mute.md)
- [{#T}](./call-card-set-hold.md)
- [{#T}](./call-card-get-list-ui-states.md)
- [{#T}](./call-card-set-card-title.md)
- [{#T}](./call-card-set-status-text.md)
- [{#T}](./call-card-close.md)
- [{#T}](./events/index.md)
- [{#T}](./index.md)
