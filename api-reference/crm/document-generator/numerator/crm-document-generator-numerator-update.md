# Изменить нумератор crm.documentgenerator.numerator.update

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом "изменения" шаблонов генератора документов

Метод `crm.documentgenerator.numerator.update` обновляет существующий нумератор.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор нумератора ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями для обновления в формате:

```json
{
    "field_1": "value_1",
    "field_2": "value_2",
    "...": "..."
}
```

где:
- `field_n` — название поля
- `value_n` — значение поля

Список полей — [ниже](#parameter-fields) ||
|#

### Параметр fields {#parameter-fields}

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../data-types.md) | Название нумератора ||
|| **template**
[`string`](../../data-types.md) | Шаблон номера, например `{NUMBER}` ||
|| **settings**
[`object`](../../data-types.md) | Настройки генераторов. Описание параметров — [ниже](#parameter-settings) ||
|#

### Параметр settings {#parameter-settings}

#|
|| **Название**
`тип` | **Описание** ||
|| **Bitrix_Main_Numerator_Generator_SequentNumberGenerator**
[`object`](../../data-types.md) | Настройки последовательной нумерации. Описание параметров — [ниже](#parameter-sequent-settings) ||
|#

#### Параметры Bitrix_Main_Numerator_Generator_SequentNumberGenerator {#parameter-sequent-settings}

#|
|| **Название**
`тип` | **Описание** ||
|| **start**
[`integer`](../../data-types.md) | Начальное значение счетчика. По умолчанию `1` ||
|| **step**
[`integer`](../../data-types.md) | Шаг увеличения счетчика. По умолчанию `1` ||
|| **length**
[`integer`](../../data-types.md) | Минимальная длина номера. По умолчанию `0` ||
|| **padString**
[`string`](../../data-types.md) | Символ добивки слева при `length > 0`. По умолчанию `'0'` ||
|| **periodicBy**
[`string`](../../data-types.md) | Период сброса счетчика:
- `''` — без сброса
- `day` — ежедневно
- `month` — ежемесячно
- `year` — ежегодно ||
|| **timezone**
[`string`](../../data-types.md) | Идентификатор часового пояса для периодического сброса, например `Europe/Moscow` ||
|| **isDirectNumeration**
[`boolean`](../../data-types.md) | Признак прямой нумерации. По умолчанию `false` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример обновления нумератора:
- новый шаблон — `INV-{NUMBER}`
- старт последовательности — `100`
- шаг — `1`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":45,"fields":{"name":"Нумератор из REST (обновлен)","template":"INV-{NUMBER}","settings":{"Bitrix_Main_Numerator_Generator_SequentNumberGenerator":{"start":100,"step":1,"length":6,"padString":"0","periodicBy":"","timezone":"","isDirectNumeration":false}}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.documentgenerator.numerator.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":45,"fields":{"name":"Нумератор из REST (обновлен)","template":"INV-{NUMBER}","settings":{"Bitrix_Main_Numerator_Generator_SequentNumberGenerator":{"start":100,"step":1,"length":6,"padString":"0","periodicBy":"","timezone":"","isDirectNumeration":false}}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.documentgenerator.numerator.update
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.documentgenerator.numerator.update',
    		{
    			id: 45,
    			fields: {
    				name: 'Нумератор из REST (обновлен)',
    				template: 'INV-{NUMBER}',
    				settings: {
    					Bitrix_Main_Numerator_Generator_SequentNumberGenerator: {
    						start: 100,
    						step: 1,
    						length: 6,
    						padString: '0',
    						periodicBy: '',
    						timezone: '',
    						isDirectNumeration: false,
    					},
    				},
    			},
    		}
    	);

    	const result = response.getData().result;
    	console.info(result);
    }
    catch (error)
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
                'crm.documentgenerator.numerator.update',
                [
                    'id' => 45,
                    'fields' => [
                        'name' => 'Нумератор из REST (обновлен)',
                        'template' => 'INV-{NUMBER}',
                        'settings' => [
                            'Bitrix_Main_Numerator_Generator_SequentNumberGenerator' => [
                                'start' => 100,
                                'step' => 1,
                                'length' => 6,
                                'padString' => '0',
                                'periodicBy' => '',
                                'timezone' => '',
                                'isDirectNumeration' => false,
                            ],
                        ],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo '<pre>';
        print_r($result);
        echo '</pre>';

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating numerator: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.documentgenerator.numerator.update',
        {
            id: 45,
            fields: {
                name: 'Нумератор из REST (обновлен)',
                template: 'INV-{NUMBER}',
                settings: {
                    Bitrix_Main_Numerator_Generator_SequentNumberGenerator: {
                        start: 100,
                        step: 1,
                        length: 6,
                        padString: '0',
                        periodicBy: '',
                        timezone: '',
                        isDirectNumeration: false,
                    },
                },
            },
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data())
            ;
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.documentgenerator.numerator.update',
        [
            'id' => 45,
            'fields' => [
                'name' => 'Нумератор из REST (обновлен)',
                'template' => 'INV-{NUMBER}',
                'settings' => [
                    'Bitrix_Main_Numerator_Generator_SequentNumberGenerator' => [
                        'start' => 100,
                        'step' => 1,
                        'length' => 6,
                        'padString' => '0',
                        'periodicBy' => '',
                        'timezone' => '',
                        'isDirectNumeration' => false,
                    ],
                ],
            ],
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
        "name": "Нумератор из REST (обновлен)",
        "template": "INV-{NUMBER}",
        "id": "45",
        "code": null,
        "settings": {
            "Bitrix_Main_Numerator_Generator_SequentNumberGenerator": {
                "start": 100,
                "step": 1,
                "length": 0,
                "padString": "0",
                "periodicBy": null,
                "timezone": null,
                "isDirectNumeration": false
            }
        }
    },
    "time": {
        "start": 1773743992,
        "finish": 1773743992.664487,
        "duration": 0.6644868850708008,
        "processing": 0,
        "date_start": "2026-03-17T13:39:52+03:00",
        "date_finish": "2026-03-17T13:39:52+03:00",
        "operating_reset_at": 1773744592,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа. Содержит данные нумератора формата [`result`](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Тип result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Идентификатор нумератора ||
|| **name**
[`string`](../../data-types.md) | Название нумератора ||
|| **template**
[`string`](../../data-types.md) | Шаблон номера ||
|| **code**
[`string`](../../data-types.md) | Символьный код нумератора. Может быть `null` ||
|| **settings**
[`object`](../../data-types.md) | Сохраненные настройки генераторов ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "100",
    "error_description": "Could not construct parameter {numerator}"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `100` | `Could not find value for parameter {fields}` | Не передан обязательный параметр `fields` ||
|| `100` | `Bitrix\Main\Numerator\Numerator constructor must be is public` | Внутренняя ошибка при создании объекта нумератора ||
|| `100` | Invalid value {...} to match with parameter {fields}. Should be value of type array. | Параметр `fields` передан не как массив/объект ||
|| `100` | `Could not construct parameter {numerator}` | Нумератор с указанным `id` не найден ||
|| `DOCGEN_ACCESS_ERROR` | `Access denied` | Нет доступа к нумератору. Метод обновляет только нумераторы, созданные через REST ||
|| `Пустое значение` | `You do not have permissions to modify templates` | Недостаточно прав для изменения шаблонов генератора документов ||
|| `Пустое значение` | `Module documentgenerator is not installed` | Модуль `documentgenerator` недоступен ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-document-generator-numerator-add.md)
- [{#T}](./crm-document-generator-numerator-get.md)
- [{#T}](./crm-document-generator-numerator-list.md)
- [{#T}](./crm-document-generator-numerator-delete.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-generate-documents.md)

