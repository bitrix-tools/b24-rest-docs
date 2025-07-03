# Добавить комментарий к сообщению Ленты новостей log.blogcomment.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- нет примеров на др. языках

{% endnote %}

{% endif %}

> Scope: [`log`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Добавляет комментарий к указанному сообщению Ленты новостей.

#|
|| **Параметр** | **Описание** | **Версия** ||
|| **USER_ID** | Автор комментария. Пользователь с обычными правами не может указать в качестве значения идентификатор другого пользователя. Такая возможность доступна только для пользователей с правами администратора | ||
|| **POST_ID** | ID сообщения | ||
|| **TEXT** | Текст комментария | ||
|| **FILES** | Файлы, массив значений, описанный по правилам [работы с файлами](../files/how-to-upload-files.md) | ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS

    ```js
    // Пример добавления
    BX24.callMethod('log.blogcomment.add', {
        POST_ID: 10,
        TEXT: 'Комментарий к посту'
    }, result => {
        console.log(result);
    });
    ```

{% endlist %}

{% list tabs %}

- JS

    ```js
    // Получает комментарий в ленте новостей. Если не передавать id в фильтр, вернёт все доступные по правам комментарии
    let params = {
        FIRST_ID: 893, //id из таблицы b_sonet_log_comment
        LAST_ID: 894,
    };
    BX24.callMethod('log.blogcomment.user.get', params,
        result => {
            if(result.error())
            {
                alert("Error: " + result.error());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

{% endlist %}

{% list tabs %}

- JS

    ```js
    // Удаляет комментарий в ленте новостей
    let params = {
        COMMENT_ID: 261, //id из таблицы b_blog_comment
    };
    BX24.callMethod('log.blogcomment.delete', params,
        result => {
            if(result.error())
            {
                alert("Error: " + result.error());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

{% endlist %}
