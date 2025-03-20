# Как проверить свой обработчик для обработки событий Битрикс24

После регистрирации обработчика ONAPPTEST вручную вызывается метод `event.test`. Это вызывает срабатывание указанного события и позволяет убедиться, что обработчик действительно в состоянии принимать данные о событиях.

## Шаг 1

Создайте файл handler.php на своём сервере. Убедитесь что он доступен из интернета. Рядом с файлом создайте папку \log.

Код файла handler.php.

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- PHP

    ```php
    <?
    file_put_contents(
        __DIR__ . '/log/' . time() . '.txt',
        var_export($_REQUEST, true)
    );
    ```

{% endlist %}

## Шаг 2

Зарегистрируйте событие, указав в поле `handler` путь до файла, созданного в шаге 1.

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"event":"ONAPPTEST","handler":"https://example.com/handler.php","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/event.bind
    ```

- JS

    ```javascript
    BX24.callMethod(
        'event.bind',
        {
            'event': 'ONAPPTEST',
            'handler': 'https://example.com/handler.php'
        },
        function(eventBind) {
            if (eventBind.data()) {
                console.log('event bind successful');
            }
        }
    );
    ```

- PHP

    ```php
    <?
    $eventBind = CRest::call(
        'event.bind',
        [
            'event' => 'ONAPPTEST',
            'handler' => 'https://example.com/handler.php'
        ]
    );
    if($eventBind['result'])
    {
        echo 'event bind successful';
    }
    ?>
    ```

{% endlist %}

## Шаг 3

Заставьте событие сработать вызовом метода с произвольными данными.

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"any":"data","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/event.test
    ```

- JS

    ```javascript
    BX24.callMethod(
        'event.test',
        {
            'any': 'data'
        },
        function(result) {
            if (result.data()) {
                console.log('successful');
            }
        }
    );
    ```

- PHP

    ```php
    <?
    $result = CRest::call(
        'event.test',
        [
            'any' => 'data'
        ]
    );
    if($result['result'])
    {
        echo 'successful';
    }
    ?>
    ```

{% endlist %}

## Результат

При успешном вызове в папке \log создается файл со стандартными данными для событий.

{% list tabs %}

- PHP

    ```php
    array (
        'event' => 'ONAPPTEST',
        'data' => 
        array (
            'QUERY' => 
            array (
            '	any' => 'data',
            ),
            'LANGUAGE_ID' => 'en',
        ),
        'ts' => '1573120286',
        'auth' => array (...)
    )
    ```

{% endlist %}

