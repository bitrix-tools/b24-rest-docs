# Точка автозаполнения реквизитов клиента в CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)

Точка `CRM_REQUISITE_AUTOCOMPLETE` подключает обработчик приложения к поиску реквизитов клиента в карточке CRM. Она нужна, когда приложение ищет и подставляет реквизиты компании или контакта из внешнего источника.

Общий порядок работы и типовые ошибки описаны в обзоре [Автозаполнение реквизитов в карточке CRM](./index.md).

## Как зарегистрировать обработчик

При регистрации обработчика методом [placement.bind](../../placement-bind.md) передайте в параметре `PLACEMENT` значение `CRM_REQUISITE_AUTOCOMPLETE`. По этому коду Битрикс24 определяет, что обработчик относится к автозаполнению реквизитов клиента.

Параметры подключения не входят в данные, которые Битрикс24 передает обработчику при поиске.

#|
|| **Параметр**
[`тип`](../../../data-types.md) | **Описание** ||
|| **PLACEMENT***
[`string`](../../../data-types.md) | Код точки встраивания. Передайте значение `CRM_REQUISITE_AUTOCOMPLETE` ||
|| **HANDLER***
[`string`](../../../data-types.md) | URL обработчика приложения ||
|| **TITLE**
[`string`](../../../data-types.md) | Название обработчика в интерфейсе выбора источника поиска ||
|| **OPTIONS[countries]**
[`string`](../../../data-types.md) | Идентификаторы стран через запятую без пробелов. Если параметр не передан, обработчик доступен для всех стран, для которых открыто поле поиска.

Идентификаторы стран можно получить методом [crm.requisite.preset.countries](../../../crm/requisites/presets/crm-requisite-preset-countries.md) ||
|#

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

Пример регистрации обработчика:

```javascript
BX24.callMethod(
    'placement.bind',
    {
        PLACEMENT: 'CRM_REQUISITE_AUTOCOMPLETE',
        HANDLER: 'https://example.com/requisite-autocomplete/',
        TITLE: 'Поиск реквизитов',
        OPTIONS: {
            countries: '1,14'
        }
    },
    function(result)
    {
        if (result.error())
        {
            console.error(result.error());
        }
    }
);
```

## Что получает обработчик

Битрикс24 отправляет обработчику POST-запрос с данными точки. В параметре `PLACEMENT_OPTIONS` передается `searchQuery` [`string`](../../../data-types.md) — строка, которую пользователь ввел в поле поиска реквизитов.

Пример POST-запроса:

```php
Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => 8b3f2c5d9c1a4f6e9d7a2b4c6f8e1a3d
    [AUTH_ID] => 1f0f107e5806d5fe9a98e02021a72e57645f86a
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 1f0f107a80816604b24a8719792ac2a21d629b5
    [member_id] => da45a03b265edd8787f8a258d793cc5d
    [status] => L
    [PLACEMENT] => CRM_REQUISITE_AUTOCOMPLETE
    [PLACEMENT_OPTIONS] => {"searchQuery":"7707083893"}
)
```

{% include notitle [описание стандартных данных](../../_includes/widget_data.md) %}

## Как вернуть найденные варианты

Передайте найденные варианты командой [BX24.placement.call](../../ui-interaction/bx24-placement-call.md) с именем `crmShowFoundEntities`.

#|
|| **Поле**
[`тип`](../../../data-types.md) | **Описание** ||
|| **data**
[`array`](../../../data-types.md) | Список найденных вариантов ||
|| **data[].id**
[`string`](../../../data-types.md) | Идентификатор варианта на стороне приложения ||
|| **data[].name**
[`string`](../../../data-types.md) | Название варианта, которое будет показано пользователю ||
|| **data[].phone**
[`string`](../../../data-types.md) | Телефон варианта. Передавайте поле, если номер найден ||
|| **data[].email**
[`string`](../../../data-types.md) | E-mail варианта. Передавайте поле, если адрес найден ||
|| **data[].web**
[`string`](../../../data-types.md) | Сайт варианта. Передавайте поле, если сайт найден ||
|#

```javascript
BX24.placement.call(
    'crmShowFoundEntities',
    {
        data: [
            {
                id: 'company-123',
                name: 'ООО Ромашка',
                phone: '+7 495 000-00-00',
                email: 'info@example.com',
                web: 'https://example.com'
            }
        ]
    }
);
```

## Как создать выбранный вариант

Если пользователь выбрал вариант из ответа приложения, Битрикс24 вызывает событие интерфейса `onCrmEntityIsNeedToCreate`. Подпишитесь на него методом [BX24.placement.bindEvent](../../ui-interaction/bx24-placement-bind-event.md).

В обработчик события `onCrmEntityIsNeedToCreate` передаются данные выбранного варианта.

#|
|| **Поле**
[`тип`](../../../data-types.md) | **Описание** ||
|| **appSid**
[`string`](../../../data-types.md) | Идентификатор сессии приложения, в которой был найден выбранный вариант ||
|| **data**
[`object`](../../../data-types.md) | Данные выбранного варианта из списка, который приложение передало через `crmShowFoundEntities` ||
|#

В объекте `fields` передайте поля реквизитов, которые нужно подставить в карточку CRM. Состав объекта зависит от данных, которые приложение получило из своего источника.

```javascript
BX24.placement.bindEvent('onCrmEntityIsNeedToCreate', function (eventData) {
    const selected = eventData.data;
    const selectedTitle = selected.title || selected.name;

    BX24.placement.call(
        'crmShowCreatedEntity',
        {
            entityType: 'company',
            id: selected.id,
            title: selectedTitle,
            fields: {
                RQ_COMPANY_NAME: selectedTitle
            }
        }
    );
});
```

Поля команды `crmShowCreatedEntity`:

#|
|| **Поле**
[`тип`](../../../data-types.md) | **Описание** ||
|| **entityType**
[`string`](../../../data-types.md) | Тип созданного объекта. Для компании передайте `company`, для контакта — `contact` ||
|| **id**
[`string`](../../../data-types.md) | Идентификатор созданного объекта на стороне приложения ||
|| **title**
[`string`](../../../data-types.md) | Название созданного объекта ||
|| **fields**
[`object`](../../../data-types.md) | Поля реквизитов, которые нужно подставить в карточку CRM ||
|#

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./bank-detail-autocomplete.md)
- [{#T}](../../../crm/requisites/index.md)
