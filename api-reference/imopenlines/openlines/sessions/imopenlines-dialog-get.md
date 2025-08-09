# Получить информацию о диалоге (чате) оператора открытой линии imopenlines.dialog.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- отсутствуют примеры

{% endnote %}

{% endif %}

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает информацию о диалоге (чате) оператора открытой линии.

## Параметры метода

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **CHAT_ID**
[`integer`](../../../data-types.md) | `13` | Числовой идентификатор чата | 2 ||
|| **DIALOG_ID**
[`string`](../../../data-types.md) | `chat29`
или
`256` | Идентификатор диалога. Формат:
- **chatXXX** — чат получателя, если сообщение для чата
- **XXX** — идентификатор получателя, если сообщение для приватного диалога | 2 ||
|| **SESSION_ID**
[`integer`](../../../data-types.md) | `1743` | Идентификатор сессии в рамках открытой линии | 2 ||
|| **USER_CODE**
[`string`](../../../data-types.md) | `livechat`\|`1`\|`1373`\|`211` | Строковый идентификатор пользователя открытой линии из CRM, пример `livechat`\|`1`\|`1373`\|`211` или `imol`\|`livechat`\|`1`\|`1373`\|`211` | 2 ||
|#

Можно использовать для вызова любой из параметров.

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'imopenlines.dialog.get',
    		{
    			USER_CODE: 'livechat|1|1373|211'
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	console.error(error.ex);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imopenlines.dialog.get',
                [
                    'USER_CODE' => 'livechat|1|1373|211'
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error()->ex;
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting dialog: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imopenlines.dialog.get',
        {
            USER_CODE: 'livechat|1|1373|211'
        },
        function(result){
            if(result.error())
            {
                console.error(result.error().ex);
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    {% include [Пояснение о restCommand](../../../chat-bots/_includes/rest-command.md) %}

    ```php
    $result = restCommand(
        'imopenlines.dialog.get',
        Array(
            'DIALOG_ID' => 'chat29'
        ),
        $_REQUEST["auth"]
    );
    ```

- cURL

    // пример для cURL

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

## Ответ в случае успеха

```json
{
    "result": {
        "avatar": "",
        "color": "#4ba984",
        "date_create": "2020-05-12T17:40:55+02:00",
        "dialog_id": null,
        "entity_data_1": "N|NONE|0|N|N|0|1591872180|1|0|",
        "entity_data_2": "",
        "entity_data_3": "",
        "entity_id": "livechat|1|1363|203",
        "entity_type": "LINES",
        "extranet": false,
        "id": 1364,
        "manager_list": [],
        "message_type": "L",
        "name": "Евгений Перекопский - Приоритетная поддержка",
        "owner": 0,
        "type": "lines"
    }
}
```

### Описание ключей

- `avatar` – ссылка на аватар (если пусто, значит аватар не задан)
- `color` – цвет чата в формате hex
- `date_create` – дата создания чата в формате АТОМ
- `dialog_id` – идентификатор диалога
- `entity_data_1` – внешние данные для чата
- `entity_data_2` – внешние данные для чата
- `entity_data_3` – внешние данные для чата
- `entity_id` – внешний код для чата – идентификатор
- `entity_type` – внешний код для чата – тип
- `extranet` – признак участия в чате внешнего экстранет-пользователя (`true/false`)
- `id` – идентификатор чата
- `manager_list` – список операторов
- `message_type` – тип сообщений чата
- `name` – название открытой линии
- `owner` – идентификатор пользователя-владельца чата
- `type` – тип чата (групповой чат, чат для звонка, чат открытой линии и тд)

## Ответ в случае ошибки

```json
{
    "error": "DIALOG_ID_EMPTY",
    "error_description": "Dialog ID can't be empty"
}
```

### Описание ключей

- `error` – код возникшей ошибки
- `error_description` – краткое описание возникшей ошибки

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **DIALOG_ID_EMPTY** | Не передан идентификатор диалога ||
|| **ACCESS_ERROR** | Текущий пользователь не имеет прав доступа к диалогу ||
|#