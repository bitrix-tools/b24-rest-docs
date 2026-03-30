# Заблокировать автозакрытие disableAutoClose

> Scope: [`telephony`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `disableAutoClose` отключает автоматическое закрытие карточки звонка и обновляет таймер отложенного закрытия на 65 секунд, если он уже был запущен.

{% note info "" %}

Метод работает в контексте приложения в плейсменте `CALL_CARD`.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **PLACEMENT***
[`string`](../../../data-types.md) | Имя команды интерфейса.

Для данного метода — `disableAutoClose` ||
|| **PARAMS***
[`object`](../../../data-types.md) | Объект параметров команды.

Для данного метода передается пустой объект: `{}` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"PLACEMENT":"disableAutoClose","PARAMS":{}}' \
    "https://**put_your_bitrix24_address**/rest/placement.call?auth=**put_access_token_here**"
    ```

- JS

    ```js
    BX24.placement.call('disableAutoClose', {}, function (result) {
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
                    'PLACEMENT' => 'disableAutoClose',
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
            PLACEMENT: 'disableAutoClose',
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
            'PLACEMENT' => 'disableAutoClose',
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
|| `WRONG_AUTH_TYPE` | Application context required | Метод вызван вне контекста приложения в плейсменте `CALL_CARD` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./get-status.md)
- [{#T}](./enable-auto-close.md)
- [{#T}](./call-card-entity-changed.md)
- [{#T}](./call-card-before-close.md)
- [{#T}](./call-card-call-state-changed.md)
