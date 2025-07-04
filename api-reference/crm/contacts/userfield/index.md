# Пользовательские поля контактов: обзор методов

Пользовательские поля хранят информацию о контакте в различных форматах данных: строка, число, ссылка, адрес и другие. 

> Быстрый переход: [все методы](#all-methods) 
> 
> Пользовательская документация: [Пользовательские поля в CRM](https://helpdesk.bitrix24.ru/open/22048980/)

## Типы пользовательских полей

Используйте метод [crm.userfield.types](../../universal/user-defined-fields/crm-userfield-types.md) для получения доступных типов пользовательских полей. Метод вернет ID и название типов полей.

````
    (
        [ID] => double    
        [title] => Число
    )
````

Используйте метод [crm.userfield.fields](../../universal/user-defined-fields/crm-userfield-fields.md) для получения списка характеристик пользовательских полей. Метод вернет коды характеристик с их типом и названием.

````
    [MANDATORY] => Array
                (
                    [type] => char
                    [title] => Обязательное
                )
````

## Настройки пользовательских полей

Используйте метод [crm.userfield.settings.fields](../../universal/user-defined-fields/crm-userfield-settings-fields.md), чтобы получить список доступных настроек. Метод вернет поддерживаемые настройки для запрошенного типа поля. 

````
    [DEFAULT_VALUE] => Array
            (
                [type] => double
                [title] => Значение по умолчанию
            )
    [PRECISION] => Array
            (
                [type] => int
                [title] => Точность
            )
````

## Ошибки при работе с пользовательскими полями

При создании или удалении пользовательских полей запрос может прерваться с ошибкой [INTERNAL_SERVER_ERROR](../../../../error-codes.md). Это внутренняя ошибка сервера. Причину ошибки можно найти в логах сервера на момент выполнения запроса: 
* В облачном Битрикс24 напишите обращение в [техническую поддержку](../../../../bitrix-support.md) чтобы получить детали ошибки. 
* В коробочном Битрикс24 запросите лог ошибок сервера у администратора сервера или администратора хостинга. После напишите в [техническую поддержку](../../../../bitrix-support.md) и приложите лог для анализа. 

### Частые причины серверных ошибок

1. Для контактов можно создать 1016 пользовательских полей — это ограничение архитектуры базы данных. Если в Битрикс24 уже есть 1016 полей для контактов, при попытке создать новое поле метод [crm.contact.userfield.add](./crm-contact-userfield-add.md) вернет ошибку [INTERNAL_SERVER_ERROR](../../../../error-codes.md). 

    Проверить количество пользовательских полей контактов можно методом [crm.contact.userfield.list](./crm-contact-userfield-list.md). 

2. На серверах есть ограничение для времени выполнения одного запроса — `max_execution_time`. Стандартное время — 60 секунд. Если запрос выполняется дольше, он прерывается с ошибкой [INTERNAL_SERVER_ERROR](../../../../error-codes.md). 

    Время [создания](./crm-contact-userfield-add.md) или [удаления](./crm-contact-userfield-delete.md) пользовательского поля контакта зависит от количества контактов. Когда поле создается, оно добавляется во все карточки контактов. Когда поле удаляется, оно удаляется из всех карточек. Чем меньше контактов в вашем Битрикс24, тем быстрее создаются и удаляются поля.
   
    Чтобы проверить количество контактов в Битрикс24 используйте метод [crm.contact.list](../crm-contact-list.md).

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [crm.contact.userfield.add](./crm-contact-userfield-add.md) | Создает новое пользовательское поле для контактов ||
|| [crm.contact.userfield.update](./crm-contact-userfield-update.md) | Обновляет существующее пользовательское поле контактов ||
|| [crm.contact.userfield.get](./crm-contact-userfield-get.md) | Возвращает пользовательское поле контактов по идентификатору ||
|| [crm.contact.userfield.list](./crm-contact-userfield-list.md) | Возвращает список пользовательских полей контактов по фильтру ||
|| [crm.contact.userfield.delete](./crm-contact-userfield-delete.md) | Удаляет пользовательское поле контактов ||
|#