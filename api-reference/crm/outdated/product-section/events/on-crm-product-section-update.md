# Событие на изменение раздела onCrmProductSectionUpdate

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь


Событие `onCrmProductSectionUpdate` вызывается после изменения раздела.

## Обработка ответа

HTTP-статус: **200**

Возвращает массив:

```php
array('FIELDS' => array('ID' => $id))
```

## Обработка ошибок

HTTP-статус: **400**

В случае ошибки либо при изменении раздела **не в инфоблоке CRM**, выводит исключение `\Bitrix\Rest\RestException`.