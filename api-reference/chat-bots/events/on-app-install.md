# На установку приложения ONAPPINSTALL

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров

{% endnote %}

{% endif %}

> Scope: [`базовый`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `ONAPPINSTALL` на установку приложения.

#|
|| **Поле** | **Описание** | **Ревизия** ||
|| **data**
[`unknown`](../../data-types.md) | Массив с данными | ||
|| **auth**
[`unknown`](../../data-types.md) | Параметры авторизации и данные о портале, на котором произошло событие | ||
|#

## data

#|
|| **Поле** | **Описание** | **Ревизия** ||
|| **LANGUAGE_ID**
[`unknown`](../../data-types.md) | Базовый язык портала | ||
|| **VERSION**
[`unknown`](../../data-types.md) | Версия приложения | ||
|#

## auth

#|
|| **Поле** | **Описание** | **Ревизия** ||
|| **access_token**
[`unknown`](../../data-types.md) | Ключ для отправки запросов к REST-сервису | ||
|| **scope**
[`unknown`](../../data-types.md) | Разрешенные уровни доступа | ||
|| **domain**
[`unknown`](../../data-types.md) | Домен портала Битрикс24, на который было установлено приложение | ||
|| **application_token**
[`unknown`](../../data-types.md) | Токен приложения, поможет вам «отбивать» лишние запросы на обработчик события, это поле есть во всех событиях | ||
|| **expires_in**
[`unknown`](../../data-types.md) | Время истечения токена, после которого нужно будет запросить новый | ||
|| **member_id**
[`unknown`](../../data-types.md) | Уникальный идентификатор портала, потребуется для продления авторизации | ||
|| **refresh_token**
[`unknown`](../../data-types.md) | Ключ для продления авторизации | ||
|#

{% note info %}

В базовом варианте работы с чат-ботом, поля **expires_in**, **member_id**, **refresh_token** - не требуются. Но, если для вашего приложения это необходимо, то прочитать, как с ними работать можно [тут](https://dev.1c-bitrix.ru/learning/course/index.php?COURSE_ID=43&LESSON_ID=2410). Пример бота содержит возможность продления.

{% endnote %}

## Примеры

{% list tabs %}

- JS

    ```js
    [data] => Array(
        [LANGUAGE_ID] = ru
        [VERSION] = 1
    )
    [auth] => Array(
        [access_token] => lh8ze36o8ulgrljbyscr36c7ay5sinva
        [scope] => imbot
        [domain] => b24.hazz
        [application_token] => c917d38f6bdb84e9d9e0bfe9d585be73
        [expires_in] => 3600
        [member_id] => d41d8cd98f00b204e9800998ecf8427e
        [refresh_token] => 5f1ih5tsnsb11sc5heg3kp4ywqnjhd09
    )
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

