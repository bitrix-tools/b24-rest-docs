# Добавить новую воронку crm.category.add

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с административным доступом к разделу CRM

Метод создает у типа объекта CRM с идентификатором `entityTypeId` новую воронку (направление).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId*** 
[`integer`][1] | Идентификатор [системного](../../index.md) или [пользовательского типа](../user-defined-object-types/index.md) сущности CRM для которой будет создана новая воронка ||
|| **fields***
[`object`][1]  | Значения полей (подробное описание приведено [ниже](#parametr-fields)) для добавления новой воронки в виде структуры:

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

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
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

По умолчанию равно `N`.

В сделках поле `isDefault` недоступно для изменения. 

Ограничения на изменение поля `isDefault` в смарт-процессах:
- нельзя удалить направление по умолчанию,
- при создании нового направления и передаче ему флага `isDefault: "Y"`, старое направление по умолчанию перестанет быть направлением по умолчанию,
- при изменении направления по умолчанию нельзя сделать его направлением не по умолчанию,
- при изменении направления не по умолчанию с передачей ему флага `isDefault: "Y"` старое направление по умолчанию перестанет быть направлением по умолчанию.

Если для имеющегося смарт-процесса отключен показ направлений в интерфейсе, то работа с направлениями через rest все равно возможна
||
|#

## Примеры кода

Создать новую воронку по умолчанию в смарт-процессе с `entityTypeId = 1152`.

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId": 1152, "fields": {"name": "Новая воронка по умолчанию", "sort": 50, "isDefault": "Y"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.category.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId": 1152, "fields": {"name": "Новая воронка по умолчанию", "sort": 50, "isDefault": "Y"}, "auth": "**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.category.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.category.add',
    		{
    			entityTypeId: 1152,
    			fields: {
    				name: 'Новая воронка по умолчанию',
    				sort: 50,
    				isDefault: 'Y',
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
                'crm.category.add',
                [
                    'entityTypeId' => 1152,
                    'fields' => [
                        'name'     => 'Новая воронка по умолчанию',
                        'sort'     => 50,
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
        echo 'Error adding category: ' . $e->getMessage();
    }
    ```

- BX24.js

	```js
    BX24.callMethod(
        "crm.category.add",
        {
            entityTypeId: 1152,
            fields: {
                name: "Новая воронка по умолчанию",
                sort: 50,
                isDefault: 'Y',
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
        'crm.category.add',
        [
            'entityTypeId' => 1152,
            'fields' => [
                'name' => "Новая воронка по умолчанию",
                'sort' => 50,
                'isDefault' => 'Y',
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
            "id": 5,
            "name": "Новая воронка по умолчанию",
            "sort": 50,
            "entityTypeId": 1152,
            "isDefault": "Y"
        }
    },
    "time": {
        "start": 1718116794.208887,
        "finish": 1718116794.666272,
        "duration": 0.4573848247528076,
        "processing": 0.1496260166168213,
        "date_start": "2024-06-11T16:39:54+02:00",
        "date_finish": "2024-06-11T16:39:54+02:00",
        "operating": 0
    }
}
```

### Возвращаемые значения
#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`][1] | Корневой элемент ответа. Содержит объект [`category`](#category) с информацией о воронке ||
|| **time**
[`object`][1] | Объект, содержащий в себе информацию о времени выполнения запроса  ||
|#

#### Объект category {#category}

#| 
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`][1] | Идентификатор воронки (направления) ||
|| **name**
[`string`][1] | Название воронки ||
|| **sort**
[`integer`][1] | Индекс сортировки ||
|| **entityTypeId**
[`integer`][1] | Идентификатор [системного](../../index.md) или [пользовательского типа](../user-defined-object-types/index.md), к которому принадлежит воронка ||
|| **isDefault**
[`boolean`][1] | Является ли воронка, воронкой по умолчанию ||
|| **originId**
[`string`][1] | Идентификатор источника данных.

Существует только в cделках ||
|| **originatorId**
[`string`][1] | Идентификатор элемента в источнике данных.

Существует только в cделках ||
|| **isSystem** 
[`boolean`][1] | Является ли воронка системной.

Существует только в смарт-процессах ||
|| **code**
[`string`][1] | Псевдоним для системных воронок.

Существует только в смарт-процессах ||
|#

## Обработка ошибок

HTTP-статус: **160**, **400**

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
|| `ADDING_DISABLED` | Добавление системной категории запрещено | Возникает при попытке создать системную воронку в смарт-процессах ||
|| `ACCESS_DENIED` | Доступ запрещен | Возникает, если у пользователя недостаточно прав для добавления воронки ||
|| `0` | Field 'NAME' is required | Возникает, если не передано обязательное поле `name` ||
|| `0` | Default client category does not support updating default state | Возникает при попытке создать воронку по умолчанию для `контактов` или `компаний` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-category-update.md)
- [{#T}](./crm-category-get.md)
- [{#T}](./crm-category-list.md)
- [{#T}](./crm-category-delete.md)
- [{#T}](./crm-category-fields.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-category-to-spa.md)

[1]: ../../../data-types.md
