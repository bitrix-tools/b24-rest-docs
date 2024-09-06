# Событие при получении разрешения на использование методов onAppMethodConfirm

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры

{% endnote %}

{% endif %}

> Scope: [`базовый`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `onAppMethodConfirm`, вызывается при получении [решения администратора](https://dev.1c-bitrix.ru/rest_help/rest_sum/call_confirmation.php) портала по запросу на использование методов, требующих подтверждения.

## Параметры события

#|
|| **Параметр** | **Описание** ||
|| **TOKEN**
[`unknown`](../../data-types.md) | Авторизационный токен, с которым было запрошено разрешение ||
|| **METHOD**
[`unknown`](../../data-types.md) | Метод REST API, разрешение на использование которого было запрошено. ||
|| **CONFIRMED**
[`unknown`](../../data-types.md) | Результат разрешения, 0 - запрещено, 1 - разрешено ||
|#

## Примеры

```js
array (
    'event' => 'ONAPPMETHODCONFIRM',
    'data' =>
    array (
        'TOKEN' => 'fkp963yuv1ggkfbs5z3f5hy8lilm0iw6',
        'METHOD' => 'voximplant.user.get',
        'CONFIRMED' => '1',
        'LANGUAGE_ID' => 'ru',
    ),
    'ts' => '1478790852',
    'auth' =>
    array (
        'domain' => 'portal.bitrix24.ru',
        'client_endpoint' => 'https://portal.bitrix24.ru/rest/',
        'server_andpoint' => 'https://oauth.bitrix.info/rest/',
        'member_id' => '74ef8a46a75104de55d5d4a61b98ab6d',
        'application_token' => 'c289487163b58658eae5e8b42eaf11b8',
    ),
)
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}