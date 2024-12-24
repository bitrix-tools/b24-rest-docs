# Получить данные по рабочей группе socialnetwork.api.workgroup.get

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

> Scope: [`socialnetwork`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает данные по рабочей группе

## Параметры

Параметры метода передавайте внутри массива `params`.

#|
|| **Параметр** | **Описание** ||
|| **groupId*** | Идентификатор группы. Обязательный параметр, целое число ||
|| **select** | Массив, задающий выбираемые поля ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

## Поля

Доступные поля для выбора в select:

#|
|| **Поле** | **Описание** | **С версии** ||
|| **ID** | Идентификатор группы | ||
|| **ACTIVE** | Флаг Y/N - является ли группа активной. | ||
|| **SUBJECT_ID** | Код темы (обязательное поле). | ||
|| **SUBJECT_DATA** | Поля тематики группы. | ||
|| **NAME** | Название группы | ||
|| **DESCRIPTION** | Описание группы | ||
|| **KEYWORDS** | Ключевые слова | ||
|| **CLOSED** | Флаг Y/N - является ли группа архивной, | ||
|| **VISIBLE** | Флаг Y/N - видна ли группа в списке групп, | ||
|| **OPENED** | Флаг Y/N - открыта ли группа для свободного вступления, | ||
|| **PROJECT** | Флаг Y/N - является ли группа проектом или нет. по умолчанию - не является. | 18.0.0 ||
|| **LANDING** | Флаг Y/N - является ли группой для публикаций. | ||
|| **DATE_CREATE** | Дата создания | ||
|| **DATE_UPDATE** | Дата изменения | ||
|| **DATE_ACTIVITY** | Дата активности | ||
|| **IMAGE_ID** | Идентификатор файла аватара группы | ||
|| **AVATAR** | URL аватара | ||
|| **AVATAR_TYPES** | Данные о наборе существующих типов аватаров. | ||
|| **AVATAR_TYPE** | Тип аватара группы (используется, если не задано значение IMAGE_ID). Допустимые значения: folder, checks, pie, bag, members. | ||
|| **OWNER_ID** | Идентификатор владельца группы | ||
|| **OWNER_DATA** | Поля владельца группы. | ||
|| **NUMBER_OF_MEMBERS** | Количество членов группы | ||
|| **NUMBER_OF_MODERATORS** | Количество модераторов группы. | ||
|| **INITIATE_PERMS** | Кто имеет право на приглашение пользователей в группу (обязательное поле):<ul><li>A - только владелец группы,</li><li>E - владелец группы и модераторы группы,</li><li>K - все члены группы.</li></ul> | ||
|| **PROJECT_DATE_START** | Дата начала проекта | ||
|| **PROJECT_DATE_FINISH** | Дата завершения проекта | ||
|| **SCRUM_OWNER_ID** | Идентификатор SCRUM | ||
|| **SCRUM_MASTER_ID** | Идентификатор SCRUM мастера | ||
|| **SCRUM_SPRINT_DURATION** | Длительность спринта в скраме в секундах | ||
|| **SCRUM_TASK_RESPONSIBLE** | Ответственный по умолчанию в скрам проекте. доступные значения:<ul><li>A - постановщик</li><li>M - скрам-мастер</li></ul> | ||
|| **TAGS** | Теги группы. ||
|| **ACTIONS** | Данные о доступных текущему пользователю операциях над группой. ||
|| **USER_DATA** | Данные о роли текущего пользователя в группе. ||
|#

## Пример

{% list tabs %}

- JS

    ```js
    BX24.callMethod('socialnetwork.api.workgroup.get', {
        params: {
            groupId: 622,
            select: [ 'ID', 'NAME' ],
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
    -d '{"params":{"groupId":622,"select":["ID","NAME"]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/socialnetwork.api.workgroup.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"params":{"groupId":622,"select":["ID","NAME"]},"auth":"**put_access_token_here**"}' \
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
                'select' => ['ID', 'NAME']
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
