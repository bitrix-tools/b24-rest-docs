# Получить текущий статус SIP-Коннектора voximplant.sip.connector.status

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

Метод `voximplant.sip.connector.status` возвращает текущий статус SIP-Коннектора. Метод доступен обладателю [права](https://helpdesk.bitrix24.ru/open/18177766/) `Управление номерами - изменение - любые`.

Входных параметров нет.

## Пример

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'voximplant.sip.connector.status',
        {},
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info(result.data());
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

## Возвращаемые данные

#|
|| **Поле** | **Описание** ||
|| **FREE_MINUTES** | Количество бесплатных минут для настройки и тестирования интеграции. ||
|| **PAID** | Оплачен или нет коннектор. ||
|| **PAID_DATE_END** | До какой даты оплачен коннектор (если факт оплаты был). ||
|#