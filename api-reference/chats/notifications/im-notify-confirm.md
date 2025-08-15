# Взаимодействовать с кнопками нотификаций im.notify.confirm

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

Метод `im.notify.confirm` взаимодействует с кнопками нотификаций.

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **ID^*^**
[`unknown`](../../data-types.md) | `288` | Идентификатор уведомления, поддерживающего выбор ответа посредством нажатия на кнопки | `30` ||
|| **NOTIFY_VALUE^*^**
[`unknown`](../../data-types.md) | `'Y'` | Значение выбранного ответа (значение кнопки) | `30` ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

Для примера рассмотрим уведомление:

![Пример кнопок](./_images/buttons_example.png)

- у кнопки **Принять** значение `'Y'`
- у кнопки **Отказаться** значение `'N'`

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'im.notify.confirm',
    		{
    			ID: 288,
    			NOTIFY_VALUE: 'Y'
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
        $notificationId = 123; // Example notification ID
        $isAccept = true; // Example acceptance status

        $result = $serviceBuilder
            ->getIMScope()
            ->notify()
            ->confirm($notificationId, $isAccept);

        if ($result->isSuccess()) {
            print_r($result->getCoreResponse()->getResponseData()->getResult());
        } else {
            print("Confirmation failed.");
        }
    } catch (Throwable $e) {
        print("An error occurred: " . $e->getMessage());
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.notify.confirm',
        {
            ID: 288,
            NOTIFY_VALUE: 'Y'
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
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

```json
{
    "result_message": [
        "Приглашение принято"
    ]
}
```

## Ответ в случае ошибки

```json
{
    "error":"NOTIFY_VALUE_ERROR",
    "error_description":"Notification Value can't be empty"
}
```

### Описание ключей

- `error` – код возникшей ошибки
- `error_description` – краткое описание возникшей ошибки

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **ID_ERROR** | Не передан параметр `ID` или он не является числом ||
|| **NOTIFY_VALUE_ERROR** | Не указан параметр `NOTIFY_VALUE` или он пуст ||
|#