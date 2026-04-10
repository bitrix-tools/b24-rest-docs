# Создать группу или проект sonet_group.create

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`sonet`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом создания группы или проекта

Метод `sonet_group.create` создает рабочую группу или проект.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME***
[`string`](../data-types.md) | Название группы или проекта ||
|| **DESCRIPTION**
[`string`](../data-types.md) | Описание группы или проекта ||
|| **VISIBLE**
[`string`](../data-types.md) | Видимость группы в списке.

Возможные значения:
- `Y` — группа видна в общем списке
- `N` — группа скрыта из общего списка

По умолчанию — `Y`. Для экстранет-пользователя значение принудительно устанавливается в `N` ||
|| **OPENED**
[`string`](../data-types.md) | Открыта ли группа для свободного вступления.

Возможные значения:
- `Y` — пользователь может вступить в группу без подтверждения
- `N` — вступление по приглашению или запросу

По умолчанию — `N`. Для экстранет-пользователя значение принудительно устанавливается в `N` ||
|| **CLOSED**
[`string`](../data-types.md) | Архивная ли группа.

Возможные значения:
- `Y` — группа в архиве
- `N` — активная группа 

По умолчанию — `N` ||
|| **KEYWORDS**
[`string`](../data-types.md) | Ключевые слова через запятую ||
|| **INITIATE_PERMS**
[`string`](../data-types.md) | Кто может приглашать участников.

Возможные значения:
- `A` — только владелец группы
- `E` — владелец и модераторы
- `K` — все участники

Если параметр не передан, используется значение по умолчанию:
- для интранет-пользователя — `K`
- для экстранет-пользователя — `E` ||
|| **PROJECT**
[`string`](../data-types.md) | Создать проект вместо группы.

Возможные значения:
- `Y` — создать проект
- `N` — создать группу 

По умолчанию — `N` ||
|| **PROJECT_DATE_START**
[`datetime`](../data-types.md) | Дата начала проекта в формате ISO-8601 ||
|| **PROJECT_DATE_FINISH**
[`datetime`](../data-types.md) | Дата окончания проекта в формате ISO-8601 ||
|| **SCRUM_MASTER_ID**
[`integer`](../data-types.md) | Идентификатор скрам-мастера, если проект создается как скрам.

Идентификатор пользователя можно получить методом [user.get](../user/user-get.md) ||
|| **OWNER_ID**
[`integer`](../data-types.md) | Идентификатор владельца.

Идентификатор пользователя можно получить методом [user.get](../user/user-get.md).

Указание владельца доступно только администраторам. Для всех остальных владельцем автоматически становится текущий пользователь ||
|| **IMAGE**
[`file`](../data-types.md) | Аватар группы в формате [Base64](../files/how-to-upload-files.md#kak-kodirovat-fajl-v-base64) ||
|| **IMAGE_FILE_ID**
[`integer`](../data-types.md) | Идентификатор файла из Диска для установки аватара.

Идентификатор файла можно получить методами [disk.storage.getchildren](../disk/storage/disk-storage-get-children.md) и [disk.folder.getchildren](../disk/folder/disk-folder-get-children.md).

Если одновременно передать и `IMAGE_FILE_ID`, и `IMAGE`, приоритет отдается `IMAGE_FILE_ID` ||
|| **SITE_ID**
[`array`](../data-types.md) | Список идентификаторов сайтов, к которым привязывается группа

По умолчанию — текущий сайт ||
|| **SUBJECT_ID**
[`integer`](../data-types.md) | Идентификатор тематики группы ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"NAME":"Новый проект","PROJECT":"Y","VISIBLE":"Y","OPENED":"N","INITIATE_PERMS":"K","IMAGE":["avatar.png","iVBORw0KGgoAAAANSUhEUgAA..."]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sonet_group.create
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"NAME":"Новый проект","PROJECT":"Y","VISIBLE":"Y","OPENED":"N","INITIATE_PERMS":"K","IMAGE":["avatar.png","iVBORw0KGgoAAAANSUhEUgAA..."],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sonet_group.create
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'sonet_group.create',
            {
                NAME: 'Новый проект',
                PROJECT: 'Y',
                VISIBLE: 'Y',
                OPENED: 'N',
                INITIATE_PERMS: 'K',
                IMAGE: [
                    'avatar.png',
                    'iVBORw0KGgoAAAANSUhEUgAA...'
                ]
            }
        );
        
        const result = response.getData().result;
        console.log('Created group with ID:', result);
        processResult(result);
    }
    catch( error )
    {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sonet_group.create',
                [
                    'NAME' => 'Новый проект',
                    'PROJECT' => 'Y',
                    'VISIBLE' => 'Y',
                    'OPENED' => 'N',
                    'INITIATE_PERMS' => 'K',
                    'IMAGE' => [
                        'avatar.png',
                        'iVBORw0KGgoAAAANSUhEUgAA...'
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error creating group: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod('sonet_group.create',
        {
            NAME: 'Новый проект',
            PROJECT: 'Y',
            VISIBLE: 'Y',
            OPENED: 'N',
            INITIATE_PERMS: 'K',
            IMAGE: [
                'avatar.png',
                'iVBORw0KGgoAAAANSUhEUgAA...'
            ]
        }, 
        function(result)
        {
            if (result.error())
            {
                console.error(result.error(), result.error_description());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sonet_group.create',
        [
            'NAME' => 'Новый проект',
            'PROJECT' => 'Y',
            'VISIBLE' => 'Y',
            'OPENED' => 'N',
            'INITIATE_PERMS' => 'K',
            'IMAGE' => [
                'avatar.png',
                'iVBORw0KGgoAAAANSUhEUgAA...'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 77,
    "time": {
        "start": 1773921687,
        "finish": 1773921688.071989,
        "duration": 1.0719890594482422,
        "processing": 1,
        "date_start": "2026-03-19T15:01:27+03:00",
        "date_finish": "2026-03-19T15:01:28+03:00",
        "operating_reset_at": 1773922287,
        "operating": 0.9421911239624023
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../data-types.md) | Идентификатор созданной группы или проекта ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Cannot create group"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| — | `Incorrect input data` | Передан некорректный формат параметров ||
|| — | `You have no permissions to create a group` | Недостаточно прав для создания группы или проекта ||
|| — | `Cannot create group` | Не удалось создать группу или проект ||
|| `ERROR_IMAGE_ID` | `Изображение не корректно: Неверный тип файла` | Передан некорректный `IMAGE` ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sonet-group-update.md)
- [{#T}](./socialnetwork-api-workgroup-get.md)
- [{#T}](./socialnetwork-api-workgroup-list.md)
- [{#T}](./sonet-group-get.md)
- [{#T}](./sonet-group-delete.md)
