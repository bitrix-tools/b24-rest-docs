# Добавить промпт ai.prompt.register

{% note alert %}

В настощее время, метод не реализован и возвращает ошибку "To register the prompt, use the web interface."

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметров
- отсутствует ответ в случае успеха

{% endnote %}

{% endif %}

> Scope: [`ai_admin`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `ai.prompt.register` добавляет промпт.

## Параметры метода

#|
|| **Параметр** | **Описание** ||
|| **category**
[`array`](../../data-types.md) | Категория места встройки. CoPilot может располагаться в совершенно разных местах продукта. Список категорий приведён [ниже](#category) ||
|| **code**
[`string`](../../data-types.md) | Уникальный код для промпта. В коде обязательно использовать префикс `rest_`. Этот код задаётся один раз при регистрации и затем изменить его нельзя.

Обновить препромпт возможно только через его [удаление](./ai-prompt-unregister.md) ||
|| **icon**
[`string`](../../data-types.md) | Код иконки. Найти подходящую иконку вы можете в файле [copilot_icons.pdf](https://helpdesk.bitrix24.ru/upload/api_help/rest/copilot_icons.pdf) ||
|| **prompt**
[`string`](../../data-types.md) | Текст промпта. Именно он полетит на съедение нейронке (при этом пользователь его не увидит). В тексте препромпта можно использовать спец.форматирование: [маркеры](./markers.md) и [условия](./conditions.md) ||
|| **translate**
[`object`](../../data-types.md) | Массив переводов пункта на разные языки. В идеале поддержать минимум языков: английский (en) и язык портала. Поддержка других языков — на усмотрение ||
|| **parent_code**
[`string`](../../data-types.md) | Код родительской секции. В коде обязательно использовать префикс `rest_` ||
|| **sort**
[`integer`](../../data-types.md) | Сортировка, указывается опционально. Отвечает за сортировку пунктов между собой ||
|| **section**
[`string`](../../data-types.md) | Категория в меню промптов для визуального разделения. Может иметь значения:

- create — категория «Создать из текста»
- edit — категория «Изменить текст»

Если ничего не указать, промпт будет размещен выше этих категорий
||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

### Места встройки {#category}

#|
|| **Категория места встройки** | **Где появится в CoPilot** ||
|| **livefeed** | Пост ленты новостей ||
|| **livefeed_comments** | Комментарий к одному из постов ленты новостей ||
|| **tasks** | Описание задачи ||
|| **tasks_comments** | Комментарий к одной из задач ||
|| **chat** | Сообщение в чате один на один или в групповых чатах ||
|| **mail** | Письма из личного ящика в почте ||
|| **mail_crm** | Письма с клиентами CRM в карточке сделок, контактов, компаний ||
|| **landing** | Тексты в конструкторе сайтов Б24 ||
|#

## Примеры

{% list tabs %}
- cURL (Webhook)

     ```bash
    curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"category": ["livefeed", "livefeed_comments"], "code": "rest_joke", "icon": "smile", "prompt": "Расскажи анекдот", "translate": {"en": "A joke", "ru": "Анекдот"}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/ai.prompt.register
    ```

- cURL (OAuth)

     ```bash
    curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"category": ["livefeed", "livefeed_comments"], "code": "rest_joke", "icon": "smile", "prompt": "Расскажи анекдот", "translate": {"en": "A joke", "ru": "Анекдот"}, "auth": "**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/ai.prompt.register
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'ai.prompt.register',
    		{
    			category: [
    				"livefeed",
    				"livefeed_comments"
    			],
    			code: 'rest_joke',
    			icon: 'smile',
    			prompt: 'Расскажи анекдот',
    			translate: {
    				"en":"A joke",
    				"ru":"Анекдот"
    			}
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

- BX24.js

    ```js
    BX24.callMethod(
        'ai.prompt.register',
        {
            category: [
                "livefeed",
                "livefeed_comments"
            ],
            code: 'rest_joke',
            icon: 'smile',
            prompt: 'Расскажи анекдот',
            translate: {
                "en":"A joke",
                "ru":"Анекдот"
            }
        },
        function(result)
        {
            if(result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'ai.prompt.register',
                [
                    'category' => [
                        "livefeed",
                        "livefeed_comments"
                    ],
                    'code' => 'rest_joke',
                    'icon' => 'smile',
                    'prompt' => 'Расскажи анекдот',
                    'translate' => [
                        "en" => "A joke",
                        "ru" => "Анекдот"
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error registering AI prompt: ' . $e->getMessage();
    }
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'ai.prompt.register',
        [
            'category' => [
                "livefeed",
                "livefeed_comments"
            ],
            'code' => 'rest_joke',
            'icon' => 'smile',
            'prompt' => 'Расскажи анекдот',
            'translate' => [
                "en" => "A joke",
                "ru" => "Анекдот"
            ]
        ]
    );

    echo '<pre>';
    print_r($result);
    echo '</pre>';
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

{% note alert %}

В настощее время, метод не реализован и возвращает ошибку PROMPT_NOT_REGISTER_BY_REST

{% endnote %}

## Ответ в случае ошибки

```
{
    "error": "PROMPT_NOT_REGISTER_BY_REST",
    "error_description": "To register the prompt, use the web interface."
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `PROMPT_NOT_REGISTER_BY_REST` | To register the prompt, use the web interface. ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}


## Частые кейсы и сценарии

- [{#T}](../../../tutorials/ai/add-joke-prompt.md)