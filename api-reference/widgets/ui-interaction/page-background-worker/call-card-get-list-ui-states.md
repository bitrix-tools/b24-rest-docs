# Получить список доступных состояний интерфейса карточки звонка CallCardGetListUiStates

> Scope: [`telephony`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `CallCardGetListUiStates` возвращает список доступных состояний интерфейса карточки звонка.

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

Для данного метода — `CallCardGetListUiStates` ||
|| **PARAMS***
[`object`](../../../data-types.md) | Объект параметров команды.

Для данного метода передается пустой объект: `{}` ||
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
      -d '{"PLACEMENT":"CallCardGetListUiStates","PARAMS":{}}' \
      "https://**put_your_bitrix24_address**/rest/placement.call?auth=**put_access_token_here**"
    ```

- JS

    ```js
    BX24.placement.call('CallCardGetListUiStates', {}, function(result) {
        console.log(result);
    });
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'placement.call',
                [
                    'PLACEMENT' => 'CallCardGetListUiStates',
                    'PARAMS' => []
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
            PLACEMENT: 'CallCardGetListUiStates',
            PARAMS: {}
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
            'PLACEMENT' => 'CallCardGetListUiStates',
            'PARAMS' => (object)[]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

```json
[
    "incoming",
    "transferIncoming",
    "outgoing",
    "connectingIncoming",
    "connectingOutgoing",
    "connected",
    "transferring",
    "transferFailed",
    "transferConnected",
    "error",
    "moneyError",
    "redial"
]
```

### Возвращаемые данные

Корневой элемент ответа — массив строк с доступными состояниями интерфейса карточки.

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

## Обработка ошибок

### Ошибка REST-вызова

```json
{
    "error": "WRONG_AUTH_TYPE",
    "error_description": "Application context required"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `WRONG_AUTH_TYPE` | Application context required | Метод вызван вне контекста приложения в плейсменте `PAGE_BACKGROUND_WORKER` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./call-card-set-ui-state.md)
- [{#T}](./call-card-set-mute.md)
- [{#T}](./call-card-set-hold.md)
- [{#T}](./call-card-set-card-title.md)
- [{#T}](./call-card-set-status-text.md)
- [{#T}](./call-card-close.md)
- [{#T}](./events/index.md)
