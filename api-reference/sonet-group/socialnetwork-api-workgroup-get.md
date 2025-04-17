
{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха
- нет примеров на др. языках

{% endnote %}

{% endif %}
# Получить данные о рабочей группе socialnetwork.api.workgroup.get

> Scope: [`socialnetwork`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает информацию о рабочей группе (в т.ч. о проекте, скраме или коллабе) по идентификатору. Администратор может получить информацию о любой группе на портале, даже если она секретная и он в ней не состоит.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название** `тип` | **Описание** ||
|| **params*** [`object`](../data-types.md) | Параметры запроса для получения группы ||
|#

### Параметр `params`

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название** `тип` | **Описание** ||
|| **groupId*** [`integer`](../data-types.md#standart-types) | Идентификатор группы. Значение для поля может быть получено методом [sonet_group.get](./sonet-group-get.md) ||
|| **select** [`array`](../data-types.md#standart-types) | Список дополнительных полей для извлечения, возвращаемых в `result` ||
|| **mode** [`string`](../data-types.md#standart-types) | Режим запроса. Может принимать только значение `mobile`, которое позволяет получить дополнительные данные в массиве `result[ADDITIONAL_DATA]` ||
|#

#### Параметр `params[select]` {#paramsselect}

#|
|| **ACTIONS** | Доступные текущему пользователю (т.е. владельцу вебхука или пользователю приложения) операции над группой ||
|| **AVATAR** | URL сжатого пользовательского аватара группы ||
|| **AVATAR_DATA** | Информация об аватаре группы ||
|| **AVATAR_TYPES** | Типы аватаров для групп ||
|| **COUNTERS** | Количество непринятых запросов на вступление в группу и кол-во непринятых приглашений на вступление в группу ||
|| **DATE_CREATE** | Дата и время создания группы в более читаемом формате ||
|| **DEPARTMENTS** | Отделы сотрудников, добавленные в группу ||
|| **EFFICIENCY** | Эффективность группы ||
|| **FEATURES** | Доступные группе фичи (инструменты), указанные в расширенных настройках группы ||
|| **GROUP_MEMBERS_LIST** | Список: активных участников группы; приглашённых пользователей; пользователей, ожидающих подтверждения вступления в группу ||
|| **LIST_OF_MEMBERS** | Список участников группы, с информацией о них ||
|| **LIST_OF_MEMBERS_AWAITING_INVITE** | Пользователи, ожидающие подтверждения вступления в группу ||
|| **OWNER_DATA** | Данные о владельце группы ||
|| **PIN** | Закреплена ли группа у текущего пользователя (т.е. владельца вебхука или пользователя приложения) на странице групп и проектов. Возвращается ключом `result[IS_PIN]` ||
|| **PRIVACY_TYPE** | Уровень приватности группы. Возвращается ключом `result[PRIVACY_CODE]` ||
|| **SUBJECT_DATA** | Информация о тематике группы, указанной в расширенных настройках группы ||
|| **TAGS** | Теги группы (не задач группы), указанные в расширенных настройках группы ||
|| **USER_DATA** | Данные о роли текущего пользователя (т.е. владельца вебхука или пользователя приложения) в группе ||
|#

## Пример

{% list tabs %}

- JS

    ```js
    BX24.callMethod('socialnetwork.api.workgroup.get', {
        params: {
            groupId: 622,
            select: [ 'DEPARTMENTS', 'TAGS' ],
        },
    }, result => {
        console.log(result);
    });
    ```

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"params":{"groupId":622,"select":["DEPARTMENTS","TAGS"]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/socialnetwork.api.workgroup.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"params":{"groupId":622,"select":["DEPARTMENTS","TAGS"]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/socialnetwork.api.workgroup.get
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'socialnetwork.api.workgroup.get',
        [
            'params' => [
                'groupId' => 622,
                'select' => ['DEPARTMENTS', 'TAGS']
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "SONET_CONTROLLER_WORKGROUP_EMPTY",
    "error_description": "Не передано значение ID рабочей группы."
}
```
{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-`     | `SONET_CONTROLLER_WORKGROUP_EMPTY` | В массив `params` не передан параметр `groupId` ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}
