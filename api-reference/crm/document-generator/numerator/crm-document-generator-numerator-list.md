# Получить список нумераторов crm.documentgenerator.numerator.list

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом "изменения" шаблонов генератора документов

Метод `crm.documentgenerator.numerator.list` возвращает список нумераторов.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **start**
[`integer`](../../data-types.md) | Смещение для постраничной навигации. Подробнее в статье [Особенности списочных методов](../../../../settings/how-to-call-rest-api/list-methods-pecularities.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"start":0}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.documentgenerator.numerator.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.documentgenerator.numerator.list
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.documentgenerator.numerator.list',
    		{
    			start: 0,
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
                'crm.documentgenerator.numerator.list',
                [
                    'start' => 0,
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
        echo 'Error getting numerators list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.documentgenerator.numerator.list',
        {
            start: 0,
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
        'crm.documentgenerator.numerator.list',
        [
            'start' => 0,
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
        "numerators": [
            {
                "id": "2",
                "name": "Акт (Россия)",
                "template": "{NUMBER}",
                "settings": {
                    "Bitrix_Main_Numerator_Generator_SequentNumberGenerator": {
                        "start": 1,
                        "step": 1,
                        "periodicBy": null,
                        "timezone": null,
                        "isDirectNumeration": false
                    }
                }
            },
            {
                "id": "45",
                "name": "Нумератор из REST (обновлен)",
                "template": "INV-{NUMBER}",
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
            }
        ]
    },
    "total": 19,
    "time": {
        "start": 1773750210,
        "finish": 1773750210.283658,
        "duration": 0.2836580276489258,
        "processing": 0,
        "date_start": "2026-03-17T15:23:30+03:00",
        "date_finish": "2026-03-17T15:23:30+03:00",
        "operating_reset_at": 1773750810,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа. Содержит массив объектов [`numerators`](#numerators) ||
|| **total**
[`integer`](../../data-types.md) | Общее количество нумераторов ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Массив numerators {#numerators}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Идентификатор нумератора ||
|| **name**
[`string`](../../data-types.md) | Название нумератора ||
|| **template**
[`string`](../../data-types.md) | Шаблон номера ||
|| **settings**
[`object`](../../data-types.md) | Сохраненные настройки последовательной нумерации типа [`settings`](#settings) ||
|#

#### Тип settings {#settings}

#|
|| **Название**
`тип` | **Описание** ||
|| **start**
[`integer`](../../data-types.md) | Начальное значение счетчика ||
|| **step**
[`integer`](../../data-types.md) | Шаг увеличения счетчика ||
|| **length**
[`integer`](../../data-types.md) | Минимальная длина номера ||
|| **padString**
[`string`](../../data-types.md) | Символ добивки слева ||
|| **periodicBy**
[`string`](../../data-types.md) | Период сброса счетчика: `null`, `day`, `month` или `year` ||
|| **timezone**
[`string`](../../data-types.md) | Идентификатор часового пояса для периодического сброса. Может быть `null` ||
|| **isDirectNumeration**
[`boolean`](../../data-types.md) | Признак прямой нумерации ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "You do not have permissions to modify templates"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `Пустое значение` | `You do not have permissions to modify templates` | Недостаточно прав для изменения шаблонов генератора документов ||
|| `Пустое значение` | `Module documentgenerator is not installed` | Модуль `documentgenerator` недоступен ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-document-generator-numerator-add.md)
- [{#T}](./crm-document-generator-numerator-update.md)
- [{#T}](./crm-document-generator-numerator-get.md)
- [{#T}](./crm-document-generator-numerator-delete.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-generate-documents.md)

