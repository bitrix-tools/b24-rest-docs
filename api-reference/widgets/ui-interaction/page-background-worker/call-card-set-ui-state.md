# Изменить состояние интерфейса карточки звонка со стороны приложения CallCardSetUiState

> Scope: [`telephony`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `CallCardSetUiState` изменяет состояние интерфейса карточки звонка.

{% note info "" %}

Метод работает в контексте приложения в плейсменте `PAGE_BACKGROUND_WORKER`.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **PLACEMENT***
[`string`](../../../data-types.md) | Имя команды интерфейса.

Для данного метода — `CallCardSetUiState` ||
|| **PARAMS***
[`object`](../../../data-types.md) | Объект параметров команды.

Для данного метода передается объект со свойствами `uiState` и `disableAutoStartTimer` [(подробное описание)](#params) ||
|#

### Параметр PARAMS{#params}

#|
|| **Название**
`тип` | **Описание** ||
|| **uiState***
[`string`](../../../data-types.md) | Состояние интерфейса карточки.

Доступные значения можно получить методом [CallCardGetListUiStates](./call-card-get-list-ui-states.md) ||
|| **disableAutoStartTimer**
[`boolean`](../../../data-types.md) | Дополнительный параметр для `uiState = connected`.

Возможные значения:

- `true` — не запускать таймер автоматически
- `false` или отсутствие параметра — запускать таймер автоматически ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Рекомендуется вызывать метод после события [BackgroundCallCard::initialized](./events/initialized.md)

{% endnote %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"PLACEMENT":"CallCardSetUiState","PARAMS":{"uiState":"connected","disableAutoStartTimer":true}}' \
      "https://**put_your_bitrix24_address**/rest/placement.call?auth=**put_access_token_here**"
    ```

- JS

    ```js
    BX24.placement.call(
        'CallCardSetUiState',
        {
            uiState: 'connected',
            disableAutoStartTimer: true
        },
        function(result) {
            console.log(result);
        }
    );
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

## Обработка ответа

```json
[]
```

### Возвращаемые данные

Пустой массив при успешном вызове.

## Обработка ошибок

### Ошибка REST-вызова

```json
{
    "error": "WRONG_AUTH_TYPE",
    "error_description": "Application context required"
}
```
### Ошибка интерфейсного вызова

```json
[
    {
        "result": "error",
        "errorCode": "Invalid ui state"
    }
]
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `WRONG_AUTH_TYPE` | Application context required | Метод вызван вне контекста приложения в плейсменте `PAGE_BACKGROUND_WORKER` ||
|| `Call card is undefined` | Карточка звонка недоступна | Нет активной карточки звонка для управления ||
|| `Invalid ui state` | Некорректное значение `uiState` | Переданное состояние отсутствует в списке поддерживаемых состояний ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./call-card-set-mute.md)
- [{#T}](./call-card-set-hold.md)
- [{#T}](./call-card-get-list-ui-states.md)
- [{#T}](./call-card-set-card-title.md)
- [{#T}](./call-card-set-status-text.md)
- [{#T}](./call-card-close.md)
- [{#T}](./events/index.md)
