# Осуществить звонок на указанный номер с проигрыванием файла формата mp3 по URL voximplant.infocall.startwithsound

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

{% include notitle [Скоуп telephony all](../_includes/scope-telephony-all.md) %}

Метод `voximplant.infocall.startwithsound` осуществляет звонок на указанный номер с проигрыванием файла формата mp3 по URL. Метод доступен обладателю [права](https://helpdesk.bitrix24.ru/open/18177766/) `Исходящий звонок - Выполнение - любые`.

Для доступа к методу приложение должно запросить право доступа `Совершение звонков (call)`. Право указывается при [регистрации приложения](../../app-installation/index.md).

#|
|| **Параметр** | **Описание** ||
|| **FROM_LINE** | ID линии, с которой будет выполняться звонок. Список доступных линий можно получить методом [voximplant.line.get](lines/voximplant-line-get.md). ||
|| **TO_NUMBER** | Номер, на который звонить. ||
|| **URL** | Адрес mp3-записи для проигрывания. ||
|#

## Пример

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'voximplant.infocall.startwithsound',
        {
            "FROM_LINE": "reg1332",
            "TO_NUMBER": "7911xxxxxxx",
            "URL": "http://your.domain/path/file.mp3",
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

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}