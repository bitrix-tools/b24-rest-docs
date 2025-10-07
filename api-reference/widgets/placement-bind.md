# Установить обработчик виджета placement.bind

> Scope: [`placement`, `в зависимости от места встройки`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод добавляет обработчик встройки виджета.

Он может быть вызван в любой момент во время работы приложения, однако чаще всего, удобнее регистрировать свои виджеты во время [установки приложения](../../settings/app-installation/index.md).

Важно учитывать, что пока установка приложения не завершена, зарегистрированные вами виджеты не будут доступны обычным пользователям в интерфейсе Битрикс24 - их смогут видеть только пользователи с административными правами. 
[Проверьте установку приложения](../../settings/app-installation/installation-finish.md).

## Параметры метода {#params}

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **PLACEMENT***
[`string`](../data-types.md) | Идентификатор требуемого места встройки виджета ||
|| **HANDLER***
[`string`](../data-types.md) | URL обработчика места встройки виджета ||
|| **TITLE**
[`string`](../data-types.md) | Название виджета в интерфейсе. В зависимости от конкретного места встройки это может быть название вкладки в форме, название пункта меню и т.д. ||
|| **DESCRIPTION**
[`string`](../data-types.md) | Описание виджета в интерфейсе. На практике не используется ||
|| **GROUP_NAME**
[`string`](../data-types.md) | Позволяет объединять элементы пользовательского интерфейса для нескольких обработчиков одного и того же типа виджета в группу. Например, несколько пунктов выпадающего меню в [верхней кнопке карточки CRM](./crm/detail-toolbar.md). Поддерживается только некоторыми типами виджетов ||
|| **LANG_ALL**
[`object`](../data-types.md) | Массив параметров `TITLE`, `DESCRIPTION` и `GROUP_NAME` для указанных языков. Пользователи, у которых в интерфейсе Битрикс24 выбран один из таких языков, будут видеть локализованные версии `TITLE`, `DESCRIPTION` и `GROUP_NAME`: 

```json

    "LANG_ALL": {
        "en": {
            "TITLE": "title",
            "DESCRIPTION": "description",
            "GROUP_NAME": "group"
        },
        "ru": {
            "TITLE": "заголовок",
            "DESCRIPTION": "описание",
            "GROUP_NAME": "группа"
        }
    }

```

||
|| **OPTIONS**
[`object`](../data-types.md) | Дополнительные параметры отображения виджета. Конкретные значения зависит от места встройки виджета. На текущий момент используется в виджетах для мессенджера, в виджете [`PAGE_BACKGROUND_WORKER`](./universal/background-worker.md) и в виджете [CRM_XXX_DETAIL_ACTIVITY](../widgets/crm/detail-activity-area.md)

||
|| **USER_ID**
[`integer`](../data-types.md) | Идентификатор пользователя Битрикс24, для которого будет доступен зарегистрированный виджет. Возможные значение можно получить с помощью метода [user.get](../user/user-get.md)

На текущий момент этот параметр поддерживается только виджетом [`PAGE_BACKGROUND_WORKER`](./universal/background-worker.md).

При попытке регистрации места встраивания в прочих виджетах, вы получите ошибку `ERROR_PLACEMENT_USER_MODE: User mode is not available`.

||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"PLACEMENT":"PLACEMENT_CODE","HANDLER":"http://myapp.com/handler/?type=1","OPTIONS":{"errorHandlerUrl":"http://myapp.com/error/"},"TITLE":"title","DESCRIPTION":"description","GROUP_NAME":"group","LANG_ALL":{"en":{"TITLE":"title","DESCRIPTION":"description","GROUP_NAME":"group"},"ru":{"TITLE":"заголовок","DESCRIPTION":"описание","GROUP_NAME":"группа"}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/placement.bind
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"PLACEMENT":"PLACEMENT_CODE","HANDLER":"http://myapp.com/handler/?type=1","OPTIONS":{"errorHandlerUrl":"http://myapp.com/error/"},"TITLE":"title","DESCRIPTION":"description","GROUP_NAME":"group","LANG_ALL":{"en":{"TITLE":"title","DESCRIPTION":"description","GROUP_NAME":"group"},"ru":{"TITLE":"заголовок","DESCRIPTION":"описание","GROUP_NAME":"группа"}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/placement.bind
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"placement.bind",
    		{ 
    			"PLACEMENT": "PLACEMENT_CODE",
    			"HANDLER": "http://myapp.com/handler/?type=1",
    			"OPTIONS": {
    				"errorHandlerUrl": "http://myapp.com/error/"
    			},
    			"TITLE": "title",
    			"DESCRIPTION": "description",
    			"GROUP_NAME": "group",
    			"LANG_ALL": {
    				"en": {
    					"TITLE": "title",
    					"DESCRIPTION": "description",
    					"GROUP_NAME": "group",
    				},
    				"ru": {
    					"TITLE": "заголовок",
    					"DESCRIPTION": "описание",
    					"GROUP_NAME": "группа",
    				}
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    		console.error(result.error());
    	else
    		console.info(result);
    }
    catch(error)
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
                'placement.bind',
                [
                    'PLACEMENT' => 'PLACEMENT_CODE',
                    'HANDLER' => 'http://myapp.com/handler/?type=1',
                    'OPTIONS' => [
                        'errorHandlerUrl' => 'http://myapp.com/error/'
                    ],
                    'TITLE' => 'title',
                    'DESCRIPTION' => 'description',
                    'GROUP_NAME' => 'group',
                    'LANG_ALL' => [
                        'en' => [
                            'TITLE' => 'title',
                            'DESCRIPTION' => 'description',
                            'GROUP_NAME' => 'group',
                        ],
                        'ru' => [
                            'TITLE' => 'заголовок',
                            'DESCRIPTION' => 'описание',
                            'GROUP_NAME' => 'группа',
                        ]
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error binding placement: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "placement.bind",
        { 
            "PLACEMENT": "PLACEMENT_CODE",
            "HANDLER": "http://myapp.com/handler/?type=1",
            "OPTIONS": {
                "errorHandlerUrl": "http://myapp.com/error/"
            },
            "TITLE": "title",
            "DESCRIPTION": "description",
            "GROUP_NAME": "group",
            "LANG_ALL": {
                "en": {
                    "TITLE": "title",
                    "DESCRIPTION": "description",
                    "GROUP_NAME": "group",
                },
                "ru": {
                    "TITLE": "заголовок",
                    "DESCRIPTION": "описание",
                    "GROUP_NAME": "группа",
                }
            }
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

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'placement.bind',
        [
            'PLACEMENT' => 'PLACEMENT_CODE',
            'HANDLER' => 'http://myapp.com/handler/?type=1',
            'OPTIONS' => [
                'errorHandlerUrl' => 'http://myapp.com/error/'
            ],
            'TITLE' => 'title',
            'DESCRIPTION' => 'description',
            'GROUP_NAME' => 'group',
            'LANG_ALL' => [
                'en' => [
                    'TITLE' => 'title',
                    'DESCRIPTION' => 'description',
                    'GROUP_NAME' => 'group'
                ],
                'ru' => [
                    'TITLE' => 'заголовок',
                    'DESCRIPTION' => 'описание',
                    'GROUP_NAME' => 'группа'
                ]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

{% note tip "Частые кейсы и сценарии" %}

- [{#T}](../../tutorials/crm/crm-widgets/widget-as-detail-tab.md)
- [{#T}](../../tutorials/crm/crm-widgets/widget-as-field-in-lead-page.md)

{% endnote %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1712132792.910734,
        "finish": 1712132793.530359,
        "duration": 0.6196250915527344,
        "processing": 0.032338857650756836,
        "date_start": "2024-04-03T10:26:32+02:00",
        "date_finish": "2024-04-03T10:26:33+02:00",
        "operating_reset_at": 1705765533,
        "operating": 3.3076241016387939
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | Возвращает результат добавления обработчика виджета. Возможные значения:

- `True`, обработчик успешно зарегистрирован;
- `False`, обработчик не зарегистрирован
||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**, **200**

```json
{
    "error": "ERROR_ARGUMENT",
    "error_description": "Argument 'PLACEMENT' is null or empty",
    "argument": "PLACEMENT"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Статус** ||
|| `ERROR_PLACEMENT_MAX_COUNT` | Произошла попытка повторной регистрации обработчика виджета `PAGE_BACKGROUND_WORKER` | 200 ||
|| `ERROR_ARGUMENT` | Не указано значение обязательного поля. Код обязательного поля возвращается в `argument`| 200 ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Обработчик виджета

 Итак, успешный вызов метода `placement.bind` позволил вам зарегистрировать обработчик виджета. Важно, чтобы указанный вами параметр HANDLER_URL указывал на реальный и доступный URL.

{% note warning "Важно" %}

Требуется, чтобы URL обработчика был **обязательно** доступен из внешней сети. Ссылки на localhost, локальные домены и аналогичные способы обращения к локальному вебсерверу не годятся. Проверяйте доступность указанного вами URL с помощь специальных сервисов, контролирующих доступность сайтов!

{% endnote %}

Обращаясь к вашему обработчику, Битрикс24 передаст в него POST-message, содержащий информацию о контексте виджета, например, идентификатор сделки, если виджет встраивается в карточку сделки в CRM и т.д.

Примеры таких данных вы найдете в описаниях [конкретных мест встройки виджетов](./placements.md).

## Продолжите изучение

- [{#T}](./placements.md)
- [{#T}](./placement-list.md)
- [{#T}](./placement-unbind.md)
- [{#T}](./ui-interaction/index.md)
