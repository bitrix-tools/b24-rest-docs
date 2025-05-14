# Обновить датасет biconnector.dataset.update

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к разделу «Рабочее место аналитика»

Метод `biconnector.dataset.update` обновляет существующий датасет.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор датасета, можно получить методами [biconnector.dataset.list](./biconnector-dataset-list.md) и [biconnector.dataset.add](./biconnector-dataset-add.md) ||
|| **fields***
[`object`](../../data-types.md) | Объект, содержащий обновляемые данные.
Формат объекта: 

```
{
    "field_1": "value_1",
    "field_2": "value_2",
    ...,
    "field_n": "value_n"
}
```

- `field_n` — название поля
- `value_n` — значение поля

[Подробное описание ниже](#fields)||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **description**
[`string`](../../data-types.md) | Описание датасета ||
|#

Для изменения полей датасета, используйте метод [biconnector.dataset.fields.update](./biconnector-dataset-fields-update.md).

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    BX.rest.callMethod(
        'biconnector.dataset.update',
        {
            id: 10,
            fields: {
                "description": "Новое описание",
            }
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data());
        }
    );
    ```

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "id": 10,
        "fields": {
            "description": "Новое описание"
        }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/biconnector.dataset.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "id": 10,
        "fields": {
            "description": "Новое описание"
        },
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/biconnector.dataset.update
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'biconnector.dataset.update',
        [
            'id' => 10,
            'fields' => [
                'description' => 'Новое описание'
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
    "error": "VALIDATION_FIELDS_NOT_PROVIDED",
    "error_description": "Fields not provided."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

## Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `VALIDATION_ID_NOT_PROVIDED` | `ID is missing.` | Идентификатор не указан ||
|| `VALIDATION_INVALID_ID_FORMAT` | `ID has to be a positive integer.` | Неверный формат ID ||
|| `VALIDATION_FIELDS_NOT_PROVIDED` | `Fields not provided.` | Поля не переданы в запросе ||
|| `VALIDATION_UNKNOWN_PARAMETERS` | `Unknown parameters: #LIST_OF_PARAMS#` | Обнаружены неизвестные параметры: #LIST\_OF\_PARAMS#. ||
|| `VALIDATION_REQUIRED_FIELD_MISSING` | `Field "#TITLE#" is required.` | Обязательное поле #TITLE# не передано ||
|| `VALIDATION_READ_ONLY_FIELD` | `Field "#TITLE#" is read only.` | Поле #TITLE# доступно только для чтения и не может быть изменено ||
|| `VALIDATION_IMMUTABLE_FIELD` | `Field "#TITLE#" is immutable.` | Поле #TITLE# неизменяемое ||
|| `VALIDATION_INVALID_FIELD_TYPE` | `Field "#TITLE#" must be of type #TYPE#.` | Поле #TITLE# должно быть типа #TYPE# ||
|| `DATASET_NOT_FOUND` | `Dataset was not found.` | Датасет не найден ||
|| `INVALID_METHOD` | `Use the method "biconnector.dataset.fields.update" to update the dataset fields.` | Для обновления полей используйте метод `biconnector.dataset.fields.update` ||
|| `-` | `Error updating dataset.` | Ошибка обновления датасета ||
|| `VALIDATION_DUPLICATE_FIELD_CODE` | `Duplicate values found in the "code" parameter: #LIST_CODES#` | Обнаружены дубликаты в параметре `externalCode` полей датасета ||
|| `VALIDATION_DUPLICATE_FIELD_NAME` | `Duplicate values found in the "name" parameter: #LIST_NAMES#` | Обнаружены дубликаты в параметре `name` полей датасета ||
|| `VALIDATION_FIELD_MISSING_REQUIRED_PARAMETERS` | `Field must include the required parameters: "name", "externalCode" and "type".` | Поле должно включать параметры `name`, `externalCode` и `type` ||
|| `VALIDATION_FIELD_NAME_INVALID_FORMAT` | `Field "name" has to start with an uppercase Latin character. Possible entry includes uppercase Latin characters (A-Z), numbers (0-9) and underscores.` | Неправильный формат названия поля. Название должно начинаться с буквы, можно использовать только заглавные латинские буквы `(A-Z)`, цифры и знак `_` ||
|| `VALIDATION_FIELD_NAME_TOO_LONG` | `Field "name" must not exceed 32 characters.` | Название поля не должно превышать 32 символов ||
|| `VALIDATION_FIELD_INVALID_TYPE` | `Invalid field type.` | Некорректный тип поля ||
|| `-` | `Error adding dataset` | Ошибка добавления датасета ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./biconnector-dataset-add.md)
- [{#T}](./biconnector-dataset-fields.md)
- [{#T}](./biconnector-dataset-fields-update.md)
- [{#T}](./biconnector-dataset-get.md)
- [{#T}](./biconnector-dataset-list.md)
- [{#T}](./biconnector-dataset-delete.md)
