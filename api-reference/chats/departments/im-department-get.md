# Получить информацию о подразделении im.department.get

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

Метод `im.department.get` получает данные о подразделении.

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **ID^*^**
[`unknown`](../../data-types.md) | `[51]` | Идентификаторы подразделений | 18 ||
|| **USER_DATA**
[`unknown`](../../data-types.md) | `N` | Подгружать данные о пользователях | 18 ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

- Если передан параметр `USER_DATA = Y`, то к результату будут подгружены данные о руководителе.

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'im.department.get',
    		{
    			ID: [51]
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
                'im.department.get',
                [
                    'ID' => [51]
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
        echo 'Error getting department information: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.department.get',
        {
            ID: [51]
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

    {% include [Пояснение о restCommand](../_includes/rest-command.md) %}

    ```php
    $result = restCommand(
        'im.department.get',
        Array(
            'ID' => [51],
        ),
        $_REQUEST[
            "auth"
        ]
    );    
    ```

- cURL

    // пример для cURL

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

```json
{
    "result": [
        {
            "id": 51,
            "name": "Московский филиал",
            "full_name": "Московский филиал / Битрикс"
            "manager_user_id": 11,
        }
    ]
}    
```

### Описание ключей

- `id` – идентификатор подразделения
- `name` – краткое название подразделения
- `full_name` – полное название подразделения
- `manager_user_data` – объект описания данных руководителя (не доступно, если `USER_DATA != 'Y'`):
- `id` – идентификатор пользователя
- `name` – имя и фамилия пользователя
- `first_name` – имя пользователя
- `last_name` – фамилия пользователя
- `work_position` – должность
- `color` – цвет пользователя в формате hex
- `avatar` – ссылка на аватар (если пусто, значит аватар не задан)
- `gender` – пол пользователя
- `birthday` – день рождения пользователя в формате DD-MM, если пусто – не задан
- `extranet` – признак внешнего экстранет-пользователя (`true/false`)
- `network` – признак пользователя Битрикс24.Network (`true/false`)
- `bot` – признак бота (`true/false`)
- `connector` – признак пользователя открытых линий (`true/false`)
- `external_auth_id` – код внешней авторизации
- `status` – статус пользователя. Всегда отображается как online, даже если пользователь установил статус «Не беспокоить». Статус «Не беспокоить» влияет только на получение уведомлений и не виден другим пользователям
- `idle` – дата, когда пользователь отошел от компьютера, в формате АТОМ (если не задано, `false`)
- `last_activity_date` – дата последнего действия пользователя в формате АТОМ
- `mobile_last_date` – дата последнего действия в мобильном приложении в формате АТОМ (если не задано, `false`)
- `absent` – дата, по какое число у пользователя отпуск, в формате АТОМ (если не задано, `false`)

## Ответ в случае ошибки

```json
{
    "error": "INVALID_FORMAT",
    "error_description": "A wrong format for the ID field is passed"
}
```

### Описание ключей

- `error` – код возникшей ошибки
- `error_description` – краткое описание возникшей ошибки

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **INVALID_FORMAT** | Передан некорректный формат идентификаторов ||
|#

