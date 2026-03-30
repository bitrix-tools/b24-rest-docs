# Закрыть карточку звонка со стороны приложения CallCardClose

> Scope: [`telephony`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `CallCardClose` закрывает карточку звонка.

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

Для данного метода — `CallCardClose` ||
|| **PARAMS***
[`object`](../../../data-types.md) | Объект параметров команды.

Для данного метода передается пустой объект: `{}` ||
|#

{% note warning %}

После вызова `CallCardClose` дальнейшее управление карточкой невозможно.

{% endnote %}

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
      -d '{"PLACEMENT":"CallCardClose","PARAMS":{}}' \
      "https://**put_your_bitrix24_address**/rest/placement.call?auth=**put_access_token_here**"
    ```

- JS

    ```js
    BX24.placement.call('CallCardClose', {}, function(result) {
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
                    'PLACEMENT' => 'CallCardClose',
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
            PLACEMENT: 'CallCardClose',
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
            'PLACEMENT' => 'CallCardClose',
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
        "errorCode": "Call card is undefined"
    }
]
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `WRONG_AUTH_TYPE` | Application context required | Метод вызван вне контекста приложения в плейсменте `PAGE_BACKGROUND_WORKER` ||
|| `Call card is undefined` | Карточка звонка недоступна | Нет активной карточки звонка для закрытия ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./call-card-set-mute.md)
- [{#T}](./call-card-set-hold.md)
- [{#T}](./call-card-set-ui-state.md)
- [{#T}](./call-card-get-list-ui-states.md)
- [{#T}](./call-card-set-card-title.md)
- [{#T}](./call-card-set-status-text.md)
- [{#T}](./events/index.md)
