# Обновить воронку crm.category.update

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с административным доступом к разделу CRM

Метод обновляет воронку (направление) с идентификатором `id`, задав ей новые значения полей из `fields`. Если какое-то поле будет отсутствовать в `fields`, то его значение останется неизменным.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId***
[`integer`][1] | Идентификатор [системного](../../index.md) или [пользовательского типа](../user-defined-object-types/index.md) сущностей CRM у которого будет обновлена воронка            ||
|| **id***
[`integer`][1] | Идентификатор воронки. Можно получить методом [`crm.category.list`](./crm-category-list.md) или при создании воронки методом [`crm.category.add`](./crm-category-add.md) ||
|| **fields***
[`object`][1]  |  Значения полей (подробное описание приведено [ниже](#parametr-fields)) для обновления полей воронки в виде структуры:

```js
fields: {
    name: "значение",
    sort: "значение",
    isDefault: "значение",
},
```

  ||
|#

### Параметр fields

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`][1] | Название воронки. Каким может быть название:
- длина не может быть больше `255` символов
- не может быть пустым
- не может состоять только лишь из пробелов, табов и так далее

По умолчанию равно `-` ||
|| **sort**
[`integer`][1] | Индекс сортировки. 

Не может быть отрицательным. Если передать в `sort` значение меньше нуля, оно будет проигнорировано и выставиться `sort = 0`

По умолчанию имеет значение `500` || 
|| **isDefault**
[`boolean`][1] | Является ли воронка, воронкой по умолчанию. Может иметь значения:
- `Y` — да, является
- `N` — нет

По умолчанию равно `N`

В сделках поле `isDefault` недоступно для изменения.

Узнать неизменяемое ли поле можно с помощью метода [`crm.category.fields`](./crm-category-fields.md). Неизменяемые поля имеют свойство `isReadonly = true` ||
|#


## Примеры кода

Как обновить воронку с `id = 4` в смарт-процессе с `entityTypeId = 1152`

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":1152,"id":4,"fields":{"name":"Новое название воронки","sort":1000,"isDefault":"Y"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.category.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":1152,"id":4,"fields":{"name":"Новое название воронки","sort":1000,"isDefault":"Y"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.category.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.category.update",
    		{
    			entityTypeId: 1152,
    			id: 4,
    			fields: {
    				name: "Новое название воронки",
    				sort: 1000,
    				isDefault: "Y",
    			},
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
                'crm.category.update',
                [
                    'entityTypeId' => 1152,
                    'id'          => 4,
                    'fields'      => [
                        'name'     => 'Новое название воронки',
                        'sort'     => 1000,
                        'isDefault' => 'Y',
                    ],
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
        echo 'Error updating category: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.category.update",
        {
            entityTypeId: 1152,
            id: 4,
            fields: {
                name: "Новое название воронки",
                sort: 1000,
                isDefault: "Y",
            },
        },
        (result) => 
        {
            if (result.error())
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

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.category.update',
        [
            'entityTypeId' => 1152,
            'id' => 4,
            'fields' => [
                'name' => "Новое название воронки",
                'sort' => 1000,
                'isDefault' => "Y"
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
    "result": {
        "category": {
            "id": 4,
            "name": "Новое название воронки",
            "sort": 1000,
            "entityTypeId": 1152,
            "isDefault": "Y"
        }
    },
    "time": {
        "start": 1718359296.368324,
        "finish": 1718359296.65352,
        "duration": 0.28519606590270996,
        "processing": 0.03645014762878418,
        "date_start": "2024-06-14T12:01:36+02:00",
        "date_finish": "2024-06-14T12:01:36+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа. Содержит объект [`category`](./crm-category-add.md#category) ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "NOT_FOUND",
    "error_description": "Смарт-процесс не найден"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `NOT_FOUND` | Смарт-процесс не найден | Возникает при некорректных значениях `entityTypeId` ||
|| `ENTITY_TYPE_NOT_SUPPORTED` | Entity type `{entityTypeName}` is not supported | Возникает, если объект CRM не поддерживает воронки ||
|| `NOT_FOUND` | Элемент не найден | Возникает, если обновляемой воронки не существует ||
|| `ACCESS_DENIED` | Доступ запрещен | Возникает, если у пользователя, обновляющего воронку, недостаточно прав ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-category-add.md)
- [{#T}](./crm-category-get.md)
- [{#T}](./crm-category-list.md)
- [{#T}](./crm-category-delete.md)
- [{#T}](./crm-category-fields.md)

[1]: ../../../data-types.md
