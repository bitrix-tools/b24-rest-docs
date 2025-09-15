# Добавить сообщение im.message.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствуют примеры

{% endnote %}

{% endif %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.message.add` отправляет сообщение от текущего пользователя в чат.

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **DIALOG_ID^*^**
[`string`](../../data-types.md) | `chat13`
или
`256` | Идентификатор диалога. Формат:
- **chatXXX** – чат получателя, если сообщение для чатах
- **XXX** – идентификатор получателя, если сообщение для приватного диалога | 18 ||
|| **MESSAGE^*^**
[`text`](../../data-types.md) | `Текст сообщения` | Текст сообщения.
Поддерживается [форматирование](./index.html) | 18 ||
|| **SYSTEM**
[`boolean`](../../data-types.md) | `N` | Отображать сообщения в виде системного сообщения. По умолчанию 'N'.
 
Сообщение с признаком системного нельзя изменить или удалить | 18 ||
|| **ATTACH**
[`object`](../../data-types.md) | [Пример](./attachments/index.html) | Вложение | 18 ||
|| **URL_PREVIEW**
[`boolean`](../../data-types.md) | `Y` | Преобразовывать ссылки в rich-ссылки, необязательное поле, по умолчанию 'Y' | 18 ||
|| **KEYBOARD**
[`object`](../../data-types.md) | [Пример](./keyboards.html) | Клавиатура | 18 ||
|| **MENU**
[`object`](../../data-types.md) | [Пример](./menu.html) | Контекстное меню | 18 ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{DIALOG_ID: "chat5",MESSAGE: "Сообщение [B]с вложением[/B] цвета primary и поддержкой [I]bb-кодов[/I]",ATTACH: [{MESSAGE: "API будет доступно в обновлении [B]im 24.0.0[/B]"}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/im.message.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{DIALOG_ID: "chat5",MESSAGE: "Сообщение [B]с вложением[/B] цвета primary и поддержкой [I]bb-кодов[/I]",ATTACH: [{MESSAGE: "API будет доступно в обновлении [B]im 24.0.0[/B]"}]}' \
    https://**put_your_bitrix24_address**/rest/im.message.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'im.message.add',
    		{
    			DIALOG_ID: "chat5",
    			MESSAGE: "Сообщение [B]с вложением[/B] цвета primary и поддержкой [I]bb-кодов[/I]",
    			ATTACH: [
    				{
    					MESSAGE: "API будет доступно в обновлении [B]im 24.0.0[/B]"
    				},
    			],
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log('response', result.answer);
    	if (result.error())
    		alert("Error: " + result.error());
    	else
    		console.log(result);
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
                'im.message.add',
                [
                    'DIALOG_ID' => "chat5",
                    'MESSAGE' => "Сообщение [B]с вложением[/B] цвета primary и поддержкой [I]bb-кодов[/I]",
                    'ATTACH' => [
                        [
                            'MESSAGE' => "API будет доступно в обновлении [B]im 24.0.0[/B]"
                        ],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        echo 'response: ' . $result['answer'];
    
        if ($result['error']) {
            echo 'Error: ' . $result['error'];
        } else {
            echo 'Data: ' . print_r($result['data'], true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding message: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(    
        'im.message.add',
        {
            DIALOG_ID: "chat5",
            MESSAGE: "Сообщение [B]с вложением[/B] цвета primary и поддержкой [I]bb-кодов[/I]",
            ATTACH: [
                {
                    MESSAGE: "API будет доступно в обновлении [B]im 24.0.0[/B]"
                },
            ],
        },
        function(result) {
            console.log('response', result.answer);
            if(result.error())
                alert("Error: " + result.error());
            else
            console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'im.message.add',
        [
            "DIALOG_ID" => "chat20921",
            "MESSAGE"   => "Сообщение [B]с вложением[/B] цвета primary и поддержкой [I]bb-кодов[/I]",
            "ATTACH":   => [
                [
                    "MESSAGE" => "API будет доступно в обновлении [B]im 24.0.0[/B]"
                ],
            ],
        ]
    );

    echo '<pre>';
    print_r($result);
    echo '</pre>';
    ```

{% endlist %}

{% note tip "Частые кейсы и сценарии" %}

- [Пример использования метода в приложении «ЭхоБот»](https://github.com/bitrix24com/bots)

{% endnote %}

## Ответ в случае успеха

```json
{
    "result": 11
}
```

**Результат выполнения**: идентификатор сообщения `MESSAGE_ID` или ошибка.

## Ответ в случае ошибки

```json
{
    "error": "USER_ID_EMPTY",
    "error_description": "Идентификатор получателя не задан в случае отправки сообщения в чат один-на-один"
}
```

### Описание ключей

- `error` – код возникшей ошибки
- `error_description` – краткое описание возникшей ошибки

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **USER_ID_EMPTY** | Идентификатор получателя не задан в случае отправки сообщения в чат один-на-один ||
|| **CHAT_ID_EMPTY** | Идентификатор чата получателя не задан в случае отправки сообщения в чат ||
|| **ACCESS_ERROR** | Недостаточно прав для отправки сообщения ||
|| **MESSAGE_EMPTY** | Не передан текст сообщения ||
|| **ATTACH_ERROR** | Весь переданный объект вложения не прошел валидацию ||
|| **ATTACH_OVERSIZE** | Превышен максимально допустимый размер вложения (30 Кб) ||
|| **KEYBOARD_ERROR** | Весь переданный объект клавиатуры не прошел валидацию ||
|| **KEYBOARD_OVERSIZE** | Превышен максимально допустимый размер клавиатуры (30 Кб) ||
|| **MENU_ERROR** | Весь переданный объект меню не прошел валидацию ||
|| **MENU_OVERSIZE** | Превышен максимально допустимый размер меню (30 Кб) ||
|| **PARAMS_ERROR** | Что-то пошло не так ||
|#

## Ссылки по теме

- [Как работать с набираемыми клавиатурами](./keyboards.html)
- [Как работать с вложениями](./attachments/index.html)
- [Форматирование сообщений](./index.html)
- [Работа с контекстным меню](./menu.html)
