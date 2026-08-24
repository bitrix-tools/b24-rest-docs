# Поставить звонок на удержание со стороны приложения CallCardSetHold

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement`](../../../scopes/permissions.md) — регистрация точки встраивания, [`telephony`](../../../scopes/permissions.md) — регистрация звонка, поднимающего карточку
>
> Кто может выполнять команду: любой пользователь

Команда `CallCardSetHold` включает или отключает удержание звонка в карточке.

{% note info "" %}

Команда работает в контексте приложения, открытого в точке встраивания `PAGE_BACKGROUND_WORKER`. Это команда js-интерфейса, а не метод REST: вызвать ее запросом к `/rest/` нельзя.

{% endnote %}

## Как вызвать команду

Команду вызывают из виджета методом [BX24.placement.call](../bx24-placement-call.md). Третий аргумент — функция обратного вызова, в нее приходит результат команды.

```js
BX24.placement.call('CallCardSetHold', {held: true}, function (result) {
    console.log(result);
});
```

## Параметры команды

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **held***
[`boolean`](../../../data-types.md) | Управление удержанием.

Возможные значения:

- `true` — поставить звонок на удержание
- `false` — снять звонок с удержания ||
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
            BX24.placement.call('CallCardSetHold', {held: true}, function (result) {
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

    await $b24.placement.call('CallCardSetHold', { held: true })
    ```

- JS (UMD)

    ```html
    <!-- Загрузка SDK в UMD-сборке, глобальный объект B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', async () => {
        const $b24 = await B24Js.initializeB24Frame()

        const result = await $b24.placement.call('CallCardSetHold', {held: true})

        console.log(result)
      })
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.placement.call(
            placement='CallCardSetHold',
            params={
                "held": True,
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
                    'PLACEMENT' => 'CallCardSetHold',
                    'PARAMS' => [
                        'held' => true,
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
            PLACEMENT: 'CallCardSetHold',
            PARAMS: {
                held: true
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
            'PLACEMENT' => 'CallCardSetHold',
            'PARAMS' => [
                'held' => true,
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

Если звонок уже находится в запрошенном состоянии, команда сразу возвращает пустой массив: карточка не меняется и событие [BackgroundCallCard::holdButtonClick](./events/hold-button-click.md) не возникает.

## Ошибки

Ошибка команды приходит в ту же функцию обратного вызова: вместо обычного результата в нее передается массив с объектом, у которого `result` равен `error`.

```json
[
    {
        "result": "error",
        "errorCode": "Call card is undefined"
    }
]
```

### Значения errorCode

#|
|| **Код** | **Описание** | **Значение** ||
|| `Call card is undefined` | Карточка звонка недоступна | Нет активной карточки звонка для управления ||
|| `missing field held` | Не передан обязательный параметр `held` | Ошибка параметра в десктоп-сценарии. Из-за особенностей реализации следом может прийти второй ответ — пустой массив ||
|#

Если команда вызвана в другой точке встраивания, функция обратного вызова не будет вызвана вовсе: неизвестную команду интерфейс точки встраивания игнорирует. Проверить, что команда `CallCardSetHold` доступна, можно методом [BX24.placement.getInterface](../bx24-placement-get-interface.md).

## Продолжите изучение

- [{#T}](./call-card-set-mute.md)
- [{#T}](./call-card-set-ui-state.md)
- [{#T}](./call-card-get-list-ui-states.md)
- [{#T}](./call-card-set-card-title.md)
- [{#T}](./call-card-set-status-text.md)
- [{#T}](./call-card-close.md)
- [{#T}](./events/index.md)
- [{#T}](./index.md)
