# Событие при изменении комментария OnTaskCommentUpdate

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие срабатывает после изменения комментария в задаче. 

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
array(
    'event' => 'ONTASKCOMMENTUPDATE',
    'data' => array(
        'FIELDS_BEFORE' => array('ID' => 123, 'TASK_ID' => 555),
        'FIELDS_AFTER' => array('ID' => 123, 'TASK_ID' => 555, 'ACTION' => 'EDIT'),
        'IS_ACCESSIBLE_BEFORE' => 'undefined',
        'IS_ACCESSIBLE_AFTER' => 'undefined',
    ),
    'ts' => '1466439714',
    'auth' => array(
        'access_token' => 's6p6eclrvim6da22ft9ch94ekreb52lv',
        'expires_in' => '3600',
        'scope' => 'crm',
        'domain' => 'some-domain.bitrix24.com',
        'server_endpoint' => 'https://oauth.bitrix24.tech/rest/',
        'status' => 'F',
        'client_endpoint' => 'https://some-domain.bitrix24.com/rest/',
        'member_id' => 'a223c6b3710f85df22e9377d6c4f7553',
        'refresh_token' => '4s386p3q0tr8dy89xvmt96234v3dljg8',
        'application_token' => '51856fefc120afa4b628cc82d3935cce',
        ),
)
```

{% include notitle [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **event***
[`string`](../../../data-types.md) | Символьный код события, в данном случае `OnTaskUpdate`||
|| **data***
[`array`](../../../data-types.md) | Массив с данными комментария задачи ||
|| **ts***
[`timestamp`](../../../data-types.md) | Дата и время отправки события из [очереди событий](../../../events/index.md) ||
|| **auth***
[`array`](../../../data-types.md) | Параметры авторизации и данные о портале, на котором произошло событие ||
|#

### Параметр data[]

{% include notitle [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **FIELDS_BEFORE***
[`undefined`\|`object`](../../../data-types.md) | Поля комментария и задачи до события (подробное описание приведено [ниже](#fields_before)). В случае отсутствия доступных полей задачи данное поле будет содержать значение `undefined` ||
|| **FIELDS_AFTER***
[`undefined`\|`object`](../../../data-types.md) | Поля комментария и задачи после события (подробное описание приведено [ниже](#fields_after)). В случае отсутствия доступных полей задачи данное поле будет содержать значение `undefined` ||
|| **IS_ACCESSIBLE_BEFORE***
[`string`](../../../data-types.md) | Была ли доступна задача на чтение до события (подробное описание приведено [ниже](#is_accessible_before)) ||
|| **IS_ACCESSIBLE_AFTER***
[`string`](../../../data-types.md) | Стала ли доступна задача на чтение после события (подробное описание приведено [ниже](#is_accessible_after)) ||
|#

### Поле FIELDS_BEFORE {#fields_before}

{% include notitle [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`integer`](../../../data-types.md) | Идентификатор обновленного комментария ||
|| **TASK_ID***
[`integer`](../../../data-types.md) | Идентификатор задачи, к которой принадлежит комментарий ||
|#

### Поле FIELDS_AFTER {#fields_after}

{% include notitle [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`integer`](../../../data-types.md) | Идентификатор обновленного комментария ||
|| **TASK_ID***
[`integer`](../../../data-types.md) | Идентификатор задачи, к которой принадлежит комментарий ||
|| **ACTION***
[`string`](../../../data-types.md) | Действие, в данном случае будет всегда `EDIT` ||
|#

### Поле IS_ACCESSIBLE_BEFORE {#is_accessible_before}

{% include notitle [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **IS_ACCESSIBLE_BEFORE***
[`string`](../../../data-types.md) | Возможные значения:
- `Y` (Yes) — да
- `N` (No) — нет
- `undefined` — не определено или проверка не производилась ||
  |#

### Поле IS_ACCESSIBLE_AFTER {#is_accessible_after}

{% include notitle [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **IS_ACCESSIBLE_AFTER***
[`string`](../../../data-types.md) | Возможные значения:
- `Y` (Yes) — да
- `N` (No) — нет
- `undefined` — не определено или проверка не производилась ||
  |#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'event.bind',
    		{
    			"event": "OnTaskCommentUpdate",
    			"handler": "https://example.com/handler.php"
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
    }
    catch( error )
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'event.bind',
                [
                    'event'   => 'OnTaskCommentUpdate',
                    'handler' => 'https://example.com/handler.php',
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error binding event: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'event.bind',
        {
            "event": "OnTaskCommentUpdate",
            "handler": "https://example.com/handler.php"
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'event.bind',
        [
            'event' => 'OnTaskCommentUpdate',
            'handler' => 'https://example.com/handler.php'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./on-task-comment-add.md)
- [{#T}](./on-task-comment-delete.md)
