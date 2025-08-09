# Получить параметры карточки crm.deal.details.configuration.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.deal.details.configuration.get` получает настройки карточки сделок. Метод читает личные настройки карточки указанного пользователя или общие настройки, заданные для всех пользователей.

{% note warning %}

Обратите внимание, что настройки карточки сделок разных направлений (или воронок) могут отличаться друг от друга.
Для переключения между настройками карточек сделок разных направлений применяется параметр **dealCategoryId**.

{% endnote %}

#|
|| **Параметр** | **Описание** ||
|| **scope**
[`unknown`](../../../data-types.md) | Область применения настроек. Допустимые значения:

- **P** - личные настройки,
- **C** - общие настройки.
 ||
|| **userId**
[`unknown`](../../../data-types.md) | Идентификатор пользователя. Если не задан, то берётся текущий. Нужен только при запросе личных настроек. ||
|| **extras**
[`unknown`](../../../data-types.md) | Дополнительные параметры. Здесь для сделок может быть задан параметр `dealCategoryId`. ||
|#

## Примеры

{% list tabs %}

- PHP


    ```php
    try {
        //Запрос личных настроек карточки сделок для пользователя с идентификатором 1.
        $response1 = $b24Service
            ->core
            ->call(
                "crm.deal.details.configuration.get",
                [
                    'scope'  => "P",
                    'userId' => 1
                ]
            );
    
        $result1 = $response1
            ->getResponseData()
            ->getResult();
    
        echo 'Personal deal details configuration for user 1: ' . print_r($result1, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting personal deal details configuration: ' . $e->getMessage();
    }
    
    try {
        //Запрос общих настроек карточки сделок для общего направления.
        $response2 = $b24Service
            ->core
            ->call(
                "crm.deal.details.configuration.get",
                [
                    'scope' => "C"
                ]
            );
    
        $result2 = $response2
            ->getResponseData()
            ->getResult();
    
        echo 'Common deal details configuration for general direction: ' . print_r($result2, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting common deal details configuration: ' . $e->getMessage();
    }
    
    try {
        //Запрос общих настроек карточки сделок для направления с идентификатором 1.
        $response3 = $b24Service
            ->core
            ->call(
                "crm.deal.details.configuration.get",
                [
                    'scope'  => "C",
                    'extras' => ['dealCategoryId' => 1]
                ]
            );
    
        $result3 = $response3
            ->getResponseData()
            ->getResult();
    
        echo 'Common deal details configuration for direction with ID 1: ' . print_r($result3, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting common deal details configuration for direction with ID 1: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    //--
    //Запрос личных настроек карточки сделок для пользователя с идентификатором 1.
    BX24.callMethod(
        "crm.deal.details.configuration.get",
        {
            scope: "P",
            userId: 1
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    //Запрос общих настроек карточки сделок для общего направления.
    BX24.callMethod(
        "crm.deal.details.configuration.get",
        {
            scope: "C"
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    //Запрос общих настроек карточки сделок для направления с идентификатором 1.
    BX24.callMethod(
        "crm.deal.details.configuration.get",
        {
            scope: "C",
            extras: { dealCategoryId: 1 }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    //--
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}