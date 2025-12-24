# Изменить настройки коннектора imconnector.connector.data.set

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
  
{% endnote %}

{% endif %}

> Scope: [`imconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод устанавливает данные для rest-коннектора.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **CONNECTOR** | Идентификатор коннектора ||
|| **LINE** | Идентификатор линии, к которой привязан коннектор ||
|| **DATA** | Массив с данными для сохранения:
- `id` — идентификатор учетной записи, которая подключена к этому коннектору
- `url` и `url_im` — ссылки на чат. `url_im` используется в виджете, но если не установлен, то будет использован `url`
- `name` — название канала, которое будет отображаться в виджете ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CONNECTOR":"myrestconnector","LINE":1,"DATA":{"id":123,"url":"http://localhost","url_im":"http://localhost","name":"My rest connector name"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/imconnector.connector.data.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CONNECTOR":"myrestconnector","LINE":1,"DATA":{"id":123,"url":"http://localhost","url_im":"http://localhost","name":"My rest connector name"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/imconnector.connector.data.set
    ```

- JS


    ```js
    async function connectorDataSet()
    {
        try
        {
            var params = {
                CONNECTOR: 'myrestconnector',
                LINE: 1,
                DATA: {
                    id: 123,
                    url: 'http://localhost',
                    url_im: 'http://localhost',
                    name: 'My rest connector name'
                }
            };
            
            const response = await $b24.callMethod(
                'imconnector.connector.data.set',
                params
            );
            
            const result = response.getData().result;
            alert("Успешно: " + result);
        }
        catch(error)
        {
            alert("Error: " + error);
        }
    }
    ```

- PHP


    ```php
    function connectorDataSet()
    {
        try {
            $params = [
                'CONNECTOR' => 'myrestconnector',
                'LINE' => 1,
                'DATA' => [
                    'id' => 123,
                    'url' => 'http://localhost',
                    'url_im' => 'http://localhost',
                    'name' => 'My rest connector name'
                ]
            ];
    
            $response = $b24Service
                ->core
                ->call(
                    'imconnector.connector.data.set',
                    $params
                );
    
            $result = $response
                ->getResponseData()
                ->getResult();
    
            if ($result->error()) {
                echo 'Error: ' . $result->error();
            } else {
                echo 'Успешно: ' . $result->data();
            }
    
        } catch (Throwable $e) {
            error_log($e->getMessage());
            echo 'Error setting connector data: ' . $e->getMessage();
        }
    }
    ```

- BX24.js

    ```js
    function connectorDataSet()
    {
        var params = {
            CONNECTOR: 'myrestconnector',
            LINE: 1,
            DATA: {
                id: 123,
                url: 'http://localhost',
                url_im: 'http://localhost',
                name: 'My rest connector name'
            }
        };
        BX24.callMethod(
            'imconnector.connector.data.set',
            params,
            function (result) {
                if (result.error())
                    alert("Error: " + result.error());
                else
                    alert("Успешно: " + result.data());
            }
        );
    }
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $params = [
        'CONNECTOR' => 'myrestconnector',
        'LINE' => 1,
        'DATA' => [
            'id' => 123,
            'url' => 'http://localhost',
            'url_im' => 'http://localhost',
            'name' => 'My rest connector name'
        ]
    ];

    $result = CRest::call(
        'imconnector.connector.data.set',
        $params
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Продолжите изучение 

- [{#T}](./imconnector-register.md)
- [{#T}](./imconnector-activate.md)
- [{#T}](./imconnector-status.md)
- [{#T}](./imconnector-list.md)
- [{#T}](./imconnector-unregister.md)
- [{#T}](./imconnector-send-messages.md)
- [{#T}](./imconnector-update-messages.md)
- [{#T}](./imconnector-delete-messages.md)
- [{#T}](./imconnector-send-status-delivery.md)
- [{#T}](./imconnector-send-status-reading.md)
- [{#T}](../../../tutorials/openlines/example-connector.md)