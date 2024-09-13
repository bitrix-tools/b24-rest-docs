# Получить текущий статус sip-регистрации (только для облачных АТС) voximplant.sip.status

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% include notitle [Скоуп telephony admin](../../_includes/scope-telephony-admin.md) %}

Метод `voximplant.sip.status` Возвращает текущий статус sip-регистрации (только для облачных АТС). Метод доступен обладателю [права](https://helpdesk.bitrix24.ru/open/18177766/) `Управление номерами - изменение - любые`.

#|
|| **Параметр** | **Описание** ||
|| **REG_ID** | Идентификатор sip-регистрации. ||
|#

## Пример

```javascript
BX24.callMethod(
    "voximplant.sip.status",
    {
        "REG_ID": 5505,
    },
    function(result) 
    {
        if(result.error())
            console.error(result.error());
        else
            console.info(result.data());
    }
);
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

## Возвращаемые данные

#|
|| **Поле** | **Описание** ||
|| **REG_ID** | Идентификатор sip-регистрации. ||
|| **LAST_UPDATED** | Дата последнего изменения sip-регистрации. ||
|| **ERROR_MESSAGE** | Текстовое описание кода ошибки. ||
|| **STATUS_CODE** | Цифровой код ошибки. ||
|| **STATUS_RESULT** | Состояние sip-регистрации см. таблицу состояний ||
|#