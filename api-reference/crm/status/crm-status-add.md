# Создать элемент справочника crm.status.add

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами администратора CRM

Метод `crm.status.add` создает новый элемент в указанном справочнике CRM: стадия сделки, источник, тип компании и другие.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields*** 
[`object`](../../data-types.md) | Объект с полями нового элемента справочника. Список доступных полей описан [ниже](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY_ID*** 
[`string`](../../data-types.md) | Тип справочника, например `DEAL_STAGE`, `SOURCE`. Получить список типов можно методом [crm.status.entity.types](./crm-status-entity-types.md) ||
|| **STATUS_ID*** 
[`string`](../../data-types.md) | Код значения статуса. Код должен быть уникальным в рамках справочника. Ограничения по длине и символам зависят от типа справочника||
|| **NAME*** 
[`string`](../../data-types.md) | Название ||
|| **SORT** 
[`integer`](../../data-types.md) | Сортировка. По умолчанию 10 ||
|| **COLOR** 
[`string`](../../data-types.md) | Цвет hex-код, например `#39A8EF`. Используйте для статусов-стадий ||
|| **SEMANTICS** 
[`string`](../../data-types.md) | Группа стадий:
- `"S"` — «Успех», 
- `"F"` — «Провал», 
- `""` — «В работе».

Используйте для статусов-стадий. По умолчанию передается группа «В работе» ||
|#

### Особенности полей

**Ограничения для `STATUS_ID`**

Соблюдайте ограничения по длине и используемым символам для разных типов справочников:

- **STATUS** стадии лида. Макс. длина: 21, может содержать только латинские буквы, цифры, знаки тире и подчеркивания.
- **QUOTE_STATUS** стадии предложения. Макс. длина: 22, может содержать только латинские буквы, цифры, знаки тире и подчеркивания.
- **DEAL_STAGE** стадии сделки. Макс. длина: 22, может содержать только латинские буквы, цифры, знаки тире и подчеркивания.
- **DEAL_STAGE_xx** стадии сделки в воронках не по умолчанию. xx — идентификатор воронки. Макс. длина зависит от идентификатора воронки. Может содержать только латинские буквы, цифры, знаки тире и подчеркивания.
- Для остальных `ENTITY_ID`, максимальная длина `STATUS_ID` - 50 символов, содержать может любые символы.

Если добавляется стадия для пользовательской воронки сделок, то к идентификатору статуса будет автоматически добавлен префикс воронки. Это нужно, чтобы определить воронку по идентификатору стадии.

Например, значение `DECISION` для воронки сделок с идентификатором `1` будет сохранено как `С1:DECISION`. Система автоматически добавит префикс `C1:`, соответствующий идентификатору воронки сделок. 
При передаче в поле значения сразу с префиксом `С1:DECISION` оно будет сохранено как `С1:DECISION`, дополнительный префикс не добавится. 

Для смарт-процессов с воронками действует аналогичная логика формирования `STATUS_ID` из значения и префикса. Префикс воронки можно узнать методом [crm.status.entity.types](./crm-status-entity-types.md).

**Ограничения для `SORT`**

Для корректной работы статусов-стадий сортировка должна соблюдать порядок: 
1. Стадии группы «В работе»
2. Стадия группы «Успех»
3. Стадии группы «Провал»

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"fields":{"ENTITY_ID":"DEAL_STAGE_1","STATUS_ID":"DECISION","NAME":"Принятие решения","SORT":70,"COLOR":"#FFA900"}}' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.status.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"ENTITY_ID":"DEAL_STAGE_1","STATUS_ID":"DECISION","NAME":"Принятие решения","SORT":70,"COLOR":"#FFA900"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.status.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.status.add',
    		{
    			fields: {
    				ENTITY_ID: 'DEAL_STAGE_1',
    				STATUS_ID: 'DECISION',
    				NAME: 'Принятие решения',
    				SORT: 70,
    				COLOR: '#FFA900'
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	if (result.error())
    		console.error(result.error());
    	else
    		console.dir(result);
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
                'crm.status.add',
                [
                    'fields' => [
                        'ENTITY_ID' => 'DEAL_STAGE_1',
                        'STATUS_ID' => 'DECISION',
                        'NAME'     => 'Принятие решения',
                        'SORT'     => 70,
                        'COLOR'    => '#FFA900',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding status: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.status.add",
        {
            fields: {
                ENTITY_ID: "DEAL_STAGE_1",
                STATUS_ID: "DECISION",
                NAME: "Принятие решения",
                SORT: 70,
                COLOR: "#FFA900"
            }
        },
        function(result) {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.status.add',
        [
            'fields' => [
                'ENTITY_ID' => 'DEAL_STAGE_1',
                'STATUS_ID' => 'DECISION',
                'NAME' => 'Принятие решения',
                'SORT' => 70,
                'COLOR' => '#FFA900'
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
    "result": 773,
    "time": {
        "start": 1752215174.862923,
        "finish": 1752215174.916697,
        "duration": 0.053774118423461914,
        "processing": 0.014070987701416016,
        "date_start": "2025-07-11T09:26:14+03:00",
        "date_finish": "2025-07-11T09:26:14+03:00",
        "operating_reset_at": 1752215774,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result** 
[`integer`](../../data-types.md) | Идентификатор созданного элемента справочника ||
|| **time** 
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "Invalid parameters.",
    "error_description": "Переданы некорректные параметры."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `400`     | `Access denied.` | Нет прав на выполнение операции ||
|| `400`     | `Invalid parameters.` | Переданы некорректные параметры ||
|| `400`     | `Specified entity type is not supported.` | Указан неподдерживаемый тип справочника ||
|| `400`     | `The field ENTITY_ID is required.` | Не указан `ENTITY_ID` ||
|| `400`     | `The field STATUS_ID is required.` | Не указан `STATUS_ID` ||
|| `400`     | `Duplicate STATUS_ID.` | Такой `STATUS_ID` уже существует ||
|| `400`     | `Error on creating status.` | Ошибка при создании элемента ||
|| `400`     | ` ` | Нельзя создать промежуточную стадию после успешной ||
|| `400`     | ` ` | Не заполнено обязательное поле "Заголовок" ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}


## Продолжите изучение

- [{#T}](./crm-status-list.md)
- [{#T}](./crm-status-get.md)
- [{#T}](./crm-status-update.md)
- [{#T}](./crm-status-delete.md)
- [{#T}](./crm-status-fields.md)
- [{#T}](./crm-status-entity-types.md) 
- [{#T}](../../../tutorials/crm/how-to-add-crm-objects/how-to-add-category-to-spa.md)