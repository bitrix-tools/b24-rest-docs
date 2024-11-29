# Получить идентификатор чата im.chat.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки
- не прописаны ссылки на несозданные ещё страницы
- из файла Сергея: непонятно, в каком контексте метод применим, надо уточнить

{% endnote %}

{% endif %}

> Scope: [`im`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.chat.get` получает идентификатор чата.

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **ENTITY_TYPE^*^**
[`unknown`](../data-types.md) | `CRM` | Идентификатор сущности. Может быть использован для поиска чата и для легкого определения контекста в обработчиках событий:
- [ONIMBOTMESSAGEADD](.),
- [ONIMBOTMESSAGEUPDATE](.),
- [ONIMBOTMESSAGEDELETE](.) | 18 ||
|| **ENTITY_ID^*^**
[`unknown`](../data-types.md) | `LEAD`\|`13` | Числовой идентификатор сущности. Может быть использован для поиска чата и для легкого определения контекста в обработчиках событий:
- [ONIMBOTMESSAGEADD](.),
- [ONIMBOTMESSAGEUPDATE](.),
- [ONIMBOTMESSAGEDELETE](.) | 18 ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

## Примеры

{% include [Пояснение о restCommand](./_includes/rest-command.md) %}

{% list tabs %}

- PHP

    ```php
    $result = restCommand(
        'im.chat.get',
        Array(
            'ENTITY_TYPE' => 'CRM',
            'ENTITY_ID' => 'LEAD|13',
        ),
        $_REQUEST[
            "auth"
        ]
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Ответ в случае успеха

```json
{
    "result": 10
}
```

**Результат выполнения**: возвращает идентификатор чата `CHAT_ID` или `null`.