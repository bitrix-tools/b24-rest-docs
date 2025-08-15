# Обновить поля датасета biconnector.dataset.fields.update

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к разделу «Рабочее место аналитика»

Метод `biconnector.dataset.fields.update` обновляет поля существующего датасета.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор датасета, можно получить методами [biconnector.dataset.list](./biconnector-dataset-list.md) или [biconnector.dataset.add](./biconnector-dataset-add.md) ||
|| **add**
[`object`](../../data-types.md) | Объект, содержащий массив добавляемых полей со следующей структурой: 

```
{
    "type" : "int",
    "name": "NAME",
    "externalCode":"NAME"
},
```

- `type` — тип поля
- `name` — название поля
- `externalCode` — внешний код поля ||
|| **update**
[`object`](../../data-types.md) | Объект, содержащий массив обновляемых полей со следующей структурой:

```
{
    "id": 12,
    "visible": false
},
```

- `id` — Идентификатор поля, можно получить методом [biconnector.dataset.get](./biconnector-dataset-get.md)
- `visible` — видимость поля||
|| **delete**
[`int[]`](../../data-types.md) | Объект, содержащий массив идентификаторов полей для их удаления. Идентификаторы полей можно получить методом [biconnector.dataset.get](./biconnector-dataset-get.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "id": 10,
        "add": [
            {
                "type": "int",
                "name": "NAME",
                "externalCode": "NAME"
            },
            {
                "type": "int",
                "name": "ID",
                "externalCode": "ID"
            }
        ],
        "update": [
            {
                "id": 12,
                "visible": false
            },
            {
                "id": 13,
                "visible": true
            }
        ],
        "delete": [
            14,
            15
        ]
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/biconnector.dataset.fields.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "id": 10,
        "add": [
            {
                "type": "int",
                "name": "NAME",
                "externalCode": "NAME"
            },
            {
                "type": "int",
                "name": "ID",
                "externalCode": "ID"
            }
        ],
        "update": [
            {
                "id": 12,
                "visible": false
            },
            {
                "id": 13,
                "visible": true
            }
        ],
        "delete": [
            14,
            15
        ],
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/biconnector.dataset.fields.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'biconnector.dataset.fields.update',
    		{
    			id: 10,
    			add: [
    				{
    					type: "int",
    					name: "NAME",
    					externalCode: "NAME"
    				},
    				{
    					type: "int",
    					name: "ID",
    					externalCode: "ID"
    				}
    			],
    			update: [
    				{
    					"id": 12,
    					"visible": false
    				},
    				{
    					"id": 13,
    					"visible": true
    				}
    			],
    			delete: [
    				14,
    				15
    			]
    		}
    	);
    	
    	const result = response.getData().result;
    	result.error()
    		? console.error(result.error())
    		: console.info(result);
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
                'biconnector.dataset.fields.update',
                [
                    'id'     => 10,
                    'add'    => [
                        [
                            'type'         => "int",
                            'name'         => "NAME",
                            'externalCode' => "NAME"
                        ],
                        [
                            'type'         => "int",
                            'name'         => "ID",
                            'externalCode' => "ID"
                        ]
                    ],
                    'update' => [
                        [
                            'id'      => 12,
                            'visible' => false
                        ],
                        [
                            'id'      => 13,
                            'visible' => true
                        ]
                    ],
                    'delete' => [14, 15]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Data: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating dataset fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'biconnector.dataset.fields.update',
        {
            id: 10,
            add: [
                {
                    type: "int",
                    name: "NAME",
                    externalCode: "NAME"
                },
                {
                    type: "int",
                    name: "ID",
                    externalCode: "ID"
                }
            ],
            update: [
                {
                    "id": 12,
                    "visible": false
                },
                {
                    "id": 13,
                    "visible": true
                }
            ],
            delete: [
                14,
                15
            ]
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'biconnector.dataset.fields.update',
        [
            'id' => 10,
            'add' => [
                [
                    'type' => 'int',
                    'name' => 'NAME',
                    'externalCode' => 'NAME'
                ],
                [
                    'type' => 'int',
                    'name' => 'ID',
                    'externalCode' => 'ID'
                ]
            ],
            'update' => [
                [
                    'id' => 12,
                    'visible' => false
                ],
                [
                    'id' => 13,
                    'visible' => true
                ]
            ],
            'delete' => [14, 15]
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
    "result": true,
    "time": {
        "start": 1725365418.056843,
        "finish": 1725365419.671506,
        "duration": 1.6146628856658936,
        "processing": 1.3475170135498047,
        "date_start": "2024-09-03T14:10:18+02:00",
        "date_finish": "2024-09-03T14:10:19+02:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Корневой элемент ответа, содержит `true` в случае успеха ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **200**

```json
{
    "error": "VALIDATION_ID_NOT_PROVIDED",
    "error_description": "ID is missing."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `VALIDATION_ID_NOT_PROVIDED` | ID is missing. | Идентификатор не указан ||
|| `VALIDATION_INVALID_ID_FORMAT` | ID has to be a positive integer. | Неверный формат ID ||
|| `DATASET_NOT_FOUND` | Dataset was not found. | Датасет не найден ||
|| `DATASET_UPDATE_ERROR` | Error updating dataset. | Ошибка обновления датасета ||
|| `VALIDATION_DUPLICATE_FIELD_CODE` | Duplicate values found in the "code" parameter: #LIST_CODES# | Обнаружены дубликаты в параметре `externalCode` полей датасета ||
|| `VALIDATION_DUPLICATE_FIELD_NAME` | Duplicate values found in the "name" parameter: #LIST_NAMES# | Обнаружены дубликаты в параметре `name` полей датасета ||
|| `VALIDATION_FIELD_NAME_INVALID_FORMAT` | Field "name" has to start with an uppercase Latin character. Possible entry includes uppercase Latin characters (A-Z), numbers (0-9) and underscores. | Неправильный формат названия поля. Название должно начинаться с буквы, можно использовать только заглавные латинские буквы `(A-Z)`, цифры и знак `_` ||
|| `VALIDATION_FIELD_NAME_TOO_LONG` | Field "name" must not exceed 32 characters. | Название поля не должно превышать 32 символов ||
|| `VALIDATION_FIELD_INVALID_TYPE` | Invalid field type. | Некорректный тип поля ||
|| `VALIDATION_DUPLICATE_EXIST_CODE` | The following "externalCode" values already exist in the current fields: #LIST_CODES# | Поля с таким параметром `externalCode` уже существуют ||
|| `VALIDATION_DUPLICATE_EXIST_NAME` | The following "name" values already exist in the current fields: #LIST_NAMES# | Поля с таким параметром `name` уже существуют ||
|| `VALIDATION_FIELD_ADD_MISSING_REQUIRED_FIELDS` | Field to be added must include the required parameters: "name", "externalCode" and "type". | Поле для добавления должно включать параметры `name`, `externalCode` и `type` ||
|| `VALIDATION_FIELD_UPDATE_MISSING_REQUIRED_FIELDS` | Field to be updated must include the required parameters: "id" and "visible". | Поле для обновления должно включать параметры `id` и `visible` ||
|| `VALIDATION_FIELD_DELETE_INVALID_ID` | ID to be deleted must be a positive integer. | Неверный формат `id` для удаления ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./biconnector-dataset-add.md)
- [{#T}](./biconnector-dataset-update.md)
- [{#T}](./biconnector-dataset-fields.md)
- [{#T}](./biconnector-dataset-get.md)
- [{#T}](./biconnector-dataset-list.md)
- [{#T}](./biconnector-dataset-delete.md)
