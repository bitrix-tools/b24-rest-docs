# Виджет в контакт-центре CONTACT_CENTER

> Scope: [`contact_center`](../scopes/permissions.md)

Плейсмент CONTACT_CENTER добавляет пункт приложения в список Контакт-центра.

Код места встройки указывается в параметре `PLACEMENT` метода [placement.bind](./placement-bind.md).

{% note info "" %}

Встройка не будет отображаться в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код встройки** | **Место** ||
|| `CONTACT_CENTER` | Пункт в списке Контакт-центра ||
|#

### Где находится в интерфейсе

Откройте страницу Контакт-центра по адресу `https://your_site.ru/contact_center/`. Пункт приложения с `PLACEMENT=CONTACT_CENTER` отображается внизу страницы в разделе *Решения от партнеров*.

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```php

Array
(
    [DOMAIN] => example.bitrix24.ru
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => 0123456789abcdef0123456789abcdef
    [APPLICATION_SCOPE] => crm,placement,contact_center,imopenlines
    [APPLICATION_TOKEN] => xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    [AUTH_ID] => 6061e72600631fcd00005a4b00000001f0f1076700000000f69dd5fc643d9ce2fdbc1
    [AUTH_EXPIRES] => 3600
    [PLACEMENT_OPTIONS] => {"ID":"19"}
    [REFRESH_ID] => 50e00aa340631fcd00005a4b00000001f0f1071111116580a5b83c2de639ef28c12
    [SERVER_ENDPOINT] => https://oauth.bitrix24.tech/rest/
    [member_id] => abcdef1234567890abcdef1234567890
    [status] => F
    [PLACEMENT] => CONTACT_CENTER
)

```

{% include notitle [Сноска об обязательных параметрах](../../_includes/required.md) %}

{% include notitle [описание стандартных данных](_includes/widget_data.md) %}

### Дополнительные данные

#|
|| **Параметр**
`тип` | **Описание** ||
|| **APPLICATION_SCOPE**
[`string`](../data-types.md) | Список scope, доступных приложению ||
|| **APPLICATION_TOKEN**
[`string`](../data-types.md) | Токен приложения для безопасной обработки событий ||
|| **SERVER_ENDPOINT**
[`string`](../data-types.md) | Адрес сервера авторизации Битрикс24, необходимый для обновления токенов OAuth 2.0 ||
|#

### PLACEMENT_OPTIONS

Значение `PLACEMENT_OPTIONS` передается как JSON-строка с контекстом вызова.

Для `CONTACT_CENTER` в контекст передается ключ:

- `ID` — идентификатор элемента Контакт-центра, для которого был открыт виджет

## Продолжите изучение

- [{#T}](./placement-bind.md)
- [{#T}](./ui-interaction/index.md)
- [{#T}](../../settings/interactivity/index.md)
- [{#T}](./bx24-widget-methods.md)
