# Получить список коннекторов imconnector.list

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- из файла Сергея: обращаем внимание, что здесь возвращается полный список подключенных на текущем б24 коннекторов
- не указаны параметры
- не указана обязательность параметров
- отсутствуют примеры на др.языках

{% endnote %}

{% endif %}

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает список коннекторов.

## Пример

{% list tabs %}

- JS

    ```js
    BX24.callMethod('imconnector.list', {}, function(result) {
        if(result.error())
        {
            console.error(result.error().ex);
        }
        else
        {
            console.log(result.data());
        }
    });
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

Список коннекторов с названиями.

```json
{
    "livechat": "Онлайн-чат",
    "whatsappbytwilio": "WhatsApp",
    "avito": "Avito",
    "viber": "Viber",
    "telegrambot": "Telegram",
    "imessage": "Apple Messages for Business",
    "vkgroup": "ВКонтакте",
    "ok": "Одноклассники",
    "facebook": "Facebook*: Сообщения",
    "facebookcomments": "Facebook*: Комментарии",
    "fbinstagramdirect": "Instagram* Direct",
    "network": "Битрикс24.Network",
    "notifications": "Битрикс24 СМС и WhatsApp",
    "whatsappbyedna": "Edna.ru WhatsApp",
    "newcustomconnector": "new super COnnector"
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **ACCESS_DENIED** | У текущего пользователя нет доступа ||
|#
