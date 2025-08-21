# Прочитать уведомление или все уведомления с указанного im.notify.read

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

Метод `im.notify.read` устанавливает отмену о прочитанных уведомлениях.

## Параметры

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **ID^*^**
[`unknown`](../../data-types.md) | `17` | Идентификатор уведомления | 18 ||
|| **ONLY_CURRENT**
[`unknown`](../../data-types.md) | `N` | Прочитать только указанное уведомление | 18 ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

- Если параметр `ONLY_CURRENT` передан как `Y`, отметка о прочтении будет установлена только для указанного `ID`. Иначе отметка проставится для уведомления, равным или больше указанного `ID`.

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'im.notify.read',
    		{
    			'ID': 17,
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
        $notificationIds = [1, 2, 3]; // Example notification IDs
        $result = $serviceBuilder
            ->getIMScope()
            ->notify()
            ->markMessagesAsUnread($notificationIds);
        if ($result->isSuccess()) {
            print_r($result->getCoreResponse()->getResponseData()->getResult());
        } else {
            print("Failed to mark messages as unread.");
        }
    } catch (Throwable $e) {
        print("An error occurred: " . $e->getMessage());
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.notify.read',
        {
            'ID': 17,
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
        'im.notify.read',
        Array(
            'ID' => '17'
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