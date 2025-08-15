# Установить статус пользователя im.user.status.set

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.user.status.set` устанавливает статус пользователя.

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **STATUS^*^**
[`unknown`](../../data-types.md) | `online` | Новый статус пользователя | 18 ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

Доступны следующие статусы:

- `online` – Онлайн
- `dnd` – Не беспокоить
- `away` – Отсутствую

{% note info "" %}

Статус `away` использовался в предыдущей версии чата. В текущей версии чата М1 он не отображается в интерфейсе.
[Битрикс24 Чат: новый мессенджер](https://helpdesk.bitrix24.ru/open/19071750/)

{% endnote %}

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'im.user.status.set',
    		{
    			STATUS: 'online'
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	console.error(error.ex);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'im.user.status.set',
                [
                    'STATUS' => 'online'
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error()->ex);
            echo 'Error: ' . $result->error()->ex;
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting user status: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        'im.user.status.set',
        {
            STATUS: 'online'
        },
        function(result){
            if(result.error())
            {
                console.error(result.error().ex);
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    {% include [Пояснение о restCommand](../_includes/rest-command.md) %}

    ```php
    $result = restCommand(
        'im.user.status.set',
        Array(
            'STATUS' => 'online',
        ),
        $_REQUEST[
            "auth"
        ]
    );
    ```

- cURL

    // пример для cURL

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

```json
{
    "result": true
}
```

