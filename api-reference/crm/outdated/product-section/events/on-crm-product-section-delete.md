# Событие на удаление раздела onCrmProductSectionDelete

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `onCrmProductSectionDelete` вызывается после удаления раздела.

## Обработка ответа

HTTP-статус: **200**

Возвращает массив:

```php
array('FIELDS' => array('ID' => $id))
```

## Обработка ошибок

HTTP-статус: **400**

В случае ошибки либо при удалении раздела **не в инфоблоке CRM**, выводит исключение `\Bitrix\Rest\RestException`.