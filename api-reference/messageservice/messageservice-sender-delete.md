# Удалить SMS-провайдер или провайдер сообщений messageservice.sender.delete

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- Нет примеров на др. языках

{% endnote %}

{% endif %}

> Scope: [`messageservice`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод удаляет зарегистрированный ранее провайдера сообщений. Нельзя удалить провайдер зарегистрированный другим приложением или другим вебхуком.

#|
|| **Параметр** | **Описание** ||
|| **CODE** | Идентификатор провайдера. ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

## Пример

{% list tabs %}

- JS

    ```js
    function uninstallProvider(provider)
    {
        BX24.callMethod(
            'messageservice.sender.delete',
            {
                'CODE': provider
            },
            function(result)
            {
                if(result.error())
                    alert('Error: ' + result.error());
                else
                    alert("Успешно: " + result.data());
            }
        );
    }
    ```

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}