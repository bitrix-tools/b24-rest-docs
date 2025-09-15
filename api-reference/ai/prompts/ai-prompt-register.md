# Добавить промпт ai.prompt.register

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`ai_admin`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `ai.prompt.register` добавляет промпт.

#|
|| **Параметр** | **Описание** ||
|| **category**
[`unknown`](../../data-types.md) | Категория места встройки. CoPilot может располагаться в совершенно разных местах продукта. Список категорий приведён [ниже](#category) ||
|| **code**
[`unknown`](../../data-types.md) | Уникальный код для промпта. В коде обязательно использовать префикс `rest_`. Этот код задаётся один раз при регистрации и затем изменить его нельзя.

Обновить препромпт возможно только через его [удаление](./ai-prompt-unregister.md) ||
|| **icon**
[`unknown`](../../data-types.md) | Код иконки. Найти подходящую иконку вы можете в файле [copilot_icons.pdf](/upload/api_help/rest/copilot_icons.pdf) ||
|| **prompt**
[`unknown`](../../data-types.md) | Текст промпта. Именно он полетит на съедение нейронке (при этом пользователь его не увидит). В тексте препромпта можно использовать спец.форматирование: [маркеры](./markers.md) и [условия](./conditions.md) ||
|| **translate**
[`unknown`](../../data-types.md) | Массив переводов пункта на разные языки. В идеале поддержать минимум языков: английский (en) и язык портала. Поддержка других языков — на усмотрение ||
|| **parent_code**
[`unknown`](../../data-types.md) | Код родительской секции. В коде обязательно использовать префикс `rest_` ||
|| **sort**
[`unknown`](../../data-types.md) | Сортировка, указывается опционально. Отвечает за сортировку пунктов между собой ||
|| **section**
[`unknown`](../../data-types.md) | Категория в меню промптов для визуального разделения. Может иметь значения:

- create — категория «Создать из текста»
- edit — категория «Изменить текст»

Если ничего не указать, промпт будет размещен выше этих категорий
||
|#

## Category

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

    // пример для cURL (Webhook)

- cURL (OAuth)

    // пример для cURL (OAuth)

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

- PHP CRest

    // пример для php

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

## Ответ в случае ошибки

## Частые кейсы и сценарии

- [{#T}](../../../tutorials/ai/add-joke-prompt.md)