# Получить данные о чате im.dialog.get

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

> Scope: [`im`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.dialog.get` получает информацию о диалоге.

{% include [Сноска о параметрах](../../_includes/required.md) %}

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **DIALOG_ID^*^**
[`string`](../data-types.md) | `chat29`
или
`256` | Идентификатор диалога. Формат:
- **chatXXX** – чат получателя, если сообщение для чата
- **XXX** – идентификатор получателя, если сообщение для приватного диалога | 24 ||
|#

## Примеры

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"DIALOG_ID":"chat1"}' https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/im.dialog.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"DIALOG_ID":"chat1","auth":"**put_access_token_here**"}' https://**put_your_bitrix24_address**/rest/im.dialog.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'im.dialog.get',
    		{
    			DIALOG_ID: 'chat1'
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
                'im.dialog.get',
                [
                    'DIALOG_ID' => 'chat1'
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error()->ex);
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
        'im.dialog.get',
        {
            DIALOG_ID: 'chat1'
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

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'im.dialog.get',
        [
            'DIALOG_ID' => 'chat1'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Ответ в случае успеха

```json
{
    "result":
    {
        "id": "21191",
        "title": "Мятный чат №3",
        "owner": "2",
        "extranet": false,
        "avatar": "",
        "color": "#4ba984",
        "type": "chat",
        "entity_type": "",
        "entity_data_1": "",
        "entity_data_2": "",
        "entity_data_3": "",
        "date_create": "2017-10-14T12:15:32+02:00",
        "message_type": "C"
    }
}
```

### Описание ключей

- `id` – идентификатор чата
- `title` – название чата
- `owner` – идентификатор пользователя владельца чата
- `extranet` – признак участия в чате внешнего экстранет-пользователя (`true/false`)
- `color` – цвет чата в формате hex
- `avatar` – ссылка на аватар (если пусто, значит аватар не задан)
- `type` – тип чата (групповой чат, чат для звонка, чат открытой линии и тд)
- `entity_type` – внешний код для чата – тип
- `entity_id` – внешний код для чата – идентификатор
- `entity_data_1` – внешние данные для чата
- `entity_data_2` – внешние данные для чата
- `entity_data_3` – внешние данные для чата
- `date_create` – дата создания чата в формате АТОМ
- `message_type` – тип сообщений чата

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