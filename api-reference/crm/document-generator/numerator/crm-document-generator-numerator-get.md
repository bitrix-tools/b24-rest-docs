# Получить информацию о нумераторе crm.documentgenerator.numerator.get

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом "изменения" шаблонов генератора документов

Метод `crm.documentgenerator.numerator.get` возвращает информацию о нумераторе по его идентификатору.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор нумератора ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример получения нумератора с `id = 45`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":45}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.documentgenerator.numerator.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":45,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.documentgenerator.numerator.get
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.documentgenerator.numerator.get',
    		{
    			id: 45,
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
                'crm.documentgenerator.numerator.get',
                [
                    'id' => 45,
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
        echo 'Error getting numerator: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.documentgenerator.numerator.get',
        {
            id: 45,
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
        'crm.documentgenerator.numerator.get',
        [
            'id' => 45,
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
        "numerator": {
            "id": "45",
            "name": "Нумератор из REST (обновлен)",
            "template": "INV-{NUMBER}",
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
        }
    },
    "time": {
        "start": 1773747475,
        "finish": 1773747475.904903,
        "duration": 0.9049029350280762,
        "processing": 0,
        "date_start": "2026-03-17T14:37:55+03:00",
        "date_finish": "2026-03-17T14:37:55+03:00",
        "operating_reset_at": 1773748075,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа. Содержит объект [`numerator`](#numerator) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Тип numerator {#numerator}

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
|| `100` | `Bitrix\Main\Numerator\Numerator constructor must be is public` | Ошибка при создании объекта нумератора ||
|| `100` | `Could not construct parameter {numerator}` | Нумератор с указанным `id` не найден ||
|| `DOCGEN_ACCESS_ERROR` | `Access denied` | Нет доступа к нумератору, либо нумератор не относится к модулю генератора документов ||
|| `Пустое значение` | `You do not have permissions to modify templates` | Недостаточно прав для изменения шаблонов генератора документов ||
|| `Пустое значение` | `Module documentgenerator is not installed` | Модуль `documentgenerator` недоступен ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-document-generator-numerator-add.md)
- [{#T}](./crm-document-generator-numerator-update.md)
- [{#T}](./crm-document-generator-numerator-list.md)
- [{#T}](./crm-document-generator-numerator-delete.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-generate-documents.md)

