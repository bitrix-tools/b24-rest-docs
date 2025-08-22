# Ответить на уведомление, которое поддерживает быстрый ответ im.notify.answer

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствуют примеры

{% endnote %}

{% endif %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.notify.answer` даёт ответ на уведомление, поддерживающее быстрый ответ.

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **ID^*^**
[`unknown`](../../data-types.md) | `270` | Идентификатор уведомления, поддерживающего быстрый ответ | `30` ||
|| **ANSWER_TEXT^*^**
[`unknown`](../../data-types.md) | `'Hello'` | Текст быстрого ответа | `30` ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'im.notify.answer',
    		{
    			ID: 270,
    			ANSWER_TEXT: 'Hello'
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $notificationId = 123; // Replace with your actual notification ID
        $answerText = "This is an answer text"; // Replace with your actual answer text

        $result = $serviceBuilder
            ->getIMScope()
            ->notify()
            ->answer($notificationId, $answerText);

        if ($result->isSuccess()) {
            print($result->getCoreResponse()->getResponseData()->getResult()[0]);
        } else {
            print("Failed to send answer.");
        }
    } catch (Throwable $e) {
        print("An error occurred: " . $e->getMessage());
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.notify.answer',
        {
            ID: 270,
            ANSWER_TEXT: 'Hello'
        },
        res => {
            if (res.error())
            {
            console.error(result.error().ex);
            }
            else
            {
            console.log(res.data())
            }
        }
    )
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

```json
{
    "result_message": [
        "Ваш ответ успешно отправлен."
    ]
}
```

Возвращается массив сообщений на Ваш ответ.

Пример ответа, если передать идентификатор уведомления, не поддерживающего быстрый ответ:

```json
{
    "result_message": false
}
```

## Ответ в случае ошибки

```json
{
    "error":"NOTIFY_ID_ERROR",
    "error_description":"Notification ID can't be empty"
}
```

### Описание ключей

- `error` – код возникшей ошибки
- `error_description` – краткое описание возникшей ошибки

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **ID_ERROR** | Не передан параметр `ID` или он не является числом ||
|| **ANSWER_TEXT_ERROR** | Не передан параметр `ANSWER_TEXT` или он не является непустой строкой ||
|#